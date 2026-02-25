import { getStrapiData } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Bu satır, sayfanın her zaman sunucu tarafında güncel olarak oluşturulmasını zorunlu kılar.
// Vercel build hatalarını ve 500 hatalarını önlemede en etkili yöntemdir.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getStrapiData(`/api/pages?filters[slug][$eq]=${slug}&populate[seo][populate]=*`);

    if (!data?.data || data.data.length === 0) return { title: "Page Not Found" };
    const page = data.data[0];
    const seo = page.seo;

    return {
        title: seo?.metaTitle || `${page.title} - Corporate College`,
        description: seo?.metaDescription,
    };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Strapi v5 Ultra-Deep Populate Sorgusu
    // ÖNEMLİ: Railway linkinde sonunda /api yoksa, sorgunun başına /api/ eklemeliyiz.
    const query = [
        `/api/pages?filters[slug][$eq]=${slug}`,
        '&populate[blocks][on][blocks.page-hero][populate][image][fields]=url',
        '&populate[blocks][on][blocks.rich-editor][populate]=*',
        '&populate[blocks][on][blocks.video-hero][populate]=*',
        '&populate[blocks][on][blocks.our-values][populate][items][populate]=*',
        '&populate[blocks][on][blocks.image-slider][populate][cards][populate]=*',
        '&populate[blocks][on][blocks.image-grid][populate][items][populate]=*',
        '&populate[blocks][on][blocks.video-cards-block][populate][items][populate]=*',
        '&populate[seo][populate]=*'
    ].join('');

    const data = await getStrapiData(query);

    // Veri gelmezse veya boş gelirse 404 sayfasına yönlendir
    if (!data?.data || data.data.length === 0) {
        console.error(`Slug için veri bulunamadı: ${slug}`);
        notFound();
    }

    const page = data.data[0];

    return (
        <main className="min-h-screen pt-20 bg-white">
            <BlockRenderer blocks={page.blocks} />
        </main>
    );
}