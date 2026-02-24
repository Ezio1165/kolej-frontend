"use client";

import React from "react";

/**
 * Bölüm başlıklarını standartlaştıran bileşen.
 */
export default function SectionHeader({ data }: any) {
    if (!data?.title) return null;

    return (
        <div className={`max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-12 ${data.centered ? 'text-center' : 'text-left'}`}>
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 tracking-tight mb-4 uppercase italic">
                {data.title}
            </h2>
            {data.subtitle && (
                <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    {data.subtitle}
                </p>
            )}
            <div className={`w-24 h-1.5 bg-blue-600 mt-6 rounded-full ${data.centered ? 'mx-auto' : ''}`}></div>
        </div>
    );
}
