import React from 'react';
import { Wind, Feather, Sparkles } from 'lucide-react';

export default function Hero({ totalArtworks }) {
  return (
    <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Delicate Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-stone-600 text-xs tracking-wider shadow-xs mb-6">
        <Wind className="w-3.5 h-3.5 text-stone-500 animate-pulse" />
        <span className="font-medium">Sade & Dingin Yapay Zeka Görsel Galerisi</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-stone-900 tracking-tight leading-tight">
        Zihinden Tuvale:
        <br />
        <span className="italic font-light text-stone-600">
          Gemini Görsel & Prompt Koleksiyonu
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
        Yapay zeka komutlarıyla şekillenen doğal manzaralar, minimalist konseptler ve sinematik kareler. Her eserin üretiminde kullanılan prompt parametrelerini doğrudan kopyalayıp kullanabilirsiniz.
      </p>

      {/* Clean Minimalist Stats */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8">
        <div className="bg-white/80 backdrop-blur-sm border border-stone-200/80 px-4 py-2 rounded-xl text-center shadow-xs">
          <span className="text-lg font-semibold text-stone-900 font-mono block">{totalArtworks}</span>
          <span className="text-[11px] text-stone-500 uppercase tracking-wider font-light">Eser Sayısı</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-stone-200/80 px-4 py-2 rounded-xl text-center shadow-xs">
          <span className="text-lg font-semibold text-stone-900 font-mono block">Imagen 3</span>
          <span className="text-[11px] text-stone-500 uppercase tracking-wider font-light">Üretim Modeli</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-stone-200/80 px-4 py-2 rounded-xl text-center shadow-xs">
          <span className="text-lg font-semibold text-stone-900 font-mono block">Doğal Işık</span>
          <span className="text-[11px] text-stone-500 uppercase tracking-wider font-light">Fotorealistik</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-stone-200/80 px-4 py-2 rounded-xl text-center shadow-xs">
          <span className="text-lg font-semibold text-stone-900 font-mono block">Açık Prompt</span>
          <span className="text-[11px] text-stone-500 uppercase tracking-wider font-light">Serbest Kullanım</span>
        </div>
      </div>

    </section>
  );
}
