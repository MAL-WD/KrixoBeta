import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Main Header */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white/8 backdrop-blur-2xl rounded-full shadow-lg border border-white/20">
                <div className="flex justify-between items-center py-2 px-4 sm:px-6 md:px-8">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20' src={logo} alt="Logo" />
                    </div>
                    
                    {/* Desktop Navigation - Hidden on tablet and mobile */}
                    <nav className="hidden lg:flex gap-4 xl:gap-8 text-white font-semibold text-base xl:text-lg">
                        <ul className="flex gap-4 xl:gap-8">
                            <li><a href="/#Home" className="hover:text-yellow transition-colors">الرئيسية</a></li>
                            <li><a href="/#About" className="hover:text-yellow transition-colors">من نحن</a></li>
                            <li><a href="/#Services" className="hover:text-yellow transition-colors">خدماتنا</a></li>
                            <li><a href="/#Testimonials" className="hover:text-yellow transition-colors">شهادات</a></li>
                            <li><a href="/#Contact" className="hover:text-yellow transition-colors">اتصل بنا</a></li>
                        </ul>
                    </nav>
                    
                    {/* Desktop CTA Button - Hidden on tablet and mobile */}
                    <div className="flex items-center gap-2 hidden lg:flex">
                        <Link to={'/contact'} className="flex-shrink-0">
                            <button 
                                style={{fontWeight:'600'}} 
                                className="border bg-yellow cursor-pointer text-blue px-4 xl:px-8 py-2 xl:py-4.5 rounded-full text-sm xl:text-xl font-bold hover:bg-yellow/90 transition-colors whitespace-nowrap"
                            > 
                                اطلب الخدمة 
                            </button>
                        </Link>
                        <Link to={'/login'} className="flex-shrink-0">
                            <button 
                                style={{fontWeight:'600'}} 
                                className="border border-blue-700 bg-white text-blue-700 px-4 xl:px-8 py-2 xl:py-4.5 rounded-full text-sm xl:text-xl font-bold hover:bg-blue-50 hover:scale-105 hover:shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                            > 
                                تسجيل الدخول
                            </button>
                        </Link>
                    </div>
                    
                    {/* Mobile Menu Button - Visible on tablet and mobile */}
                    <div className="lg:hidden flex-shrink-0">
                        <button onClick={toggleMenu} className="p-2">
                            {isOpen ? <FaTimes color='white' size={20} /> : <FaBars size={20} color='white'/>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed top-20 sm:top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-md bg-white/10 backdrop-blur-2xl rounded-xl shadow-lg border border-white/20 py-4 px-4"
                >
                    <nav className="flex flex-col gap-4 font-semibold text-base sm:text-lg w-full">
                        <ul className="flex flex-col gap-4 items-center text-white w-full">
                            <li className="w-full text-center">
                                <a 
                                    href="/#Home" 
                                    onClick={toggleMenu}
                                    className="block py-2 hover:text-yellow transition-colors"
                                >
                                    الرئيسية
                                </a>
                            </li>
                            <li className="w-full text-center">
                                <a 
                                    href="/#About" 
                                    onClick={toggleMenu}
                                    className="block py-2 hover:text-yellow transition-colors"
                                >
                                    من نحن
                                </a>
                            </li>
                            <li className="w-full text-center">
                                <a 
                                    href="/#Services" 
                                    onClick={toggleMenu}
                                    className="block py-2 hover:text-yellow transition-colors"
                                >
                                    خدماتنا
                                </a>
                            </li>
                            <li className="w-full text-center">
                                <a 
                                    href="/#Testimonials" 
                                    onClick={toggleMenu}
                                    className="block py-2 hover:text-yellow transition-colors"
                                >
                                    شهادات
                                </a>
                            </li>
                            <li className="w-full text-center">
                                <a 
                                    href="/#Contact" 
                                    onClick={toggleMenu}
                                    className="block py-2 hover:text-yellow transition-colors"
                                >
                                    اتصل بنا
                                </a>
                            </li>
                            <li className="w-full text-center border-t border-white/20 pt-3">
                                <a 
                                    href="tel:+2130674677338"
                                    className="block py-2 text-yellow font-bold"
                                >
                                    +213 659 21 02 65
                                </a>
                            </li>
                        </ul>
                    </nav>
                    
                    {/* Mobile CTA Buttons */}
                    <div className="mt-4 w-full flex flex-col gap-2">
                        <Link to={'/contact'} onClick={toggleMenu}>
                            <button className="w-full border bg-yellow cursor-pointer text-blue border-blue-700 px-4 py-3 rounded-full text-lg font-bold hover:bg-yellow/90 transition-colors">
                                اطلب الخدمة
                            </button>
                        </Link>
                        <Link to={'/login'} onClick={toggleMenu}>
                            <button className="w-full border border-blue-700 bg-white text-blue-700 px-4 py-3 rounded-full text-lg font-bold hover:bg-blue-50 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
                                تسجيل الدخول
                            </button>
                        </Link>
                        <span className="block text-xs text-blue-900 font-medium mt-2 text-center">خاص فقط للإدارة أو من يريد الانضمام كعامل</span>
                    </div>
                </div>
            )}

            {/* Overlay for mobile menu */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                    onClick={toggleMenu}
                />
            )}
        </>
    );
};

export default Header;
