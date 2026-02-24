import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import { Metadata } from "next";

// Statik Parametreler (Opsiyonel ama performans için iyi)
export async function generateStaticParams() {
    const teachers = await getStrapiData("/teachers");
    if (!teachers?.data) return [];
    // documentId veya id kullanarak yolları oluştur
    return teachers.data.map((t: any) => ({
        documentId: t.documentId || t.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ documentId: string }> }): Promise<Metadata> {
    const { documentId } = await params;
    // Tekil veri çekerken findOne yerine filtreleme veya documentId endpointi kullanılır
    // Strapi v5'te: /teachers/:documentId
    const data = await getStrapiData(`/teachers/${documentId}`);
    const teacher = data?.data;

    if (!teacher) return {};
    return {
        title: `${teacher.fullName} - ${teacher.branch}`,
    };
}

export default async function TeacherDetail({ params }: { params: Promise<{ documentId: string }> }) {
    const { documentId } = await params;
    const data = await getStrapiData(`/teachers/${documentId}?populate=*`);
    const teacher = data?.data;

    if (!teacher) notFound();

    const imgUrl = getStrapiMedia(teacher.photo?.url);

    return (
        <main className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Sol Taraf: Fotoğraf */}
                    <div className="md:w-2/5 relative h-[400px] md:h-auto bg-gray-200">
                        {imgUrl ? (
                            <Image
                                src={imgUrl}
                                alt={teacher.fullName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400">👤</div>
                        )}
                    </div>

                    {/* Sağ Taraf: Bilgiler */}
                    <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-bold mb-2">
                                {teacher.branch}
                            </span>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{teacher.fullName}</h1>
                        </div>

                        <div className="prose prose-blue text-gray-600 mb-8">
                            <BlocksRenderer content={teacher.bio} />
                        </div>

                        <div className="mt-auto">
                            <Link
                                href="/akademik-kadro"
                                className="text-primary-600 font-semibold hover:text-primary-800 transition-colors"
                            >
                                &larr; Return to the staff
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
