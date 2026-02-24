import Link from "next/link";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Staff",
    description: "Meet our expert educational staff.",
};

export default async function StaffPage() {
    const teachers = await getStrapiData("/teachers?populate=*");

    return (
        <main className="min-h-screen bg-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Academic Staff</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our expert and experienced educators shaping the future.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teachers?.data?.map((teacher: any) => {
                        const imgUrl = getStrapiMedia(teacher.photo?.url);
                        const detailLink = `/akademik-kadro/${teacher.documentId || teacher.id}`;

                        return (
                            <Link
                                href={detailLink}
                                key={teacher.id}
                                className="group relative block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative h-[400px] w-full overflow-hidden rounded-t-2xl bg-gray-100">
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={teacher.fullName}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-6xl">
                                            👤
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <p className="text-white text-sm font-medium">View Profile &rarr;</p>
                                    </div>
                                </div>

                                <div className="p-6 text-center border-t border-gray-50">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                                        {teacher.fullName}
                                    </h3>
                                    <p className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                                        {teacher.branch}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
