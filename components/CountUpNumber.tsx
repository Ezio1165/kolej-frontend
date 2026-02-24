"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
}

export default function CountUpNumber({ end, duration = 2000, suffix = "" }: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [inView, setInView] = useState(false);

    // Ekrana girip girmediğini kontrol eden Intersection Observer
    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect(); // Animasyon sadece bir kez çalışsın
                }
            },
            { threshold: 0.1 } // Elemanın %10'u göründüğünde tetikle
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    // Animasyonu başlatan efekt
    useEffect(() => {
        if (!inView) return;

        let startTimestamp: number | null = null;

        // Güvenlik: Strapi'den string gelme ihtimaline karşı sayıya çeviriyoruz
        const finalNumber = parseInt(end as any, 10) || 0;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // easeOutExpo formülü (hızlı başlayıp yavaşlayarak durması için)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(Math.floor(easeProgress * finalNumber));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [inView, end, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}
