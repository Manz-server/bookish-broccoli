import React, { useState } from 'react';
import { Menu, X, ShieldAlert, Store, Settings, MessageSquare } from 'lucide-react';

interface NavbarProps {
  storeName: string;
  storeLogo?: string;
  onOpenAdmin: () => void;
  onScrollToProducts: () => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

const CATEGORIES = ['Semua', 'Mobile Legends', 'Free Fire', 'Genshin Impact', 'Roblox', 'Valorant', 'Voucher & App', 'Lainnya'];

export default function Navbar({
  storeName,
  storeLogo,
  onOpenAdmin,
  onScrollToProducts,
  isAdminLoggedIn,
  onAdminLogout,
  onSelectCategory,
  activeCategory
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-[#2D2D2D] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectCategory('Semua')}>
            {storeLogo ? (
              <img 
                src={storeLogo} 
                alt={storeName} 
                className="w-10 h-10 object-cover rounded-lg shadow-purple"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-purple">
                {storeName ? storeName.charAt(0).toUpperCase() : 'Z'}
              </div>
            )}
            <span className="font-display text-2xl font-black tracking-tighter text-white">
              {storeName ? (
                <>
                  {storeName.split(' ')[0]} <span className="text-purple-400">{storeName.split(' ').slice(1).join(' ') || ''}</span>
                </>
              ) : (
                <>ZAI <span className="text-purple-400">STORE</span></>
              )}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={onScrollToProducts}
              className="text-gray-300 hover:text-white font-medium text-sm transition-colors cursor-pointer"
            >
              Daftar Game
            </button>
            <a
              href="https://wa.me/6285172088801"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-gray-300 hover:text-purple-400 font-medium text-sm transition-colors cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" /> Hubungi CS
            </a>
            <div className="h-4 w-[1px] bg-[#2D2D2D]"></div>
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1 px-3 w-max py-1.5 bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer"
                >
                  <Settings className="h-3.5 w-3.5" /> Dashboard
                </button>
                <button
                  onClick={onAdminLogout}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold uppercase cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-gray-300 hover:text-purple-400 border border-[#2D2D2D] hover:border-purple-500/30 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
              >
                <ShieldAlert className="h-4 w-4" /> Admin Login
              </button>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#1E1E1E] focus:outline-none border border-[#2D2D2D] cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#121212] border-b border-[#2D2D2D] px-4 py-4 space-y-3 animate-fadeIn">
          {/* Quick Category filters in mobile menu */}
          <div className="py-2 border-b border-[#2D2D2D]/50">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2 px-2">Kategori Game</span>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsOpen(false);
                    onScrollToProducts();
                  }}
                  className={`px-3 py-2 text-xs rounded-xl font-medium text-left transition-all ${
                    (activeCategory === cat || (cat === 'Semua' && activeCategory === 'Semua'))
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                      : 'bg-[#1E1E1E] text-gray-300 border border-[#2D2D2D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              onScrollToProducts();
            }}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-[#1E1E1E]"
          >
            Daftar Game / Produk
          </button>
          <a
            href="https://wa.me/6285172088801"
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-purple-400 hover:bg-[#1E1E1E]"
          >
            Hubungi Customer Service
          </a>

          <div className="border-t border-[#2D2D2D] pt-4 flex flex-col gap-2">
            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold tracking-wide cursor-pointer"
                >
                  <Settings className="h-4 w-4" /> Dashboard Admin
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onAdminLogout();
                  }}
                  className="w-full text-center py-2 text-sm text-red-400 font-medium hover:underline cursor-pointer"
                >
                  Logout Akun Admin
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#1E1E1E] border border-[#2D2D2D] hover:border-purple-500/30 text-gray-300 rounded-xl text-sm font-semibold cursor-pointer"
              >
                <ShieldAlert className="h-4 w-4 text-purple-400" /> Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
