"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Users, ShieldCheck, LogIn } from 'lucide-react';
// Grainient bileşenini components klasöründen içeri aktarıyoruz
import Grainient from '@/components/Grainient';

// --- PORTAL VERİLERİ VE LİNKLERİ (Mavi/Turkuaz Temasına Uygun) ---
const PORTALS = [
    {
        id: 'student',
        title: 'Student Portal',
        subtitle: 'Access courses & grades',
        icon: <GraduationCap size={40} />,
        // Saf Mavi ve Gökyüzü Mavisi
        gradient: 'from-blue-400 to-blue-600',
        shadow: 'shadow-blue-500/30',
        bgImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
        description: 'Welcome back! Access your dashboard to view grades, schedule, and assignments.',
        targetUrl: 'https://student.college.com/login'
    },
    {
        id: 'parent',
        title: 'Parent Portal',
        subtitle: 'Monitor progress & events',
        icon: <Users size={40} />,
        // Turkuaz ve Camgöbeği (Cyan)
        gradient: 'from-cyan-400 to-teal-500',
        shadow: 'shadow-cyan-500/30',
        bgImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
        description: 'Stay connected with your child\'s education journey and school updates.',
        targetUrl: 'https://parent.college.com/login'
    },
    {
        id: 'staff',
        title: 'Staff Portal',
        subtitle: 'Administrative access',
        icon: <ShieldCheck size={40} />,
        // Derin Gökyüzü Mavisi ve İndigo
        gradient: 'from-sky-400 to-indigo-500',
        shadow: 'shadow-sky-500/30',
        bgImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&auto=format&fit=crop',
        description: 'Secure login for faculty and administration staff management.',
        targetUrl: 'https://staff.college.com/login'
    }
];

