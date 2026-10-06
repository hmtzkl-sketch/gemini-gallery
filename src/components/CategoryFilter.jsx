import React from 'react';
import { Sparkles, Sun, Mountain, Camera, Compass, Feather, Palette } from 'lucide-react';

const iconMap = {
  Sparkles,
  Sun,
  Mountain,
  Camera,
  Compass,
  Feather,
  Palette
};

export default function CategoryFilter({ categories, activeCategory, setActiveCategory, counts }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 no-scrollbar px-1">
      {categories.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Sparkles;
        const isActive = activeCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 shadow-xs'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-stone-300' : 'text-stone-400'}`} />
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
