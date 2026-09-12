import { useState, useMemo } from 'react';
import { Product, CartItem, ViewMode } from './types';
import { products, categories } from './data/products';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';

export default function App() {
  const [view, setView] = useState<ViewMode>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showNotification(`${product.name} added to cart`);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  const handleLogoClick = () => {
    setView('shop');
    setSelectedProduct(null);
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-[60] animate-fade-in">
          <div className="px-5 py-3 bg-amber-800/90 backdrop-blur-sm text-amber-50 rounded-xl shadow-xl border border-amber-700/30 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{notification}</span>
          </div>
        </div>
      )}

      <Header
        cartItems={cartItems}
        onCartClick={() => setShowCart(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogoClick={handleLogoClick}
      />

      {/* Main Content */}
      <main>
        {view === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Hero Section */}
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="font-serif text-3xl sm:text-5xl text-amber-50 mb-3">
                Exceptional Coffees,
                <span className="text-amber-500"> Curated for You</span>
              </h2>
              <p className="text-amber-400/60 max-w-2xl mx-auto text-sm sm:text-base">
                From the world's finest growing regions, each bean is selected for its unique character and roasted to perfection.
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetail={handleViewDetail}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-amber-800/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-amber-400/60 text-lg mb-2">No coffees found</p>
                <p className="text-amber-700 text-sm">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setView('shop')}
            onAddToCart={addToCart}
          />
        )}

        {view === 'checkout' && (
          <Checkout
            items={cartItems}
            onBack={() => { setView('shop'); setShowCart(true); }}
            onComplete={() => {
              setCartItems([]);
              setView('confirmation');
            }}
          />
        )}

        {view === 'confirmation' && (
          <Confirmation
            onContinueShopping={handleLogoClick}
          />
        )}
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={() => {
            setShowCart(false);
            setView('checkout');
          }}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-amber-900/15 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                <svg className="w-3 h-3 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5A2,2 0 0,0 20,3Z" />
                </svg>
              </div>
              <span className="font-serif text-amber-200/80 text-sm">Ember & Bloom</span>
            </div>
            <p className="text-amber-700 text-xs">
              © 2026 Ember & Bloom Specialty Coffee. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
