"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewsFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Mevcut parametreleri al
    const currentCategory = searchParams.get("category") || "All";
    const currentSort = searchParams.get("sort") || "desc"; // desc: Yeniden eskiye
    const currentDate = searchParams.get("date") || "";

    // Filtre değiştiğinde çalışır
    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "All" || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        // Filtre değişince her zaman 1. sayfaya dön
        params.set("page", "1");

        router.push(`/news?${params.toString()}`);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-10 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 items-center justify-between">

            <div className="text-gray-500 font-medium text-sm hidden lg:block">
                Filter news & updates:
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

                {/* Tarih Seçici (YENİ) */}
                <div className="relative w-full sm:w-auto">
                    <input
                        type="date"
                        value={currentDate}
                        onChange={(e) => handleFilterChange("date", e.target.value)}
                        className="w-full sm:w-48 bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 font-medium transition-colors cursor-pointer"
                        placeholder="Select Date"
                    />
                </div>

                {/* Kategori Filtresi */}
                <div className="relative w-full sm:w-auto">
                    <select
                        value={currentCategory}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                        className="w-full sm:w-48 appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium transition-colors"
                    >
                        <option value="All">All Categories</option>
                        <option value="News">News</option>
                        <option value="Announcement">Announcements</option>
                        <option value="Event">Events</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

                {/* Sıralama Filtresi */}
                <div className="relative w-full sm:w-auto">
                    <select
                        value={currentSort}
                        onChange={(e) => handleFilterChange("sort", e.target.value)}
                        className="w-full sm:w-48 appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer font-medium transition-colors"
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

            </div>
        </div>
    );
}