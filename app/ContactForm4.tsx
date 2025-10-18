"use client";

import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-6 md:px-16 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-40 md:gap-50 relative">
                {/* Left Section */}
                <div>
                    <h1 className="text-3xl font-bold">
                        W<span className="text-purple-500">ē</span>SIBL
                    </h1>
                    <p className="text-sm  mt-1 tracking-wide">TECHNOLOGIES</p>

                    <div className="flex items-center gap-4 mt-6">
                        <Link href="#" target="_blank">
                            <FaInstagram className="text-2xl text-pink-500 hover:text-pink-400 transition" />
                        </Link>
                        <Link href="#" target="_blank">
                            <FaLinkedin className="text-2xl text-blue-500 hover:text-blue-400 transition" />
                        </Link>
                        <Link href="mailto:info@wesibl.com">
                            <MdEmail className="text-3xl text-sky-500 hover:text-sky-400 transition" />
                        </Link>
                    </div>

                    <p className="text-xs text-gray-400 mt-6">
                        © Copyright 2025 - WeēSIBL Technologies Pvt. Ltd.
                    </p>
                </div>

                {/* India Section */}
                {/* <div style={{marginTop : "200px"}}>
          <div className="flex items-center gap-2">
            <IoLocationSharp className="text-purple-600 text-lg" />
            <h3 className="font-semibold">India</h3>
          </div>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            Candor Techspace, Noida-Greater Noida Expo, Sector 135, Noida, Uttar Pradesh, 201304
          </p>
        </div> */}

                {/* Center Navigation */}
                <div className="flex flex-col gap-2">
                    <Link href="#" className="hover:text-purple-400 font-semibold">Home</Link>
                    <Link href="#" className="hover:text-purple-400 font-semibold">Our Journey</Link>
                    <Link href="#" className="hover:text-purple-400 font-semibold">Our Mission</Link>
                    <Link href="#" className="hover:text-purple-400 font-semibold">Our Partners</Link>
                    <Link href="#" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                        Contact Us
                    </Link>

                    {/* US Location placed below "Our Partners" */}
                    <div style={{display : "flex" , gap : "20px"}} className="mt-4">

                         <div >
                            <div className="flex items-center gap-2">
                                <IoLocationSharp className="text-purple-600 text-lg" />
                                <h3 className="font-semibold">India</h3>
                            </div>
                            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                                Candor Techspace, Noida-Greater Noida Expo, Sector 135, Noida, Uttar Pradesh, 201304
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <IoLocationSharp className="text-purple-600 text-lg" />
                                <h3 className="font-semibold">US</h3>
                            </div>
                            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                                473, Mundel Place, Ste US706128, Hillside, New Jersey, 07205
                            </p>
                        </div>

                       


                    </div>
                </div>

                {/* Policies */}
                <div className="flex flex-col gap-2">
                    <Link href="#" className="hover:text-purple-400">Privacy Policy</Link>
                    <Link href="#" className="hover:text-purple-400">Terms and conditions</Link>
                    <Link href="#" className="hover:text-purple-400">Cookie Policy</Link>

                    <div className="absolute right-0 bottom-0 rotate-90 text-xs tracking-wider text-gray-400 flex items-center gap-1">
                        BACK TO TOP <span className="text-purple-400">↑</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
