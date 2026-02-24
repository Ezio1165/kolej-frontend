import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Corporate College",
    description: "Get in touch with us via phone, email, or visit our campus.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-gray-600">We are here to answer your questions.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Info */}
                    <div className="bg-blue-50 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 flex-shrink-0">
                                    📍
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Address</h3>
                                    <p className="text-gray-600">Ornek District, School Street No:1<br />Besiktas / Istanbul</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 flex-shrink-0">
                                    📞
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+90 (212) 000 00 00</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 flex-shrink-0">
                                    ✉️
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600">info@collegewebsite.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="mt-8 h-64 rounded-xl overflow-hidden shadow-sm border border-blue-100">
                            <iframe
                                src="[https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8!2d28.9!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOMKwNTQnMDAuMCJF!5e0!3m2!1sen!2str!4v1234567890](https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.8!2d28.9!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOMKwNTQnMDAuMCJF!5e0!3m2!1sen!2str!4v1234567890)"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none" placeholder="Your message..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
