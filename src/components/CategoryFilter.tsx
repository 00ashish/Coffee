interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-amber-700 text-amber-50 shadow-lg shadow-amber-900/30'
              : 'bg-stone-800/60 text-amber-300/70 border border-amber-900/20 hover:bg-stone-700/60 hover:text-amber-200 hover:border-amber-700/40'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
