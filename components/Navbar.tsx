"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
    logoUrl: string | null;
    siteName: string;
    menuMap: Record<string, any[]>;
}

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
        ? "bg-[#f8f9fc]/95 backdrop-blur-md border-b border-[#e7ebf3] text-[#0d121b] shadow-sm py-2"
        : "bg-transparent border-b border-transparent text-white py-4";

    const linkClasses = isSolid
        ? "text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors py-2"
        : "text-white/90 hover:text-white font-medium text-sm transition-colors py-2";

    // Login butonu stilleri
    const loginBtnClasses = isSolid
        ? "text-gray-700 hover:text-blue-600 border-gray-300 hover:bg-blue-50"
        : "text-white/90 hover:text-white border-white/40 hover:bg-white/10";

    // ANA MENÜ YAPISI
    const navStructure = [
        { title: "Home", slug: null, href: "/" },
        { title: "About", slug: "about", href: "/about" },
        { title: "Academic", slug: "academic", href: "#" },
        { title: "Student Life", slug: "student-life", href: "#" },
        { title: "Learning", slug: "learning", href: "/programs" },
        { title: "Admissions", slug: "admissions", href: "#" },
    ];

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${navbarClasses}`}
            onMouseLeave={() => setHoveredMenu(null)}
        >
            <div className="px-4 md:px-10 lg:px-20 flex justify-center relative">
                {/* KİLİT NOKTA 1: h-16 (sabit yükseklik) kaldırılıp min-h-[4rem] yapıldı. Böylece logo büyüdüğünde menü taşmaz. */}
                <div className="flex w-full max-w-[1400px] items-center justify-between min-h-[4rem] transition-all duration-500">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-4 cursor-pointer group z-50">
                        {logoUrl ? (
                            /* KİLİT NOKTA 2: Logo Sınırları Kaldırıldı
                               width ve height değerleri çok yüksek tutularak kalite korundu.
                               Asıl boyutu class içindeki "h-..." komutları belirliyor.
                               - isSolid (Aşağı kaydırıldığında): h-10 (Şuanki en küçük hali)
                               - Sayfa en üstteyken: md:h-20 (Tam %100 daha büyük, maks ölçek)
                            */
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

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex items-center gap-5 ml-auto h-full">
                        {navStructure.map((item) => (
                            <div key={item.title} className="flex items-center h-full">
                                {item.title === "Admissions" && (
                                    <Link
                                        href="/login"
                                        className={`flex items-center gap-2 px-3 py-1 mr-2 rounded-full border transition-all text-[11px] font-bold uppercase tracking-widest ${loginBtnClasses}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                        </svg>
                                        Login
                                    </Link>
                                )}

                                <div
                                    className="relative h-full flex items-center"
                                    onMouseEnter={() => item.slug && setHoveredMenu(item.slug)}
                                >
                                    <Link href={item.href} className={`${linkClasses} relative group flex items-center gap-1`}>
                                        {item.title}
                                        {item.slug && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isSolid ? "bg-blue-600" : "bg-white"}`}></span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MOBİL MENÜ BUTONU */}
                    <div className="lg:hidden flex items-center z-50 ml-4">
                        <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-lg transition-colors ${isSolid ? "text-gray-900" : "text-white"}`}>
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* MEGA MENU */}
                {hoveredMenu && menuMap[hoveredMenu] && menuMap[hoveredMenu].length > 0 && (
                    <div
                        className="absolute top-full left-0 w-full pt-2 animate-in fade-in slide-in-from-bottom-4 duration-1000"
                        onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 mx-auto w-[70%] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
                            <div className="grid grid-cols-4 gap-8 relative z-10">
                                <div className="col-span-1 border-r border-gray-100 pr-6">
                                    <h4 className="text-2xl font-bold text-blue-900 mb-2 uppercase tracking-wide">
                                        {navStructure.find(n => n.slug === hoveredMenu)?.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Explore our {navStructure.find(n => n.slug === hoveredMenu)?.title.toLowerCase()} resources.
                                    </p>
                                </div>
                                <div className="col-span-3 grid grid-cols-3 gap-y-4 gap-x-8">
                                    {menuMap[hoveredMenu].map((link: any, idx: number) => (
                                        <Link key={idx} href={link.url || "#"} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
                                            </div>
                                            <span className="font-semibold text-gray-700 group-hover:text-blue-700">{link.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl max-h-[80vh] overflow-y-auto text-gray-900">
                    <div className="px-4 py-6 space-y-2">
                        {navStructure.map((item) => (
                            <div key={item.title}>
                                <Link href={item.href} onClick={() => !item.slug && setIsOpen(false)} className="flex justify-between items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    {item.title}
                                </Link>
                                {item.slug && menuMap[item.slug] && (
                                    <div className="pl-8 pr-4 py-2 space-y-2 border-l-2 border-blue-100 ml-4">
                                        {menuMap[item.slug].map((link: any, idx: number) => (
                                            <Link key={idx} href={link.url || "#"} onClick={() => setIsOpen(false)} className="block text-sm text-gray-500 hover:text-blue-600 py-1">{link.label}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Mobil Login Link */}
                        <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-4 mt-4 border-t border-gray-100 text-blue-600 font-bold uppercase tracking-wider">
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