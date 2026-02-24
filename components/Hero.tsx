import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";

interface HeroProps {
    data: {
        id: number;
        title: string;
        subtitle: string;
        image?: {
            data?: {
                attributes?: {
                    url: string;
                    alternativeText?: string | null;
                };
                url?: string;
                alternativeText?: string | null;
            } | null;
        } | null;
    };
}

export default function Hero({ data }: HeroProps) {
    const imageData = data.image?.data;
    const rawUrl = imageData?.attributes?.url || imageData?.url;
    const imgUrl = getStrapiMedia(rawUrl || null);

    return (
        <header className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">

            <div className="absolute inset-0 z-0">
                {imgUrl ? (
                    <Image
                        src={imgUrl}
                        alt={imageData?.attributes?.alternativeText || "Hero Image"}
                        fill
                        className="object-cover bg-center"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-900" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-10 lg:px-40 flex flex-col items-center text-center">

                <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.033em] mb-6 drop-shadow-lg">
                    {data.title}
                </h1>

                {data.subtitle && (
                    <p className="text-gray-200 text-lg md:text-xl font-normal max-w-2xl mb-10 leading-relaxed drop-shadow-md">
                        {data.subtitle}
                    </p>
                )}

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/iletisim"
                        className="h-12 px-8 rounded-lg bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                        Apply Now
                        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    <Link
                        href="/hakkimizda"
                        className="h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-base font-bold transition-all flex items-center gap-2"
                    >
                        Learn More
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

        </header>
    );
}
