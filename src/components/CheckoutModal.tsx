import React, { useState } from 'react';
import { Product, StoreSettings } from '../types';
import { X, ArrowRight, ShieldCheck, QrCode, Copy, Check, ExternalLink } from 'lucide-react';

interface CheckoutModalProps {
  product: Product;
  settings: StoreSettings;
  onClose: () => void;
}

export default function CheckoutModal({ product, settings, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInputs(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    // Validate each required field has a value
    product.requiresFields.forEach(field => {
      if (!userInputs[field] || userInputs[field].trim() === '') {
        newErrors[field] = `${field} tidak boleh kosong`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(2);
  };

  const handleCopyPrice = () => {
    navigator.clipboard.writeText(product.price.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaidConfirmation = () => {
    // Generate WhatsApp text details
    const formattedPrice = formatPrice(product.price);
    const detailInputs = Object.entries(userInputs)
      .map(([key, val]) => `* ${key}: ${val}`)
      .join('\n');

    const message = `Halo ${settings.storeName}.

Saya sudah melakukan pembayaran.

Detail Pesanan:
* Produk: ${product.name}
* Harga: ${formattedPrice}
${detailInputs}

Berikut saya lampirkan bukti transfer.

Terima kasih.`;

    // Clean up WhatsApp number (remove +, spaces, etc.)
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WA in a new tab
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#1E1E1E] border border-[#2D2D2D] shadow-2xl shadow-purple-950/20 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#151515] border-b border-[#2D2D2D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg overflow-hidden bg-[#121212] flex-shrink-0">
              <img src={product.logo} alt={product.category} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm">Beli {product.category}</h3>
              <p className="text-[10px] text-gray-400 font-medium">{product.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#252525] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className={`h-2 w-12 rounded-full transition-colors ${step >= 1 ? 'bg-purple-600' : 'bg-[#2D2D2D]'}`}></span>
            <span className={`h-2 w-12 rounded-full transition-colors ${step >= 2 ? 'bg-purple-600' : 'bg-[#2D2D2D]'}`}></span>
          </div>

          {step === 1 ? (
            /* STEP 1: FILL FORM */
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="bg-[#151515] p-4 rounded-xl border border-[#2D2D2D] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Rincian Produk</span>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Nama Item:</span>
                  <span className="text-white font-bold">{product.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Harga:</span>
                  <span className="text-purple-400 font-extrabold">{formatPrice(product.price)}</span>
                </div>
              </div>

              {/* Dynamic Inputs Based on Product Requirements */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">Data Akun Game / Penerima</h4>
                {product.requiresFields.map((field) => (
                  <div key={field} className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-400 font-semibold">{field}</label>
                    <input
                      type="text"
                      placeholder={`Masukkan ${field}...`}
                      value={userInputs[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className={`w-full bg-[#151515] border ${errors[field] ? 'border-red-500' : 'border-[#2D2D2D] focus:border-purple-600'} text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors`}
                    />
                    {errors[field] && (
                      <span className="text-[10px] text-red-400 font-semibold">{errors[field]}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <span>Lanjut Pembayaran</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: PAYMENT & QRIS */
            <div className="space-y-5">
              {/* Payment Info */}
              <div className="text-center space-y-2">
                <span className="text-xs text-gray-400 font-medium">Total Pembayaran</span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-extrabold text-white">{formatPrice(product.price)}</span>
                  <button
                    onClick={handleCopyPrice}
                    className="p-1 rounded bg-[#2D2D2D] hover:bg-purple-600/30 text-gray-400 hover:text-purple-300 transition-all cursor-pointer"
                    title="Salin nominal"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {copied && <p className="text-[10px] text-emerald-400 font-bold">Nominal berhasil disalin!</p>}
              </div>

              {/* QRIS Code */}
              <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl max-w-[260px] mx-auto border-4 border-purple-600 shadow-xl shadow-purple-950/20">
                <img
                  src={settings.qrisImage}
                  alt="QRIS Pembayaran"
                  className="w-full h-auto object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Instructions */}
              <div className="bg-[#151515] p-4 rounded-xl border border-[#2D2D2D] space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center gap-1.5 font-bold text-purple-400 uppercase tracking-wide border-b border-[#2D2D2D] pb-1.5">
                  <QrCode className="h-4 w-4" />
                  <span>Petunjuk Pembayaran</span>
                </div>
                <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed font-sans font-medium text-gray-400">
                  <li>Simpan atau <span className="text-white">Screenshot QRIS</span> di atas.</li>
                  <li>Buka aplikasi e-wallet Anda (Dana, GoPay, OVO, ShopeePay) atau m-Banking Anda.</li>
                  <li>Pilih opsi <span className="text-white">Scan/QRIS</span>, lalu upload/pilih gambar QRIS tadi.</li>
                  <li>Pastikan nominal pembayaran tepat sebesar <span className="text-purple-400 font-bold">{formatPrice(product.price)}</span>.</li>
                  <li>Setelah transaksi sukses, klik tombol <span className="text-purple-400 font-bold">"Saya Sudah Bayar"</span> di bawah ini untuk mengirim bukti ke WhatsApp Admin.</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handlePaidConfirmation}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Saya Sudah Bayar (Kirim Bukti)</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-2 bg-transparent hover:bg-[#252525] text-gray-400 hover:text-white rounded-xl text-xs font-semibold border border-transparent hover:border-[#2D2D2D] transition-all cursor-pointer"
                >
                  Kembali ke Data Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
