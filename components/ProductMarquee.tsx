"use client";

import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";
import { SlidingLogoMarquee } from "./SlidingLogoMarquee";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"] });

interface ProductMarqueeProps {
    data: {
        title?: string;
        items: any[];
    };
}

export default function ProductMarquee({ data }: ProductMarqueeProps) {
    if (!data?.items || data.items.length === 0) return null;

    // Strapi verisini Marquee formatına dönüştür
    const marqueeItems = data.items.map((item: any) => {
        const rawUrl =
            item.image?.data?.attributes?.url ||
            item.image?.data?.url ||
            item.image?.url;

        const imgUrl = getStrapiMedia(rawUrl);

        return {
            id: item.id.toString(),
            href: item.url || "#",
            content: (
                // ÜRÜN KARTI TASARIMI (Büyük, Renkli ve Gölgeli)
                <div className="relative w-80 h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group bg-white border border-gray-100">
                    {imgUrl ? (
                        <>
                            <Image
                                src={imgUrl}
                                alt={item.title || "Product"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Üzerine gelince alttan çıkan başlık (Lacivert karartma) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/90 via-[#0c4a6e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
                                    {item.title}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-gray-50">
                            NO IMAGE
                        </div>
                    )}
                </div>
            ),
        };
    });

    return (
        /* TASARIM DEĞİŞİKLİĞİ:
           - bg-[#f8fbff]: Kurumsal konsepte uygun çok açık, ferah bir buz mavisi.
           - rounded-r-[150px]: Z akışına uygun olarak SAĞ taraftan asimetrik kesim.
           - w-[98%] mr-auto: Sağda boşluk bırakarak ekranı kaplar.
        */
        <section className="mt-12 mb-12 py-20 bg-[#f8fbff] relative overflow-hidden rounded-r-[80px] md:rounded-r-[150px] w-[99%] mr-auto shadow-sm border-r border-[#dbeafe]">
            <div className="max-w-full mx-auto relative z-10">

                {/* Bölüm Başlığı */}
                {data.title && (
                    <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 mb-12 text-left">
                        <h2 className={`text-3xl md:text-4xl ${bitter.className} font-black text-[#0c4a6e] tracking-wide uppercase`}>
                            {data.title}
                        </h2>
                        <div className="w-16 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
                    </div>
                )}

                {/* Kayar Bant Alanı */}
                <div className="w-full">
                    <SlidingLogoMarquee
                        items={marqueeItems}
                        speed={60} // Ürünler rahat incelensin diye yavaş akış
                        height="320px" // Kartların rahatça sığması için yükseklik
                        gap="3rem" // Kartlar arası boşluk
                        pauseOnHover={true}
                        showControls={false}
                        /* ÖNEMLİ: enableBlur={true} 
                           Kenarlara geldikçe ürünlerin silikleşerek kaybolmasını (parlama efekti) sağlar. 
                           Videoda bahsettiğiniz etki budur.
                        */
                        enableBlur={true}
                        blurIntensity={1.5} // Silikleşme şiddetini biraz artırarak daha hoş bir efekt verdik
                    />
                </div>
            </div>
        </section>
    );
}