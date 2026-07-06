import { Product, StoreSettings } from './types';

// Standard SVG SVGs for game icons to look highly professional
export const GAME_ICONS = {
  ML: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="url(%23g1)"/><path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" stroke="%23A78BFA" stroke-width="4" stroke-linejoin="round"/><path d="M50 30L70 40V60L50 70L30 60V40L50 30Z" fill="%237C3AED" stroke="%23C084FC" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="%23F3F4F6"/><defs><linearGradient id="g1" x1="0" y1="0" x2="100" y2="100"><stop stop-color="%231E1B4B"/><stop offset="1" stop-color="%234338CA"/></linearGradient></defs></svg>`,
  FF: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="url(%23g2)"/><path d="M50 15C50 15 65 35 65 55C65 70 55 80 50 85C45 80 35 70 35 55C35 35 50 15 50 15Z" fill="url(%23fire)"/><path d="M50 35C50 35 58 48 58 60C58 70 52 75 50 78C48 75 42 70 42 60C42 48 50 35 50 35Z" fill="%23FBBF24"/><defs><linearGradient id="g2" x1="0" y1="0" x2="100" y2="100"><stop stop-color="%23450A0A"/><stop offset="1" stop-color="%23991B1B"/></linearGradient><linearGradient id="fire" x1="50" y1="15" x2="50" y2="85"><stop stop-color="%23EF4444"/><stop offset="1" stop-color="%23F59E0B"/></linearGradient></defs></svg>`,
  PUBG: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="url(%23g3)"/><circle cx="50" cy="50" r="25" stroke="%23F59E0B" stroke-width="4"/><path d="M50 15V30M50 70V85M15 50H30M70 50H85" stroke="%23EF4444" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="5" fill="%23EF4444"/><defs><linearGradient id="g3" x1="0" y1="0" x2="100" y2="100"><stop stop-color="%231C1917"/><stop offset="1" stop-color="%2344403C"/></linearGradient></defs></svg>`,
  GENSHIN: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="url(%23g4)"/><path d="M50 15L54 40L79 44L56 52L60 77L46 56L21 60L44 48L40 23L50 15Z" fill="url(%23star)" stroke="%23FDE047" stroke-width="2"/><defs><linearGradient id="g4" x1="0" y1="0" x2="100" y2="100"><stop stop-color="%230F172A"/><stop offset="1" stop-color="%230369A1"/></linearGradient><linearGradient id="star" x1="50" y1="15" x2="50" y2="77"><stop stop-color="%23FFFBEB"/><stop offset="1" stop-color="%23F59E0B"/></linearGradient></defs></svg>`,
  ROBLOX: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="url(%23g5)"/><g transform="translate(50,50) rotate(15) translate(-50,-50)"><rect x="30" y="30" width="40" height="40" rx="4" fill="%23FFFFFF"/><rect x="42" y="42" width="16" height="16" rx="2" fill="%231E293B"/></g><defs><linearGradient id="g5" x1="0" y1="0" x2="100" y2="100"><stop stop-color="%230F172A"/><stop offset="1" stop-color="%231E293B"/></linearGradient></defs></svg>`,
  VALORANT: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="url(%23g6)"/><path d="M25 30H45L75 70H55L25 30Z" fill="%23FF4655"/><path d="M75 30L65 43L45 30H75Z" fill="%23FF4655"/><defs><linearGradient id="g6" x1="0" y1="0" x2="100" y2="100"><stop stop-color="%23111827"/><stop offset="1" stop-color="%231F2937"/></linearGradient></defs></svg>`,
  SPOTIFY: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%23191414"/><circle cx="50" cy="50" r="30" fill="%231DB954"/><path d="M32 42C40 38 60 38 68 42M35 50C42 47 58 47 65 50M38 58C44 55 56 55 62 58" stroke="%23191414" stroke-width="4" stroke-linecap="round"/></svg>`,
  COIN: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="url(%23g7)"/><circle cx="50" cy="50" r="24" fill="%23FBBF24" stroke="%23D97706" stroke-width="3"/><path d="M50 36V64M44 42H54C57 42 57 48 54 48H46C43 48 43 54 46 54H56" stroke="%23B45309" stroke-width="4" stroke-linecap="round"/><defs><linearGradient id="g7" x1="0" y1="0" x2="100" y2="100"><stop stop-color="%23581C87"/><stop offset="1" stop-color="%233B0764"/></linearGradient></defs></svg>`
};

// Extremely professional looking Mock QRIS SVG
export const DEFAULT_QRIS = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 550" fill="none" style="background-color: %23FFFFFF; font-family: sans-serif;"><rect width="400" height="550" rx="16" fill="%23FFFFFF" stroke="%23E2E8F0" stroke-width="4"/><path d="M0 0H400V100H0V0Z" fill="%230E3D77"/><circle cx="50" cy="50" r="25" fill="%23FFFFFF"/><text x="50" y="55" font-size="14" font-weight="bold" fill="%230E3D77" text-anchor="middle">QRIS</text><path d="M120 35H180V65H120V35Z" fill="%23E11D48"/><text x="150" y="53" font-size="12" font-weight="bold" fill="%23FFFFFF" text-anchor="middle">GPN</text><text x="350" y="55" font-size="16" font-weight="bold" fill="%23FFFFFF" text-anchor="end">ZAI STORE</text><text x="200" y="130" font-size="14" font-weight="bold" fill="%23475569" text-anchor="middle">NMID : ID1020304050607</text><text x="200" y="150" font-size="12" fill="%2394A3B8" text-anchor="middle">A.N. ZAI STORE DIGITAL</text><rect x="60" y="180" width="280" height="280" rx="8" fill="%23F8FAFC" stroke="%23CBD5E1" stroke-width="2"/><g transform="translate(80, 200)"><rect x="0" y="0" width="60" height="60" fill="%230E3D77"/><rect x="15" y="15" width="30" height="30" fill="%23FFFFFF"/><rect x="22" y="22" width="16" height="16" fill="%230E3D77"/><rect x="180" y="0" width="60" height="60" fill="%230E3D77"/><rect x="195" y="15" width="30" height="30" fill="%23FFFFFF"/><rect x="202" y="22" width="16" height="16" fill="%230E3D77"/><rect x="0" y="180" width="60" height="60" fill="%230E3D77"/><rect x="15" y="195" width="30" height="30" fill="%23FFFFFF"/><rect x="22" y="202" width="16" height="16" fill="%230E3D77"/><rect x="90" y="30" width="40" height="10" fill="%230E3D77"/><rect x="150" y="40" width="15" height="40" fill="%230E3D77"/><rect x="30" y="90" width="80" height="15" fill="%230E3D77"/><rect x="140" y="100" width="50" height="20" fill="%230E3D77"/><rect x="70" y="150" width="110" height="15" fill="%230E3D77"/><rect x="120" y="190" width="30" height="30" fill="%230E3D77"/><rect x="190" y="110" width="40" height="90" fill="%230E3D77"/><rect x="90" y="90" width="15" height="50" fill="%230E3D77"/><rect x="110" y="50" width="30" height="20" fill="%230E3D77"/><circle cx="120" cy="120" r="15" fill="%23E11D48"/></g><path d="M0 500H400V550H0V500Z" fill="%23F1F5F9"/><text x="200" y="530" font-size="12" font-weight="bold" fill="%23475569" text-anchor="middle">PILIH METODE PEMBAYARAN VIA QRIS APAPUN</text></svg>`;

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'ml-86',
    name: '86 Diamonds (77 + 9 Bonus)',
    category: 'Mobile Legends',
    price: 19500,
    description: 'Top-up kilat Mobile Legends. Proses otomatis 1-5 menit saja langsung masuk ke akun game Anda.',
    image: GAME_ICONS.ML,
    logo: GAME_ICONS.ML,
    requiresFields: ['User ID', 'Zone ID']
  },
  {
    id: 'ml-172',
    name: '172 Diamonds (154 + 18 Bonus)',
    category: 'Mobile Legends',
    price: 39000,
    description: 'Top-up kilat Mobile Legends. Cukup masukkan User ID & Zone ID, bayar, beres!',
    image: GAME_ICONS.ML,
    logo: GAME_ICONS.ML,
    requiresFields: ['User ID', 'Zone ID']
  },
  {
    id: 'ff-140',
    name: '140 Diamonds (Promo Murah)',
    category: 'Free Fire',
    price: 18000,
    description: 'Top-up Free Fire termurah se-Indonesia. Cukup masukkan Player ID Free Fire Anda.',
    image: GAME_ICONS.FF,
    logo: GAME_ICONS.FF,
    requiresFields: ['Player ID (UID)']
  },
  {
    id: 'ff-355',
    name: '355 Diamonds (Promo Spesial)',
    category: 'Free Fire',
    price: 45000,
    description: 'Paket Diamond Free Fire favorit pemain. Cepat, instan, legal 100%.',
    image: GAME_ICONS.FF,
    logo: GAME_ICONS.FF,
    requiresFields: ['Player ID (UID)']
  },
  {
    id: 'genshin-300',
    name: '300 Genesis Crystals',
    category: 'Genshin Impact',
    price: 65000,
    description: 'Membeli Genesis Crystals legal via UID & Server pilihan Anda.',
    image: GAME_ICONS.GENSHIN,
    logo: GAME_ICONS.GENSHIN,
    requiresFields: ['UID Genshin', 'Server']
  },
  {
    id: 'roblox-800',
    name: '800 Robux (Fast Transaction)',
    category: 'Roblox',
    price: 110000,
    description: 'Robux instan langsung dikirim ke akun Anda. Cukup masukkan Username Roblox.',
    image: GAME_ICONS.ROBLOX,
    logo: GAME_ICONS.ROBLOX,
    requiresFields: ['Username Roblox']
  },
  {
    id: 'val-1250',
    name: '1250 Valorant Points (VP)',
    category: 'Valorant',
    price: 128000,
    description: 'Top-up Valorant Points murah legal Indonesia. Cukup Riot ID + Tagline.',
    image: GAME_ICONS.VALORANT,
    logo: GAME_ICONS.VALORANT,
    requiresFields: ['Riot ID (e.g. User%23Tag)']
  },
  {
    id: 'spotify-1m',
    name: 'Spotify Premium 1 Bulan (Individual)',
    category: 'Voucher & App',
    price: 25000,
    description: 'Aktivasi premium akun Spotify pribadi Anda. Anti on-hold, garansi penuh.',
    image: GAME_ICONS.SPOTIFY,
    logo: GAME_ICONS.SPOTIFY,
    requiresFields: ['Email Akun Spotify', 'Password (Opsional) atau Link Invite']
  }
];

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Zai Store',
  whatsappNumber: '6285172088801', // Standard Indonesian formatted WhatsApp
  bannerTitle: 'Zai Store Digital',
  bannerSubtitle: 'Pusat Top-Up Game & Voucher Digital Termurah, Amanah & Tercepat Se-Indonesia',
  bannerImage: 'gradient_purple_black',
  qrisImage: DEFAULT_QRIS,
  adminUsername: 'admin',
  adminPassword: 'zai123' // default password as requested
};
