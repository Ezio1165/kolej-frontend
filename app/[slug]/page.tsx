import { getStrapiData } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

/**
 * generateStaticParams: Scans all pages in Strapi and prepares their slugs for static generation.
 * This ensures that when a new page is created in Strapi, the system can recognize it.
 */
export async function generateStaticParams() {
    const pages = await getStrapiData("/pages");
    if (!pages?.data) return [];
    return pages.data.map((page: any) => ({
        slug: page.slug,
    }));
}

/**
 * generateMetadata: Dynamically fetches SEO titles and descriptions from Strapi for each slug.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getStrapiData(`/pages?filters[slug][$eq]=${slug}&populate[seo][populate]=*`);

    if (!data?.data || data.data.length === 0) return {};
    const page = data.data[0];
    const seo = page.seo;

    return {
        title: seo?.metaTitle || `${page.title} - Corporate College`,
        description: seo?.metaDescription,
    };
}

/**
 * DynamicPage: The main engine for rendering any page created in Strapi Content Manager.
 * It uses a deep populate query to fetch all possible blocks and their nested data.
 */
export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    /**
     * Ultra-Deep Populate Query:
     * Explicitly requests data for every atomic and specialized component in the Dynamic Zone.
     * This is required for Strapi v5 to return nested repeatable or media fields.
     */
    const query = [
        `/pages?filters[slug][$eq]=${slug}`,
        // 1. Core Blocks
        '&populate[blocks][on][blocks.video-hero][populate]=*',
        '&populate[blocks][on][blocks.our-values][populate][items][populate]=*',
        '&populate[blocks][on][blocks.image-slider][populate][cards][populate]=*',
        '&populate[blocks][on][blocks.image-grid][populate][items][populate]=*',
        '&populate[blocks][on][blocks.video-cards-block][populate][items][populate]=*',
        '&populate[blocks][on][blocks.hero-slider][populate][slides][populate][image][fields]=url,alternativeText',
        '&populate[blocks][on][blocks.hero][populate]=*',

        // 2. Page Template & Article Blocks
        '&populate[blocks][on][blocks.page-hero][populate]=*',
        '&populate[blocks][on][blocks.rich-editor][populate]=*',

        // 3. Atomic Components (LEGO Pieces)
        '&populate[blocks][on][blocks.section-header][populate]=*',
        '&populate[blocks][on][blocks.image-and-text][populate][image][fields]=url',
        '&populate[blocks][on][blocks.single-image][populate][image][fields]=url',
        '&populate[blocks][on][blocks.feature-grid][populate][items][populate][icon][fields]=url',
        '&populate[blocks][on][blocks.call-to-action][populate]=*',
        '&populate[blocks][on][blocks.news-feed][populate]=*',
        '&populate[blocks][on][blocks.product-marquee][populate][items][populate]=*',
        '&populate[blocks][on][blocks.stats-block][populate][items][populate]=*',
        // 4. Global Page SEO
        '&populate[seo][populate]=*'
    ].join('');

    const data = await getStrapiData(query);

    // If the slug doesn't exist or is not published, return Next.js 404 page
    if (!data?.data || data.data.length === 0) {
        notFound();
    }

    const page = data.data[0];

    return (
        <main className="min-h-screen pt-20">
            {/* The BlockRenderer component iterates through the 'blocks' array 
        and renders the corresponding React component for each entry.
      */}
            <BlockRenderer blocks={page.blocks} />
        </main>
    );
}