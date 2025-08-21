import Image from "next/image";
import Nav from "./components/Nav";
import Link from "next/link";
import MemberCardSmall from "./components/MemberCardSmall/MemberCardSmall.js";
import { client } from "../sanity/lib/client";
import { RiExternalLinkLine } from "react-icons/ri";

const MEMBERS_QUERY = `*[
  _type == "member"
]|order(lastName asc){_id, firstName, lastName, image{asset->{url}}, phone, email, company, position, bio, linkedin, instagram, facebook, website}`;

const SETTINGS_QUERY = `*[
  _type == "settings"
]{_id, chapterName, officialURL, applyURL, logo{asset->{url, alt}}}`;

// Make this an async function to fetch data on the server
export default async function Home() {
  // Fetch members data on the server
  const members = await client.fetch(MEMBERS_QUERY);
  const settings = await client.fetch(SETTINGS_QUERY);
  const chapterName = settings[0]?.chapterName;
  const officialURL = settings[0]?.officialURL;
  const applyURL = settings[0]?.applyURL;
  const logo = settings[0]?.logo;


  return (
    <div className="flex flex-col items-center justify-center w-[100%] overflow-x-hidden">
      <div className="pageAll  pt-[100px]">
        <div className="navCont">
          <Nav logo={logo} officialURL={officialURL} />
        </div>

        {/* Hero Section - Simplified without animations */}
        <div id="home" className="heroCont">
          <div className="heroContBg"></div>


          <h1 className="heroTitleText">
            Connecting Professionals<br />Creating Opportunities
          </h1>

          <p className="heroSubText">
            Expand your network with BNI {chapterName}<br />Grow your business through real relationships
          </p>
          {applyURL ?
            <div className="heroButton">
              <Link
                href={applyURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply to Join
              </Link>
            </div> : null}

          {/* Remove Rive animation for now - can be added back with client-side JS */}

        </div>

        {/* About Section */}
        <div id="about" className="flex flex-col items-center justify-center w-[100%] aboutSection">
          <div className="flex flex-row items-center justify-center w-full gap-10">
            <div className="aboutLeft relative flex items-center justify-center w-1/2">
              <div className="aboutRedBox">
                <div className="aboutHandshakeContainer">
                  <Image src="/handshake2.jpg" alt="logo" fill objectFit="cover" className="aboutHandshake" />
                </div>
                <div className="aboutMemberBoxFirefox" style={{ position: 'absolute', top: '80%', left: '70%', transform: 'translate(-50%, -50%)', zIndex: 300 }}>
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
                {applyURL && <div className="aboutButtonContainer">
                  <div className="aboutButtonFirefox">
                    <Link
                      href={applyURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply to Join
                    </Link>
                  </div>
                </div>}
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div id="members" className="flex flex-col items-center justify-center w-[100%] memberSection text-center">
          <h1 className="membersTitle font-bold w-[100%] mb-10 mt-10">Our Members</h1>

          <div className="memberGrid">
            {members?.map((member, index) => (
              <MemberCardSmall
                key={member._id || index}
                member={member}
                index={index}
              />
            ))}
          </div>

          <div className="memberContParticles">
            {/* Remove Particles component for now */}
          </div>
        </div>

        {/* Footer Section */}
        <div id='footer' className="flex flex-col items-center justify-center w-[100%] h-[300px] footerSection bg-[#CF2030B3] text-white mt-20">
          <div className="flex flex-row items-center justify-center w-full gap-10 max-w-7xl mx-auto px-6">
            <div className="footerLeft flex flex-col items-start justify-center w-1/3 gap-4">
              <Image src={logo ? logo.asset.url : '/BNILogoR.png'} alt="logo" width={120} height={120} className="filter brightness-0 invert" />
              <p className="text-[#441111] text-sm">Connecting professionals and creating opportunities through meaningful business relationships.</p>
            </div>
            {(applyURL || officialURL) ? <div className="footerCenter flex flex-col items-center justify-center w-1/3 gap-4">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <div className="flex flex-col items-center gap-2 text-[#441111]">
                {applyURL && <a href={applyURL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Apply to Join</a>}
                {officialURL && <a href={officialURL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Official BNI Website</a>}
              </div>
            </div> : <div className="footerCenter flex flex-col items-center justify-center w-1/3 gap-4"></div>}
            <div className="footerRight flex flex-col items-end justify-center w-1/3 gap-4">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <div className="flex flex-col items-end gap-2 text-[#441111]">
                <a href="#home" className="hover:text-white transition-colors">Home</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#members" className="hover:text-white transition-colors">Members</a>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-gray-700">
            <Link href="/studio" target="_blank" rel="noopener noreferrer" className="text-[#441111] text-sm">Admin</Link>
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
      {/* Mobile Section - Simplified */}
      <div className="flex flex-col items-center justify-center w-[100%] memberSectionMobile text-center">
        <div className="heroContMobile">
          <div className="heroContBgMobile">
            <div className="flex flex-row items-center justify-end gap-4 w-[90%]">
              
              {officialURL && <div>
                <Link href={officialURL} target="_blank" rel="noopener noreferrer" className="heroButtonMobileOfficial">Official BNI Website <RiExternalLinkLine /></Link>
              </div>}
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="heroImageMobile">
                <Image src={logo ? logo.asset.url : '/BNILogoR.png'} alt="logo" fill objectFit="contain" className="p-8" />
              </div>
              <h3 className="heroTitleTextMobile">
                Connecting Professionals<br />Creating Opportunities
              </h3>
              {applyURL && <div className="mt-10">
                <Link href={applyURL} target="_blank" rel="noopener noreferrer" className="heroButtonMobile">Apply to Join</Link>
              </div>}
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <h3>Scroll to see our members</h3>
              <div className="text-2xl">↓</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-[100%] text-center mb-6 mt-6">
          <h1 className="text-[2rem] text-center text-white font-bold w-[100%]">Our Members</h1>
        </div>

        <div className="memberGrid">
          {members?.map((member, index) => (
            <MemberCardSmall
              key={member._id || index}
              member={member}
              index={index}
            />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center w-full gap-10 max-w-7xl mx-auto px-6 mt-8 mb-8 pt-8 border-t border-gray-700">
          <Link href="/studio" target="_blank" rel="noopener noreferrer" className="text-[#441111] text-sm">Admin</Link>
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
  );
}
