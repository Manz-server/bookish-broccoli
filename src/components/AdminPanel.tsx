import React, { useState, useRef } from 'react';
import { Product, StoreSettings } from '../types';
import { 
  Plus, Edit2, Trash2, Settings, Smartphone, RefreshCw, Upload, Image as ImageIcon, 
  Save, Check, X, Search, LogOut, ArrowLeft, Gamepad2, Info
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  settings: StoreSettings;
  onUpdateProducts: (newProducts: Product[]) => void;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onClose: () => void;
}

const CATEGORY_OPTIONS = [
  'Mobile Legends',
  'Free Fire',
  'PUBG Mobile',
  'Genshin Impact',
  'Roblox',
  'Valorant',
  'Voucher & App',
  'Lainnya'
];

export default function AdminPanel({
  products,
  settings,
  onUpdateProducts,
  onUpdateSettings,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  
  // Product States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  
  // Form states for Product
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Mobile Legends');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodDesc, setProdDesc] = useState('');
  const [prodLogo, setProdLogo] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodFields, setProdFields] = useState<string[]>(['User ID', 'Zone ID']);
  
  // File refs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const qrisInputRef = useRef<HTMLInputElement>(null);
  const storeLogoInputRef = useRef<HTMLInputElement>(null);

  // Settings form states
  const [storeName, setStoreName] = useState(settings.storeName);
  const [storeLogo, setStoreLogo] = useState(settings.storeLogo || '');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [bannerTitle, setBannerTitle] = useState(settings.bannerTitle);
  const [bannerSubtitle, setBannerSubtitle] = useState(settings.bannerSubtitle);
  const [qrisImage, setQrisImage] = useState(settings.qrisImage);
  const [adminUsername, setAdminUsername] = useState(settings.adminUsername);
  const [adminPassword, setAdminPassword] = useState(settings.adminPassword);

  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const triggerNotif = (message: string, type: 'success' | 'error' = 'success') => {
    setNotif({ message, type });
    setTimeout(() => setNotif(null), 3000);
  };

  // Helper to convert files to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'logo' | 'image' | 'qris' | 'store_logo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (target === 'logo') setProdLogo(base64String);
      if (target === 'image') setProdImage(base64String);
      if (target === 'store_logo') {
        setStoreLogo(base64String);
        triggerNotif('Logo Toko berhasil diunggah!');
      }
      if (target === 'qris') {
        setQrisImage(base64String);
        triggerNotif('QRIS baru berhasil diunggah!');
      }
    };
    reader.readAsDataURL(file);
  };

  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdCategory(prod.category);
    setProdPrice(prod.price);
    setProdDesc(prod.description);
    setProdLogo(prod.logo);
    setProdImage(prod.image);
    setProdFields(prod.requiresFields);
    setIsAddingNew(false);
  };

  const startAddProduct = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Mobile Legends');
    setProdPrice(0);
    setProdDesc('');
    // Use standard default logo from CATEGORY templates based on mobile legends
    setProdLogo('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%237C3AED"/><circle cx="50" cy="50" r="20" fill="%23FFFFFF"/></svg>');
    setProdImage('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%237C3AED"/><circle cx="50" cy="50" r="20" fill="%23FFFFFF"/></svg>');
    setProdFields(['User ID', 'Zone ID']);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      triggerNotif('Nama produk tidak boleh kosong!', 'error');
      return;
    }
    if (prodPrice <= 0) {
      triggerNotif('Harga produk harus lebih dari 0!', 'error');
      return;
    }
    if (prodFields.length === 0) {
      triggerNotif('Data Game (ID/Field) yang sesuai dengan game tersebut wajib diisi!', 'error');
      return;
    }

    if (isAddingNew) {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: prodName,
        category: prodCategory,
        price: prodPrice,
        description: prodDesc,
        logo: prodLogo,
        image: prodImage || prodLogo, // fallback
        requiresFields: prodFields
      };
      onUpdateProducts([...products, newProduct]);
      setIsAddingNew(false);
      triggerNotif('Produk baru berhasil ditambahkan!');
    } else if (editingProduct) {
      const updated = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: prodName,
            category: prodCategory,
            price: prodPrice,
            description: prodDesc,
            logo: prodLogo,
            image: prodImage,
            requiresFields: prodFields
          };
        }
        return p;
      });
      onUpdateProducts(updated);
      setEditingProduct(null);
      triggerNotif('Produk berhasil diperbarui!');
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      const filtered = products.filter(p => p.id !== id);
      onUpdateProducts(filtered);
      triggerNotif('Produk berhasil dihapus!');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      triggerNotif('Nama Toko tidak boleh kosong!', 'error');
      return;
    }
    if (!whatsappNumber.trim()) {
      triggerNotif('Nomor WhatsApp tidak boleh kosong!', 'error');
      return;
    }

    const updatedSettings: StoreSettings = {
      storeName,
      whatsappNumber,
      bannerTitle,
      bannerSubtitle,
      bannerImage: 'gradient_purple_black',
      qrisImage,
      storeLogo,
      adminUsername,
      adminPassword
    };

    onUpdateSettings(updatedSettings);
    triggerNotif('Pengaturan toko berhasil diperbarui!');
  };

  const toggleField = (field: string) => {
    if (prodFields.includes(field)) {
      setProdFields(prodFields.filter(f => f !== field));
    } else {
      setProdFields([...prodFields, field]);
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#121212] py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {notif && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 border animate-fadeIn ${
          notif.type === 'success' 
            ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/30' 
            : 'bg-red-950/90 text-red-400 border-red-500/30'
        }`}>
          <Check className="h-4 w-4" />
          <span>{notif.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#1E1E1E] hover:bg-[#2A2A2A] text-gray-400 hover:text-white border border-[#2D2D2D] transition-all cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-black text-white">Zai Store - Admin Panel</h1>
              <p className="text-xs text-gray-500">Kelola semua rincian produk, banner, dan sistem pembayaran QRIS toko Anda.</p>
            </div>
          </div>

          {/* Quick Stats or Exit */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 hover:border-transparent rounded-xl text-xs font-bold uppercase transition-all duration-300 cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Keluar Dashboard
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#2D2D2D] gap-2 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'border-purple-600 text-white bg-purple-600/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="h-4 w-4" /> Kelola Produk
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-purple-600 text-white bg-purple-600/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" /> Pengaturan Toko
          </button>
        </div>

        {/* Tab Content 1: Products Management */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Product List */}
            <div className={`lg:col-span-7 ${editingProduct || isAddingNew ? 'hidden lg:block' : 'col-span-12'}`}>
              <div className="bg-[#1E1E1E] rounded-2xl border border-[#2D2D2D] p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <span className="text-sm font-bold text-white">Daftar Produk ({products.length})</span>
                  <button
                    onClick={startAddProduct}
                    className="flex items-center gap-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Tambah Produk Baru
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Cari produk berdasarkan nama atau kategori..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-[#121212] border border-[#2D2D2D] focus:border-purple-600 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-colors"
                  />
                </div>

                {/* Products Table/List */}
                <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs font-semibold">
                      Tidak ada produk ditemukan.
                    </div>
                  ) : (
                    filteredProducts.map(p => (
                      <div
                        key={p.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          editingProduct?.id === p.id 
                            ? 'bg-purple-600/10 border-purple-600/50' 
                            : 'bg-[#151515] hover:bg-[#1A1A1A] border-[#2D2D2D]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-[#1E1E1E] flex-shrink-0 border border-[#2D2D2D]">
                            <img src={p.logo} alt={p.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-purple-400 font-bold uppercase">{p.category}</span>
                              <span className="text-[10px] text-gray-500">•</span>
                              <span className="text-[10px] text-gray-400 font-mono font-bold">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p.price)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-purple-600/20 text-gray-400 hover:text-purple-400 border border-[#2D2D2D] transition-colors cursor-pointer"
                            title="Edit Produk"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-red-600/20 text-gray-400 hover:text-red-400 border border-[#2D2D2D] transition-colors cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Product Form */}
            {(editingProduct || isAddingNew) && (
              <div className="lg:col-span-5 col-span-12">
                <div className="bg-[#1E1E1E] rounded-2xl border border-purple-500/20 shadow-xl p-5 space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-[#2D2D2D] pb-3">
                    <span className="text-sm font-bold text-white">
                      {isAddingNew ? 'Tambah Produk Baru' : 'Edit Rincian Produk'}
                    </span>
                    <button
                      onClick={() => { setEditingProduct(null); setIsAddingNew(false); }}
                      className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#252525] cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-bold">Nama Produk *</label>
                      <input
                        type="text"
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="Contoh: 86 Diamonds"
                        className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-bold">Kategori Game *</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600"
                      >
                        {CATEGORY_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-bold">Harga Produk (IDR) *</label>
                      <input
                        type="number"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(Number(e.target.value))}
                        placeholder="Contoh: 19500"
                        className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 font-mono text-sm"
                        required
                        min="0"
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-400 font-bold">Deskripsi Singkat</label>
                      <textarea
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        placeholder="Rincian produk, garansi, dsb."
                        rows={3}
                        className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 leading-relaxed"
                      />
                    </div>                     {/* Required Input Fields */}
                     <div className="flex flex-col gap-1.5">
                       <label className="text-gray-400 font-bold">Kustom ID / Field Game yang Diperlukan *</label>
                       <p className="text-[10px] text-gray-500">Isi ID/field data game yang wajib diisi buyer sesuai game tersebut (pisahkan dengan koma jika lebih dari satu).</p>
                       <input
                         type="text"
                         value={prodFields.join(', ')}
                         onChange={(e) => {
                           const fields = e.target.value.split(',').map(f => f.trim()).filter(f => f !== '');
                           setProdFields(fields);
                         }}
                         placeholder="Contoh: User ID, Zone ID"
                         className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 font-bold"
                         required
                       />
                       <div className="flex flex-col gap-1.5 mt-1">
                         <span className="text-[10px] text-gray-500 font-semibold uppercase">Pilihan Preset Cepat Sesuai Game:</span>
                         <div className="flex flex-wrap gap-1.5">
                           <button
                             type="button"
                             onClick={() => setProdFields(['User ID', 'Zone ID'])}
                             className="px-2 py-1 bg-[#252525] hover:bg-purple-900/30 text-[10px] text-gray-300 hover:text-purple-300 rounded border border-[#2D2D2D] transition-colors cursor-pointer"
                           >
                             Mobile Legends (User ID, Zone ID)
                           </button>
                           <button
                             type="button"
                             onClick={() => setProdFields(['Player ID (UID)'])}
                             className="px-2 py-1 bg-[#252525] hover:bg-purple-900/30 text-[10px] text-gray-300 hover:text-purple-300 rounded border border-[#2D2D2D] transition-colors cursor-pointer"
                           >
                             Free Fire (Player ID)
                           </button>
                           <button
                             type="button"
                             onClick={() => setProdFields(['UID Genshin', 'Server'])}
                             className="px-2 py-1 bg-[#252525] hover:bg-purple-900/30 text-[10px] text-gray-300 hover:text-purple-300 rounded border border-[#2D2D2D] transition-colors cursor-pointer"
                           >
                             Genshin Impact (UID, Server)
                           </button>
                           <button
                             type="button"
                             onClick={() => setProdFields(['Riot ID (e.g. User%23Tag)'])}
                             className="px-2 py-1 bg-[#252525] hover:bg-purple-900/30 text-[10px] text-gray-300 hover:text-purple-300 rounded border border-[#2D2D2D] transition-colors cursor-pointer"
                           >
                             Valorant (Riot ID)
                           </button>
                           <button
                             type="button"
                             onClick={() => setProdFields(['Username Roblox'])}
                             className="px-2 py-1 bg-[#252525] hover:bg-purple-900/30 text-[10px] text-gray-300 hover:text-purple-300 rounded border border-[#2D2D2D] transition-colors cursor-pointer"
                           >
                             Roblox (Username)
                           </button>
                           <button
                             type="button"
                             onClick={() => setProdFields(['Email Akun Spotify', 'No. HP / WA'])}
                             className="px-2 py-1 bg-[#252525] hover:bg-purple-900/30 text-[10px] text-gray-300 hover:text-purple-300 rounded border border-[#2D2D2D] transition-colors cursor-pointer"
                           >
                             Spotify / App (Email, No. HP)
                           </button>
                         </div>
                       </div>
                     </div>

                    {/* File Upload / Image fields */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 font-bold">Logo/Icon Game</label>
                        <button
                          type="button"
                          onClick={() => logoInputRef.current?.click()}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#151515] hover:bg-[#252525] border border-[#2D2D2D] text-gray-300 rounded-xl transition-colors cursor-pointer"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>Pilih File</span>
                        </button>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'logo')}
                          className="hidden"
                        />
                        {prodLogo && (
                          <div className="h-10 w-10 rounded-lg overflow-hidden border border-[#2D2D2D] bg-[#121212] mx-auto mt-1">
                            <img src={prodLogo} alt="Preview Logo" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 font-bold">Gambar Banner Produk</label>
                        <button
                          type="button"
                          onClick={() => imgInputRef.current?.click()}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#151515] hover:bg-[#252525] border border-[#2D2D2D] text-gray-300 rounded-xl transition-colors cursor-pointer"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>Pilih File</span>
                        </button>
                        <input
                          ref={imgInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'image')}
                          className="hidden"
                        />
                        {prodImage && (
                          <div className="h-10 w-20 rounded-lg overflow-hidden border border-[#2D2D2D] bg-[#121212] mx-auto mt-1">
                            <img src={prodImage} alt="Preview Banner" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Save className="h-4 w-4" />
                        <span>Simpan Produk</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setEditingProduct(null); setIsAddingNew(false); }}
                        className="px-4 py-2.5 bg-[#252525] hover:bg-[#303030] text-gray-300 rounded-xl font-bold border border-[#2D2D2D] transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Store Settings */}
        {activeTab === 'settings' && (
          <div className="bg-[#1E1E1E] rounded-2xl border border-[#2D2D2D] p-6 max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
              <Settings className="h-4 w-4 text-purple-400" /> Pengaturan Global Toko
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              {/* Shop Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 font-bold">Nama Toko *</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 text-sm font-bold"
                  required
                />
              </div>

              {/* Upload Logo Toko */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 font-bold flex items-center gap-1">
                  <Upload className="h-3.5 w-3.5 text-purple-400" /> Logo Toko (Menggantikan Badge Navigasi)
                </label>
                <p className="text-[10px] text-gray-500">Unggah logo untuk menggantikan logo bawaan 'Z' di header navigasi.</p>
                <div className="flex items-center gap-3 bg-[#151515] p-3 rounded-xl border border-[#2D2D2D]">
                  <button
                    type="button"
                    onClick={() => storeLogoInputRef.current?.click()}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#252525] hover:bg-[#323232] border border-[#2D2D2D] text-gray-300 hover:text-white rounded-xl transition-colors cursor-pointer font-bold"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Pilih Logo Toko</span>
                  </button>
                  <input
                    ref={storeLogoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'store_logo')}
                    className="hidden"
                  />
                  {storeLogo ? (
                    <div className="relative">
                      <img src={storeLogo} alt="Logo Toko" className="h-10 w-10 rounded-lg object-cover border border-[#2D2D2D]" />
                      <button
                        type="button"
                        onClick={() => setStoreLogo('')}
                        className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-700 text-white p-0.5 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-[10px]">Belum ada logo diunggah (menggunakan inisial nama toko)</span>
                  )}
                </div>
              </div>

              {/* WA Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 font-bold flex items-center gap-1">
                  <Smartphone className="h-3.5 w-3.5 text-purple-400" /> Nomor WhatsApp Admin (Gunakan Kode Negara: 62...) *
                </label>
                <p className="text-[10px] text-gray-500">Nomor ini akan digunakan sebagai tujuan checkout WhatsApp otomatis pelanggan.</p>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Contoh: 628123456789"
                  className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 font-mono text-sm"
                  required
                />
              </div>

              {/* Banner Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-bold">Judul Banner Utama</label>
                  <input
                    type="text"
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-bold">Sub-Judul Banner</label>
                  <input
                    type="text"
                    value={bannerSubtitle}
                    onChange={(e) => setBannerSubtitle(e.target.value)}
                    className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* QRIS Upload */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-gray-400 font-bold flex items-center gap-1">
                  <ImageIcon className="h-3.5 w-3.5 text-purple-400" /> Ganti Gambar QRIS Toko
                </label>
                <p className="text-[10px] text-gray-500">Unggah file QRIS baru. QRIS ini akan ditampilkan saat buyer memilih opsi Lanjut Pembayaran.</p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#151515] p-4 rounded-xl border border-[#2D2D2D]">
                  <div className="h-32 w-24 bg-white p-2 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-300">
                    <img src={qrisImage} alt="QRIS Preview" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 w-full text-center sm:text-left space-y-2">
                    <button
                      type="button"
                      onClick={() => qrisInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#252525] hover:bg-[#303030] text-gray-300 hover:text-white border border-[#2D2D2D] rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Unggah Gambar QRIS Baru</span>
                    </button>
                    <input
                      ref={qrisInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'qris')}
                      className="hidden"
                    />
                    <p className="text-[9px] text-gray-500 leading-normal">Mendukung format PNG, JPG, atau SVG. Gambar langsung diubah menjadi Base64 dan disimpan di Local Storage browser Anda secara offline.</p>
                  </div>
                </div>
              </div>

              {/* Security Admin Credentials */}
              <div className="border-t border-[#2D2D2D] pt-4 mt-2 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-bold">Admin Username</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-bold">Admin Password</label>
                  <input
                    type="text"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-[#151515] border border-[#2D2D2D] text-white rounded-xl px-3.5 py-2.5 outline-none focus:border-purple-600 font-mono"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-4 border-t border-[#2D2D2D]">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-sm"
                >
                  <Save className="h-4.5 w-4.5" />
                  <span>Simpan Semua Pengaturan</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
