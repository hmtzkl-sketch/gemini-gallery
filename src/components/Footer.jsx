import React from 'react';
import { Wind, ShieldCheck } from 'lucide-react';
import LegalNotice from './LegalNotice';

export default function Footer() {
  return (
    <div className="mt-20">
      {/* 5846 SK. FSEK & 657 SK. Legal Disclaimer Banner */}
      <LegalNotice />

      <footer className="border-t border-stone-200/80 bg-[#f7f5f0] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-semibold text-sm tracking-wide text-stone-900">AHMET ÖZKUL</span>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-stone-600 font-light">Gemini AI Görsel Arşivi</span>
            </div>
            <p className="text-xs text-stone-500 font-light">
              Yapay zeka modelleri ile üretilen dijital sanat ve açık prompt arşivi.
            </p>
          </div>

          {/* Center Legal / Non-Commercial notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-stone-400" />
            <span>Kişisel & Gayri Ticari Sanat Portföyü • ahmetozkul.xyz</span>
          </div>

          {/* Right quiet note */}
          <div className="text-xs text-stone-400 font-serif italic">
            <span>Huzurlu bir an için tasarlandı</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-200 text-center text-[11px] text-stone-400 font-light">
          © {new Date().getFullYear()} Ahmet Özkul. Tüm hakları saklıdır. Google Gemini & Imagen modelleri ile desteklenmektedir.
        </div>
      </footer>
    </div>
  );
}
