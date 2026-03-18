import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bitter } from "next/font/google";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";

// Oluşturduğumuz yeni İstemci Bileşenini dahil ediyoruz
import InteractiveCalendar from "@/components/InteractiveCalendar";

const bitter = Bitter({ subsets: ["latin"] });

// --- Wave Effect Button (İndirme Bağlantısı İçin) ---
function WaveDownloadLink({ href, children }: { href: string; children: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="inline-flex gap-[1px] group bg-[#2aa0f5] px-8 py-4 rounded-full shadow-lg hover:shadow-[#2aa0f5]/40 transition-all active:scale-95"
        >
            {children.split("").map((char, i) => (
                <span
                    key={i}
                    className="inline-block transition-all duration-300 text-white font-bold text-lg pointer-events-none group-hover:-translate-y-[5px] group-hover:text-[#ffd166]"
                    style={{ transitionDelay: `${i * 30}ms` }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </Link>
    );
}

export default async function AcademicCalendarPage() {
    let pageData = null;
    let eventsData = null;

    // Veri Çekimi (Server-Side)
    try {
        pageData = await getStrapiData("/academic-calendar-page?populate=*");
    } catch (error) {
        console.error("Academic Calendar Page verisi bulunamadı veya endpoint hatalı:", error);
    }

    try {
        eventsData = await getStrapiData("/calendar-events2?populate=*");
    } catch (error) {
        console.error("Calendar Events verisi bulunamadı veya endpoint hatalı:", error);
    }

    const page = pageData?.data || {};
    const events = eventsData?.data || [];

    // Strapi v4 ve v5 uyumlu güvenli URL çekme işlemi
    const rawHeroUrl = page.heroImage?.data?.attributes?.url || page.heroImage?.data?.url || page.heroImage?.url;
    const rawPdfUrl = page.pdfFile?.data?.attributes?.url || page.pdfFile?.data?.url || page.pdfFile?.url;

    const heroUrl = getStrapiMedia(rawHeroUrl);
    const pdfUrl = getStrapiMedia(rawPdfUrl);

    return (
        <main className={`min-h-screen bg-white pt-20 ${bitter.className}`}>

            {/* --- HERO SECTION --- */}
            <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
                {heroUrl ? (
                    <Image
                        src={heroUrl}
                        alt={page.title || "Academic Calendar Hero"}
                        fill
                        className="object-cover brightness-[0.7]"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#2aa0f5]" />
                )}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-wider uppercase mb-4">
                        {page.title || "Academic Calendar"}
                    </h1>
                    <div className="w-24 h-2 bg-white mx-auto rounded-full" />
                </div>
            </section>

            {/* --- AÇIKLAMA VE İNDİRME --- */}
            <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 -mt-20 relative z-20 mb-20">
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Important Information</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                            {page.description || "Plan your academic year effectively with our interactive calendar. Click on any month in the Year View to see detailed upcoming events, holidays, and sports activities."}
                        </p>
                        {pdfUrl && (
                            <WaveDownloadLink href={pdfUrl}>
                                DOWNLOAD ACADEMIC CALENDAR
                            </WaveDownloadLink>
                        )}
                    </div>
                    <div className="w-full md:w-1/3 aspect-square bg-blue-50 rounded-[3rem] flex items-center justify-center border-4 border-dashed border-blue-100 shadow-inner">
                        <div className="text-center">
                            <span className="text-7xl mb-6 block drop-shadow-md">📅</span>
                            <p className="text-[#2aa0f5] font-black uppercase tracking-widest text-sm">Stay Updated</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ETKİLEŞİMLİ TAKVİM ARAYÜZÜ (YENİ) --- */}
            <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 pb-32">
                <InteractiveCalendar events={events} />
            </section>

        </main>
    );
}