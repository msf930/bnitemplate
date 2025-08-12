"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Nav({logo, officialURL}) {
    const [activeSection, setActiveSection] = useState('home');
    const lastScrollY = useRef(0);
    const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

    const sectionIds = ['home', 'about', 'members'];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window === "undefined") return;
            const currentScrollY = window.scrollY;
            
            // Always show nav at the top
            if (currentScrollY < scrollThreshold) {
                setActiveSection('home');
                return;
            }
            
            // Scrollspy logic
            let found = false;
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const section = document.getElementById(sectionIds[i]);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 120) { // nav height + margin
                        setActiveSection(sectionIds[i]);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) setActiveSection('home');
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[9999] h-[100px] bg-white shadow-md"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
        >
            <div className="grid grid-cols-3 justify-center items-center px-10 w-full h-[100px]">
                
                    <Image src={logo ? logo.asset.url : '/BNILogoR.png'} alt="logo" width={100} height={100} />
                
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => scrollToSection('home')}
                        className={`transition-colors border-b-2 ${activeSection === 'home' ? 'text-[#CF2030] border-[#CF2030]' : 'border-transparent hover:text-[#CF2030]'}`}
                    >Home</button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className={`transition-colors border-b-2 ${activeSection === 'about' ? 'text-[#CF2030] border-[#CF2030]' : 'border-transparent hover:text-[#CF2030]'}`}
                    >About</button>
                    <button
                        onClick={() => scrollToSection('members')}
                        className={`transition-colors border-b-2 ${activeSection === 'members' ? 'text-[#CF2030] border-[#CF2030]' : 'border-transparent hover:text-[#CF2030]'}`}
                    >Members</button>
                </div>
                <div className="flex justify-end items-center">
                    <Link 
                    href={officialURL ? officialURL : 'https://bnicolorado.com/en-US/advancedchaptersearch'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cursor-pointer text-[#CF2030] flex justify-center items-center group">
                        Official BNI Page
                        <div className="text-[#CF2030] text-4xl cursor-pointer pb-1 transition-transform duration-300 opacity-0  group-hover:opacity-100 group-hover:translate-x-2">
                            -
                        </div>
                        <div className="text-[#CF2030] text-4xl cursor-pointer pb-1 transition-transform duration-300 -translate-x-2 group-hover:translate-x-1">
                            ›
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}