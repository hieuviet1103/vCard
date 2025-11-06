import React, { useState } from 'react';
import VCard from './components/VCard';
import QRCodeModal from './components/QRCodeModal';
import { LocalizationProvider, type Locale } from './lib/i18n';
import type { Profile } from './types';

// Mock data for the VCard, now including coordinates
const initialProfileData: Profile = {
  name: 'Alex Doe',
  title: 'Senior Frontend Engineer',
  company: 'Gemini Solutions',
  avatarUrl: 'https://picsum.photos/200',
  bio: 'Passionate about creating beautiful, intuitive, and high-performance web experiences. Specializing in React, TypeScript, and modern UI/UX design principles.',
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'alex.doe@gemini.com',
    website: 'https://alexdoe.dev',
    linkedin: 'linkedin.com/in/alexdoe',
    github: 'github.com/alexdoe',
    instagram: 'instagram.com/alexdoe',
    twitter: 'twitter.com/alexdoe',
  },
  address: {
    street: '1600 Amphitheatre Parkway',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043',
    country: 'USA',
  },
  coordinates: {
    lat: 37.422,
    lng: -122.084,
  },
};

const App: React.FC = () => {
  const profile = initialProfileData;
  const locale: Locale = 'en';
  const themeClass = 'theme-dark font-inter';

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    value: string;
    label: string;
  }>({
    isOpen: false,
    value: '',
    label: '',
  });

  const showQrCode = (value: string, label: string) => {
    setModalState({ isOpen: true, value, label });
  };

  const hideQrCode = () => {
    setModalState({ isOpen: false, value: '', label: '' });
  };

  return (
    <LocalizationProvider value={{ locale }}>
      <div className={themeClass}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 font-sans">
          <div className="w-full max-w-md">
            <VCard profile={profile} onShowQrCode={showQrCode} />
          </div>
        </div>
        {modalState.isOpen && (
          <QRCodeModal
            value={modalState.value}
            label={modalState.label}
            onClose={hideQrCode}
          />
        )}
      </div>
    </LocalizationProvider>
  );
};

export default App;