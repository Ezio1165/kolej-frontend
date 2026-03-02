"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getStrapiMedia } from "@/lib/strapi";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"] });

interface SliderCard {
    id: number;
    title: string;
    url?: string;
    image: any;
}

interface ImageSliderProps {
    data: {
        title?: string;
        cards: SliderCard[];
    };
}

export default function ImageSlider({ data }: ImageSliderProps) {
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    if (!data?.cards || data.cards.length === 0) return null;

    return (
        <section className="mt-12 mb-12 py-24 bg-[#e8f4ff] relative overflow-hidden rounded-l-[80px] md:rounded-l-[150px] w-[98%] ml-auto shadow-sm border-l border-[#dbeafe]">

            {/* Başlığın ve içeriğin kaybolmaması için z-index değeri z-20 yapıldı */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-20">

                {/* Bölüm Başlığı (Eğer Strapi'den gelmezse diye varsayılan bir metin eklendi) */}
                <div className="mb-14 text-left relative z-30">
                    <h2 className={`text-4xl md:text-5xl ${bitter.className} font-black text-[#0c4a6e] tracking-wide drop-shadow-sm`}>
                        {data.title || "Where would you like to explore?"}
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
                </div>

                {/* Slider Alanı */}
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        navigation={{
                            prevEl,
                            nextEl,
                        }}
                        breakpoints={{
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            /* KİLİT NOKTA 1: Masaüstünde tam olarak 4 kart görünmesi sağlanıyor. */
                            1024: { slidesPerView: 4 },
                        }}
                        /* KİLİT NOKTA 2: '!overflow-visible' sınıfı KALDIRILDI. 
                           Böylece kaydırıcının dışına (sağa/sola) taşan 5. kartlar tamamen gizlenir,
                           sadece belirlenen 4 kart ekranda kalır. 
                        */
                        className="pb-12"
                    >
                        {data.cards.map((card) => {
                            const imgUrl = getStrapiMedia(
                                card.image?.data?.attributes?.url ||
                                card.image?.data?.url ||
                                card.image?.url
                            );

                            const CardContent = () => (
                                // KART ZEMİNİ: bg-white yapıldı ki resim saydamlaşınca arkadan beyazlık vurup mat bir görüntü versin.
                                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={card.title || "Explore image"}
                                            fill
                                            className="object-cover grayscale opacity-35 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-300">
                                            No Image
                                        </div>
                                    )}

                                    {/* KART KARARTMASI: Başlangıçta görünmez (opacity-0). Sadece hover olunca yazının okunması için alttan belirir. */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/90 via-[#0c4a6e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                                    {/* KART BAŞLIĞININ GÖRÜNÜRLÜĞÜ 
                      - Resimdeki referansa uyularak 'font-serif' eklendi (Tırnaklı kurumsal font).
                      - Başlangıçta zemin beyaz/mat olduğu için yazı RENGİ LACİVERT (text-[#0c4a6e]).
                      - Üzerine gelindiğinde zemin karardığı için yazı RENGİ BEYAZ (group-hover:text-white) oluyor.
                  */}
                                    <h3 className="absolute bottom-6 left-6 right-6 font-serif font-bold text-2xl md:text-3xl leading-tight z-20 transition-colors duration-500 text-[#0c4a6e] group-hover:text-white">
                                        {card.title}
                                    </h3>
                                </div>
                            );

                            return (
                                <SwiperSlide key={card.id}>
                                    {card.url ? (
                                        <Link href={card.url} className="block">
                                            <CardContent />
                                        </Link>
                                    ) : (
                                        <CardContent />
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* SAĞ ALT NAVİGASYON OKLARI */}
                    <div className="absolute -bottom-16 right-4 flex gap-4 z-30">
                        <button
                            ref={(node) => setPrevEl(node)}
                            className="w-12 h-12 rounded-full border border-blue-300 bg-white/80 backdrop-blur-sm flex items-center justify-center text-blue-700 hover:bg-white hover:border-blue-400 hover:scale-105 transition-all shadow-sm focus:outline-none"
                            aria-label="Previous"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            ref={(node) => setNextEl(node)}
                            className="w-12 h-12 rounded-full border border-blue-300 bg-white/80 backdrop-blur-sm flex items-center justify-center text-blue-700 hover:bg-white hover:border-blue-400 hover:scale-105 transition-all shadow-sm focus:outline-none"
                            aria-label="Next"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}