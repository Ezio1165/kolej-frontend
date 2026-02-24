"use client";

import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// Tarih Formatlayıcılar
const getMonthName = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { month: "short" });
const getDayNumber = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { day: "2-digit" });
const getFullDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

interface NewsCarouselProps {
    data: any[];
    type: "events" | "announcements" | "news";
}

export default function NewsCarousel({ data, type }: NewsCarouselProps) {
    if (!data || data.length === 0) {
        return <div className="text-gray-500 text-sm py-4">No content available.</div>;
    }

    // Slider Ayarları
    const isAnnouncement = type === "announcements";

    return (
        <div className="w-full relative group">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                loop={true} // Sonsuz döngü
                autoplay={{
                    delay: 3500, // 3.5 saniyede bir kay
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Mouse üzerine gelince dur
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                breakpoints={{
                    640: { slidesPerView: 2 }, // Mobilde 2
                    1024: { slidesPerView: 3 }, // Masaüstünde 3
                }}
                className="pb-12" // Pagination için alt boşluk
            >
                {data.map((item) => {
                    const imgUrl = getStrapiMedia(item.cover?.url);
                    const date = item.publishedAt || item.createdAt;

                    return (
                        <SwiperSlide key={item.id} className="h-auto">
                            <Link href={`/haberler/${item.slug}`} className="block h-full">

                                {/* --- TASARIM 1: ETKİNLİKLER VE HABERLER (Resimli Kart) --- */}
                                {!isAnnouncement && (
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
                                        <div className="relative h-52 w-full bg-gray-200 overflow-hidden">
                                            {imgUrl ? (
                                                <Image
                                                    src={imgUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                                    <span className="text-4xl">🖼️</span>
                                                </div>
                                            )}
                                            {/* Tarih Etiketi */}
                                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-900 shadow-sm z-10">
                                                {getFullDate(date)}
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="mb-2">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${type === 'events' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {type === 'events' ? 'Event' : 'News'}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                                                {item.title}
                                            </h4>
                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors gap-1">
                                                Read More
                                                {/* SVG Ok İkonu */}
                                                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- TASARIM 2: DUYURULAR (Sade Metin Kartı) --- */}
                                {isAnnouncement && (
                                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 h-full flex flex-col group relative overflow-hidden">
                                        {/* Sol Kenar Çizgisi */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 group-hover:w-2 transition-all"></div>

                                        <div className="flex gap-4 items-start mb-4">
                                            {/* Tarih Kutusu */}
                                            <div className="shrink-0 w-14 h-14 bg-blue-50 text-blue-800 rounded-lg flex flex-col items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <span className="text-[10px] uppercase font-bold tracking-wider">{getMonthName(date)}</span>
                                                <span className="text-2xl font-black leading-none">{getDayNumber(date)}</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Announcement</span>
                                                <span className="block text-xs text-gray-500 mt-0.5">{new Date(date).getFullYear()}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-700 leading-snug line-clamp-3 mb-4">
                                            {item.title}
                                        </h4>

                                        <div className="mt-auto flex justify-end">
                                            <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Details
                                                {/* SVG Chevron İkonu */}
                                                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                )}

                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
