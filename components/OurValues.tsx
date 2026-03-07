"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper Stilleri
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"] });
interface ValueItem {
    id: number;
    title: string;
    description: string;
}

interface OurValuesProps {
    data: {
        title?: string;
        items: ValueItem[];
    };
}

/** * YENİ CANLI TEMA RENKLERİ:
 * Arka planlar belirgin -600 tonlarına çekildi.
 * Metinler mükemmel okunabilirlik için beyaz ve çok açık tonlara (100) ayarlandı.
 */
const VALUE_CARD_THEMES = [
    {
        bg: "bg-fuchsia-600",
        titleColor: "text-white",
        textColor: "text-fuchsia-100",
        borderColor: "border-fuchsia-500",
        hoverShadow: "hover:shadow-fuchsia-600/60"
    },
    {
        bg: "bg-teal-600",
        titleColor: "text-white",
        textColor: "text-teal-100",
        borderColor: "border-teal-500",
        hoverShadow: "hover:shadow-teal-600/60"
    },
    {
        bg: "bg-indigo-600",
        titleColor: "text-white",
        textColor: "text-indigo-100",
        borderColor: "border-indigo-500",
        hoverShadow: "hover:shadow-indigo-600/60"
    },
    {
        bg: "bg-amber-600",
        titleColor: "text-white",
        textColor: "text-amber-100",
        borderColor: "border-amber-500",
        hoverShadow: "hover:shadow-amber-600/60"
    },
    {
        bg: "bg-sky-600",
        titleColor: "text-white",
        textColor: "text-sky-100",
        borderColor: "border-sky-500",
        hoverShadow: "hover:shadow-sky-600/60"
    }
];

export default function OurValues({ data }: OurValuesProps) {
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    if (!data?.items || data.items.length === 0) {
        return null;
    }

    return (
        <section className="mt-12 mb-12 pt-12 pb-20 bg-[#f0f7ff] relative overflow-hidden rounded-r-[80px] md:rounded-r-[150px] w-[98%] mr-auto shadow-sm">

            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-10">

                {/* Başlık Bölümü */}
                <div className="mb-8 text-left">
                    <h2 className={`text-4xl md:text-5xl ${bitter.className} font-black text-[#0c4a6e] tracking-wide`}>
                        {data.title || "Our Values"}
                    </h2>
                    <div className="w-16 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
                </div>

                {/* Slider Konteynırı */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoHeight={false}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        navigation={{
                            prevEl,
                            nextEl,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-2"
                    >
                        {data.items.map((item, idx) => {
                            // Canlı renklere göre temayı seçiyoruz
                            const theme = VALUE_CARD_THEMES[idx % VALUE_CARD_THEMES.length];

                            return (
                                <SwiperSlide key={item.id || idx} className="flex justify-center h-auto">
                                    <div
                                        className={`
                      w-full h-[320px] p-8 rounded-[2.5rem] border
                      ${theme.bg} ${theme.borderColor}
                      flex flex-col justify-start
                      transition-all duration-500 ease-out
                      hover:-translate-y-2 hover:shadow-2xl ${theme.hoverShadow}
                      cursor-default relative
                      overflow-hidden
                    `}
                                    >
                                        {/* Başlık */}
                                        <h3 className={`text-2xl ${bitter.className} font-extrabold mb-4 tracking-tight relative z-10 ${theme.titleColor}`}>
                                            {item.title}
                                        </h3>

                                        {/* Açıklama */}
                                        <div className="overflow-y-auto pr-2  custom-scrollbar relative z-10">
                                            <p className={`text-base ${bitter.className} leading-relaxed font-medium ${theme.textColor}`}>
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Dekoratif Işık Yansıması (Koyu zeminlerde harika durur) */}
                                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* MAVİ TEMALI NAVİGASYON OKLARI */}
                    <div className="absolute -bottom-16 right-4 flex gap-4 z-30">
                        <button
                            ref={(node) => setPrevEl(node)}
                            className="w-12 h-12 rounded-full border-2 border-blue-200 bg-white flex items-center justify-center text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm focus:outline-none active:scale-95"
                            aria-label="Previous"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            ref={(node) => setNextEl(node)}
                            className="w-12 h-12 rounded-full border-2 border-blue-200 bg-white flex items-center justify-center text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm focus:outline-none active:scale-95"
                            aria-label="Next"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* KİLİT NOKTA: Kart zeminleri koyu olduğu için kaydırma çubuğu artık beyaz ağırlıklı olmalı */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
        </section>
    );
}