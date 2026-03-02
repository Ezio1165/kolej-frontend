"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"] });

interface VideoCardItem {
    id: number;
    title: string;
    description?: string;
    url: string;
    image: any;
    video: any;
}

interface VideoCardsBlockProps {
    data: {
        sectionTitle?: string;
        items: VideoCardItem[];
    };
}

export default function VideoCardsBlock({ data }: VideoCardsBlockProps) {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    if (!data?.items || data.items.length === 0) return null;

    return (
        /* TASARIM DEĞİŞİKLİĞİ:
           - bg-[#f4f9ff]: Konsepte uygun çok açık, ferah bir mavi arka plan.
           - rounded-r-[80px] md:rounded-r-[150px]: Bu kez SAĞ taraf devasa şekilde yuvarlatıldı.
           - w-[98%] mr-auto: Ekranın sağından hafif pay bırakılarak sola yaslandı.
        */
        <section className="mt-12 mb-12 py-24 bg-[#f4f9ff] relative overflow-hidden rounded-r-[80px] md:rounded-r-[150px] w-[98%] mr-auto shadow-sm border-r border-[#dbeafe]">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-10">

                {/* Başlık Bölümü */}
                {data.sectionTitle && (
                    <div className="mb-16 text-left">
                        <h2 className={`text-4xl md:text-5xl ${bitter.className} font-black text-[#0c4a6e] tracking-wide leading-tight`}>
                            {data.sectionTitle}
                        </h2>
                        <div className="w-20 h-1.5 bg-blue-600 mt-6 rounded-full"></div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {data.items.map((item) => {
                        const imgUrl = getStrapiMedia(
                            item.image?.data?.attributes?.url ||
                            item.image?.data?.url ||
                            item.image?.url
                        );
                        const videoUrl = getStrapiMedia(
                            item.video?.data?.attributes?.url ||
                            item.video?.data?.url ||
                            item.video?.url
                        );

                        return (
                            <div key={item.id} className="group h-[500px] [perspective:1500px] cursor-default">
                                <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl hover:shadow-2xl rounded-[40px]">

                                    {/* --- ÖN YÜZ --- */}
                                    <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] rounded-[40px] overflow-hidden bg-white border border-white/50">
                                        <div className="h-full w-full relative">
                                            {imgUrl ? (
                                                <Image src={imgUrl} alt={item.title} fill className="object-cover" />
                                            ) : (
                                                <div className="h-full w-full bg-blue-50 flex items-center justify-center text-blue-300">No Image</div>
                                            )}

                                            {/* Ön Yüz Karartma (Kurumsal Koyu Mavi Tonu) */}
                                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#082f49]/95 via-[#082f49]/50 to-transparent">
                                                <h3 className="text-2xl font-black text-white leading-tight">{item.title}</h3>
                                                <div className="w-10 h-1 bg-[#38bdf8] mt-3 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- ARKA YÜZ --- */}
                                    {/* Arka yüz renkleri kurumsal Mavi/Turkuaz temasına uyarlandı */}
                                    <div className="absolute inset-0 h-full w-full rounded-[40px] bg-[#082f49] text-white [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden flex flex-col border border-[#0c4a6e]">

                                        {/* Üst %70: Açıklama Alanı (Koyu Mavi) */}
                                        <div className="h-[70%] p-10 flex flex-col justify-center bg-[#082f49]">
                                            <h4 className="text-xl font-bold text-[#7dd3fc] mb-4">{item.title}</h4>
                                            <div className="overflow-y-auto pr-2 custom-scrollbar">
                                                <p className="text-blue-50 text-base leading-relaxed font-medium opacity-90">
                                                    {item.description || "No description provided. Please add a description from the Strapi panel."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Alt %30: Oynat Butonu Alanı (Canlı Mavi/Turkuaz) */}
                                        <div className="h-[30%] bg-[#0ea5e9] flex items-center justify-center relative">
                                            {/* Dekoratif Üçgen */}
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0ea5e9] rotate-45"></div>

                                            <button
                                                onClick={() => videoUrl && setActiveVideo(videoUrl)}
                                                className="flex items-center gap-3 px-8 py-4 bg-white text-[#082f49] rounded-full font-black shadow-xl hover:scale-105 active:scale-95 transition-all group/btn"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white group-hover/btn:bg-[#0284c7] transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                                                        <path fillRule="evenodd" d="M4.5 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                Watch Video
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* VİDEO MODAL (POPUP) */}
            {activeVideo && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#082f49]/95 backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={() => setActiveVideo(null)}>
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-rose-500 rounded-full text-white transition-all backdrop-blur-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <video className="w-full h-full" src={activeVideo} autoPlay controls />
                    </div>
                </div>
            )}

            {/* Özel Scrollbar Stili */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}</style>
        </section>
    );
}