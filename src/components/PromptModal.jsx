import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Sparkles, Feather, Sliders } from 'lucide-react';

export default function PromptModal({ item, onClose }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyNegative = () => {
    if (!item.negativePrompt) return;
    navigator.clipboard.writeText(item.negativePrompt);
    setCopiedNegative(true);
    setTimeout(() => setCopiedNegative(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#faf8f5] border border-stone-300/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row my-auto max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/90 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors shadow-xs cursor-pointer"
          title="Kapat (ESC)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Artwork Visual */}
        <div className="lg:w-3/5 bg-stone-950 flex items-center justify-center p-4 relative min-h-[300px] lg:min-h-[520px]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-auto max-h-[78vh] object-contain rounded-lg shadow-xl"
          />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-md text-xs font-mono bg-black/60 backdrop-blur-md text-stone-200 border border-white/20">
              {item.aspectRatio} • {item.model}
            </span>
            <a
              href={item.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Orijinal</span>
            </a>
          </div>
        </div>

        {/* Right Side: Clean Prompt Notes */}
        <div className="lg:w-2/5 p-6 overflow-y-auto flex flex-col justify-between space-y-5 bg-[#faf8f5] border-t lg:border-t-0 lg:border-l border-stone-200">
          <div className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200 mb-2">
                <Feather className="w-3 h-3 text-stone-500" />
                <span>Eser Detayı & İstem</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
                {item.title}
              </h2>
            </div>

            {/* Prompt Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wider font-semibold">
                  Üretim İstem Metni (Prompt)
                </span>
                <button
                  onClick={handleCopyPrompt}
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    copiedPrompt
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-200/70 hover:bg-stone-200 text-stone-800 border border-stone-300/80'
                  }`}
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3 text-stone-600" />}
                  <span>{copiedPrompt ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 font-serif leading-relaxed select-all shadow-xs">
                "{item.prompt}"
              </div>
            </div>

            {/* Negative Prompt if exists */}
            {item.negativePrompt && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
                    Negatif İstem
                  </span>
                  <button
                    onClick={handleCopyNegative}
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      copiedNegative
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {copiedNegative ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copiedNegative ? 'Kopyalandı' : 'Kopyala'}</span>
                  </button>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs text-stone-500 font-mono leading-relaxed select-all">
                  {item.negativePrompt}
                </div>
              </div>
            )}

            {/* Parameters */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-stone-400" />
                Teknik Parametreler
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-stone-200 shadow-xs">
                  <span className="text-stone-400 block text-[10px] font-mono">MODEL</span>
                  <span className="text-stone-800 font-medium">{item.model}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-200 shadow-xs">
                  <span className="text-stone-400 block text-[10px] font-mono">ORAN</span>
                  <span className="text-stone-800 font-medium">{item.aspectRatio}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-white text-stone-600 border border-stone-200 shadow-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-stone-200">
            <button
              onClick={handleCopyPrompt}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Prompt Panoya Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Prompt'u Kopyala & Gemini'de Kullan</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
