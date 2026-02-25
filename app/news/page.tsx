import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import Pagination from "@/components/Pagination";

// Dinamik veri çekme fonksiyonu (Sadece Sayfalama ve Sıralama)
async function getArticles(page = 1) {
    // En yeni eklenen en başta (publishedDate:desc) ve sayfa başı 12 içerik
    const query = `/articles?sort=publishedDate:desc&pagination[page]=${page}&pagination[pageSize]=12&populate=*`;

    try {
        const res = await getStrapiData(query);
        return {
            articles: res?.data || [],
            meta: res?.meta
        };
    } catch (error) {
        console.error("Haberleri çekerken hata:", error);
        return { articles: [], meta: null };
    }
}

// Next.js 15+ için searchParams Promise olarak gelir
export default async function NewsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;

    // Sadece URL'den gelen sayfa numarasını alıyoruz (Örn: ?page=2)
    const currentPage = Number(params.page) || 1;

    // Veriyi çek
    const { articles, meta } = await getArticles(currentPage);
    const pageCount = meta?.pagination?.pageCount || 1;

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">

                {/* Sayfa Başlığı */}
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-2 block">Latest Updates</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                        News & Announcements
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Stay informed about the latest happenings, student achievements, and upcoming events at our college.
                    </p>
                </div>

                {/* Haber Listesi */}
                {articles.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {articles.map((item: any) => {
                                const art = item; // Strapi v5 item

                                const getUrl = (imgField: any) => {
                                    const imgData = imgField?.data || imgField;
                                    if (Array.isArray(imgData)) return imgData[0]?.attributes?.url || imgData[0]?.url;
                                    return imgData?.attributes?.url || imgData?.url;
                                };

                                const imgUrl = getStrapiMedia(getUrl(art.coverImage));
                                const dateStr = art.publishedDate
                                    ? new Date(art.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                    : '';

                                return (
                                    <Link
                                        key={item.id}
                                        href={`/news/${art.slug}`}
                                        className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                                    >
                                        {/* Resim Alanı */}
                                        <div className="relative aspect-video w-full overflow-hidden">
                                            {imgUrl ? (
                                                <Image
                                                    src={imgUrl}
                                                    alt={art.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold">NO IMAGE</div>
                                            )}

                                            {/* Kategori Etiketi */}
                                            {art.category && (
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-900 shadow-sm uppercase tracking-wide">
                                                    {art.category}
                                                </div>
                                            )}
                                        </div>

                                        {/* İçerik Alanı */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">{dateStr}</div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
                                                {art.title}
                                            </h3>
                                            <p className="text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                                                {art.cardSummary || "Click to read the full story and view details."}
                                            </p>

                                            <span className="inline-flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider group/link">
                                                Read Full Story
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* SAYFALAMA BÖLÜMÜ */}
                        <Pagination pageCount={pageCount} />
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-400 text-lg">No news found.</p>
                    </div>
                )}
            </div>
        </main>
    );
}