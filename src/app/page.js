"use client";

import Image from "next/image";

import Nav from "./components/Nav";

import { useRive } from 'rive-react';
import LiquidGlass from 'liquid-glass-react'
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

import { SanityDocument } from "next-sanity";

import { client } from "../sanity/lib/client";
// import MemberCard from "./components/MemberCard";
import Link from "next/link";
import Particles from "react-tsparticles";
import { FaArrowDown } from "react-icons/fa";
import { loadTrianglesPreset } from "tsparticles-preset-triangles";

import MemberCardSmall from "./components/MemberCardSmall/MemberCardSmall.js";


const MEMBERS_QUERY = `*[
  _type == "member"
]|order(lastName asc){_id, firstName, lastName, image{asset->{url}}, phone, email, company, position, bio, linkedin, instagram, facebook, website}`;

const options = { next: { revalidate: 30 } };

export default function Home() {
  const { rive, RiveComponent } = useRive({
    src: "bni_tiles.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    client.fetch(MEMBERS_QUERY).then((data) => {
      setMembers(data);
      console.log("Fetched members:", data);
      setLoading(false);
    });
  }, []);

  const [buttonVisible, setButtonVisible] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    // Detect browsers
    const userAgent = navigator.userAgent.toLowerCase();
    const isFirefoxBrowser = userAgent.includes('firefox');
    const isSafariBrowser = userAgent.includes('safari') && !userAgent.includes('chrome');
    
    setIsFirefox(isFirefoxBrowser);
    setIsSafari(isSafariBrowser);
  }, []);

  useEffect(() => {
    // Handle window resize with debouncing
    let resizeTimeout;
    
    const handleResize = () => {
      setIsResizing(true);
      
      // Clear existing timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      
      // Set new timeout
      resizeTimeout = setTimeout(() => {
        setIsResizing(false);
      }, 300); // Wait 300ms after resize stops
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  useEffect(() => {
    // Trigger fade-in after 1 second
    const timeout = setTimeout(() => {
      setButtonVisible(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Show particles after a delay to reduce initial load
    const timeout = setTimeout(() => {
      setParticlesVisible(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const particlesInit = async (Engine) => {
    await loadTrianglesPreset(Engine);
  };
  const memberParticlesInit = async (Engine) => {
    await loadTrianglesPreset(Engine);
  };

 
  const particlesOptions = {
    preset: "triangles",
    background: { color: "transparent" },
    fullScreen: false,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      number: {
        value: 80, // Reduced for better performance
        density: {
          enable: true,
        },
      },
      links: {
        distance: 160,
        enable: true,
        triangles: {
          enable: true,
          opacity: 0.6 // Reduced opacity
        }
      },
      shape: {
        type: "circle",
      },
      color: { value: "#CF2030" },
      opacity: { value: 0.6 }, // Reduced opacity
      size: { value: 1.5 }, // Reduced size
      move: { enable: true, speed: 0.15 }, // Reduced speed
    },
    style: { position: 'absolute', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' },
  };

  const memberParticlesOptions = {
    preset: "triangles",
    background: { color: "transparent" },
    fullScreen: false,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      number: {
        value: 80, // Reduced for better performance
        density: {
          enable: true,
        },
      },
      links: {
        distance: 170,
        enable: true,
        triangles: {
          enable: true,
          opacity: 0.5
        }
      },
      shape: {
        type: "circle",
      },
      color: { value: "#ffffff" },
      opacity: { value: 0.8 },
      size: { value: 0.6 }, // Reduced size
      move: { enable: true, speed: 0.1 }, // Very slow movement
    },
    style: { position: 'absolute', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' },
  };


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.6 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      >
        <div className="flex flex-col items-center justify-center w-[100%] overflow-x-hidden pageAll pt-[100px]">
          <div className="navCont">
            <Nav />
          </div>
          <div id="home" className="heroCont">
            <div className="heroContBg"></div>
            <div className="heroContParticles">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.6 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                >
                  {particlesVisible && !isResizing && (
                    <Particles id="tsparticles-hero" init={particlesInit} options={particlesOptions} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="heroTitleText">
              Connecting Professionals<br />Creating Opportunities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="heroSubText">
              Expand your network with BNI 360 Impact.<br />Grow your business through real relationships.
            </motion.p>
            {isFirefox || isSafari ?
              <div className={`heroButton ${buttonVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Link
                  href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Our Chapter
                </Link>
              </div>
              :
              <div className={`heroButtonGlass transition-opacity duration-1000 ease-linear ${buttonVisible ? 'opacity-100' : 'opacity-0'}`} >
                <LiquidGlass
                  displacementScale={40}
                  blurAmount={0.3}
                  saturation={100}
                  aberrationIntensity={1}
                  elasticity={0.05}
                  cornerRadius={32}
                  mode="prominent"
                  overLight={false}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
                >
                  <Link
                    href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ zIndex: 20 }}

                  >
                    Visit Our Chapter
                  </Link>
                </LiquidGlass>
              </div>
            }

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              viewport={{ once: true }}
              className="heroRiveContainer"
            >
              <div className="w-[100%] h-[100%] z-10">
                <RiveComponent />
              </div>
            </motion.div>

          </div>
          <div id="about" className="flex flex-col items-center justify-center w-[100%] aboutSection">
            <div className="flex flex-row items-center justify-center w-full gap-10 ">
              <div className="aboutLeft relative flex items-center justify-center w-1/2 ">
                <div className="aboutRedBox">
                  <div className="aboutHandshakeContainer">
                    <Image src="/handshake.jpg" alt="logo" fill objectFit="cover" className="aboutHandshake" />
                  </div>
                {isFirefox || isSafari ? <div className="aboutMemberBoxFirefox " style={{ position: 'absolute', top: '80%', left: '70%', transform: 'translate(-50%, -50%)', zIndex: 300 }}>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Image src="/user.png" alt="logo" width={30} height={30} className="aboutMemberIcon" />
                      <p className="aboutMemberText">{members.length}<br /></p>
                    </div>

                    <p className="aboutMemberText">members</p>
                  </div> :
                   <LiquidGlass
                    displacementScale={10}
                    blurAmount={0.01}
                    saturation={100}
                    aberrationIntensity={1}
                    elasticity={0.05}
                    cornerRadius={50}
                    mode="standard"
                    overLight={false}
                    style={{ position: 'absolute', top: '80%', left: '70%', transform: 'translate(-50%, -50%)', zIndex: 30 }}
                  >
                    <div className="aboutMemberBox ">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Image src="/user.png" alt="logo" width={30} height={30} className="aboutMemberIcon" />
                        <p className="aboutMemberText">{members.length}<br /></p>
                      </div>

                      <p className="aboutMemberText">members</p>
                    </div>
                  </LiquidGlass>}
                </div>
              </div>
              <div className="aboutRight flex flex-col items-center justify-center text-left w-[40%] gap-4">
                <h1 className="text-4xl font-bold w-[100%]">Why Join Our Chapter?</h1>
                <p className="text-lg font-light w-[100%]">Real connections. Tangible results.</p>
                <p className="text-lg w-[100%]">Whether you&apos;re a seasoned entrepreneur or just starting out, our network brings together professionals who are serious about growing their businesses through trust, referrals, and shared knowledge. With regular meetings, valuable resources, and a supportive community, you don&apos;t just meet people &mdash; you build lasting partnerships.</p>
                <div className="aboutButtonContainer">
                  {isFirefox || isSafari ?
                    <div className="aboutButtonFirefox">
                      <Link
                        href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Schedule A Visit
                      </Link>
                    </div>
                    :
                    <LiquidGlass
                      displacementScale={15}
                      blurAmount={0.03}
                      saturation={100}
                      aberrationIntensity={1}
                      elasticity={0.05}
                      cornerRadius={32}
                      mode="standard"
                      overLight={false}
                      style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translate(-50%, -50%)' }}
                    >
                      <Link
                        href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aboutButton">
                        Schedule A Visit
                      </Link>
                    </LiquidGlass>}
                </div>
              </div>
            </div>
          </div>
          <div id="members" className="flex flex-col items-center justify-center w-[100%] memberSection text-center">
            <h1 className="membersTitle font-bold w-[100%] mb-10">Meet Our Members</h1>
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-gray-300 border-t-[#CF2030] rounded-full"
                />
                <p className="text-gray-600 text-lg">Loading members...</p>
              </div>
            ) : (
              <>
                <div className="memberGrid">
                  {members?.map((member, index) => (
                    <MemberCardSmall
                      key={index} // Use member._id as key instead of index
                      member={member}
                      index={index}
                    />
                  ))}

                </div>
                <div className="memberContParticles">
                  {particlesVisible && !isResizing && (
                    <Particles id="tsparticles-member" init={memberParticlesInit} options={memberParticlesOptions} />
                  )}
                </div>
              </>
            )}
          </div>
          <div id='footer' className="flex flex-col items-center justify-center w-[100%] h-[300px] footerSection bg-[#CF2030B3] text-white mt-20">
            <div className="flex flex-row items-center justify-center w-full gap-10 max-w-7xl mx-auto px-6">
              <div className="footerLeft flex flex-col items-start justify-center w-1/3 gap-4">
                <Image src="/360logoRed.png" alt="logo" width={120} height={120} className="filter brightness-0 invert" />
                <p className="text-[#441111] text-sm">Connecting professionals and creating opportunities through meaningful business relationships.</p>
              </div>
              <div className="footerCenter flex flex-col items-center justify-center w-1/3 gap-4">
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <div className="flex flex-col items-center gap-2 text-[#441111]">
                  <a href="https://bnicolorado.com/en-US/chapterdetail?chapterId=iHsLsBdjpHuuIczj9WemdA%3D%3D&name=BNI+BNI+360+Impact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Official BNI Website</a>
                  <a href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Register to Visit</a>
                </div>
              </div>
              <div className="footerRight flex flex-col items-end justify-center w-1/3 gap-4">
                <h3 className="text-xl font-semibold">Quick Links</h3>
                <div className="flex flex-col items-end gap-2 text-[#441111]">
                  <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
                  <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button>
                  <button onClick={() => document.getElementById('members').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Members</button>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-700">
              <Link href="/studio" target="_blank" rel="noopener noreferrer" className="text-[#441111] text-sm">BNI 360</Link>
              <a
                href="https://servaldesigns.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#441111] hover:text-white transition-colors text-sm"
              >
                Powered by Serval Designs
              </a>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col items-center justify-center w-[100%] memberSectionMobile text-center">
          <div className="heroContMobile">
            <div className="heroContBgMobile">
              <div className="flex flex-row items-center justify-between gap-4 w-[90%]">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="heroButtonContainerMobile"
                >
                  <Link href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284" target="_blank" rel="noopener noreferrer" className="heroButtonMobile">Register to Visit</Link>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  
                >
                  <Link href="https://bnicolorado.com/en-US/chapterdetail?chapterId=iHsLsBdjpHuuIczj9WemdA%3D%3D&name=BNI+BNI+360+Impact" target="_blank" rel="noopener noreferrer" className="heroButtonMobile">Offical BNI Website</Link>
                </motion.div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="heroImageMobile"
                >
                  <Image src="/360logoRed.png" alt="logo" fill objectFit="contain"  />
                </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="heroTitleTextMobile"
                  >Connecting Professionals<br />Creating Opportunities</motion.h3>
                  
              </div>
             
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center justify-center gap-2"
              >
                <h3>Scroll to see our members</h3>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <FaArrowDown />
                </motion.div>
              </motion.div>
              
            </div>
          </div>
            <h1 className="membersTitle font-bold w-[100%] mb-6 mt-6">Meet Our Members</h1>
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-gray-300 border-t-[#CF2030] rounded-full"
                />
                <p className="text-gray-600 text-lg">Loading members...</p>
              </div>
            ) : (
              <>
                <div className="memberGrid">
                  {members?.map((member, index) => (
                    <MemberCardSmall
                      key={index} // Use member._id as key instead of index
                      member={member}
                      index={index}
                    />
                  ))}

                </div>
                
              </>
            )}
            <div className="flex flex-row items-center justify-center w-full gap-10 max-w-7xl mx-auto px-6 mt-8 mb-8 pt-8 border-t border-gray-700">
              <Link href="/studio" target="_blank" rel="noopener noreferrer" className="text-[#441111] text-sm">BNI 360 Impact</Link>
              <a
                href="https://servaldesigns.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#441111] hover:text-white transition-colors text-sm"
              >
                Powered by Serval Designs
              </a>
            </div>
          </div>
      </motion.div>
    </AnimatePresence>
  );
}
