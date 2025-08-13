"use client";
import Image from "next/image";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import VCard from 'vcard-creator'
import { IoMdDownload } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";


import styles from './stlyes.module.css'

export default function MemberCardSmall({ member, onCopied }) {
    // Handle null/undefined member data
    if (!member) {
        return (
            <div
                
                className={styles.memberCardContainer}
            >
                <div className={`${styles.memberCard} flex flex-col items-center p-6 cursor-pointer transition-all duration-300 max-h-[180px] overflow-hidden`}>
                    <div className="flex flex-row items-center w-full gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-[120px] h-[120px] relative bg-white rounded-full flex items-center justify-center text-gray-500">
                                <Image
                                    src="/BNILogoR.png"
                                    alt="BNI Logo"
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
            </div>
        );
    }

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        // card.style.setProperty('--mouse-x', '50%');
        // card.style.setProperty('--mouse-y', '50%');
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };

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

    const formatSocialUrl = (url) => {
        if (!url) return null;

        // If URL already has http/https, return as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        } else {
            return `https://${url}`;
        }


    };

    const createVCardWithImage = async () => {
        const vCard = new VCard();
        vCard.addName(member.lastName, member.firstName, '', '', '');

        if (member.image) {
            const base64Image = await getImageAsBase64(member.image.asset.url);
            if (base64Image) {
                vCard.addPhoto(base64Image, 'JPEG');
            }
        }

        if (member.company) vCard.addCompany(member.company);
        if (member.position) vCard.addJobtitle(member.position);
        if (member.email) vCard.addEmail(member.email);
        if (member.phone) vCard.addPhoneNumber(member.phone, 'PREF;WORK');
        if (member.website) vCard.addURL(formatSocialUrl(member.website));
        if (member.linkedin) vCard.addSocial(formatSocialUrl(member.linkedin), 'LinkedIn', '');
        if (member.instagram) vCard.addSocial(formatSocialUrl(member.instagram), 'Instagram', '');
        if (member.facebook) vCard.addSocial(formatSocialUrl(member.facebook), 'Facebook', '');

        return vCard;
    };

    const downloadVCard = async () => {
        try {
            // Generate the vCard content with image
            const vCard = await createVCardWithImage();
            const vCardContent = vCard.toString();

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

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // Call the isCopied callback to show modal
            if (onCopied) {
                onCopied(true);
            }
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Call the isCopied callback even for fallback
            if (onCopied) {
                onCopied(true);
            }
        }
    };

    const getImageAsBase64 = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove data:image/jpeg;base64, prefix
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    };


    return (

        <div
            


            className={styles.memberCardContainer}

        >


            <div 
                className={styles.memberCard}
                
            >
                
                <div className="flex flex-row items-center w-full gap-6 mt-2">

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
                                    src="/BNILogoR.png"
                                    alt="BNI Logo"
                                    fill
                                    style={{ objectFit: 'contain', padding: '10px' }}
                                    className="rounded-4xl"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-rows-[auto, auto] items-center justify-center gap-1 w-full mr-6">
                        <div className={`flex items-center justify-center  text-left ${member.lastName.length > 10 ? 'flex-col' : 'flex-row gap-2'}`}>
                            <div className="font-bold text-xl text-left text-[#ffffff] whitespace-nowrap">{member.firstName || 'N/A'}</div>
                            <div className="font-bold text-xl text-left text-[#ffffff] whitespace-nowrap">{member.lastName || 'N/A'}</div>
                        </div>

                        <div className="flex flex-col text-left gap-1">
                            {member.company && <div className="text-sm text-center font-bold text-[#ffffff]">{member.company}</div>}
                            
                            {member.position && <div className="text-[12px] text-center font-medium text-[#ffffff]">{member.position}</div>}

                        </div>


                    </div>
                    <button
                        onClick={downloadVCard}
                        className={styles.downloadButton}
                        title="Download Contact"
                    >
                        <p>Import Contact</p> <IoMdDownload />
                    </button>
                </div>
                <div className="flex flex-col pt-2 items-end justify-between gap-3 text-left w-full h-full mt-2">

                    <div className="flex flex-row justify-start items-start text-left w-full h-full text-sm">
                        {member.email && (
                            <div className="flex flex-row justify-start items-center text-left w-full h-full text-sm">
                                <a
                                    href={`mailto:${member.email}`}
                                    className="text-md text-[#ffffff] hover:text-gray-300 transition-colors duration-200"
                                    title="Send email"
                                >
                                    {member.email}
                                </a>
                                <div className="block">
                                    <FaRegCopy 
                                        className="text-[#ffffff] ml-2 cursor-pointer hover:text-gray-300 transition-colors duration-200" 
                                        onClick={() => copyToClipboard(member.email)}
                                        title="Copy email"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-between items-center text-left w-full h-full text-sm">
                        {member.phone && formatPhoneNumber(member.phone) && (
                            <a
                                href={`tel:+1${member.phone.replace(/\D/g, '')}`}
                                className="text-md text-[#ffffff] whitespace-nowrap hover:text-gray-300 transition-colors duration-200"
                                title="Call"
                            >
                                {formatPhoneNumber(member.phone)}
                            </a>
                        )}
                        <div className="flex flex-row flex-wrap justify-end items-end text-left w-full h-auto text-sm gap-4">
                            {member.linkedin && (
                                <a href={formatSocialUrl(member.linkedin)} target="_blank" rel="noopener noreferrer" >
                                    <FontAwesomeIcon icon={faLinkedin} size="lg" className="text-[#ffffff]" />
                                </a>
                            )}
                            {member.instagram && (
                                <a href={formatSocialUrl(member.instagram)} target="_blank" rel="noopener noreferrer" >
                                    <FontAwesomeIcon icon={faInstagram} size="lg" className="text-[#ffffff]" />
                                </a>
                            )}
                            {member.facebook && (
                                <a href={formatSocialUrl(member.facebook)} target="_blank" rel="noopener noreferrer" >
                                    <FontAwesomeIcon icon={faFacebook} size="lg" className="text-[#ffffff]" />
                                </a>
                            )}
                            {member.website && (
                                <a href={formatSocialUrl(member.website)} target="_blank" rel="noopener noreferrer" className="text-[#ffffff] flex flex-row items-center gap-1">
                                    Website <RiExternalLinkLine />
                                </a>
                            )}

                        </div>
                    </div>
                </div>
                <div className={styles.rimLight}></div>
                <div className={styles.cardBGLayer}></div>
            </div>


        </div>

    );
} 