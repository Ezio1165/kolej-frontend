import Link from "next/link";
import { getStrapiData } from "@/lib/strapi";
import NewsCarousel from "./NewsCarousel";

export default async function NewsGrid() {
    // Veri Çekme (Limitleri 10'a çıkardık ki slider dönebilsin)
    const [eventsData, announcementsData, newsData] = await Promise.all([
        getStrapiData('/articles?filters[category][$in][0]=etkinlik&filters[category][$in][1]=Etkinlik&filters[category][$in][2]=ETKINLIK&sort[0]=publishedAt:desc&pagination[limit]=10&populate=cover'),
        getStrapiData('/articles?filters[category][$in][0]=duyuru&filters[category][$in][1]=Duyuru&filters[category][$in][2]=DUYURU&sort[0]=publishedAt:desc&pagination[limit]=10'),
        getStrapiData('/articles?filters[category][$in][0]=haber&filters[category][$in][1]=Haber&filters[category][$in][2]=HABER&sort[0]=publishedAt:desc&pagination[limit]=10&populate=cover'),
    ]);

    const events = eventsData?.data || [];
    const announcements = announcementsData?.data || [];
    const news = newsData?.data || [];

    return (
        <section className="py-16 bg-white relative z-20 max-w-[1400px] mx-auto">
            <div className="px-4 md:px-10 lg:px-20">
                <div className="flex flex-col gap-20">

                    {/* --- EVENTS SECTION --- */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                            <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-wide border-l-4 border-blue-600 pl-3">
                                Events
                            </h3>
                            <Link href="/etkinlikler" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                                View All
                                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        {/* Auto Slider */}
                        <NewsCarousel data={events} type="events" />
                    </div>

                    {/* --- ANNOUNCEMENTS SECTION --- */}
                    {/* DÜZELTME: Kutu görünümü (bg-blue-50/30, p-8, rounded-3xl) kaldırıldı. */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                            <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-wide border-l-4 border-blue-600 pl-3">
                                Announcements
                            </h3>
                            <Link href="/haberler" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                                View All
                                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        {/* Auto Slider (Text Cards) */}
                        <NewsCarousel data={announcements} type="announcements" />
                    </div>

                    {/* --- LATEST NEWS SECTION --- */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                            <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-wide border-l-4 border-blue-600 pl-3">
                                Latest News
                            </h3>
                            <Link href="/haberler" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                                View All
                                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                        {/* Auto Slider */}
                        <NewsCarousel data={news} type="news" />
                    </div>

                </div>
            </div>
        </section>
    );
}
