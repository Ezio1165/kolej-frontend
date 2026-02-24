import type { Metadata } from "next";
import { Lexend, Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper"; // Yeni sarmalayıcıyı import ettik
import { getStrapiData, getStrapiMedia } from "@/lib/strapi";

//const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Corporate College Portal",
  description: "Excellence in education, shaping the leaders of tomorrow.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verileri sunucu tarafında çekiyoruz
  const [globalData, menuData] = await Promise.all([
    getStrapiData("/global?populate=*"),
    getStrapiData("/menu-sections?populate=*"),
  ]);

  const { siteName, logo, footerText, defaultSeo } = globalData?.data || {};
  const logoUrl = getStrapiMedia(logo?.url);

  // Menü verisini hazırla
  const menuMap: Record<string, any[]> = {};
  if (menuData?.data) {
    menuData.data.forEach((section: any) => {
      menuMap[section.slug] = section.links || [];
    });
  }

  // Props paketlerini hazırla
  const navbarProps = { logoUrl, siteName: siteName || "College Project", menuMap };
  const footerProps = {
    siteName: siteName || "College Project",
    description: defaultSeo?.metaDescription,
    footerText
  };

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${lexend.variable} font-sans flex flex-col min-h-screen bg-[#f6f6f8] text-[#0d121b]`}>
        {/* Navbar ve Footer'ı doğrudan koymak yerine,
            adres çubuğunu kontrol eden LayoutWrapper'ı kullanıyoruz.
        */}
        <LayoutWrapper navbarProps={navbarProps} footerProps={footerProps}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}