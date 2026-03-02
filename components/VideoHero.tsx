"use client";

import { useState, useRef, useEffect } from "react";
// Import yolu @/lib/strapi yerine göreceli yol olan ../lib/strapi olarak güncellendi
import { getStrapiMedia } from "../lib/strapi";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"] });

interface VideoHeroProps {
    data: {
        title?: string;
        video: any;
        poster: any;
    };
}

export default function VideoHero({ data }: VideoHeroProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Strapi'den gelen video ve poster URL'lerini güvenli bir şekilde alıyoruz
    const rawVideoUrl =
        data.video?.data?.attributes?.url ||
        data.video?.data?.url ||
        data.video?.url;

    const rawPosterUrl =
        data.poster?.data?.attributes?.url ||
        data.poster?.data?.url ||
        data.poster?.url;

    const videoUrl = getStrapiMedia(rawVideoUrl);
    const posterUrl = getStrapiMedia(rawPosterUrl);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const openModal = () => {
        if (videoRef.current) videoRef.current.pause();
        setIsPlaying(false);
        setIsModalOpen(true);
    };

    const closeModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    if (!videoUrl) return null;

    return (
        <>
            {/* ANA SECTION: Overlap kartının aşağı sarkabilmesi için overflow-visible bırakıldı. */}
            <section
                className="relative w-full h-[85vh] min-h-[600px] mb-64 cursor-pointer group"
                onClick={openModal}
            >
                {/* VİDEO MASKESİ: scale-105 olan videonun yatayda taşma yapmasını engeller. */}
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[40px] md:rounded-b-[80px] z-0">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms] ease-out"
                        src={videoUrl}
                        poster={posterUrl || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    {/* Karartma Katmanı */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                </div>

                {/* --- MERKEZİ OVERLAP KART (WELCOME) --- */}
                <div className="absolute bottom-0 left-1/2 z-30 w-full max-w-4xl -translate-x-1/2 translate-y-1/2 px-4">
                    <div className="relative bg-white/95 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center ring-1 ring-gray-100">

                        <span className={`inline-block mb-4 ${bitter.className} text-3xl md:text-2l font-bold tracking-[0.2em] text-blue-600 uppercase ${bitter.className}`}>
                            Welcome to BIS Campus
                        </span>

                        {data.title && (
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                {data.title}
                            </h1>
                        )}

                        <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
                                Discover a community dedicated to academic excellence and innovation.
                                Join us in shaping the future together.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Oynat/Durdur Butonu */}
                <button
                    onClick={togglePlay}
                    className="absolute bottom-20 right-4 md:right-10 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 hover:scale-110 transition-all text-white shadow-lg"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                    )}
                </button>
            </section>

            {/* --- VIDEO MODAL --- */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <video className="w-full h-full" src={videoUrl} autoPlay controls />
                    </div>
                </div>
            )}
        </>
    );
}