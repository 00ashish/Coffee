import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-stone-900/60 border border-amber-900/15 rounded-2xl overflow-hidden hover:border-amber-700/30 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
        
        {/* Roast badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-stone-900/80 backdrop-blur-sm text-amber-300 text-xs font-medium rounded-full border border-amber-800/30">
            {product.roast} Roast
          </span>
        </div>

        {/* Quick add button */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-amber-700 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg text-amber-50 group-hover:text-amber-200 transition-colors">
            {product.name}
          </h3>
          <span className="text-amber-500 font-semibold text-sm whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-amber-700 uppercase tracking-wider mb-3">
          {product.origin} · {product.weight}
        </p>

        {/* Tasting notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span key={note} className="px-2 py-0.5 bg-amber-900/20 text-amber-400/80 text-xs rounded-md">
              {note}
            </span>
          ))}
        </div>

        {/* Rating and action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-amber-400/70">{product.rating}</span>
          </div>
          <button
            onClick={() => onViewDetail(product)}
            className="text-sm text-amber-500 hover:text-amber-300 font-medium transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
