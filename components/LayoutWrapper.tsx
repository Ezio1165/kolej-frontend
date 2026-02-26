"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutWrapperProps {
    children: React.ReactNode;
    navbarProps: {
        logoUrl: string | null;
        siteName: string;
        menuMap: Record<string, any[]>;
    };
    footerProps: {
        logoUrl?: string | null; // EKLENDİ
        siteName: string;
        description?: string;
        footerText?: string;
    };
}

export default function LayoutWrapper({ children, navbarProps, footerProps }: LayoutWrapperProps) {
    const pathname = usePathname();

    // Login sayfasında Navbar ve Footer'ı GİZLE
    // Eğer pathname '/login' ise true döner
    const isLoginPage = pathname === "/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar {...navbarProps} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer {...footerProps} />
        </>
    );
}