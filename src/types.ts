export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string; // Base64 or URL
  logo: string;  // Base64 or URL
  requiresFields: string[]; // e.g. ["User ID", "Zone ID"]
}

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage: string; // Base64 or URL or gradient style
  qrisImage: string;   // Base64 or URL
  storeLogo?: string;   // Base64 or URL
  adminUsername: string;
  adminPassword: string;
}

export interface Order {
  id: string;
  product: Product;
  userInputs: Record<string, string>;
  totalPrice: number;
  status: 'pending_payment' | 'paid';
  timestamp: string;
}
