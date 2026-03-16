import { CATEGORIES } from '../data/menuData';
import { motion } from 'framer-motion';

interface CategoryListProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryList({ activeCategory, setActiveCategory }: CategoryListProps) {
  return (
    <div className="sticky top-[105px] z-30 bg-oled-black/90 backdrop-blur-md border-b border-white/5 py-3">
      <div className="flex overflow-x-auto no-scrollbar px-4 gap-3 snap-x">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap snap-start transition-colors ${
                isActive ? 'text-oled-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-imperial-gold rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
