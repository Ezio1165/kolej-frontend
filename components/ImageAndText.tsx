"use client";

import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ImageAndText({ data }: any) {
    const imgUrl = getStrapiMedia(data.image?.data?.attributes?.url || data.image?.data?.url || data.image?.url);

    // Konumlandırma Mantığı
    const pos = data.imagePosition || 'left';

    // Container Sınıfları
    const containerClasses = {
        left: "flex-col md:flex-row items-center",
        right: "flex-col md:flex-row-reverse items-center",
        top: "flex-col items-center text-center",
        bottom: "flex-col-reverse items-center text-center"
    }[pos as 'left' | 'right' | 'top' | 'bottom'];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className={`max-w-7xl mx-auto px-4 md:px-10 lg:px-20 flex ${containerClasses} gap-12 md:gap-16`}>
                {/* Resim Alanı */}
                <div className={`w-full ${['top', 'bottom'].includes(pos) ? 'max-w-4xl' : 'md:w-1/2'}`}>
                    {imgUrl ? (
                        <div className={`relative aspect-video rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-gray-100`}>
                            <Image
                                src={imgUrl}
                                alt="Section visual content"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    ) : (
                        <div className="aspect-video bg-gray-100 rounded-[40px] flex items-center justify-center text-gray-400">
                            Image not uploaded
                        </div>
                    )}
                </div>

                {/* Metin Alanı */}
                <div className={`w-full ${['top', 'bottom'].includes(pos) ? 'max-w-4xl' : 'md:w-1/2'}`}>
                    <div className="prose prose-lg prose-blue max-w-none prose-headings:text-blue-900 prose-p:text-gray-600">
                        {data.content && <BlocksRenderer content={data.content} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
