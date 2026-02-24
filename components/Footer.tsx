import Link from "next/link";

interface FooterProps {
    siteName: string;
    description: string;
    footerText: string;
}

export default function Footer({ siteName, description, footerText }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0d121b] text-white pt-20 pb-10">
            <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-12">

                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold">{siteName}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {description || "Empowering the next generation with a vision for the future."}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-400">
                            <li><Link href="/hakkimizda" className="hover:text-blue-500 transition">About Us</Link></li>
                            <li><Link href="/programlar" className="hover:text-blue-500 transition">Academic Programs</Link></li>
                            <li><Link href="/haberler" className="hover:text-blue-500 transition">News & Announcements</Link></li>
                            <li><Link href="/iletisim" className="hover:text-blue-500 transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <div className="flex flex-col gap-3 text-sm text-gray-300">
                            <p>
                                <span className="block font-bold text-white mb-1">Address:</span>
                                Ornek District, School Street No:1, Istanbul
                            </p>
                            <p>
                                <span className="block font-bold text-white mb-1">Phone:</span>
                                +90 (212) 000 00 00
                            </p>
                            <p>
                                <span className="block font-bold text-white mb-1">Email:</span>
                                info@collegewebsite.com
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Stay Connected</h4>
                        <p className="text-gray-400 text-sm mb-4">Follow us on social media for the latest updates.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {currentYear} {siteName}. {footerText || "All rights reserved."}</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
