"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";
import { useEffect, useState } from "react";

// Swiper Kütüphanesi
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";

// Swiper Stilleri
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonLink?: string;
    image: any;
}

interface HeroSliderProps {
    data: {
        slides: Slide[];
    };
}

export default function HeroSlider({ data }: HeroSliderProps) {
    // Navigation State for Swiper
    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

    // Debug log
    useEffect(() => {
        if (data) {
            console.log("HeroSlider Data:", JSON.stringify(data, null, 2));
        }
    }, [data]);

    if (!data.slides || data.slides.length === 0) return null;

    return (
        <div className="relative w-full h-[95vh] min-h-[600px] group pb-20 bg-gray-900">
            <Swiper
                modules={[Navigation, Autoplay, EffectFade, Pagination]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl,
                    nextEl,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                loop={true}
                className="h-full w-full"
            >
                {data.slides.map((slide, index) => {
                    const rawUrl =
                        slide.image?.data?.attributes?.url ||
                        slide.image?.data?.url ||
                        slide.image?.url ||
                        slide.image?.[0]?.url;

                    const imgUrl = getStrapiMedia(rawUrl);

                    return (
                        <SwiperSlide key={slide.id} className="relative h-full w-full bg-gray-900">
                            <div className="absolute inset-0 select-none">
                                {imgUrl ? (
                                    <Image
                                        src={imgUrl}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center">
                                        <p className="text-white text-sm">Image not found</p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                            </div>

                            <div className="relative z-10 h-full container mx-auto px-4 md:px-10 lg:px-40 flex flex-col items-center justify-center text-center">
                                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 drop-shadow-lg">
                                    {slide.title}
                                </h1>

                                {slide.subtitle && (
                                    <p className="text-gray-200 text-lg md:text-xl font-normal max-w-2xl mb-10 leading-relaxed drop-shadow-md">
                                        {slide.subtitle}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-4 justify-center">
                                    {slide.buttonText && slide.buttonLink && (
                                        <Link
                                            href={slide.buttonLink}
                                            className="h-12 px-8 rounded-lg bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                                        >
                                            {slide.buttonText}
                                            <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    )}

                                    <Link
                                        href="/iletisim"
                                        className="h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-base font-bold transition-all flex items-center gap-2"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Custom SVG Arrows */}
            <button
                ref={(node) => setPrevEl(node)}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer hover:bg-primary hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous Slide"
            >
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                ref={(node) => setNextEl(node)}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer hover:bg-primary hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next Slide"
            >
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70 z-20">
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    );
}
