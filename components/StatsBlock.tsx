"use client";

import React from "react";
import CountUpNumber from "./CountUpNumber";

interface StatItem {
    id: number;
    numberValue: number;
    suffix?: string;
    label: string;
}

interface StatsBlockProps {
    data: {
        title?: string;
        items: StatItem[];
    };
}

export default function StatsBlock({ data }: StatsBlockProps) {
    // Veri kontrolü
    if (!data?.items || data.items.length === 0) return null;

    return (
        // TASARIM DEĞİŞİKLİĞİ: 
        // - Arka plan çok açık mavi (bg-[#eef6ff]) olarak ayarlandı.
        // - Asimetrik kesim uygulanmadı, baştan sona düz iniyor.
        // - Yükseklik (padding) py-16'dan py-8'e düşürülerek yarı yarıya kısaltıldı.
        <section className="py-8 mt-10 mb-10 bg-[#eef6ff] text-gray-900 relative overflow-hidden rounded-[80px] md:rounded-[150px] border-y border-[#dbeafe]">

            {/* Arka plan deseni: Beyaz/Mavi zemin için çok hafif gri grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="lightGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#lightGridPattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 relative z-10">

                {/* Bölüm Başlığı */}
                {data.title && (
                    // text-xl md:text-2xl'den text-base md:text-lg'ye küçültüldü
                    <h2 className="text-base md:text-lg font-black text-center mb-6 text-blue-900 uppercase tracking-widest opacity-80">
                        {data.title}
                    </h2>
                )}

                {/* İstatistik Kartları: 3'lü dağılım (Sol - Orta - Sağ) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
                    {data.items.slice(0, 3).map((stat, idx) => (
                        <div
                            key={stat.id}
                            className={`
                flex flex-col items-center text-center group cursor-default
                ${idx === 0 ? 'md:items-start md:text-left' : ''} 
                ${idx === 2 ? 'md:items-end md:text-right' : ''}
              `}
                        >

                            {/* Sayı Bölümü (ÖLÇÜ KÜÇÜLTÜLDÜ) */}
                            {/* text-6xl md:text-8xl yerine text-4xl md:text-5xl kullanıldı */}
                            <div className="text-4xl md:text-5xl font-black mb-2 text-[#0c4a6e] tabular-nums tracking-tighter">
                                <CountUpNumber
                                    end={stat.numberValue}
                                    suffix={stat.suffix || ""}
                                    duration={2500}
                                />
                            </div>

                            {/* Dekoratif Mavi Çizgi (ÖLÇÜ KÜÇÜLTÜLDÜ) */}
                            <div className={`w-8 h-1 bg-blue-500 mb-2 rounded-full group-hover:w-14 transition-all duration-500 ease-out`}></div>

                            {/* Açıklama Metni (ÖLÇÜ KÜÇÜLTÜLDÜ) */}
                            {/* text-lg md:text-xl yerine text-sm md:text-base kullanıldı */}
                            <span className="text-gray-500 text-sm md:text-base font-bold uppercase tracking-wide">
                                {stat.label}
                            </span>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}