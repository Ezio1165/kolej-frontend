"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bitter } from "next/font/google";
// Strapi medya fonksiyonunu içeri aktarıyoruz
import { getStrapiMedia } from "@/lib/strapi";

const bitter = Bitter({ subsets: ["latin"] });

interface NavbarProps {
    logoUrl: string | null;
    siteName: string;
    menuMap: Record<string, any[]>;
}

// ─── Navbar İçin Özel Wave Animasyonlu Link Bileşeni (Ana Menü) ──────────────
function WaveNavLink({
    href,
    children,
    isSolid,
    onMouseEnter
}: {
    href: string;
    children: string;
    isSolid: boolean;
    onMouseEnter?: () => void;
}) {
    return (
        <Link
            href={href}
            className="inline-flex gap-[0.5px] group relative py-2"
            onMouseEnter={onMouseEnter}
        >
            {children.split("").map((char, i) => (
                <span
                    key={i}
                    className={`inline-block transition-all duration-300 font-bold text-sm tracking-wide ${isSolid ? "text-gray-800" : "text-white"
                        }`}
                    style={{ transitionDelay: `${i * 30}ms` }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = "translateY(-4px)";
                        el.style.color = isSolid ? "#2aa0f5" : "#ffd166";
                        setTimeout(() => {
                            el.style.transform = "translateY(0)";
                            el.style.color = "";
                        }, 300);
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
            <span className={`absolute bottom-1 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full ${isSolid ? "bg-[#2aa0f5]" : "bg-white"
                }`}></span>
        </Link>
    );
}

// ─── Mega Menü İçin Özel Wave Animasyonlu ve İkonlu Link Bileşeni ─────────────
function MegaMenuWaveLink({
    href,
    iconNode,
    label
}: {
    href: string;
    iconNode: React.ReactNode;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50/50 transition-all border border-transparent hover:border-blue-100/50"
        >
            {/* İkon Alanı */}
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center group-hover:bg-white group-hover:border-blue-200 group-hover:shadow-sm transition-all duration-300">
                {iconNode}
            </div>

            {/* Metin ve Alt Çizgi Alanı */}
            <div className="relative inline-flex gap-[0.5px] py-1">
                {label.split("").map((char, i) => (
                    <span
                        key={i}
                        className="inline-block transition-all duration-300 font-bold text-gray-800 text-base group-hover:text-[#2aa0f5]"
                        onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(-4px)";
                            // Zıplayan harf rengi vurgu için sarı/altın tonu yapıldı
                            el.style.color = "#ffd166";
                            setTimeout(() => {
                                el.style.transform = "translateY(0)";
                                el.style.color = "";
                            }, 300);
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
                {/* Alt Çizgi Efekti */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2aa0f5] transition-all duration-500 group-hover:w-full"></span>
            </div>
        </Link>
    );
}

// ─── Ana Navbar Bileşeni ──────────────────────────────────────────────────────
export default function Navbar({ logoUrl, siteName, menuMap }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const pathname = usePathname();

    const currentPath = pathname || "";
    const isHomePage = currentPath === "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isSolid = scrolled || !isHomePage;

    const navbarClasses = isSolid
        ? "bg-white/95 backdrop-blur-md border-b border-gray-100 text-[#0d121b] shadow-sm py-1"
        : "bg-transparent border-b border-transparent text-white py-4";

    const loginBtnClasses = isSolid
        ? "text-[#2aa0f5] border-[#2aa0f5] hover:bg-[#2aa0f5] hover:text-white"
        : "text-white border-white/40 hover:bg-white/10";

    const navStructure = [
        { title: "Home", slug: null, href: "/" },
        { title: "School", slug: "school", href: "/school" },
        { title: "Student Life", slug: "student-life", href: "/student-life" },
        { title: "Academic", slug: "academic", href: "/academic" },
        { title: "Admissions", slug: "admissions", href: "/admissions" },
    ];

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${navbarClasses} ${bitter.className}`}
            onMouseLeave={() => setHoveredMenu(null)}
        >
            <div className="px-4 md:px-10 lg:px-20 flex justify-center relative">
                <div className="flex w-full max-w-[1400px] items-center justify-between min-h-[4rem] transition-all duration-500">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-4 cursor-pointer group z-50">
                        {logoUrl ? (

                            <Image
                                src={logoUrl}
                                alt={siteName}
                                width={600}
                                height={200}
                                className={`w-auto object-contain origin-left transition-all duration-500 ease-in-out ${isSolid ? "h-10" : "h-14 md:h-20"
                                    }`}
                                priority
                            />
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 ${isSolid ? "text-blue-600" : "text-white"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.182-.311a51.416 51.416 0 019.902-3.912l.231-1.337A60.651 60.651 0 0011.7 2.805z" />
                                        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                    </svg>
                                </div>
                                <h2 className={`text-xl font-bold tracking-tight hidden sm:block ${isSolid ? "text-blue-600" : "text-white"}`}>
                                    {siteName}
                                </h2>
                            </div>
                        )}
                    </Link>

                    <div className="hidden lg:flex items-center gap-6 xl:gap-10 h-full ml-auto mr-8">
                        {navStructure.map((item) => (
                            <div key={item.title} className="flex items-center h-full">
                                <WaveNavLink
                                    href={item.href}
                                    isSolid={isSolid}
                                    onMouseEnter={() => item.slug && setHoveredMenu(item.slug)}
                                >
                                    {item.title}
                                </WaveNavLink>
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4 z-50">
                        <Link
                            href="/login"
                            className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 transition-all text-xs font-black uppercase tracking-widest ${loginBtnClasses}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Login
                        </Link>
                    </div>

                    <div className="lg:hidden flex items-center z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 transition-colors ${isSolid ? "text-[#2aa0f5]" : "text-white"}`}
                        >
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* MEGA MENU DROPDOWN */}
                {hoveredMenu && menuMap[hoveredMenu] && menuMap[hoveredMenu].length > 0 && (
                    <div
                        className="absolute top-full left-0 w-full pt-4 animate-in fade-in slide-in-from-top-2 duration-300"
                        onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mx-auto w-[90%] max-w-5xl relative overflow-hidden flex flex-col lg:flex-row gap-10">

                            {/* SOL TARAF: Featured */}
                            <div className="w-full lg:w-1/3 bg-gradient-to-br from-[#f8fbff] to-[#eef6ff] rounded-2xl p-8 border border-blue-50 flex flex-col justify-between relative overflow-hidden group/featured">
                                <div className="relative z-10">
                                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest rounded-full mb-5 shadow-sm">
                                        Featured
                                    </div>
                                    <h3 className="text-2xl font-black text-[#0c4a6e] mb-3 leading-tight tracking-tight">
                                        2025–26 {navStructure.find(n => n.slug === hoveredMenu)?.title} Guide
                                    </h3>
                                    <p className="text-[#0c4a6e]/70 font-medium text-sm leading-relaxed mb-6">
                                        Explore modern academic pathways and our vibrant campus community dedicated to excellence.
                                    </p>
                                </div>
                                <Link href={navStructure.find(n => n.slug === hoveredMenu)?.href || "#"} className="relative z-10 inline-flex items-center font-bold text-blue-600 hover:text-blue-800 transition-colors gap-2 w-max">
                                    Learn More <span className="text-xl group-hover/featured:translate-x-1 transition-transform">→</span>
                                </Link>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"></div>
                            </div>

                            {/* SAĞ TARAF: Resimli İkon Grid ve Wave Animasyonlu Linkler */}
                            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                                {menuMap[hoveredMenu].map((link: any, idx: number) => {
                                    const iconData = link.icon?.data || link.icon || link.logo?.data || link.logo;
                                    const rawIconUrl = iconData?.attributes?.url || iconData?.url;
                                    const iconUrl = getStrapiMedia(rawIconUrl);

                                    // İkonun React Node olarak hazırlanması
                                    const IconNode = iconUrl ? (
                                        <Image
                                            src={iconUrl}
                                            alt={link.label}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform"
                                        />
                                    ) : (
                                        <span className="text-2xl">🎓</span>
                                    );

                                    return (
                                        <MegaMenuWaveLink
                                            key={idx}
                                            href={link.url || "#"}
                                            iconNode={IconNode}
                                            label={link.label}
                                        />
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                )}
            </div>

            {/* MOBİL MENÜ */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl max-h-[80vh] overflow-y-auto text-gray-900">
                    <div className="px-6 py-8 space-y-2">
                        {navStructure.map((item) => (
                            <div key={item.title}>
                                <Link
                                    href={item.href}
                                    onClick={() => !item.slug && setIsOpen(false)}
                                    className="flex justify-between items-center px-4 py-3 text-lg font-bold text-gray-800 hover:text-[#2aa0f5] hover:bg-blue-50 rounded-xl transition-colors"
                                >
                                    {item.title}
                                </Link>
                                {item.slug && menuMap[item.slug] && (
                                    <div className="pl-8 pr-4 py-2 space-y-2 border-l-2 border-blue-100 ml-4">
                                        {menuMap[item.slug].map((link: any, idx: number) => {
                                            const iconData = link.icon?.data || link.icon || link.logo?.data || link.logo;
                                            const rawIconUrl = iconData?.attributes?.url || iconData?.url;
                                            const iconUrl = getStrapiMedia(rawIconUrl);

                                            return (
                                                <Link
                                                    key={idx}
                                                    href={link.url || "#"}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-[#2aa0f5] py-2"
                                                >
                                                    {iconUrl ? (
                                                        <div className="w-6 h-6 relative rounded overflow-hidden shrink-0">
                                                            <Image src={iconUrl} alt={link.label} fill className="object-contain" />
                                                        </div>
                                                    ) : (
                                                        <span>•</span>
                                                    )}
                                                    {link.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-4 mt-6 border-t border-gray-100 text-[#2aa0f5] font-black uppercase tracking-wider text-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Portal Login
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}