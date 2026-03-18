"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveCalendarProps {
    events: any[];
}

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Etkinlik kategorilerine göre Sert (Yıl görünümü noktaları) ve Soft (Ay görünümü zeminleri) renk kodlamaları
const CAT_COLORS: Record<string, { bg: string, softBg: string, text: string }> = {
    'Academic': { bg: 'bg-blue-500', softBg: 'bg-blue-50', text: 'text-blue-900' },
    'Holiday': { bg: 'bg-red-500', softBg: 'bg-red-50', text: 'text-red-900' },
    'Sports': { bg: 'bg-green-500', softBg: 'bg-green-50', text: 'text-green-900' },
    'Social': { bg: 'bg-purple-500', softBg: 'bg-purple-50', text: 'text-purple-900' },
    'Default': { bg: 'bg-gray-400', softBg: 'bg-gray-50', text: 'text-gray-900' }
};

// Takvim Yardımcı Fonksiyonları
function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Pazartesiyi 0, Pazarı 6 yapmak için
}

export default function InteractiveCalendar({ events }: InteractiveCalendarProps) {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [view, setView] = useState<'year' | 'month'>('year');
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

    // Strapi'den gelen etkinlikleri (Yıl-Ay-Gün) anahtarına göre grupla
    const eventMap: Record<string, any[]> = {};
    events.forEach((item: any) => {
        const ev = item.attributes || item;
        if (ev.eventDate) {
            const date = new Date(ev.eventDate);
            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            if (!eventMap[key]) eventMap[key] = [];
            eventMap[key].push(ev);
        }
    });

    const handleMonthClick = (mIndex: number) => {
        setSelectedMonth(mIndex);
        setView('month');
    };

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setCurrentYear(y => y - 1);
        } else {
            setSelectedMonth(m => m - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setCurrentYear(y => y + 1);
        } else {
            setSelectedMonth(m => m + 1);
        }
    };

    return (
        <div className="w-full">
            {/* ÜST BÖLÜM: Yıl Kontrolleri ve Renk Lejandı */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <span className="text-[#2aa0f5] font-black uppercase tracking-widest text-sm block mb-2">Calendar</span>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentYear(y => y - 1)}
                            className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-[#2aa0f5] hover:text-white rounded-full transition-colors shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        <h3 className="text-5xl md:text-6xl font-black text-gray-900 tabular-nums">{currentYear}</h3>
                        <button
                            onClick={() => setCurrentYear(y => y + 1)}
                            className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-[#2aa0f5] hover:text-white rounded-full transition-colors shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    {Object.entries(CAT_COLORS).filter(([k]) => k !== 'Default').map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase tracking-wider">
                            <div className={`w-3 h-3 rounded-full ${val.bg}`}></div> {key}
                        </div>
                    ))}
                </div>
            </div>

            {/* GÖRÜNÜM ALANI (Yıl veya Ay) */}
            <AnimatePresence mode="wait">
                {view === 'year' ? (
                    /* =========================================================
                       1. YIL GÖRÜNÜMÜ (4 Sütun x 3 Satır)
                       ========================================================= */
                    <motion.div
                        key="year-view"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {MONTHS.map((monthName, mIndex) => {
                            const daysInM = getDaysInMonth(currentYear, mIndex);
                            const firstDay = getFirstDayOfMonth(currentYear, mIndex);
                            const blanks = Array.from({ length: firstDay });
                            const days = Array.from({ length: daysInM }, (_, i) => i + 1);

                            return (
                                <div
                                    key={mIndex}
                                    onClick={() => handleMonthClick(mIndex)}
                                    className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:border-[#2aa0f5]/30 transition-all group"
                                >
                                    <h4 className="font-black text-xl text-gray-800 mb-6 group-hover:text-[#2aa0f5] transition-colors text-center">
                                        {monthName}
                                    </h4>
                                    {/* Minyatür Takvim Izgarası (Heatmap tarzı) */}
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {DAYS_OF_WEEK.map(d => (
                                            <div key={d} className="text-[9px] font-bold text-gray-400 text-center mb-1">{d[0]}</div>
                                        ))}
                                        {blanks.map((_, i) => <div key={`b-${i}`} className="aspect-square"></div>)}
                                        {days.map(d => {
                                            const key = `${currentYear}-${mIndex}-${d}`;
                                            const dayEvents = eventMap[key] || [];
                                            const firstEvent = dayEvents[0];
                                            const colorInfo = firstEvent ? CAT_COLORS[firstEvent.category] || CAT_COLORS['Default'] : null;

                                            const isToday = currentYear === today.getFullYear() && mIndex === today.getMonth() && d === today.getDate();

                                            return (
                                                <div
                                                    key={d}
                                                    className={`aspect-square rounded-sm flex items-center justify-center text-[10px] font-bold transition-colors
                            ${colorInfo ? colorInfo.bg + ' text-white shadow-sm' : 'bg-gray-50 text-gray-400'}
                            ${!colorInfo && isToday ? 'ring-2 ring-[#2aa0f5] text-[#2aa0f5]' : ''}
                          `}
                                                >
                                                    {d}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                ) : (
                    /* =========================================================
                       2. AY GÖRÜNÜMÜ (Detaylı, Soft Renk Kaplamalı)
                       ========================================================= */
                    <motion.div
                        key="month-view"
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 30 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        {/* Ay Görünümü Üst Çubuğu (Oklar ve Geri Butonu) */}
                        <div className="bg-[#f8fbff] p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center border-b border-blue-50 gap-6">
                            <div className="flex items-center gap-4 md:gap-8">
                                <button onClick={handlePrevMonth} className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-[#2aa0f5] hover:bg-[#2aa0f5] hover:text-white transition-colors border border-blue-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                                </button>
                                <h3 className="text-3xl md:text-5xl font-black text-[#0c4a6e] w-48 md:w-64 text-center">
                                    {MONTHS[selectedMonth]}
                                </h3>
                                <button onClick={handleNextMonth} className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-[#2aa0f5] hover:bg-[#2aa0f5] hover:text-white transition-colors border border-blue-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                                </button>
                            </div>

                            {/* Yıl Görünümüne Dön Butonu */}
                            <button
                                onClick={() => setView('year')}
                                className="px-6 py-3 bg-white text-[#2aa0f5] border border-[#2aa0f5] font-bold rounded-full hover:bg-[#2aa0f5] hover:text-white transition-all flex items-center gap-2 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                                Year View
                            </button>
                        </div>

                        {/* Büyük Izgara */}
                        {(() => {
                            const daysInM = getDaysInMonth(currentYear, selectedMonth);
                            const firstDay = getFirstDayOfMonth(currentYear, selectedMonth);
                            const blanks = Array.from({ length: firstDay });
                            const days = Array.from({ length: daysInM }, (_, i) => i + 1);

                            return (
                                <div className="grid grid-cols-7 bg-white">
                                    {/* Gün Başlıkları */}
                                    {DAYS_OF_WEEK.map(d => (
                                        <div key={d} className="bg-gray-50/80 p-5 text-center font-black text-gray-400 uppercase tracking-widest text-xs border-r border-b border-gray-100">
                                            {d}
                                        </div>
                                    ))}

                                    {/* Boş Günler */}
                                    {blanks.map((_, i) => <div key={`b-${i}`} className="bg-gray-50/30 border-r border-b border-gray-100 aspect-square lg:aspect-auto lg:h-36" />)}

                                    {/* Gerçek Günler */}
                                    {days.map(d => {
                                        const key = `${currentYear}-${selectedMonth}-${d}`;
                                        const dayEvents = eventMap[key] || [];
                                        const firstEvent = dayEvents[0];
                                        const colorInfo = firstEvent ? CAT_COLORS[firstEvent.category] || CAT_COLORS['Default'] : null;

                                        const isToday = currentYear === today.getFullYear() && selectedMonth === today.getMonth() && d === today.getDate();

                                        // --- EKRAN KENARLARI İÇİN DİNAMİK HİZALAMA MANTIĞI ---
                                        // Günün hangi sütuna (0-6) denk geldiğini buluyoruz (Pazartesi=0, Pazar=6)
                                        const colIndex = (firstDay + d - 1) % 7;

                                        let tooltipPosition = "left-1/2 -translate-x-1/2 origin-bottom";
                                        let arrowPosition = "left-1/2 -translate-x-1/2";

                                        if (colIndex === 0 || colIndex === 1) {
                                            // Sol kenardaki günler (Pzt, Salı) için sağa doğru açıl
                                            tooltipPosition = "left-0 sm:-left-2 origin-bottom-left";
                                            arrowPosition = "left-6 sm:left-10";
                                        } else if (colIndex === 5 || colIndex === 6) {
                                            // Sağ kenardaki günler (Cmt, Pzr) için sola doğru açıl
                                            tooltipPosition = "right-0 sm:-right-2 origin-bottom-right";
                                            arrowPosition = "right-6 sm:right-10";
                                        }

                                        return (
                                            <div
                                                key={d}
                                                className={`group relative p-3 md:p-5 border-r border-b border-gray-100 aspect-square lg:aspect-auto lg:h-36 transition-colors cursor-default
                          ${colorInfo ? colorInfo.softBg : 'hover:bg-blue-50/30'}
                          ${isToday && !colorInfo ? 'bg-blue-50/20' : ''}
                        `}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className={`text-xl md:text-2xl font-black ${colorInfo ? colorInfo.text : (isToday ? 'text-[#2aa0f5]' : 'text-gray-300 group-hover:text-gray-900')
                                                        }`}>
                                                        {d}
                                                    </span>

                                                    {/* Eğer o gün birden fazla etkinlik varsa küçük ek noktalar göster */}
                                                    {dayEvents.length > 1 && (
                                                        <div className="flex gap-1.5 mt-1.5">
                                                            {dayEvents.slice(1, 4).map((ev, idx) => (
                                                                <div key={idx} className={`w-2 h-2 rounded-full ${CAT_COLORS[ev.category]?.bg || 'bg-gray-400'}`}></div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Masaüstünde ilk etkinliğin adını kutu içinde önizleme olarak göster */}
                                                {firstEvent && (
                                                    <div className="hidden lg:block mt-3">
                                                        <div className={`text-xs font-bold leading-tight ${colorInfo?.text} line-clamp-2`}>
                                                            {firstEvent.title}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* HOVER TOOLTIP (Akıllı Yönelimli Bilgi Penceresi) */}
                                                {dayEvents.length > 0 && (
                                                    <div className={`absolute bottom-full mb-4 w-72 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none border border-gray-100 scale-95 group-hover:scale-100 ${tooltipPosition}`}>
                                                        {/* Dinamik hizalanan küçük ok */}
                                                        <div className={`absolute bottom-[-10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white ${arrowPosition}`}></div>

                                                        {dayEvents.map((ev, idx) => (
                                                            <div key={idx} className={idx > 0 ? "mt-5 pt-5 border-t border-gray-50" : ""}>
                                                                <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${CAT_COLORS[ev.category]?.text || 'text-gray-600'}`}>
                                                                    {ev.category}
                                                                </span>
                                                                <h4 className="text-lg font-black text-gray-900 leading-tight mb-2">{ev.title}</h4>
                                                                <p className="text-sm text-gray-500 leading-relaxed">{ev.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
        /* Tooltip'in stabil açılması için */
        .group:hover .group-hover\:opacity-100 {
          opacity: 1 !important;
          visibility: visible !important;
          /* translate-x gibi dönüşümleri bozmamak için transform sıfırlaması kaldırıldı, sadece opacity ve görünürlük kontrol ediliyor */
        }
      `}</style>
        </div>
    );
}