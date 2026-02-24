import Link from "next/link";
import Image from "next/image";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Academic Programs",
    description: "Educational programs preparing students for the future.",
};

export default async function ProgramsPage() {
    const programs = await getStrapiData("/programs?populate=*");

    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Programs</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Meet our modern, student-focused educational models.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs?.data?.map((program: any) => {
                        const iconUrl = getStrapiMedia(program.icon?.url);

                        return (
                            <Link
                                href={`/programlar/${program.slug}`}
                                key={program.id}
                                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                    {iconUrl ? (
                                        <Image
                                            src={iconUrl}
                                            alt={program.title}
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-blue-200 rounded-full opacity-50" />
                                    )}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                                    {program.title}
                                </h2>

                                <p className="text-gray-600 mb-6 line-clamp-3">
                                    {program.summary}
                                </p>

                                <div className="mt-auto px-6 py-2 bg-gray-50 rounded-full text-sm font-semibold text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    View Program
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
