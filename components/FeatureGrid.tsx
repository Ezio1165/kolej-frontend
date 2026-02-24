"use client";

import React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";

/**
 * İkonlu maddelerin 3'lü veya 4'lü tablo şeklinde dizildiği bileşen.
 */
export default function FeatureGrid({ data }: any) {
    if (!data?.items || data.items.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.items.map((item: any, idx: number) => {
                        const iconUrl = getStrapiMedia(item.icon?.data?.attributes?.url || item.icon?.data?.url || item.icon?.url);
                        return (
                            <div key={idx} className="flex flex-col items-start p-8 rounded-3xl bg-blue-50/50 border border-blue-100/50 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-2 group">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 transition-colors">
                                    {iconUrl ? (
                                        <Image src={iconUrl} alt={item.title} width={32} height={32} className="group-hover:brightness-0 group-hover:invert transition-all" />
                                    ) : (
                                        <span className="text-blue-600 font-bold group-hover:text-white">{idx + 1}</span>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
