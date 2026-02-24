"use client";

import React, { useRef, useState, useMemo } from "react";
import { cn } from "../lib/utils";
import { Pause, Play } from "lucide-react";

export interface SlidingLogoMarqueeItem {
    id: string;
    content: React.ReactNode;
    href?: string;
}

export interface SlidingLogoMarqueeProps {
    items: SlidingLogoMarqueeItem[];
    speed?: number;
    pauseOnHover?: boolean;
    enableBlur?: boolean;
    blurIntensity?: number;
    height?: string;
    width?: string;
    gap?: string;
    scale?: number;
    direction?: "horizontal" | "vertical";
    autoPlay?: boolean;
    backgroundColor?: string;
    showGridBackground?: boolean;
    className?: string;
    onItemClick?: (item: SlidingLogoMarqueeItem) => void;
    enableSpillEffect?: boolean;
    animationSteps?: number;
    showControls?: boolean;
}

export function SlidingLogoMarquee({
    items,
    speed = 10, // Hız ayarı (Daha düşük sayı = Daha yavaş, Daha yüksek = Daha hızlı değil, süre mantığı ters işliyor)
    pauseOnHover = true,
    enableBlur = true,
    blurIntensity = 1,
    height = "120px", // İstediğin kısa yükseklik
    width = "100%",
    gap = "4rem",
    scale = 1,
    direction = "horizontal",
    autoPlay = true,
    backgroundColor = 'transparent',
    showGridBackground = false,
    className,
    onItemClick,
    enableSpillEffect = false,
    animationSteps = 4, // Blur kademesi
    showControls = false, // Kontrol butonlarını gizledim, daha temiz görünmesi için
}: SlidingLogoMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    // Sonsuz döngü için öğeleri çoğaltıyoruz (3 set yaparak boşluksuz akış sağlıyoruz)
    const duplicatedItems = useMemo(() => [...items, ...items, ...items], [items]);

    const handleItemClick = (item: SlidingLogoMarqueeItem) => {
        if (item.href) {
            // Link varsa yönlendir
            window.location.href = item.href;
        }
        onItemClick?.(item);
    };

    const togglePlayState = () => {
        setIsPlaying(!isPlaying);
    };

    const blurDivs = Array.from({ length: animationSteps }, (_, index) => (
        <div key={index} style={{ "--index": index } as React.CSSProperties} className="absolute inset-0 z-[var(--index)]" />
    ));

    const itemRenderer = (item: SlidingLogoMarqueeItem, index: number, uniqueKey: string) => (
        <li
            key={`${item.id}-${index}-${uniqueKey}`}
            className={cn(
                "sliding-marquee-item text-foreground",
                "grid place-items-center cursor-pointer transition-transform duration-300 ease-in-out",
                "hover:scale-110 focus:outline-none", // Hover efekti
            )}
            onClick={() => handleItemClick(item)}
            role="button"
            tabIndex={0}
        >
            <div className="h-full w-auto flex items-center justify-center relative">
                {item.content}
            </div>
        </li>
    );

    return (
        <>
            <style>
                {`
        .sliding-marquee-container {
          --speed: ${speed};
          --gap: ${gap};
          --blur: ${blurIntensity};
          --blurs: ${animationSteps};
          /* Animasyon Süresi: speed değeri saniye cinsinden döngü süresini belirler */
          --duration: ${speed}s; 
        }

        @keyframes marquee-horizontal {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); } /* 3 kopya olduğu için 1/3 oranında kaydırıyoruz */
        }
        
        .sliding-marquee-list {
          display: flex;
          flex-shrink: 0; 
          min-width: 100%;
          gap: var(--gap);
          height: 100%;
          align-items: center;
          list-style-type: none;
          padding-inline: 0;
          margin: 0;
          pointer-events: auto;
          animation: marquee-horizontal var(--duration) linear infinite;
          animation-play-state: ${isPlaying ? 'running' : 'paused'};
          transform: translateZ(0);
          will-change: transform;
        }

        .sliding-marquee-item {
          /* Logo kutu boyutları */
          min-width: 120px; 
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .sliding-marquee-resizable {
          overflow: hidden;
          scale: var(--scale);
          width: 100%;
          height: ${height};
          position: relative;
        }

        .sliding-marquee-inner {
          height: 100%;
          width: 100%;
          position: relative;
          /* Kenarlarda yumuşak geçiş maskesi */
          mask: linear-gradient(90deg, transparent, black 10% 90%, transparent);
          display: flex; 
          pointer-events: none;
        }
        `}
            </style>

            <div
                ref={containerRef}
                className={cn("sliding-marquee-container relative mx-auto", className)}
                style={{ width, background: backgroundColor, scale: scale }}
                onMouseEnter={() => pauseOnHover && setIsPlaying(false)}
                onMouseLeave={() => pauseOnHover && setIsPlaying(true)}
            >
                {showGridBackground && (
                    <div className="absolute inset-0 pointer-events-none opacity-5">
                        <div className="h-full w-full bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]" />
                    </div>
                )}

                <div className="sliding-marquee-resizable">
                    <div className="sliding-marquee-inner">
                        <ul className="sliding-marquee-list">
                            {duplicatedItems.map((item, index) => itemRenderer(item, index, `item-${index}`))}
                        </ul>
                    </div>
                </div>

                {showControls && (
                    <button
                        onClick={togglePlayState}
                        className="absolute bottom-2 right-2 z-10 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                )}
            </div>
        </>
    );
}