import React, { useEffect, useRef } from 'react';
import { useLocalization } from '../lib/i18n';

// Make TypeScript aware of the QRCode library from the CDN
declare const QRCode: any;

interface QRCodeModalProps {
  value: string;
  label: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ value, label, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLocalization();

  useEffect(() => {
    if (canvasRef.current && typeof QRCode !== 'undefined') {
      QRCode.toCanvas(canvasRef.current, value, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, (error: Error | null) => {
        if (error) console.error(error);
      });
    }
  }, [value]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#f5deb3] rounded-2xl shadow-xl p-8 text-center max-w-sm w-full transform transition-all animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-[--text-primary] mb-1">{label}</h3>
        <p className="text-sm text-[--text-secondary] mb-6">{t('scanInstruction')}</p>
        <div className="bg-white p-2 rounded-lg inline-block shadow-inner">
           <canvas ref={canvasRef} className="w-56 h-56 md:w-64 md:h-64"></canvas>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--accent-color] dark:focus:ring-offset-gray-800 transition-colors"
        >
          {t('close')}
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default QRCodeModal;
