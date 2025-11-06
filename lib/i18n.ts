// FIX: Import React to bring it into scope, enabling JSX parsing and fixing related type errors.
import React, { createContext, useContext } from 'react';

const translations = {
  en: {
    phone: 'Phone',
    email: 'Email',
    website: 'Website',
    address: 'Address',
    contactInfo: 'Contact Info',
    showContactQR: 'Save via QR',
    addToContacts: 'Add to Phone',
    scanToSave: 'Scan to Save Contact',
    scanInstruction: 'Scan the code with your camera app.',
    close: 'Close',
    settings: 'Settings',
    language: 'Language',
    colorTheme: 'Color Theme',
    fontStyle: 'Font Style',
    uploadAvatar: 'Upload Avatar',
    defaultTheme: 'Default',
    darkTheme: 'Dark',
    forestTheme: 'Forest',
    oceanTheme: 'Ocean',
    shareCard: 'Share Card',
    scanToView: 'Scan to View Card',
  },
  vi: {
    phone: 'Điện thoại',
    email: 'Email',
    website: 'Trang web',
    address: 'Địa chỉ',
    contactInfo: 'Thông tin liên hệ',
    showContactQR: 'Lưu bằng QR',
    addToContacts: 'Thêm vào Điện thoại',
    scanToSave: 'Quét để lưu danh bạ',
    scanInstruction: 'Dùng máy ảnh của bạn để quét mã này.',
    close: 'Đóng',
    settings: 'Cài đặt',
    language: 'Ngôn ngữ',
    colorTheme: 'Chủ đề màu',
    fontStyle: 'Kiểu chữ',
    uploadAvatar: 'Tải ảnh đại diện',
    defaultTheme: 'Mặc định',
    darkTheme: 'Tối',
    forestTheme: 'Rừng xanh',
    oceanTheme: 'Đại dương',
    shareCard: 'Chia sẻ thẻ',
    scanToView: 'Quét để xem thẻ',
  },
};

// FIX: Export the Locale type so it can be imported and used in other files.
export type Locale = 'en' | 'vi';

// FIX: Removed `setLocale` because the settings panel has been removed and the language can no longer be changed.
interface LocalizationContextType {
  locale: Locale;
  t: (key: keyof typeof translations['en']) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// FIX: By explicitly typing LocalizationProvider as a React.FC, we ensure TypeScript correctly infers that it accepts children.
// The `value` prop now only requires `locale` since the language cannot be changed.
export const LocalizationProvider: React.FC<{ value: { locale: Locale } }> = ({ children, value }) => {
  const { locale } = value;
  
  const t = (key: keyof typeof translations['en']) => {
    return translations[locale][key] || translations['en'][key];
  };

  // FIX: Replaced JSX with React.createElement to resolve parsing errors in a .ts file.
  // The context value provided no longer includes `setLocale`.
  return React.createElement(
    LocalizationContext.Provider,
    { value: { locale, t } },
    children
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};