import React, { useRef } from 'react';
import { useLocalization } from '../lib/i18n';
import { PaletteIcon, FontIcon, LanguageIcon } from './icons';

interface SettingsPanelProps {
  theme: {
    colorScheme: string;
    font: string;
  };
  onThemeChange: (theme: { colorScheme: string; font: string }) => void;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ theme, onThemeChange, onAvatarChange }) => {
  const { locale, setLocale, t } = useLocalization();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onThemeChange({ ...theme, colorScheme: e.target.value });
  };
  
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onThemeChange({ ...theme, font: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as 'en' | 'vi');
  };
  
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAvatarUrl = URL.createObjectURL(file);
      onAvatarChange(newAvatarUrl);
    }
  };
  
  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md bg-[--bg-primary] text-[--text-primary] rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-bold border-b border-[--border-color] pb-4">{t('settings')}</h2>
      
      <div className="space-y-2">
        <label htmlFor="language-select" className="flex items-center space-x-2 text-sm font-semibold text-[--text-secondary]">
          <LanguageIcon />
          <span>{t('language')}</span>
        </label>
        <select
          id="language-select"
          value={locale}
          onChange={handleLanguageChange}
          className="w-full p-2 rounded-md bg-[--bg-secondary] border border-[--border-color] focus:ring-2 focus:ring-[--accent-color] outline-none"
        >
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="theme-select" className="flex items-center space-x-2 text-sm font-semibold text-[--text-secondary]">
          <PaletteIcon />
          <span>{t('colorTheme')}</span>
        </label>
        <select
          id="theme-select"
          value={theme.colorScheme}
          onChange={handleColorSchemeChange}
          className="w-full p-2 rounded-md bg-[--bg-secondary] border border-[--border-color] focus:ring-2 focus:ring-[--accent-color] outline-none"
        >
          <option value="theme-dark">{t('darkTheme')}</option>
          <option value="theme-light">{t('defaultTheme')}</option>
          <option value="theme-forest">{t('forestTheme')}</option>
          <option value="theme-ocean">{t('oceanTheme')}</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="font-select" className="flex items-center space-x-2 text-sm font-semibold text-[--text-secondary]">
          <FontIcon />
          <span>{t('fontStyle')}</span>
        </label>
        <select
          id="font-select"
          value={theme.font}
          onChange={handleFontChange}
          className="w-full p-2 rounded-md bg-[--bg-secondary] border border-[--border-color] focus:ring-2 focus:ring-[--accent-color] outline-none"
        >
          <option value="font-inter">Inter</option>
          <option value="font-lora">Lora</option>
          <option value="font-roboto-slab">Roboto Slab</option>
        </select>
      </div>
      
      <div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarFileChange}
            accept="image/*"
            className="hidden"
        />
        <button
            onClick={handleAvatarButtonClick}
            className="w-full bg-[--accent-color] text-white font-bold py-3 px-4 rounded-lg hover:bg-[--accent-hover] transition-colors"
        >
            {t('uploadAvatar')}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
