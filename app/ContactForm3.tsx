'use client';

import { useState } from 'react';

interface Location {
    name: string;
    address: string;
    x: string;
    y: string;
}

export default function ContactUsWithMap() {
    const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

    const locations: Location[] = [
        { name: 'San Francisco', address: '100 Smith Street, CA 94102', x: '15%', y: '35%' },
        { name: 'New York', address: '100 Smith Street, NY 10001', x: '22%', y: '32%' },
        { name: 'London', address: '100 Smith Street, W1A 1AA', x: '48%', y: '30%' },
        { name: 'Paris', address: '100 Smith Street, 75001', x: '49%', y: '33%' },
        { name: 'Dubai', address: '100 Smith Street, UAE', x: '60%', y: '38%' },
        { name: 'Singapore', address: '100 Smith Street, 018956', x: '75%', y: '48%' },
        { name: 'Tokyo', address: '100 Smith Street, 100-0001', x: '82%', y: '35%' },
        { name: 'Melbourne', address: '100 Smith Street, VIC 3006 AU', x: '85%', y: '65%' },
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-semibold mb-2">Contact us</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get in touch with our team
                    </h1>
                    <p className="text-gray-600 text-lg">
                        We have the team and know-how to help you guide the future
                    </p>
                </div>

                {/* SVG World Map */}
                <div className="relative mb-16 bg-gray-50 rounded-xl border border-gray-200 p-8 overflow-hidden">
                    <div className="relative w-full" style={{ height: '500px' }}>
                        {/* World Map Image */}
                        <img
                            src="/US.png"
                            alt="World Map"
                            className="w-full h-full object-fit "
                        />

                        {/* Dotted Overlay */}
            
                        {/* Location Pins */}
                       

                        {/* Tooltip */}
                       
                    </div>
                </div>


                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Chat to Sales */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat to sales</h3>
                        <p className="text-gray-600 text-sm mb-4">Speak to our friendly team.</p>
                        <a href="mailto:sales@untitledui.com" className="text-blue-600 font-medium text-sm hover:underline">
                            sales@untitledui.com
                        </a>
                    </div>

                    {/* Chat to Support */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat to support</h3>
                        <p className="text-gray-600 text-sm mb-4">We're here to help.</p>
                        <a href="mailto:support@untitledui.com" className="text-blue-600 font-medium text-sm hover:underline">
                            support@untitledui.com
                        </a>
                    </div>

                    {/* Visit Us */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit us</h3>
                        <p className="text-gray-600 text-sm mb-4">Visit our office HQ.</p>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline">
                            View on Google Maps
                        </a>
                    </div>

                    {/* Call Us */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Call us</h3>
                        <p className="text-gray-600 text-sm mb-4">Mon-Fri from 8am to 5pm.</p>
                        <a href="tel:+15550000000" className="text-blue-600 font-medium text-sm hover:underline">
                            +1 (555) 000-0000
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
