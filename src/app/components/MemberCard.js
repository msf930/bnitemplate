
import Image from "next/image";

import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';



export default function MemberCard({ member, index, isExpanded, onExpand }) {


    const formatPhoneNumber = (phoneNumber) => {
        // Remove all non-digits
        const cleaned = phoneNumber.replace(/\D/g, '');

        // Check if it's a valid 10-digit number
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }

        // If it's 11 digits and starts with 1, format as US number
        if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        }

        // Return original if it doesn't match expected formats
        return phoneNumber;
    };

    const formatSocialUrl = (url, platform) => {
        if (!url) return null;
        
        // If URL already has http/https, return as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // Remove any leading slashes or @ symbols
        const cleanUrl = url.replace(/^[\/@]+/, '');
        
        // Format based on platform
        switch (platform) {
            case 'linkedin':
                return `https://linkedin.com/in/${cleanUrl}`;
            case 'instagram':
                return `https://instagram.com/${cleanUrl}`;
            case 'facebook':
                return `https://facebook.com/${cleanUrl}`;
            case 'website':
                return url.startsWith('www.') ? `https://${url}` : `https://www.${url}`;
            default:
                return url;
        }
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeIn", duration: 0.2 }}
            // transition={{ ease: "easeIn", duration: 0.2, delay: index * 0.1 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 0.4 } }}
            viewport={{ once: true }}


            className="memberCardContainer"

        >
            <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-gray-500 text-4xl cursor-pointer"
                onClick={onExpand}
            >
                ›
            </motion.div>

            <div
                className={`memberCard flex flex-col items-center p-6  cursor-pointer transition-all duration-300 ${isExpanded ? 'max-h-[600px]' : 'max-h-[180px] overflow-hidden'}`}
                onClick={onExpand}
            >
                <div className="flex flex-row items-center w-full gap-6">

                    <div className="flex-shrink-0">
                        {member?.image?.asset?.url ? (
                            <div className="w-[120px] h-[120px] relative bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                <Image
                                    src={member?.image?.asset?.url}
                                    alt={member?.firstName + ' ' + member?.lastName}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="w-[120px] h-[120px] relative bg-white rounded-full flex items-center justify-center text-gray-500">
                                <Image
                                    src="/360LogoRed.png"
                                    alt={member?.firstName + ' ' + member?.lastName}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="rounded-full"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-3 items-center justify-evenly gap-2 w-full">
                        <div className="flex flex-row items-center justify-center gap-2 text-center">
                            <div className="font-bold text-xl">{member.firstName}</div>
                            <div className="font-bold text-xl">{member.lastName}</div>
                        </div>
                       
                        <div className="flex flex-col gap-2">
                            {member.company && <div className="text-md text-gray-600">{member.company}</div>}
                            {member.position && <div className="text-md text-gray-600">{member.position}</div>}

                        </div>
                        <div className="flex flex-col gap-2">
                            {member.email && <div className="text-md text-gray-600">{member.email}</div>}
                            {member.phone && <div className="text-md text-gray-500">{formatPhoneNumber(member.phone)}</div>}
                        </div>

                    </div>
                </div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 50, duration: 0.1 }}
                            className="w-full flex flex-col gap-2 "
                        >

                            {member.bio && <div className="text-gray-700 text-start pt-4">{member.bio}</div>}
                            {isExpanded && <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                                className="flex flex-row gap-4 mt-2">
                                {member.linkedin && (
                                    <a href={formatSocialUrl(member.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                                        <FontAwesomeIcon icon={faLinkedin} size="lg" />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a href={formatSocialUrl(member.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                                    </a>
                                )}
                                {member.facebook && (
                                    <a href={formatSocialUrl(member.facebook, 'facebook')} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900 transition-colors">
                                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                                    </a>
                                )}
                                {member.website && (
                                    <a href={formatSocialUrl(member.website, 'website')} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 transition-colors">
                                        Website
                                    </a>
                                )}
                            </motion.div>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </motion.div>

    );
} 