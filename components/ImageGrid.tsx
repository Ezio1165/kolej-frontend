"use client";

import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";
import { SlidingLogoMarquee } from "./SlidingLogoMarquee";

interface ImageGridProps {
    data: {
        title?: string;
        items: any[];
    };
}

export default function ImageGrid({ data }: ImageGridProps) {
    // Veri kontrolü
    if (!data?.items || data.items.length === 0) return null;

    // Strapi verisini Marquee bileşeninin istediği formata çeviriyoruz
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
                // DEĞİŞİKLİK (ÇİZİME UYGUN BÜYÜTME): 
                // Mobilde w-32 h-20, Masaüstünde w-56 h-36 olarak devasa boyutlara çekildi.
                // Çizimdeki "Resimler" kutularının bölümü tam kaplaması sağlandı.
                <div className="relative w-32 h-20 md:w-56 md:h-36 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 flex items-center justify-center mix-blend-multiply">
                    {imgUrl ? (
                        <Image
                            src={imgUrl}
                            alt={item.title || "Partner Logo"}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <span className="text-[#0c4a6e] text-[10px] md:text-sm font-bold uppercase tracking-widest text-center">
                            {item.title}
                        </span>
                    )}
                </div>
            ),
        };
    });

    return (
        /* TASARIM DEĞİŞİKLİĞİ:
           - py-4: Üst ve alt boşluklar çok az bırakılarak bölüm yüksekliği kısaltıldı.
        */
        <section className="py-4 bg-[#ebf5ff] border-y border-[#dbeafe] overflow-hidden">
            <div className="max-w-full mx-auto max-h-[350px]">

                {data.title && (
                    // mb-2: Başlık ile resimler arasındaki boşluk minimuma indirildi.
                    <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 mb-2 text-left">
                        {/* KİLİT NOKTA: BAŞLIK PUNTOSU ARTIRILDI
                Eskiden "text-base md:text-lg" olan sınıf, %70 civarı artış için 
                "text-2xl md:text-4xl" olarak güncellendi.
            */}
                        <h2 className="text-2xl md:text-4xl font-black text-[#0c4a6e] tracking-tight uppercase opacity-90">
                            {data.title}
                        </h2>
                        <div className="w-8 h-1 bg-blue-500 mt-1.5 rounded-full"></div>
                    </div>
                )}

                <div className="w-full">
                    {/* DEĞİŞİKLİK: Resimler h-36 (144px) olduğu için bant yüksekliği tam sınırda kalacak şekilde 150px yapıldı. 
              gap="3rem" ile de resimler arası boşluk biraz daha sıkılaştı, tam çizimdeki gibi yan yana dizildiler. */}
                    <SlidingLogoMarquee
                        items={marqueeItems}
                        speed={40}
                        height="150px"
                        gap="3rem"
                        pauseOnHover={true}
                        showControls={false}
                    />
                </div>
            </div>
        </section>
    );
}