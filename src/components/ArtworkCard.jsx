import React, { useState } from 'react';
import { Copy, Check, Maximize2, Heart, Sparkles } from 'lucide-react';

export default function ArtworkCard({ item, onOpenModal, onLike, isLiked }) {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(item.id);
  };

  return (
    <div
      onClick={() => onOpenModal(item)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-stone-400/80 soft-card-shadow hover:soft-card-hover transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
        />

        {/* Ambient Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide bg-stone-900/70 backdrop-blur-md text-white border border-stone-700/50">
              {item.model}
            </span>
            <span className="px-2 py-1 rounded-md text-[10px] bg-stone-900/70 backdrop-blur-md text-stone-200 border border-stone-700/50">
              {item.aspectRatio}
            </span>
          </div>

          <button
            onClick={handleLike}
            className={`pointer-events-auto p-2 rounded-lg backdrop-blur-md transition-colors ${
              isLiked
                ? 'bg-rose-50 text-rose-500 border border-rose-200'
                : 'bg-white/80 text-stone-600 hover:text-rose-500 border border-stone-200'
            }`}
            title="Beğen"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Hover Inspect Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/20 backdrop-blur-[2px] pointer-events-none">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-stone-900 text-xs font-medium shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Maximize2 className="w-3.5 h-3.5 text-stone-700" />
            İncele & Prompt Al
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-stone-600 font-serif italic line-clamp-2 mt-2 bg-[#f8f6f0] p-2.5 rounded-lg border border-stone-200/60 leading-relaxed select-all">
            "{item.prompt}"
          </p>
        </div>

        {/* Card Footer: Tags & Quick Copy */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {item.tags.slice(0, 2).map((t, i) => (
              <span key={i} className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200/60">
                #{t}
              </span>
            ))}
          </div>

          <button
            onClick={handleCopyPrompt}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
