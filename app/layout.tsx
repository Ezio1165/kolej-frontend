import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

// KİLİT NOKTA: Vercel build hatalarını ve 500 hatalarını önlemek için zorunlu.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corporate College Portal",
  description: "Excellence in education, shaping the leaders of tomorrow.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // getStrapiData artık başına /api ekleyeceği için sadece "/global" yazmak yeterli
  const [globalData, menuData] = await Promise.all([
    getStrapiData("/global?populate=*"),
    getStrapiData("/menu-sections?populate=*"),
  ]);

  const { siteName, logo, footerText, defaultSeo } = globalData?.data || {};
  const logoUrl = getStrapiMedia(logo?.url);

  const menuMap: Record<string, any[]> = {};
  if (menuData?.data) {
    menuData.data.forEach((section: any) => {
      menuMap[section.slug] = section.links || [];
    });
  }

  const navbarProps = { logoUrl, siteName: siteName || "College Project", menuMap };
  const footerProps = {
    logoUrl, // Logoyu Footer'a gönderiyoruz
    siteName: siteName || "College Project",
    description: defaultSeo?.metaDescription,
    footerText
  };

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      {/* TASARIM DEĞİŞİKLİĞİ: Arka plan #2aa0f5 yapıldı, metinler beyaz (text-white) olarak ayarlandı */}
      <body className={`${lexend.variable} font-sans flex flex-col min-h-screen bg-[#2aa0f5] text-white`}>
        <LayoutWrapper navbarProps={navbarProps} footerProps={footerProps}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}