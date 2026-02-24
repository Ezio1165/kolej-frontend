"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number; // Opsiyonel gecikme süresi
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 80 // 60px aşağıdan başlasın
            }}
            whileInView={{
                opacity: 1,
                y: 0 // Orijinal yerine gelsin
            }}
            viewport={{
                once: false, // Sadece bir kere çalışsın (yukarı çıkıp inince tekrar oynamasın)
                margin: "-100px" // Elemanın %10-20'si göründüğünde başlasın
            }}
            transition={{
                duration: 1, // 0.8 saniye sürsün
                ease: [0.21, 0.47, 0.32, 0.98], // Yumuşak "ease-out" efekti
                delay: delay
            }}
            className="w-full" // Genişlik sorunu olmaması için
        >
            {children}
        </motion.div>
    );
}