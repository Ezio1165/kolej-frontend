"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
    pageCount: number;
}

export default function Pagination({ pageCount }: PaginationProps) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    if (pageCount <= 1) return null;

    // URL oluşturucu
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `/news?${params.toString()}`;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-16">
            {/* Önceki Sayfa */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${currentPage === 1
                        ? "pointer-events-none opacity-50 bg-gray-50 text-gray-400"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                aria-disabled={currentPage === 1}
            >
                Previous
            </Link>

            {/* Sayfa Numaraları */}
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                <Link
                    key={page}
                    href={createPageURL(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${currentPage === page
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                >
                    {page}
                </Link>
            ))}

            {/* Sonraki Sayfa */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${currentPage === pageCount
                        ? "pointer-events-none opacity-50 bg-gray-50 text-gray-400"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                aria-disabled={currentPage === pageCount}
            >
                Next
            </Link>
        </div>
    );
}