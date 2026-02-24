/**
 * getStrapiURL: Strapi API adresini belirler.
 * Vercel'de NEXT_PUBLIC_STRAPI_API_URL değişkenini arar, 
 * bulamazsa yerel adrese (localhost) döner.
 */
export function getStrapiURL(path = "") {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";
    // Linkin sonunda eğik çizgi varsa temizler ve path ile birleştirir
    return `${baseUrl.replace(/\/$/, "")}${path}`;
}

/**
 * getStrapiData: Strapi'den JSON verisi çeken ana fonksiyon.
 */
export async function getStrapiData(path: string) {
    try {
        const baseUrl = getStrapiURL();
        const url = new URL(path, baseUrl);

        // Vercel build hatalarını önlemek için fetch parametreleri optimize edildi
        const response = await fetch(url.href, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Verinin her seferinde taze gelmesi için cache: 'no-store'
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Strapi Hatası (${response.status}):`, errorText);
            throw new Error(`Strapi verisi çekilemedi. Durum: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Strapi Bağlantı Hatası:", error);
        return null;
    }
}

/**
 * getStrapiMedia: Medya (Resim/Video) URL'lerini düzenler.
 */
export function getStrapiMedia(url: string | null | undefined) {
    if (!url) return null;

    // Eğer URL zaten tam bir adres (http/https) ise olduğu gibi döner
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    // Değilse Strapi ana adresini başına ekler
    return `${getStrapiURL()}${url}`;
}