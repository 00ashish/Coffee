import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogoClick: () => void;
}

export default function Header({ cartItems, onCartClick, searchQuery, onSearchChange, onLogoClick }: HeaderProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button onClick={onLogoClick} className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5A2,2 0 0,0 20,3Z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-lg sm:text-xl text-amber-50 font-semibold tracking-wide group-hover:text-amber-300 transition-colors">
                Ember & Bloom
              </h1>
              <p className="text-[10px] text-amber-600 uppercase tracking-[0.2em] -mt-0.5">Specialty Coffee</p>
            </div>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-800/80 border border-amber-900/30 rounded-full text-sm text-amber-50 placeholder-amber-800 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all"
              />
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 sm:p-3 rounded-full bg-stone-800/80 border border-amber-900/30 hover:border-amber-600/50 hover:bg-stone-700/80 transition-all group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 group-hover:text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
