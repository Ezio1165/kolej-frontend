"use client";

import Link from "next/link";

/**
 * Kullanıcıyı bir eyleme (Kayıt, İletişim vb.) yönlendiren büyük banner alanı.
 */
export default function CallToAction({ data }: any) {
    const themes: any = {
        blue: "bg-blue-600 text-white shadow-blue-200",
        dark: "bg-blue-950 text-white shadow-gray-200",
        light: "bg-gray-100 text-blue-900 border border-gray-200 shadow-none"
    };

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-12">
            <div className={`p-10 md:p-20 rounded-[50px] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl transition-transform hover:scale-[1.01] ${themes[data.theme || 'blue']}`}>
                <div className="max-w-2xl text-center md:text-left">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                        {data.title || "Ready to join us?"}
                    </h3>
                </div>
                <Link
                    href={data.buttonLink || "#"}
                    className="bg-white text-blue-900 px-12 py-5 rounded-full font-black text-lg hover:bg-gray-100 transition-all shadow-xl active:scale-95 whitespace-nowrap"
                >
                    {data.buttonText || "Apply Now"}
                </Link>
            </div>
        </section>
    );
}
