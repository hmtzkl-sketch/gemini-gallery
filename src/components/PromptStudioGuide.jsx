import React from 'react';
import { Sun, Wind, Camera, Feather, PlusCircle } from 'lucide-react';

export default function PromptStudioGuide() {
  const tips = [
    {
      icon: Sun,
      title: 'Doğal Işık & Gölgeler',
      desc: 'Golden hour, soft morning mist, diffused window light ve dappled sunlight kompozisyonlara yumuşak ve dinlendirici bir gerçekçilik katar.',
      tag: 'Işık Dili'
    },
    {
      icon: Wind,
      title: 'Havadar & Organik Kompozisyon',
      desc: 'Floating leaves in gentle breeze, minimalistic landscape, serene atmosphere terimleri görsele ferah bir hava ve dinginlik kazandırır.',
      tag: 'Atmosfer'
    },
    {
      icon: Camera,
      title: 'Lens & Fotoğraf Karakteri',
      desc: 'Hasselblad 50mm, f/2.8 natural depth of field ve analog 35mm grain dokuları yapay zeka pürüzsüzlüğünü doğal fotoğraf hissine çevirir.',
      tag: 'Optik Doku'
    },
    {
      icon: Feather,
      title: 'Yumuşak Renk Paleti',
      desc: 'Broken white background, muted earth tones, olive sage ve soft terracotta gibi anahtar kelimeler gözü yormayan sakin tonlar üretir.',
      tag: 'Renk Dengesi'
    }
  ];

  return (
    <section className="mt-20 pt-12 pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium mb-3">
          <Wind className="w-3.5 h-3.5 text-stone-500" />
          <span>PROMPT REHBERİ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Sade ve Dingin Görsel Üretim Formülleri
        </h2>
        <p className="text-sm text-stone-600 mt-2 font-light">
          Gemini ve Imagen modellerinde doğal, göz yormayan ve gerçekçi sonuçlar elde etmek için tavsiye edilen komut parametreleri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-stone-200 hover:border-stone-300 p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between soft-card-shadow group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform text-stone-700">
                  <Icon className="w-5 h-5 text-stone-600" />
                </div>
                <h3 className="text-sm font-semibold text-stone-900 mb-2">{tip.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">{tip.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                  {tip.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide to add new user photos */}
      <div className="mt-8 p-6 rounded-2xl bg-white border border-stone-200 soft-card-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 mt-0.5">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Kendi Ürettiğin Görselleri Nasıl Eklersin?</h4>
            <p className="text-xs text-stone-600 mt-0.5 max-w-xl font-light">
              Gemini ile ürettiğin görselleri projedeki <code className="text-stone-800 font-mono bg-stone-100 px-1 py-0.5 rounded">public/gallery/</code> klasörüne ekleyip, <code className="text-stone-800 font-mono bg-stone-100 px-1 py-0.5 rounded">galleryData.js</code> dosyasına başlığını ve prompt'unu yazarak galerine anında yeni eser ekleyebilirsin.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
