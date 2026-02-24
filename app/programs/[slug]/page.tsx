import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocksRenderer } from '@strapi/blocks-react-renderer'; // Yeni renderer
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";
import { Metadata } from "next";

// Statik Yollar
export async function generateStaticParams() {
    const programs = await getStrapiData("/programs");
    if (!programs?.data) return [];
    return programs.data.map((p: any) => ({ slug: p.slug }));
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getStrapiData(`/programs?filters[slug][$eq]=${slug}&populate=seo`);
    const program = data?.data?.[0];
    if (!program) return {};
    return {
        title: program.seo?.metaTitle || program.title,
        description: program.seo?.metaDescription || program.summary,
    };
}

// Sayfa İçeriği
export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getStrapiData(`/programs?filters[slug][$eq]=${slug}&populate=*`);
    const program = data?.data?.[0];

    if (!program) notFound();

    const iconUrl = getStrapiMedia(program.icon?.url);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Alanı */}
            <div className="bg-primary-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {iconUrl && (
                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                            <Image src={iconUrl} alt={program.title} width={64} height={64} className="brightness-0 invert" />
                        </div>
                    )}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{program.title}</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">{program.summary}</p>
                </div>
            </div>

            {/* İçerik */}
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6">
                <div className="prose prose-lg prose-blue max-w-none text-gray-700">
                    {/* ReactMarkdown yerine BlocksRenderer kullanıyoruz */}
                    <BlocksRenderer content={program.content} />
                </div>

                {/* Aksiyon Alanı */}
                <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Bu Program Hakkında Bilgi Alın</h3>
                    <p className="text-gray-600 mb-8">
                        Eğitim kadromuz ve kayıt süreçleri hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/iletisim" className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition">
                            İletişime Geç
                        </Link>
                        <Link href="/programlar" className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition">
                            Diğer Programlar
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
