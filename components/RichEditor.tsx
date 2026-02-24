"use client";

import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

/**
 * RichEditor: Kurumsal makale ve metin alanı.
 * Güncelleme: Metin ekranın solundaki hizadan başlar (ml-0) ancak sağa doğru sonsuza gitmez.
 * Genişlik ekranın tam olarak %60'ına (lg:max-w-[60%]) kısıtlanarak resimdeki düzen sağlandı.
 */
export default function RichEditor({ data }: any) {
    if (!data?.content) return null;

    // Hizalama tercihi: Strapi'den 'left' veya 'center' gelir. (Varsayılan: left)
    const alignment = data.alignment || 'left';

    return (
        <section className="py-16 px-4 md:px-10 lg:px-20 bg-white selection:bg-blue-100">
            <div
                className={`
          /* Temel yapı: Genişlik başlangıçta tam, geçişler yumuşak */
          w-full transition-all duration-500
          
          /* Tipografi Ayarları: max-w-none ekleyerek Tailwind Prose'un kendi 65ch sınırını kaldırıyoruz */
          prose prose-xl prose-blue text-gray-700 max-w-none
          prose-headings:text-blue-900 prose-headings:font-black prose-headings:tracking-tight 
          prose-p:leading-relaxed prose-img:rounded-[40px] prose-img:shadow-2xl prose-a:text-blue-600
          
          /* Hizalama ve Genişlik Kısıtlaması (İstediğin %60 Düzeni): 
             - Sola yaslıyken: ml-0 (sola yapışık) ve max-w-[60%] (ekranın %60'ında durur)
             - Ortalıyken: mx-auto (ortalanmış) ve max-w-4xl (standart okuma genişliği)
          */
          ${alignment === 'center'
                        ? 'text-center mx-auto max-w-4xl'
                        : 'text-left ml-0 md:max-w-[75%] lg:max-w-[60%]'
                    }
        `}
            >
                <BlocksRenderer content={data.content} />
            </div>

            <style jsx global>{`
        /* Listelerin ve maddelerin hizalanmasını düzeltmek için özel ayar */
        .prose ul, .prose ol {
          padding-left: ${alignment === 'center' ? '0' : '1.5rem'};
          list-style-position: ${alignment === 'center' ? 'inside' : 'outside'};
        }
        .prose h2, .prose h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        /* Resimlerin sağa taşmaması ve konteynere uyum sağlaması için */
        .prose img {
          max-width: 100%;
          height: auto;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
      `}</style>
        </section>
    );
}