"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Nav() {
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);
    const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

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
            const scrollDifference = currentScrollY - lastScrollY.current;
            
            // Always show nav at the top
            if (currentScrollY < scrollThreshold) {
                setShow(true);
                return;
            }
            
            // Only trigger hide/show if scroll difference is significant
            if (Math.abs(scrollDifference) > 5) {
                if (scrollDifference > 0) {
                    // Scrolling down
                    setShow(false);
                } else {
                    // Scrolling up
                    setShow(true);
                }
            }
            
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 h-[100px] transition-transform duration-300 bg-white shadow-md ${show ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <Link href="/">
                    <Image src="/360logoRed.png" alt="logo" width={100} height={100} />
                </Link>
                <div className="flex justify-between items-center gap-4">
                    <button onClick={() => scrollToSection('home')} className="hover:text-[#CF2030] transition-colors">Home</button>
                    <button onClick={() => scrollToSection('about')} className="hover:text-[#CF2030] transition-colors">About</button>
                    <button onClick={() => scrollToSection('members')} className="hover:text-[#CF2030] transition-colors">Members</button>
                </div>
                <div className="flex justify-between items-center">
                    <Link href="https://bnicolorado.com/en-US/chapterdetail?chapterId=iHsLsBdjpHuuIczj9WemdA%3D%3D&name=BNI+BNI+360+Impact" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-[#CF2030] flex items-center gap-2 group">
                        Official BNI Page
                        <div className="text-[#CF2030] text-4xl cursor-pointer pb-1 transition-transform duration-300 group-hover:translate-x-1">
                            ›
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}