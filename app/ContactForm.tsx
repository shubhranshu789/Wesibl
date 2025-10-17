'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface ContactUsProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
}

export default function ContactForm({
  title = "Let's talk",
  subtitle = "To request a quote or want to meet up for coffee, contact us directly or fill out the form and we will get back to you promptly.",
  contactInfo = {
    address: "473, Mundet Place, Ste US706128, Hillside, New Jersey, 07205",
    phone: "+1 (203) 302-9545",
    email: "hello@wesibl.com"
  },
  socialLinks = [
    // { name: 'Facebook', url: '#', icon: <Facebook /> },
    // { name: 'Twitter', url: '#', icon: <Twitter /> },
    { name: 'Instagram', url: '#', icon: <Instagram /> },
    { name: 'LinkedIn', url: '#', icon: <LinkedIn /> }
  ],
  serviceId = "service_7cgzkag",
  templateId = "template_rb70ara",
  publicKey = "TW0MZkqiRtXpFp76Z"
}: ContactUsProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (formRef.current) {
      emailjs
        .sendForm(serviceId, templateId, formRef.current, publicKey)
        .then(
          () => {
            setSuccess(true);
            setIsLoading(false);
            formRef.current?.reset();
            setTimeout(() => setSuccess(false), 5000);
          },
          (error) => {
            console.error("❌ FAILED...", error);
            alert("Failed to send message. Try again.");
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {subtitle}
              </p>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-5 flex-grow flex flex-col">
              {/* Name Input */}
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              {/* Message Input */}
              <div className="flex-grow flex flex-col">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full flex-grow px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none min-h-[120px]"
                  placeholder="Type something if you want..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || success}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${success
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  } disabled:opacity-70 disabled:cursor-not-allowed mt-auto`}
              >
                {success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent Successfully!
                  </>
                ) : isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Illustration & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col h-full justify-between"
          >
            {/* Illustration */}
            <div className="relative flex-shrink-0">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-pink-400 rounded-full opacity-60" />
                  <div className="absolute bottom-6 left-6 w-6 h-6 bg-yellow-400 rounded-full opacity-60" />
                  <div className="absolute top-1/2 left-4 w-5 h-5 bg-purple-400 rounded-full opacity-60" />
                  <div className="absolute bottom-10 right-10 w-4 h-4 bg-cyan-400 rounded-full opacity-60" />

                  {/* Email envelope illustration */}
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-full aspect-square max-w-xs mx-auto"
                    >
                      <div className="relative">
                        {/* Envelope */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-2xl">
                          <div className="bg-white rounded-lg p-4 space-y-2">
                            {/* Document lines */}
                            <div className="h-2 bg-gray-200 rounded w-3/4" />
                            <div className="h-2 bg-gray-200 rounded w-full" />
                            <div className="h-2 bg-gray-200 rounded w-5/6" />
                          </div>
                        </div>

                        {/* Floating elements */}
                        <motion.div
                          animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Mail className="w-7 h-7 text-white" />
                        </motion.div>

                        <motion.div
                          animate={{ x: [0, -12, 0], rotate: [0, 12, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="absolute -bottom-4 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg shadow-lg flex items-center justify-center"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
                        >
                          <Send className="w-8 h-8 text-white" />
                        </motion.div>

                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-6 -left-3 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg"
                        >
                          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-purple-500 rounded-full" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Contact Information */}
            <div className="space-y-5 mt-8">
              {/* Address */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                  <svg className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <rect y="0" fill="#F5F5F5" width="512" height="512" />
                      <g>
                        <rect y="0" fill="#FF4B55" width="512" height="39.384" />
                        <rect y="78.769" fill="#FF4B55" width="512" height="39.384" />
                        <rect y="157.538" fill="#FF4B55" width="512" height="39.385" />
                        <rect y="236.308" fill="#FF4B55" width="512" height="39.384" />
                        <rect y="315.077" fill="#FF4B55" width="512" height="39.385" />
                        <rect y="393.846" fill="#FF4B55" width="512" height="39.385" />
                        <rect y="472.615" fill="#FF4B55" width="512" height="39.385" />
                      </g>
                      <rect y="0" fill="#41479B" width="256" height="275.692" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Address</h3>
                  <p className="text-gray-600 text-sm">{contactInfo.address}</p>
                </div>
              </motion.div>

              {/* Phone */}
              {/* <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Phone</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-600 text-sm hover:text-purple-600 transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </motion.div> */}

              {/* Email */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Email</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 text-sm hover:text-purple-600 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Social Media Icon Components (same as before)
function Facebook() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function Twitter() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function Instagram() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedIn() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

