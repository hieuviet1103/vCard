import React, { useState } from 'react';
import VCard from './components/VCard';
import QRCodeModal from './components/QRCodeModal';
import { LocalizationProvider, type Locale } from './lib/i18n';
import type { Profile } from './types';

// Mock data for the VCard, now including coordinates
const initialProfileData: Profile = {
  name: 'Nguyễn Việt Hiếu',
  title: 'Data Engineer',
  company: 'Vietravel Coporation',
  avatarUrl: 'https://avatars.githubusercontent.com/u/68463316',
  bio: 'I am a Data Engineer at Vietravel Corporation. I am responsible for building and maintaining the data infrastructure and platform for the company.',
  contact: {
    phone: '+84 (355) 234-544',
    email: 'hieunv.itc@vietravel.com',
    website: 'https://travel.com.vn',
    linkedin: 'https://www.linkedin.com/in/hieunguyenitc/',
    github: 'https://github.com/hieuviet1103',
  },
  address: {
    street: '190 Pasteur Street',
    city: 'Ho Chi Minh City',
    state: 'Ho Chi Minh City',
    zip: '70000',
    country: 'Vietnam',
  },
  coordinates: {
    lat: 10.7769,
    lng: 106.7006,
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
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