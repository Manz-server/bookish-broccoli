import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import ProductCard from './components/ProductCard';
import CheckoutModal from './components/CheckoutModal';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import { Product, StoreSettings } from './types';
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from './defaultData';
import { Search, ShoppingCart, MessageCircle, HelpCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['Semua', 'Mobile Legends', 'Free Fire', 'Genshin Impact', 'Roblox', 'Valorant', 'Voucher & App', 'Lainnya'];

export default function App() {
  // Main states
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  
  // Modal / Interaction states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const productsSectionRef = useRef<HTMLDivElement>(null);

  // Initialize data from LocalStorage
  useEffect(() => {
    // 1. Get Settings
    const localSettings = localStorage.getItem('zai_store_settings');
    if (localSettings) {
      try {
        setSettings(JSON.parse(localSettings));
      } catch (e) {
        console.error('Failed to parse local settings', e);
        localStorage.setItem('zai_store_settings', JSON.stringify(DEFAULT_SETTINGS));
      }
    } else {
      localStorage.setItem('zai_store_settings', JSON.stringify(DEFAULT_SETTINGS));
    }

    // 2. Get Products
    const localProducts = localStorage.getItem('zai_store_products');
    if (localProducts) {
      try {
        setProducts(JSON.parse(localProducts));
      } catch (e) {
        console.error('Failed to parse local products', e);
        setProducts(DEFAULT_PRODUCTS);
        localStorage.setItem('zai_store_products', JSON.stringify(DEFAULT_PRODUCTS));
      }
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('zai_store_products', JSON.stringify(DEFAULT_PRODUCTS));
    }

    // 3. Get Auth Session if any (optional transient, or session storage)
    const sessionAuth = sessionStorage.getItem('zai_store_admin_auth');
    if (sessionAuth === 'true') {
      setIsAdminLoggedIn(true);
    }

    // Scroll top listener
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update Products handler
  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('zai_store_products', JSON.stringify(newProducts));
  };

  // Update Settings handler
  const handleUpdateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    localStorage.setItem('zai_store_settings', JSON.stringify(newSettings));
  };

  // Login handler
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('zai_store_admin_auth', 'true');
    setShowLoginModal(false);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('zai_store_admin_auth');
    setCurrentView('store');
  };

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      
      {currentView === 'store' ? (
        /* ================= STORE FRONT VIEW ================= */
        <>
          {/* Navbar */}
          <Navbar 
            storeName={settings.storeName}
            storeLogo={settings.storeLogo}
            onOpenAdmin={() => {
              if (isAdminLoggedIn) {
                setCurrentView('admin');
              } else {
                setShowLoginModal(true);
              }
            }}
            onScrollToProducts={scrollToProducts}
            isAdminLoggedIn={isAdminLoggedIn}
            onAdminLogout={handleAdminLogout}
            onSelectCategory={setActiveCategory}
            activeCategory={activeCategory}
          />

          {/* Main Container */}
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            {/* Promo Hero Banner */}
            <Banner 
              bannerTitle={settings.bannerTitle}
              bannerSubtitle={settings.bannerSubtitle}
              onExploreClick={scrollToProducts}
            />

            {/* Main Shop Section */}
            <section ref={productsSectionRef} className="scroll-mt-20 space-y-8">
              
              {/* Category Filter + Search bar */}
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#1E1E1E]/50 border border-[#2D2D2D]/60 p-4 rounded-2xl backdrop-blur-sm shadow-xl">
                
                {/* Horizontal Categories */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                        activeCategory === category
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border-transparent'
                          : 'bg-[#151515] hover:bg-[#252525] text-gray-400 hover:text-white border border-[#2D2D2D]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[240px] md:min-w-[280px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Cari Diamond, Voucher, Robux..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#121212] border border-[#2D2D2D] focus:border-purple-600 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Grid Header */}
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="font-display text-xl font-extrabold text-white flex items-center gap-2">
                    <span className="h-5 w-1.5 bg-purple-600 rounded-full inline-block"></span>
                    <span>{activeCategory === 'Semua' ? 'Semua Produk Top-Up' : activeCategory}</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-medium font-sans">
                    Menampilkan {filteredProducts.length} produk pilihan terbaik
                  </p>
                </div>
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl py-16 px-4 text-center max-w-md mx-auto">
                  <HelpCircle className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1">Produk Tidak Ditemukan</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                    Kami tidak dapat menemukan produk "{searchQuery}" di kategori ini. Silakan cari dengan kata kunci lain atau pilih kategori lain.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      onBuyNow={setSelectedProduct}
                    />
                  ))}
                </div>
              )}

            </section>
          </main>

          {/* Footer */}
          <footer className="bg-[#0D0D0D] border-t border-[#2D2D2D] mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Column */}
                <div className="space-y-3 text-center md:text-left">
                  <h3 className="font-display text-lg font-black text-purple-400">{settings.storeName}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                    Platform top-up game & voucher digital termurah dan terpercaya di Indonesia. Terinspirasi dari Itemku, dibuat ramah budget (MVP) dengan proses instan via QRIS & WhatsApp.
                  </p>
                </div>

                {/* Secure / Badges */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-[#1E1E1E] px-4 py-2 rounded-xl border border-[#2D2D2D]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Server Status: Online ⚡</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">Garansi 100% Legal & Amanah</span>
                </div>

                {/* Help / Call to Action */}
                <div className="flex flex-col items-center md:items-end justify-center space-y-3">
                  <span className="text-xs text-gray-400 font-bold">Butuh Bantuan Pelanggan?</span>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md transition-all duration-200"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    <span>Hubungi WA Admin</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-[#2D2D2D]/60 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[11px] text-gray-600 font-semibold">
                  © 2026 {settings.storeName}. All Rights Reserved.
                </span>
                <span className="text-[10px] text-gray-700 font-bold uppercase tracking-wider">
                  Sederhana • Instan • Terpercaya
                </span>
              </div>
            </div>
          </footer>
        </>
      ) : (
        /* ================= ADMIN VIEW ================= */
        <AdminPanel 
          products={products}
          settings={settings}
          onUpdateProducts={handleUpdateProducts}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setCurrentView('store')}
        />
      )}

      {/* Login Admin Modal */}
      {showLoginModal && (
        <LoginModal 
          settings={settings}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Checkout Modal (Step-by-step game input and QRIS) */}
      {selectedProduct && (
        <CheckoutModal 
          product={selectedProduct}
          settings={settings}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-600/30 hover:scale-110 transition-all duration-300 cursor-pointer"
          title="Scroll ke atas"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

    </div>
  );
}
