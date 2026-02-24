import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// 1. İlgili makaleleri çeken yardımcı fonksiyon (YENİ)
async function getRelatedArticles(category: string, currentSlug: string) {
    if (!category) return [];

    const query = [
        '/articles?',
        `filters[category][$eq]=${category}`, // Aynı kategoriden olanları bul
        `&filters[slug][$ne]=${currentSlug}`, // Şu anki makaleyi hariç tut ($ne = not equal)
        '&sort=publishedDate:desc',           // Yeniden eskiye sırala
        '&pagination[limit]=3',               // Maksimum 3 tane getir
        '&populate=*'
    ].join('');

    try {
        const res = await getStrapiData(query);
        return res?.data || [];
    } catch (error) {
        console.error("İlgili makaleler çekilemedi:", error);
        return [];
    }
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Ana Makaleyi Çekiyoruz
    const data = await getStrapiData(`/articles?filters[slug][$eq]=${slug}&populate=*`);
    const article = data?.data?.[0];

    if (!article) {
        return notFound();
    }

    // İlgili Makaleleri Çekiyoruz (YENİ)
    const relatedArticles = await getRelatedArticles(article.category, slug);

    // Resim URL Çözümleyici (Strapi v4/v5 uyumlu)
    const getImgUrl = (imgField: any) => {
        const imgData = imgField?.data || imgField;
        if (Array.isArray(imgData)) return imgData[0]?.attributes?.url || imgData[0]?.url;
        return imgData?.attributes?.url || imgData?.url;
    };

    const coverUrl = getStrapiMedia(getImgUrl(article.coverImage));

    // Ana Makale Tarih Formatı
    const dateStr = article.publishedDate
        ? new Date(article.publishedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <main className="min-h-screen bg-white">

            {/* 1. HERO BÖLÜMÜ (%60 Yükseklik) */}
            <section className="relative w-full h-[60vh] min-h-[400px] bg-gray-900">
                {coverUrl ? (
                    <Image
                        src={coverUrl}
                        alt={article.title}
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Cover Image
                    </div>
                )}

                {/* Geri Dön Butonu */}
                <div className="absolute top-28 left-4 md:left-10 z-20">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-gray-900 hover:bg-white transition-all shadow-lg"
                    >
                        <ArrowLeft size={18} /> Back to News
                    </Link>
                </div>

                {/* Resim Altı Gölge Efekti */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </section>

            {/* 2. İÇERİK BÖLÜMÜ */}
            <article className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-16 -mt-20 relative z-10">

                {/* Beyaz Kutu İçinde Başlık ve Meta Bilgiler */}
                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100 mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        {article.category && (
                            <span className="px-4 py-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">
                                {article.category}
                            </span>
                        )}
                        <span className="text-gray-500 text-sm font-medium">{dateStr}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-[#0c4a6e] leading-tight mb-2">
                        {article.title}
                    </h1>
                </div>

                {/* İçerik (Sola Yaslı) */}
                <div className="w-full max-w-4xl mr-auto ml-0">
                    <div className="prose prose-xl prose-blue text-gray-700 max-w-none 
            prose-headings:text-[#0c4a6e] prose-headings:font-black 
            prose-p:leading-relaxed prose-img:rounded-3xl prose-a:text-blue-600">
                        {article.content && <BlocksRenderer content={article.content} />}
                    </div>
                </div>

            </article>

            {/* 3. İLGİLİ MAKALELER (YENİ EKLENEN BÖLÜM) */}
            {relatedArticles.length > 0 && (
                <section className="py-16 bg-[#f8fbff] border-t border-[#dbeafe]">
                    <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">

                        {/* Alt Bölüm Başlığı ve View All Butonu */}
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl md:text-3xl font-black text-[#0c4a6e] tracking-tight">
                                More {article.category}s
                            </h3>

                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider hover:text-blue-800 transition-colors"
                            >
                                View All
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Kompakt Kartlar Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((rel: any) => {
                                const rawImg = getImgUrl(rel.cardImage) || getImgUrl(rel.coverImage);
                                const imgUrl = getStrapiMedia(rawImg);
                                const relDate = rel.publishedDate
                                    ? new Date(rel.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                    : '';

                                return (
                                    <Link
                                        key={rel.id}
                                        href={`/news/${rel.slug}`}
                                        className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    >
                                        {/* Kompakt Resim Alanı (h-48 = 192px yükseklik) */}
                                        <div className="relative h-48 w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                                            {imgUrl ? (
                                                <Image
                                                    src={imgUrl}
                                                    alt={rel.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold">NO IMAGE</div>
                                            )}
                                        </div>

                                        {/* Kompakt İçerik Alanı */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                                                {relDate}
                                            </span>
                                            <h4 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {rel.title}
                                            </h4>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                    </div>
                </section>
            )}

        </main>
    );
}