"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";

/**
 * PageHero: Sayfa girişinde ekranın %70'ini kaplayan sade görsel.
 */
export default function PageHero({ data }: any) {
    // Strapi v5'te resim verisi farklı gelebilir, tüm ihtimalleri kontrol ediyoruz
    const rawUrl = data.image?.data?.attributes?.url || data.image?.data?.url || data.image?.url;
    const imgUrl = getStrapiMedia(rawUrl);

    // DEBUG: Tarayıcı konsolunda veriyi görelim
    useEffect(() => {
        console.log("PageHero Render Ediliyor. Veri:", data);
    }, [data]);

    if (!imgUrl) {
        return (
            <div className="w-full h-[40vh] bg-gray-100 flex items-center justify-center text-gray-400 italic">
                [ PageHero: Resim Yüklenmedi veya Veri Gelmedi ]
            </div>
        );
    }

    return (
        <section className=" relative w-full h-[80vh] min-h-[500px] overflow-hidden bg-[#e5e7eb]">
            <Image
                src={imgUrl}
                alt="Page header"
                fill
                className=" object-cover transition-transform duration-1000 scale-100 hover:scale-105"
                priority
            />

            {/* Şık bir derinlik katmanı (Görselin alt kısmını yumuşatır) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Opsiyonel: Eğer ilerde başlık eklemek istersen yerin hazır */}
            <div className="absolute inset-0 flex items-end pb-20 px-4 md:px-10 lg:px-20">
                <div className="w-24 h-1.5 bg-white/60 rounded-full animate-pulse"></div>
            </div>
        </section>
    );
}