import React, { useState, useMemo } from 'react';
import WindLeavesCanvas from './components/WindLeavesCanvas';
import SilhouetteBackdrop from './components/SilhouetteBackdrop';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ArtworkCard from './components/ArtworkCard';
import PromptModal from './components/PromptModal';
import PromptStudioGuide from './components/PromptStudioGuide';
import Footer from './components/Footer';
import { categories, galleryItems } from './data/galleryData';
import { Search, Wind, Sparkles } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('gemini_gallery_likes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleLike = (id) => {
    setLikedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('gemini_gallery_likes', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: galleryItems.length };
    categories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = galleryItems.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered artworks
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.prompt.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 paper-pattern relative flex flex-col selection:bg-stone-200 selection:text-stone-900">
      
      {/* Dynamic Background Wind & Drifting Leaves Canvas */}
      <WindLeavesCanvas />

      {/* Artistic Silhouette of Woman with Windblown Hair in Bottom Right */}
      <SilhouetteBackdrop />

      {/* Foreground Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="flex-1">
          <Hero
            totalArtworks={galleryItems.length}
          />

          {/* Gallery Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            
            {/* Mobile Search input */}
            <div className="md:hidden mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Görsel veya prompt ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-sm text-stone-800 placeholder-stone-400 pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-400 shadow-xs"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                counts={categoryCounts}
              />
            </div>

            {/* Gallery Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredItems.map((item) => (
                  <ArtworkCard
                    key={item.id}
                    item={item}
                    onOpenModal={setSelectedItem}
                    onLike={handleLike}
                    isLiked={likedIds.includes(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white/80 backdrop-blur rounded-2xl border border-stone-200 p-8 max-w-md mx-auto soft-card-shadow">
                <Wind className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-stone-800">Eser Bulunamadı</h3>
                <p className="text-xs text-stone-500 mt-1">
                  "{searchTerm}" aramasına uygun bir görsel veya prompt bulunamadı.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors cursor-pointer"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            )}
          </section>

          {/* Prompt Studio Guide */}
          <PromptStudioGuide />
        </main>

        <Footer />
      </div>

      {/* Fullscreen Inspector Modal */}
      {selectedItem && (
        <PromptModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
