import React from 'react';
import { Sparkles, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

interface BannerProps {
  bannerTitle: string;
  bannerSubtitle: string;
  onExploreClick: () => void;
}

export default function Banner({ bannerTitle, bannerSubtitle, onExploreClick }: BannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-[#121212] to-indigo-950 border border-purple-500/20 shadow-2xl py-10 md:py-16 px-6 md:px-12 mb-12">
      {/* Dynamic Background Glowing Circles */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-purple-600/15 blur-[90px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/15 blur-[90px] pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Sparkle badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-400" /> PROMO SPESIAL HARI INI
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight uppercase"
        >
          {bannerTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-purple-200/80 text-sm md:text-base max-w-2xl mx-auto mb-8 font-sans leading-relaxed"
        >
          {bannerSubtitle}
        </motion.p>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={onExploreClick}
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl shadow-purple hover:shadow-purple-heavy hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-sm tracking-wide uppercase"
          >
            <span>Beli Sekarang</span>
            <Zap className="h-4 w-4 fill-white group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>

        {/* Trust pillars / Core Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 md:mt-16 pt-8 border-t border-[#2D2D2D]/50">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-[#1A1829]/40 border border-[#2D2D2D]/30 backdrop-blur-sm">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Proses Kilat</h4>
              <p className="text-[11px] text-gray-500 font-medium">Pengiriman instan 1-5 menit</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-[#1A1829]/40 border border-[#2D2D2D]/30 backdrop-blur-sm">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Garansi Legal</h4>
              <p className="text-[11px] text-gray-500 font-medium">100% Produk legal & aman</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-2xl bg-[#1A1829]/40 border border-[#2D2D2D]/30 backdrop-blur-sm">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Harga MVP</h4>
              <p className="text-[11px] text-gray-500 font-medium">Sesuai budget Rp50rb Anda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
