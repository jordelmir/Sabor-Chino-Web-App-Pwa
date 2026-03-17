import { CATEGORIES } from '../data/menuData';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';

interface CategoryListProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryList({ activeCategory, setActiveCategory }: CategoryListProps) {
  const { language } = useUserStore();

  return (
    <div className="sticky top-[105px] z-30 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex overflow-x-auto hide-scrollbar px-4 gap-3 snap-x">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.name;
          const displayName = language === 'en' && category.nameEn ? category.nameEn : 
                              language === 'zh' && category.nameZh ? category.nameZh : 
                              category.name;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap snap-start transition-colors flex items-center gap-2 border ${
                isActive ? 'text-black border-imperial-gold' : 'text-white/60 hover:text-white bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-imperial-gold rounded-full shadow-[0_0_15px_rgba(242,183,5,0.4)]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 text-lg">{category.icon}</span>
              <span className="relative z-10">{displayName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
