import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Referans Tasarımdaki Renkler
                primary: {
                    DEFAULT: '#1152d4', // Ana Mavi
                    50: '#eff6ff',
                    100: '#dbeafe',
                    600: '#1152d4', // Butonlar için
                    700: '#0e44b3', // Hover durumu için
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                secondary: '#fbbf24',
                "background-light": "#f6f6f8",
                "background-dark": "#101622",
            },
            fontFamily: {
                // Lexend fontunu varsayılan sans fontu yapıyoruz
                sans: ['var(--font-lexend)', 'sans-serif'],
                display: ['var(--font-lexend)', 'sans-serif'],
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                fadeInUp: 'fadeInUp 0.8s ease-out forwards',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'), // RichText için gerekli
    ],
};
export default config;
