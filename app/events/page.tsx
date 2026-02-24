import Link from "next/link";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events Calendar",
    description: "What's happening on our campus.",
};

export default async function EventsPage() {
    const query = [
        '/articles?',
        'filters[category][$in][0]=etkinlik',
        '&filters[category][$in][1]=Etkinlik',
        '&sort[0]=publishedAt:desc',
        '&populate=cover'
    ].join('');

    const events = await getStrapiData(query);

    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <span className="text-blue-600 font-bold tracking-wide uppercase text-sm">Calendar</span>
                    <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Events</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Social, cultural, and academic events.
                    </p>
                </div>

                <div className="space-y-8 max-w-5xl mx-auto">
                    {events?.data?.map((event: any) => {
                        const imgUrl = getStrapiMedia(event.cover?.url);

                        // US Locale Date
                        const dateObj = new Date(event.publishedAt || event.createdAt);
                        const day = dateObj.getDate();
                        const month = dateObj.toLocaleDateString("en-US", { month: "short" });
                        const fullDate = dateObj.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

                        return (
                            <div
                                key={event.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row border border-gray-100 group"
                            >
                                <div className="hidden md:flex flex-col items-center justify-center bg-blue-50 w-32 p-4 text-center border-r border-gray-100 flex-shrink-0">
                                    <span className="text-3xl font-bold text-blue-600">{day}</span>
                                    <span className="text-lg font-medium text-gray-900 uppercase">{month}</span>
                                </div>

                                <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0 bg-gray-200">
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                                            No Image
                                        </div>
                                    )}
                                    <div className="md:hidden absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                                        {fullDate}
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                                        {event.title}
                                    </h3>

                                    <div>
                                        <Link
                                            href={`/haberler/${event.slug}`}
                                            className="inline-flex items-center font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            View Event &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {(!events?.data || events.data.length === 0) && (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">There are no scheduled events at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
