"use client";

import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";

export default function SingleImage({ data }: any) {
    const imgUrl = getStrapiMedia(data.image?.data?.attributes?.url || data.image?.data?.url || data.image?.url);
    const isFull = data.width === 'full';

    if (!imgUrl) return null;

    return (
        <div className={`py-12 ${isFull ? 'px-0 mb-20' : 'px-4 md:px-10 lg:px-20'}`}>
            <div
                className={`relative overflow-hidden shadow-2xl transition-all duration-500
          ${isFull ? 'w-full h-[70vh]' : 'aspect-video mx-auto rounded-[40px]'}
          ${data.width === 'contained' ? 'max-w-7xl' : ''}
          ${data.width === 'centered' ? 'max-w-4xl' : ''}
        `}
            >
                <Image
                    src={imgUrl}
                    alt="Visual showcase"
                    fill
                    className="object-cover"
                    priority={isFull}
                />
                {/* Full modunda hafif bir derinlik overlay'i */}
                {isFull && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />}
            </div>
        </div>
    );
}
