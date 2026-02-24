import BlockRenderer from "@/components/BlockRenderer";
import { getStrapiData } from "@/lib/strapi";

export default async function Home() {
  const query = [
    '/pages?',
    'filters[slug][$eq]=home',
    '&populate[blocks][on][blocks.video-hero][populate]=*',
    '&populate[blocks][on][blocks.our-values][populate][items][populate]=*',
    '&populate[blocks][on][blocks.image-slider][populate][cards][populate]=*',
    '&populate[blocks][on][blocks.image-grid][populate][items][populate]=*',
    '&populate[blocks][on][blocks.product-marquee][populate][items][populate]=*',
    '&populate[blocks][on][blocks.video-cards-block][populate][items][populate]=*',
    '&populate[blocks][on][blocks.news-feed][populate]=*',

    // YENİ EKLENEN İSTATİSTİK SORGUSU (Derin Populate)
    '&populate[blocks][on][blocks.stats-block][populate][items][populate]=*',

    '&populate[blocks][on][blocks.hero-slider][populate][slides][populate][image][fields]=url,alternativeText',
    '&populate[blocks][on][blocks.hero][populate]=*',
    '&populate[seo][populate]=*'
  ].join('');

  const data = await getStrapiData(query);
  const page = data?.data?.[0];

  if (!page) {
    return (
      <div className="pt-32 text-center font-bold text-red-500">
        Home page data missing in Strapi. Please check "home" slug.
      </div>
    );
  }

  return (
    <main>
      <BlockRenderer blocks={page.blocks} />
    </main>
  );
}
