import React from 'react';
import type { Profile } from '../types';
import { useLocalization } from '../lib/i18n';
import { PhoneIcon, EmailIcon, WebsiteIcon, LinkedInIcon, GitHubIcon, LocationIcon, QRIcon, TwitterIcon, InstagramIcon, ShareIcon, DownloadIcon } from './icons';
import Map from './Map';

interface VCardProps {
  profile: Profile;
  onShowQrCode: (value: string, label: string) => void;
}

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  onQrClick: () => void;
}> = ({ icon, label, value, href, onQrClick }) => (
  <div className="flex items-center justify-between group py-3 border-b border-[--border-color] last:border-b-0">
    <div className="flex items-center space-x-4">
      <div className="text-[--text-secondary]">{icon}</div>
      <div>
        <p className="text-xs text-[--text-secondary]">{label}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-[--text-primary] hover:text-[--accent-color] transition-colors">
          {value}
        </a>
      </div>
    </div>
    <button
      onClick={onQrClick}
      className="p-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label={`Generate QR code for ${label}`}
    >
      <QRIcon />
    </button>
  </div>
);


const generateVCFString = (profile: Profile): string => {
  return `BEGIN:VCARD
VERSION:3.0
N:${profile.name.split(' ').pop()};${profile.name.split(' ').slice(0, -1).join(' ')};;;
FN:${profile.name}
ORG:${profile.company}
TITLE:${profile.title}
TEL;TYPE=WORK,VOICE:${profile.contact.phone}
EMAIL:${profile.contact.email}
URL:${profile.contact.website}
URL;type=linkedin:https://${profile.contact.linkedin}
URL;type=github:https://${profile.contact.github}
X-SOCIALPROFILE;type=twitter:https://${profile.contact.twitter}
X-SOCIALPROFILE;type=instagram:https://${profile.contact.instagram}
ADR;TYPE=WORK:;;${profile.address.street};${profile.address.city};${profile.address.state};${profile.address.zip};${profile.address.country}
NOTE:${profile.bio}
END:VCARD`;
};

const VCard: React.FC<VCardProps> = ({ profile, onShowQrCode }) => {
  const { t } = useLocalization();
  const fullAddress = `${profile.address.street}, ${profile.address.city}, ${profile.address.state} ${profile.address.zip}`;

  const handleShowContactQR = () => {
    const vcfString = generateVCFString(profile);
    onShowQrCode(vcfString, t('scanToSave'));
  };
  
  const handleDownloadVCard = () => {
    const vcfString = generateVCFString(profile);
    const blob = new Blob([vcfString], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${profile.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.vcf`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleShareCard = () => {
    onShowQrCode(window.location.href, t('scanToView'));
  };

  return (
    <div className="relative w-full max-w-md bg-[--bg-primary] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl">
      <button
        onClick={handleShareCard}
        className="absolute top-4 right-4 p-2 rounded-full text-[--text-secondary] hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-[--text-primary] transition-colors duration-200 z-10"
        aria-label={t('shareCard')}
        title={t('shareCard')}
      >
        <ShareIcon />
      </button>

      <div className="bg-[--bg-secondary] p-8 text-center">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="w-28 h-28 rounded-full mx-auto ring-4 ring-[--ring-color] shadow-md object-cover"
        />
        <h1 className="mt-4 text-2xl font-bold text-[--text-primary]">{profile.name}</h1>
        <p className="text-md text-[--accent-color]">{profile.title}</p>
        <p className="text-sm text-[--text-secondary]">{profile.company}</p>
      </div>
      
      <div className="p-6">
        <h2 className="text-xs font-semibold uppercase text-[--text-secondary] tracking-wider mb-2">{t('contactInfo')}</h2>
        <div className="space-y-1">
          <InfoRow 
            icon={<PhoneIcon />} 
            label={t('phone')} 
            value={profile.contact.phone} 
            href={`tel:${profile.contact.phone}`}
            onQrClick={() => onShowQrCode(`tel:${profile.contact.phone}`, t('phone'))}
          />
          <InfoRow 
            icon={<EmailIcon />} 
            label={t('email')} 
            value={profile.contact.email} 
            href={`mailto:${profile.contact.email}`}
            onQrClick={() => onShowQrCode(`mailto:${profile.contact.email}`, t('email'))}
          />
          <InfoRow 
            icon={<WebsiteIcon />} 
            label={t('website')}
            value={profile.contact.website} 
            href={profile.contact.website}
            onQrClick={() => onShowQrCode(profile.contact.website, t('website'))}
          />
          {profile.contact.linkedin && (
           <InfoRow 
           
            icon={<LinkedInIcon />} 
            label="LinkedIn" 
            value={profile.contact.linkedin} 
            href={`https://${profile.contact.linkedin}`}
            onQrClick={() => onShowQrCode(`https://${profile.contact.linkedin}`, 'LinkedIn Profile')}
          />
          )}
          {profile.contact.github && (
           <InfoRow 
            icon={<GitHubIcon />} 
            label="GitHub" 
            value={profile.contact.github} 
            href={`https://${profile.contact.github}`}
            onQrClick={() => onShowQrCode(`https://${profile.contact.github}`, 'GitHub Profile')}
          />
          )}
          {profile.contact.twitter && (
          <InfoRow 
            icon={<TwitterIcon />} 
            label="Twitter" 
            value={profile.contact.twitter} 
            href={`https://${profile.contact.twitter}`}
            onQrClick={() => onShowQrCode(`https://${profile.contact.twitter}`, 'Twitter Profile')}
          />
          )}
          {profile.contact.instagram && (
          <InfoRow 
            icon={<InstagramIcon />} 
            label="Instagram" 
            value={profile.contact.instagram} 
            href={`https://${profile.contact.instagram}`}
            onQrClick={() => onShowQrCode(`https://${profile.contact.instagram}`, 'Instagram Profile')}
          />
          )}
          <InfoRow 
            icon={<LocationIcon />} 
            label={t('address')}
            value={fullAddress} 
            href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
            onQrClick={() => onShowQrCode(`geo:${profile.coordinates.lat},${profile.coordinates.lng}?q=${encodeURIComponent(fullAddress)}`, t('address'))}
          />
        </div>
        {profile.coordinates.lat && profile.coordinates.lng && (    
          <div className="mt-6 rounded-lg overflow-hidden shadow-md">
            <Map coordinates={profile.coordinates} address={fullAddress} />
          </div>
        )}
        
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button 
            onClick={handleDownloadVCard}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--accent-color] dark:focus:ring-offset-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>{t('addToContacts')}</span>
          </button>
          <button 
            onClick={handleShowContactQR}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--accent-color] dark:focus:ring-offset-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <QRIcon className="w-5 h-5" />
            <span>{t('showContactQR')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VCard;