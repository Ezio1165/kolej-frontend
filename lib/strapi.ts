// Strapi API'den veri çeken yardımcı fonksiyon

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

export async function getStrapiData(url: string) {
    // URL'in başına /api ekleyelim (eğer yoksa)
    const endpoint = url.startsWith('/api') ? url : `/api${url}`;

    try {
        // Cache: 'no-store' diyerek her yenilemede taze veri çekmesini sağlıyoruz (Dev modu için)
        const res = await fetch(`${STRAPI_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`Veri çekilemedi: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Strapi Hatası:', error);
        return null;
    }
}

// Resim URL'lerini tam adrese çeviren yardımcı fonksiyon
export function getStrapiMedia(url: string | null | undefined) {
    if (url == null) {
        return null;
    }

    // Eğer url zaten http ile başlıyorsa (Cloudinary vb.) dokunma
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Değilse başına localhost:1337 ekle
    return `${STRAPI_URL}${url}`;
}