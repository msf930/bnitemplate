
import Image from "next/image";

import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import LiquidGlass from 'liquid-glass-react'
import VCard from 'vcard-creator'
import { IoMdDownload } from "react-icons/io";

import styles from './stlyes.module.css'

export default function MemberCardSmall({ member, index, isExpanded, onExpand }) {
    // Handle null/undefined member data
    if (!member) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeIn", duration: 0.2 }}
                exit={{ opacity: 0, y: -100, transition: { duration: 0.4 } }}
                viewport={{ once: true }}
                className={styles.memberCardContainer}
            >
                <div className={`${styles.memberCard} flex flex-col items-center p-6 cursor-pointer transition-all duration-300 max-h-[180px] overflow-hidden`}>
                    <div className="flex flex-row items-center w-full gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-[120px] h-[120px] relative bg-white rounded-full flex items-center justify-center text-gray-500">
                                <Image
                                    src="/360logoRed.png"
                                    alt="BNI 360 Logo"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-center justify-evenly gap-2 w-full">
                            <div className="flex flex-row items-center justify-center gap-2 text-center">
                                <div className="font-bold text-xl">No Data</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return null;

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
    const websiteUrl = member.website ? formatSocialUrl(member.website, 'website') : '';
    const memeberVCard = new VCard()
    memeberVCard
        .addName(member.lastName, member.firstName, '', '', '')
        // Add work data
        {member.company && memeberVCard.addCompany(member.company)}
        {member.position && memeberVCard.addJobtitle(member.position)}
        // .addRole('')
        {member.email && memeberVCard.addEmail(member.email)}
        {member.phone && memeberVCard.addPhoneNumber(member.phone, 'PREF;WORK')}
        // .addAddress('', '', '', '', '', '', '')
        {member.website && memeberVCard.addURL(websiteUrl)}
        {member.linkedin && memeberVCard.addSocial(formatSocialUrl(member.linkedin, 'linkedin'), 'LinkedIn', '')}
        {member.instagram && memeberVCard.addSocial(formatSocialUrl(member.instagram, 'instagram'), 'Instagram', '')}
        {member.facebook && memeberVCard.addSocial(formatSocialUrl(member.facebook, 'facebook'), 'Facebook', '')}

    const downloadVCard = () => {
        try {
            // Generate the vCard content
            const vCardContent = memeberVCard.toString();
            
            // Create a blob with the vCard content
            const blob = new Blob([vCardContent], { type: 'text/vcard' });
            
            // Create a download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${member.firstName}_${member.lastName}.vcf`;
            
            // Trigger the download
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading vCard:', error);
            alert('Error downloading contact information. Please try again.');
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


            className={styles.memberCardContainer}

        >


            <div className={styles.memberCard}>
                <div className="flex flex-row items-center w-full gap-6 rounded-[32px]">

                    <div>
                        {member?.image?.asset?.url ? (
                            <div className="w-[7vw] h-[7vw] min-w-[100px] min-h-[100px] relative bg-gray-200 rounded-4xl flex items-center justify-center text-gray-500">
                                <Image
                                    src={member?.image?.asset?.url}
                                    alt={member?.firstName + ' ' + member?.lastName}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-4xl"
                                />
                            </div>
                        ) : (
                            <div className="w-[7vw] h-[7vw] min-w-[100px] min-h-[100px] relative bg-white rounded-4xl flex items-center justify-center text-gray-500">
                                <Image
                                    src="/360logoRed.png"
                                    alt="BNI 360 Logo"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="rounded-4xl"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-rows-2 items-center justify-start gap-1 w-full ">
                        <div className="flex flex-row items-center justify-start gap-2 text-left">
                            <div className="font-bold text-xl text-left text-[#ffffff]">{member.firstName || 'N/A'}</div>
                            <div className="font-bold text-xl text-left text-[#ffffff]">{member.lastName || 'N/A'}</div>
                        </div>

                        <div className="flex flex-col text-left">
                            {member.company && <div className="text-sm font-bold text-[#ffffff]">{member.company}</div>}
                            {member.position && <div className="text-sm font-bold text-[#ffffff]">{member.position}</div>}

                        </div>


                    </div>
                    <button 
                                onClick={downloadVCard}
                                className={styles.downloadButton}
                                title="Download Contact"
                            >
                                <IoMdDownload />
                            </button>
                </div>
                <div className="flex flex-col pt-2 items-end justify-between gap-1 text-left w-full h-full">

                    <div className="flex flex-col justify-end items-start text-left w-full h-full text-sm">
                        {member.email && <div className="text-md text-[#ffffff]">{member.email}</div>}

                    </div>
                    <div className="flex flex-row justify-between items-center text-left w-full h-full text-sm">
                        {member.phone && formatPhoneNumber(member.phone) && <div className="text-md text-[#ffffff] whitespace-nowrap">{formatPhoneNumber(member.phone)}</div>}
                        <div className="flex flex-row flex-wrap justify-end items-end text-left w-full h-auto text-sm gap-2">
                            {member.linkedin && (
                                <a href={formatSocialUrl(member.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" >
                                    <FontAwesomeIcon icon={faLinkedin} size="lg" className="text-[#ffffff]" />
                                </a>
                            )}
                            {member.instagram && (
                                <a href={formatSocialUrl(member.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" >
                                    <FontAwesomeIcon icon={faInstagram} size="lg" className="text-[#ffffff]" />
                                </a>
                            )}
                            {member.facebook && (
                                <a href={formatSocialUrl(member.facebook, 'facebook')} target="_blank" rel="noopener noreferrer" >
                                    <FontAwesomeIcon icon={faFacebook} size="lg" className="text-[#ffffff]" />
                                </a>
                            )}
                            {member.website && (
                                <a href={formatSocialUrl(member.website, 'website')} target="_blank" rel="noopener noreferrer" className="text-[#ffffff]">
                                    Website
                                </a>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>


        </motion.div>

    );
} 