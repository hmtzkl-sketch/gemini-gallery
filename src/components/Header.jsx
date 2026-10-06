import React from 'react';
import { Wind, Search } from 'lucide-react';

export default function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/85 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shadow-sm">
            <Wind className="w-5 h-5 text-stone-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900 tracking-wide text-base">
                AHMET ÖZKUL
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-stone-100 text-stone-600 border border-stone-200/80 rounded-full">
                AI Görsel Atölyesi
              </span>
            </div>
            <p className="text-xs text-stone-500 font-light flex items-center gap-1.5">
              <span>Gemini & Imagen Prompt Koleksiyonu</span>
            </p>
          </div>
        </div>

        {/* Search Bar on Desktop */}
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Eser veya prompt ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/90 text-sm text-stone-800 placeholder-stone-400 pl-9 pr-8 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition-all shadow-xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right side tag */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif italic text-stone-500 bg-stone-100/80 border border-stone-200/80">
            <span>Rüzgarın Esintisiyle</span>
          </div>
        </div>

      </div>
    </header>
  );
}
