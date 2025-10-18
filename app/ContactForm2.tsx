'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

interface Location {
  name: string;
  address: string;
  x: string;
  y: string;
}

export default function ContactMapSection() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Your EmailJS credentials
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

  const locations: Location[] = [
    { name: 'San Francisco', address: '100 Smith Street, CA 94102', x: '15%', y: '35%' },
    { name: 'New York', address: '100 Smith Street, NY 10001', x: '22%', y: '32%' },
    { name: 'Miami', address: '100 Smith Street, FL 33101', x: '20%', y: '45%' },
    { name: 'London', address: '100 Smith Street, W1A 1AA', x: '48%', y: '30%' },
    { name: 'Paris', address: '100 Smith Street, 75001', x: '49%', y: '33%' },
    { name: 'Berlin', address: '100 Smith Street, 10115', x: '51%', y: '29%' },
    { name: 'Dubai', address: '100 Smith Street, UAE', x: '60%', y: '38%' },
    { name: 'Singapore', address: '100 Smith Street, 018956', x: '75%', y: '48%' },
    { name: 'Tokyo', address: '100 Smith Street, 100-0001', x: '82%', y: '35%' },
    { name: 'Melbourne', address: '100 Smith Street, VIC 3006 AU', x: '85%', y: '65%' },
    { name: 'Sydney', address: '100 Smith Street, NSW 2000', x: '87%', y: '62%' },
  ];

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formRef.current) {
      emailjs
        .sendForm(serviceId, templateId, formRef.current, publicKey)
        .then(
          () => {
            setSuccess(true);
            setIsLoading(false);
            formRef.current?.reset();
            setTimeout(() => {
              setSuccess(false);
              setShowEmailForm(false);
            }, 3000);
          },
          (error) => {
            console.error('❌ FAILED...', error);
            setError('Failed to send message. Please try again.');
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold mb-2">Contact us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in touch with our team
          </h1>
          <p className="text-gray-600 text-lg">
            We have the team and know-how to help you guide the future
          </p>
        </div>

        {/* Dotted World Map */}
        <div className="relative bg-white rounded-xl border border-gray-200 p-8 mb-8 overflow-hidden">
          <div className="relative w-full h-[500px]">
            {/* Generate dotted map pattern */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#D1D5DB" />
                </pattern>
              </defs>
              {/* World map continents approximation using paths */}
              <g fill="url(#dots)">
                {/* North America */}
                <path d="M50,150 Q100,100 200,120 L250,180 Q230,240 180,250 L120,280 Q70,250 50,200 Z" />
                
                {/* South America */}
                <path d="M180,280 Q200,320 190,400 L170,450 Q140,440 130,400 L110,320 Q120,290 150,280 Z" />
                
                {/* Europe */}
                <path d="M380,130 Q420,110 450,130 L470,160 Q460,180 430,185 L390,170 Z" />
                
                {/* Africa */}
                <path d="M380,200 Q420,190 450,220 L460,300 Q450,360 420,380 L380,370 Q360,320 370,260 Z" />
                
                {/* Asia */}
                <path d="M470,120 Q550,100 650,140 L680,200 Q670,260 620,280 L550,270 Q500,240 480,200 L470,160 Z" />
                
                {/* Australia */}
                <path d="M650,350 Q700,340 730,360 L740,400 Q720,420 680,415 L650,395 Z" />
              </g>
            </svg>

            {/* Location Pins */}
            {locations.map((location, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: location.x, top: location.y }}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Animated ping effect */}
                <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                
                {/* Main pin */}
                <div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform"></div>
              </div>
            ))}

            {/* Tooltip */}
            {hoveredLocation && (
              <div
                className="absolute z-10 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl transform -translate-x-1/2 transition-all duration-200 pointer-events-none"
                style={{
                  left: hoveredLocation.x,
                  top: `calc(${hoveredLocation.y} - 80px)`,
                }}
              >
                <p className="font-semibold whitespace-nowrap">{hoveredLocation.name}</p>
                <p className="text-gray-300 text-xs whitespace-nowrap">{hoveredLocation.address}</p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Chat to Sales */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat to sales</h3>
            <p className="text-gray-600 text-sm mb-4">Speak to our friendly team.</p>
            <a href="mailto:sales@untitledui.com" className="text-blue-600 font-medium hover:underline text-sm">
              sales@untitledui.com
            </a>
          </div>

          {/* Chat to Support */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat to support</h3>
            <p className="text-gray-600 text-sm mb-4">We're here to help.</p>
            <a href="mailto:support@untitledui.com" className="text-blue-600 font-medium hover:underline text-sm">
              support@untitledui.com
            </a>
          </div>

          {/* Visit Us */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit us</h3>
            <p className="text-gray-600 text-sm mb-4">Visit our office HQ.</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline text-sm">
              View on Google Maps
            </a>
          </div>

          {/* Call Us */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call us</h3>
            <p className="text-gray-600 text-sm mb-4">Mon-Fri from 8am to 5pm.</p>
            <a href="tel:+15550000000" className="text-blue-600 font-medium hover:underline text-sm">
              +1 (555) 000-0000
            </a>
          </div>
        </div>

        {/* Get in Touch Button */}
        <div className="text-center">
          {!showEmailForm && (
            <button
              onClick={() => setShowEmailForm(true)}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Get in touch
            </button>
          )}

          {/* Email Form - Appears when button is clicked */}
          {showEmailForm && (
            <div className="mt-6 max-w-md mx-auto animate-fade-in">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Send us a message</h3>
                
                <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your email address"
                    required
                    disabled={isLoading || success}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />

                  <textarea
                    name="message"
                    placeholder="Your message (optional)"
                    rows={4}
                    disabled={isLoading || success}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEmailForm(false);
                        setError('');
                        setSuccess(false);
                      }}
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isLoading || success}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : success ? (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Sent!
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>

                {/* Success Message */}
                {success && (
                  <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you! We'll get back to you soon.
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add this to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
