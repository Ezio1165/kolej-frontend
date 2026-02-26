"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper Stilleri
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

/** * Metin dosyasından alınan yeni pastel tema renkleri:
 * Rose, Teal, Indigo, Amber, Sky
 */
const VALUE_CARD_THEMES = [
    {
        bg: "bg-rose-50",
        titleColor: "text-rose-700",
        textColor: "text-rose-900",
        borderColor: "border-rose-100",
        hoverShadow: "hover:shadow-rose-200/50"
    },
    {
        bg: "bg-teal-50",
        titleColor: "text-teal-700",
        textColor: "text-teal-900",
        borderColor: "border-teal-100",
        hoverShadow: "hover:shadow-teal-200/50"
    },
    {
        bg: "bg-indigo-50",
        titleColor: "text-indigo-700",
        textColor: "text-indigo-900",
        borderColor: "border-indigo-100",
        hoverShadow: "hover:shadow-indigo-200/50"
    },
    {
        bg: "bg-amber-50",
        titleColor: "text-amber-700",
        textColor: "text-amber-900",
        borderColor: "border-amber-100",
        hoverShadow: "hover:shadow-amber-200/50"
    },
    {
        bg: "bg-sky-50",
        titleColor: "text-sky-700",
        textColor: "text-sky-900",
        borderColor: "border-sky-100",
        hoverShadow: "hover:shadow-sky-200/50"
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

                {/* Başlık Bölümü (Büyütülmüş ve etiketsiz hali korundu) */}
                <div className="mb-8 text-left">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
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
                            // Gönderdiğin renklere göre temayı seçiyoruz
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
                                        <h3 className={`text-2xl font-extrabold mb-4 tracking-tight ${theme.titleColor}`}>
                                            {item.title}
                                        </h3>

                                        {/* Açıklama */}
                                        <div className="overflow-y-auto pr-2 custom-scrollbar">
                                            <p className={`text-base leading-relaxed font-semibold opacity-90 ${theme.textColor}`}>
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Dekoratif Hafif Gradyan */}
                                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
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

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.05);
          border-radius: 4px;
        }
      `}</style>
        </section>
    );
}