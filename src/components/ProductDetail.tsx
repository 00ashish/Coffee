import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-amber-500 hover:text-amber-300 mb-6 sm:mb-8 transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to Collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-4 py-1.5 bg-stone-900/80 backdrop-blur-sm text-amber-300 text-sm font-medium rounded-full border border-amber-800/30">
              {product.roast} Roast
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-amber-600 uppercase tracking-[0.2em] text-xs mb-2">{product.origin}</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-amber-50 mb-3">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'text-amber-500' : 'text-stone-700'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-amber-400/70 text-sm">{product.rating} / 5.0</span>
          </div>

          <p className="text-amber-200/70 leading-relaxed mb-6">{product.description}</p>

          {/* Tasting Notes */}
          <div className="mb-6">
            <h3 className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Tasting Notes</h3>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 bg-amber-900/20 text-amber-300 text-sm rounded-lg border border-amber-800/20"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-stone-800/40 rounded-xl border border-amber-900/10">
            <div className="text-center">
              <p className="text-amber-600 text-xs uppercase tracking-wider mb-1">Weight</p>
              <p className="text-amber-100 font-medium">{product.weight}</p>
            </div>
            <div className="text-center border-x border-amber-900/20">
              <p className="text-amber-600 text-xs uppercase tracking-wider mb-1">Roast</p>
              <p className="text-amber-100 font-medium">{product.roast}</p>
            </div>
            <div className="text-center">
              <p className="text-amber-600 text-xs uppercase tracking-wider mb-1">Origin</p>
              <p className="text-amber-100 font-medium">{product.origin}</p>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-xs uppercase tracking-wider">Price</p>
              <p className="text-3xl font-serif text-amber-50">${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => onAddToCart(product, 1)}
              className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-medium rounded-full shadow-lg shadow-amber-900/30 hover:shadow-amber-800/40 transition-all duration-300 hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
