/**
 * getStrapiURL: Strapi API adresini belirler.
 */
export function getStrapiURL(path = "") {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337";
    const cleanedBase = baseUrl.replace(/\/$/, "");

    // Eğer path "/api" ile başlamıyorsa ve baseUrl içinde "/api" yoksa ekle
    // Strapi v4/v5 standart API yolu için gereklidir.
    let cleanPath = path;
    if (path && !path.startsWith("/api") && !cleanedBase.endsWith("/api")) {
        cleanPath = path.startsWith("/") ? `/api${path}` : `/api/${path}`;
    }

    return `${cleanedBase}${cleanPath}`;
}

/**
 * getStrapiData: Strapi'den güvenli veri çeker.
 */
export async function getStrapiData(path: string) {
    try {
        const url = getStrapiURL(path);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Verinin her zaman taze gelmesini sağlar
        });

        if (!response.ok) {
            console.error(`Strapi Hatası (${response.status}): ${url}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Strapi Bağlantı Hatası:", error);
        return null;
    }
}

export function getStrapiMedia(url: string | null | undefined) {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("//")) return url;

    // Medya dosyaları genellikle /api altında DEĞİLDİR, ana URL üzerinden çekilir.
    const baseUrl = (process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337").replace(/\/$/, "");
    return `${baseUrl}${url}`;
}