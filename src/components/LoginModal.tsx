import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, KeyRound } from 'lucide-react';
import { StoreSettings } from '../types';

interface LoginModalProps {
  settings: StoreSettings;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ settings, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === settings.adminUsername && password === settings.adminPassword) {
      onLoginSuccess();
    } else {
      setError('Username atau Password salah!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#1E1E1E] border border-[#2D2D2D] shadow-2xl shadow-purple-950/20 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#151515] border-b border-[#2D2D2D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-600/10 text-purple-400 rounded-lg">
              <KeyRound className="h-4 w-4" />
            </div>
            <h3 className="font-display font-bold text-white text-sm">Login Admin Panel</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#252525] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-400 text-xs font-semibold rounded-xl text-center">
                {error}
              </div>
            )}

            {/* Username Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                <User className="h-3 w-3 text-gray-500" /> Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username..."
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                className="w-full bg-[#151515] border border-[#2D2D2D] focus:border-purple-600 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                <Lock className="h-3 w-3 text-gray-500" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password..."
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full bg-[#151515] border border-[#2D2D2D] focus:border-purple-600 text-white rounded-xl pl-4 pr-10 py-2.5 text-sm outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Masuk ke Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
