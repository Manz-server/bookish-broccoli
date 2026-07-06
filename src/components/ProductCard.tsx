import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onBuyNow: (product: Product) => void;
}

export default function ProductCard({ product, onBuyNow }: ProductCardProps) {
  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-zai-card hover:bg-[#252525] border border-gray-800 hover:border-purple-600 shadow-md hover:shadow-purple transition-all duration-300">
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div>
        {/* Card Header (Game logo + category name) */}
        <div className="relative p-4 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden bg-[#121212] border border-gray-800">
              <img
                src={product.logo}
                alt={product.category}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400 font-medium">Verified Seller</span>
                <ShieldCheck className="h-3 w-3 text-purple-400 fill-purple-400/10" />
              </div>
            </div>
          </div>
          {/* Rating tag */}
          <div className="flex items-center gap-0.5 bg-black/40 border border-gray-800 px-2 py-0.5 rounded text-[10px] font-bold text-amber-500">
            <Star className="h-2.5 w-2.5 fill-amber-500" />
            <span>4.9</span>
          </div>
        </div>

        {/* Card Main Image (or representation) */}
        <div className="p-4 pt-3">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#121212] relative border border-gray-800/80 group-hover:border-purple-500/25 transition-colors">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            {/* Absolute badge for "INSTAN" */}
            <span className="absolute bottom-2 right-2 bg-purple-600/90 text-white font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">
              KILAT ⚡
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="px-4 pb-2">
          <h3 className="font-display font-bold text-gray-200 text-sm line-clamp-2 leading-snug group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 line-clamp-1 font-medium font-sans">
            {product.description || 'Proses cepat amanah 100% legal.'}
          </p>
        </div>
      </div>

      {/* Card Footer (Price & Beli Button) */}
      <div className="p-4 pt-2 border-t border-gray-800/50 flex flex-col gap-2.5 bg-[#1C1C1C]/40">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-medium">Harga Terbaik</span>
          <span className="text-lg font-black text-white mt-1 italic">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={() => onBuyNow(product)}
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg shadow-purple transition-all duration-200 group-active:scale-95 cursor-pointer uppercase tracking-wider"
        >
          BELI SEKARANG
        </button>
      </div>
    </div>
  );
}
