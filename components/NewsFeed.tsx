import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"] });

// Belirli bir kategorideki en son yayını çeken yardımcı fonksiyon
async function getLatestByCategory(category: string) {
    const query = [
        '/articles?',
        `filters[category][$eq]=${category}`,
        '&sort=publishedDate:desc',
        '&pagination[limit]=1',
        '&populate=*'
    ].join('');

    const res = await getStrapiData(query);
    return res?.data?.[0];
}

export default async function NewsFeed({ data }: { data: { title?: string } }) {
    // 3 Farklı kategori için en güncel verileri paralel çekiyoruz (News, Announcement, Event)
    const [newsItem, announcementItem, eventItem] = await Promise.all([
        getLatestByCategory('News'),
        getLatestByCategory('Announcement'),
        getLatestByCategory('Event')
    ]);

    const articles = [newsItem, announcementItem, eventItem].filter(item => item !== undefined && item !== null);

    if (articles.length === 0) return null;

    return (
        /* ========================================================================
          KİLİT NOKTA 1: BÖLÜMÜN GENEL YÜKSEKLİĞİ (PADDING)
          ========================================================================
          Aşağıdaki `py-16` sınıfı (padding-y) bölümün üstten ve alttan ne kadar boşluk 
          bırakacağını belirler. 
          - Eğer bölümü daha da kısaltmak istersen: `py-12` veya `py-10` yapabilirsin.
          - Daha uzun olsun istersen: `py-20` veya `py-24` yapabilirsin.
          
          Arka Plan Rengi: bg-[#f0f9ff] (Ferah açık mavi)
          Köşe Yumuşatma: rounded-l-[150px] (Sol taraftan asimetrik kesim)
        */
        <section className="mt-12 mb-12 py-16 md:py-20 bg-[#f0f9ff] relative overflow-hidden rounded-l-[80px] md:rounded-l-[150px] w-[98%] ml-auto shadow-sm border-l border-[#dbeafe]">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 relative z-10">

                {/* Bölüm Başlığı */}
                {data.title && (
                    <div className="mb-10 text-left">
                        <h2 className={`text-3xl md:text-4xl ${bitter.className} font-black text-[#0c4a6e] tracking-wide uppercase`}>
                            {data.title}
                        </h2>
                        <div className="w-16 h-1.5 bg-blue-600 mt-3 rounded-full"></div>
                    </div>
                )}

                {/* Kartlar Grid (3 Sütunlu Yapı) */}
                {/* KİLİT NOKTA 2: gap-8 ile kartlar arası boşluk biraz daraltıldı ki daha kompakt dursun */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((item: any) => {
                        const art = item;

                        // Resim Seçimi
                        const getUrl = (imgField: any) => {
                            const imgData = imgField?.data || imgField;
                            if (Array.isArray(imgData)) return imgData[0]?.attributes?.url || imgData[0]?.url;
                            return imgData?.attributes?.url || imgData?.url;
                        }

                        const rawImg = getUrl(art.cardImage) || getUrl(art.coverImage);
                        const imgUrl = getStrapiMedia(rawImg);

                        // Özet Metni
                        const summaryText = art.cardSummary || "Click to view details.";

                        // Kategoriye Özel Renkler
                        const catColors: Record<string, string> = {
                            'News': 'bg-blue-600',
                            'Announcement': 'bg-orange-500',
                            'Event': 'bg-purple-600'
                        };

                        return (
                            <div
                                key={item.id}
                                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                            >

                                <Link href={`/news/${art.slug}`} className="block relative aspect-video w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={art.title || "News"}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold bg-blue-50">NO IMAGE</div>
                                    )}

                                    {/* Kategori Etiketi */}
                                    {art.category && (
                                        <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] md:text-xs font-bold text-white uppercase tracking-wider rounded-md shadow-md z-10 ${catColors[art.category] || 'bg-gray-800'}`}>
                                            {art.category}
                                        </span>
                                    )}
                                </Link>

                                {/* KİLİT NOKTA 4: İÇERİK BOŞLUKLARI (PADDING)
                  Eskiden p-8 (32px) boşluk vardı. Daha kompakt durması için p-6 (24px) yapıldı. 
                */}
                                <div className="flex flex-col flex-grow p-6">
                                    {/* Tarih */}
                                    {art.publishedDate && (
                                        <span className="text-[11px] font-bold text-gray-400 uppercase mb-2 block tracking-widest">
                                            {new Date(art.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    )}

                                    <h3 className="text-lg md:text-xl font-bold text-[#0c4a6e] mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        <Link href={`/news/${art.slug}`}>
                                            {art.title}
                                        </Link>
                                    </h3>

                                    {/* Özet Metni line-clamp-3 ile 3 satır ile sınırlandırılır */}
                                    <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                                        {summaryText}
                                    </p>

                                    {/* View All Butonu */}
                                    <div className="pt-4 border-t border-gray-50 mt-auto">
                                        <Link
                                            href="/news"
                                            className="inline-flex items-center text-blue-600 font-bold text-[13px] uppercase tracking-wider group/btn hover:text-blue-800 transition-colors"
                                        >
                                            View All
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}