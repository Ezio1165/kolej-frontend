import Link from "next/link";
import Image from "next/image";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";

interface RecentArticlesProps {
    data: {
        title: string;
        count: number;
    };
}

export default async function RecentArticles({ data }: RecentArticlesProps) {
    // Strapi'den son haberleri çekiyoruz (Tarihe göre sıralı, limitli)
    // Strapi v5 filtreleme: sort[0]=publishedAt:desc & pagination[limit]=X
    const articles = await getStrapiData(
        `/articles?sort[0]=publishedAt:desc&pagination[limit]=${data.count || 3}&populate=cover`
    );

    if (!articles?.data) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">{data.title}</h2>
                    <div className="mt-2 h-1 w-20 bg-secondary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.data.map((article: any) => {
                        const imgUrl = getStrapiMedia(article.cover?.url);

                        return (
                            <Link
                                href={`/haberler/${article.slug}`}
                                key={article.id}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                            >
                                {/* Haber Görseli */}
                                <div className="relative h-48 w-full bg-gray-200">
                                    {imgUrl ? (
                                        <Image
                                            src={imgUrl}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            No image
                                        </div>
                                    )}
                                    {/* Kategori Etiketi */}
                                    <div className="absolute top-4 left-4 bg-primary-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        {article.category}
                                    </div>
                                </div>

                                {/* İçerik */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                        {/* İçerik Markdown olduğu için burada düz metin göstermek zor olabilir, 
                        o yüzden açıklama (summary) alanı eklemek iyi bir fikir olabilir. 
                        Şimdilik sadece başlık gösteriyoruz. */}
                                    </p>
                                    <span className="text-primary-600 text-sm font-medium mt-auto inline-flex items-center">
                                        Read more &rarr;
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