export default function LoginPage() {
    const [activePortal, setActivePortal] = useState<any>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

    // Kart Seçimi
    const handlePortalSelect = (portal: any, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setClickPos({ x: e.clientX, y: e.clientY });
        setActivePortal(portal);
        setTimeout(() => {
            setIsExpanded(true);
        }, 50);
    };

    // Geri Dönüş
    const handleBack = () => {
        setIsExpanded(false);
        setTimeout(() => {
            setActivePortal(null);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-teal-50 text-gray-900 font-sans overflow-hidden relative selection:bg-blue-200/50 flex items-center justify-center">

            {/* --- LİGHT GRAIN HAREKETLİ ARKA PLAN --- */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                <Grainient
                    color1="#f0fdfa" // Teal 50 (Arka plan rengiyle aynı, yumuşak geçiş)
                    color2="#ccfbf1" // Teal 100 (Biraz daha belirgin bir su yeşili)
                    color3="#99f6e4" // Teal 200 (Hareketin fark edilmesini sağlayan daha canlı ton)
                    timeSpeed={1.9}
                    colorBalance={0}
                    warpStrength={1}
                    warpFrequency={5}
                    warpSpeed={2}
                    warpAmplitude={50}
                    blendAngle={0}
                    blendSoftness={0.05}
                    rotationAmount={500}
                    noiseScale={2}
                    grainAmount={0.1}
                    grainScale={2}
                    grainAnimated={false}
                    contrast={1.5}
                    gamma={1}
                    saturation={1}
                    centerX={0}
                    centerY={0}
                    zoom={0.9}
                />
            </div>

            {/* SOL ÜST KÖŞE: Geri Dön Linki (Açık temaya uygun) */}
            <Link
                href="/"
                className="absolute top-8 left-8 z-30 flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-all group drop-shadow-sm"
            >
                <div className="p-2 rounded-full bg-white/40 border border-gray-200 group-hover:bg-white/70 transition-colors backdrop-blur-md">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-bold tracking-wide text-sm uppercase">Back to Home</span>
            </Link>

            {/* --- SAHNE 1: SEÇİM EKRANI --- */}
            <div className={`relative z-10 w-full max-w-7xl px-6 flex flex-col items-center transition-all duration-700 ${isExpanded ? 'scale-90 opacity-0 blur-sm pointer-events-none' : 'scale-100 opacity-100'}`}>

                {/* BAŞLIK: Açık temaya uygun koyu renk */}
                <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-16 tracking-tighter text-center drop-shadow-sm">
                    Log in as
                </h1>

                {/* Kartlar Grid'i */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {PORTALS.map((portal) => (
                        <button
                            key={portal.id}
                            onClick={(e) => handlePortalSelect(portal, e)}
                            /* TASARIM DEĞİŞİKLİĞİ:
                               Kart arka planı bg-white/40'tan bg-gray-200/60'a çekilerek biraz daha koyulaştırıldı.
                               Böylece beyaz zemin üzerinde çok daha belirgin duruyor.
                            */
                            className="group relative h-[420px] rounded-[40px] overflow-hidden border border-gray-300/60 bg-gray-200/60 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-4 hover:border-gray-300 hover:bg-gray-100/90 text-left p-10 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
                        >
                            {/* TASARIM DEĞİŞİKLİĞİ: Hover durumundaki ışıltı şiddeti opacity-5'ten opacity-30'a çıkarıldı */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                            {/* İkon */}
                            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${portal.gradient} flex items-center justify-center text-white shadow-xl ${portal.shadow} group-hover:scale-110 transition-transform duration-500`}>
                                {portal.icon}
                            </div>

                            {/* Yazılar (Koyu Gri Renklere Çekildi) */}
                            <div className="relative z-10">
                                <h3 className="text-4xl font-bold text-gray-900 mb-3 group-hover:translate-x-2 transition-transform tracking-tight">{portal.title}</h3>
                                <p className="text-gray-700 text-lg leading-snug transition-colors">{portal.subtitle}</p>
                            </div>

                            {/* Gizli Ok */}
                            <div className="absolute top-8 right-8 w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all transform translate-x-4 group-hover:translate-x-0">
                                <ArrowLeft size={28} className="rotate-180" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* --- SAHNE 2: DETAY / GİRİŞ EKRANI (Maskelenmiş) --- */}
            {activePortal && (
                <div
                    className="fixed inset-0 z-50 flex bg-white"
                    style={{
                        clipPath: isExpanded
                            ? `circle(150% at ${clickPos.x}px ${clickPos.y}px)`
                            : `circle(0px at ${clickPos.x}px ${clickPos.y}px)`,
                        transition: 'clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
                    }}
                >
                    {/* Seçim Ekranına Dön (Açık temaya uygun) */}
                    <button
                        onClick={handleBack}
                        className="absolute top-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full text-gray-900 font-bold transition-all group border border-gray-200 shadow-sm"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Choose Another</span>
                    </button>

                    {/* SOL TARAF: GİRİŞ BUTONU */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-center items-center p-12 bg-white text-gray-900 relative">
                        <div className={`w-full max-w-md text-center transition-all duration-700 delay-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                            <div className="mb-16">
                                <div className={`inline-flex p-6 rounded-[32px] bg-gradient-to-br ${activePortal.gradient} text-white mb-8 shadow-2xl shadow-gray-200 transform hover:scale-105 transition-transform duration-500`}>
                                    {React.cloneElement(activePortal.icon, { size: 72 })}
                                </div>
                                <h2 className="text-6xl font-black tracking-tighter mb-6 text-gray-900 leading-none">{activePortal.title}</h2>
                                <p className="text-xl text-gray-500 leading-relaxed font-medium">{activePortal.description}</p>
                            </div>

                            {/* DİNAMİK LİNK BUTONU */}
                            <Link
                                href={activePortal.targetUrl}
                                className={`
                            group relative w-full py-6 rounded-2xl text-white font-black text-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all overflow-hidden flex items-center justify-center
                            bg-gradient-to-r ${activePortal.gradient}
                        `}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    <LogIn size={32} />
                                    LOGIN
                                </span>
                                {/* Işıltı Efekti */}
                                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </Link>

                            <p className="mt-8 text-sm text-gray-400 font-medium">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                Secure System Online
                            </p>
                        </div>
                    </div>

                    {/* SAĞ TARAF: GÖRSEL */}
                    <div className="hidden lg:block w-7/12 relative overflow-hidden bg-gray-100">
                        <div className={`absolute inset-0 bg-gradient-to-br ${activePortal.gradient} mix-blend-multiply opacity-70 z-10`}></div>
                        <div className="absolute inset-0 bg-black/10 z-10"></div>

                        <img
                            src={activePortal.bgImage}
                            alt="Portal Background"
                            className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${isExpanded ? 'scale-105' : 'scale-125'}`}
                        />

                        <div className="absolute bottom-16 left-16 z-20 text-white max-w-xl">
                            <div className="h-2 w-24 bg-white mb-8 rounded-full"></div>
                            <h3 className="text-5xl font-bold leading-tight mb-6 drop-shadow-lg">"The beautiful thing about learning is that no one can take it away from you."</h3>
                            <p className="text-white/90 font-bold text-xl tracking-wide">— B.B. King</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}