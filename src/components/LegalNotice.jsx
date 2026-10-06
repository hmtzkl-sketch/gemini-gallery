import React, { useState } from 'react';
import { legalDisclaimerData } from '../data/legalText';
import { ShieldCheck, ChevronDown, ChevronUp, Scale, FileText } from 'lucide-react';

export default function LegalNotice() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="border-t border-stone-200/80 bg-[#f4f1ea]/80 py-6 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-stone-200/70 text-stone-700">
              <Scale className="w-4 h-4 text-stone-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-900 tracking-wide font-serif">
                  {legalDisclaimerData.title}
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono bg-stone-200 text-stone-700 rounded-md">
                  FSEK & 657 Uyumlu
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-light mt-0.5">
                5846 Sayılı Fikir ve Sanat Eserleri Kanunu, Uyar-Kaldır ve Gayri Ticari Hobi Bildirimi
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 shadow-xs transition-colors cursor-pointer"
          >
            <span>{isOpen ? 'Bildirimi Kapat' : 'Yasal Bildirimi Oku'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="mt-6 pt-6 border-t border-stone-300/70 space-y-4 animate-in fade-in duration-300">
            <div className="p-3 rounded-xl bg-white/90 border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-stone-600 shrink-0" />
              <span>
                <strong>Özet Güvence:</strong> Sitedeki tüm görseller yapay zeka çıktısı olup kâr amacı gütmez; hiçbir sanatçının telifli eseri kopyalanmamıştır ve uyar-kaldır prensibi koşulsuz uygulanır.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-stone-600">
              {legalDisclaimerData.articles.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-xs space-y-1.5"
                >
                  <h4 className="font-semibold text-stone-900 font-serif flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-stone-500" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="leading-relaxed text-stone-600 font-light text-[11px]">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <span className="text-[10px] text-stone-500 font-mono">
                Telif benzerliği bildirimi veya teknik sorular için iletişim formu üzerinden yazabilirsiniz.
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
