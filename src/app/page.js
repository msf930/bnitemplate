"use client";

import Image from "next/image";

import Nav from "./components/Nav";

import { useRive } from 'rive-react';
import LiquidGlass from 'liquid-glass-react'
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

import { SanityDocument } from "next-sanity";

import { client } from "../sanity/lib/client";
import MemberCard from "./components/MemberCard";
import Link from "next/link";

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
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    client.fetch(MEMBERS_QUERY).then((data) => {
      setMembers(data);
      console.log("Fetched members:", data);
      setLoading(false);
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.6 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      >
        <div className="flex flex-col items-center justify-center w-[100%] overflow-x-hidden pageAll">
          <Nav />
          <div id="home" className="heroCont">
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
              Expand your network with purpose.<br />Grow your business through real relationships.
            </motion.p>
            <Link href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284" target="_blank" rel="noopener noreferrer" className="heroButtonContainer">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.9 }}
                viewport={{ once: true }}
                className="heroButton"
              >
                Visit Our Chapter
              </motion.div>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              viewport={{ once: true }}
              className="heroRiveContainer"
            >
              <div className="w-[100%] h-[100%] cursor-pointer z-10">
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
                  <div className="aboutMemberBox absolute bottom-6 right-6 flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Image src="/user.png" alt="logo" width={30} height={30} className="aboutMemberIcon" />
                      <p className="aboutMemberText">{members.length}<br /></p>
                    </div>

                    <p className="aboutMemberText">members</p>
                  </div>
                </div>
              </div>
              <div className="aboutRight flex flex-col items-center justify-center text-left w-[40%] gap-4">
                <h1 className="text-4xl font-bold w-[100%]">Why Join Our Chapter?</h1>
                <p className="text-lg font-light w-[100%]">Real connections. Tangible results.</p>
                <p className="text-lg w-[100%]">Whether you&apos;re a seasoned entrepreneur or just starting out, our network brings together professionals who are serious about growing their businesses through trust, referrals, and shared knowledge. With regular meetings, valuable resources, and a supportive community, you don&apos;t just meet people &mdash; you build lasting partnerships.</p>
                <div className="aboutButtonContainer">
                  <Link href="https://bnicolorado.com/en-US/visitorregistration?chapterId=43284" target="_blank" rel="noopener noreferrer" className="aboutButton">Visit Our Chapter</Link>
                </div>
              </div>
            </div>
          </div>
          <div id="members" className="flex flex-col items-center justify-center w-[100%] memberSection text-center">
            <h1 className="text-4xl font-bold w-[100%] mb-10 mt-10">Meet Our Members</h1>
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
              <div className="flex flex-col flex-wrap items-center justify-center w-full gap-10 relative h-auto mb-30">
                {members?.map((member, index) => (
                  <MemberCard
                    key={index}
                    member={member}
                    index={index}
                    isExpanded={expandedIndex === index}
                    onExpand={() => handleCardExpand(index)}
                  />
                ))}
              </div>
            )}
          </div>
          <div id='footer' className="flex flex-col items-center justify-center w-[100%] h-[300px] footerSection bg-[#CF2030B3] text-white mt-20">
            <div className="flex flex-row items-center justify-center w-full gap-10 max-w-7xl mx-auto px-6">
              <div className="footerLeft flex flex-col items-start justify-center w-1/3 gap-4">
                <Image src="/360logoRed.png" alt="logo" width={120} height={120} className="filter brightness-0 invert" />
                <p className="text-gray-700 text-sm">Connecting professionals and creating opportunities through meaningful business relationships.</p>
              </div>
              <div className="footerCenter flex flex-col items-center justify-center w-1/3 gap-4">
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <div className="flex flex-col items-center gap-2 text-gray-700">
                  <p>Email: info@bni360.com</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Location: Thornton, CO</p>
                </div>
              </div>
              <div className="footerRight flex flex-col items-end justify-center w-1/3 gap-4">
                <h3 className="text-xl font-semibold">Quick Links</h3>
                <div className="flex flex-col items-end gap-2 text-gray-700">
                  <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
                  <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button>
                  <button onClick={() => document.getElementById('members').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Members</button>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-700">
              <Link href="/studio" target="_blank" rel="noopener noreferrer" className="text-gray-700 text-sm">BNI 360</Link>
              <a
                href="https://servaldesigns.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-white transition-colors text-sm"
              >
                Powered by Serval Designs
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
