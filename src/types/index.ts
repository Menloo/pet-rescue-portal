
export type AnimalType = 'cat' | 'dog';

export type AnimalSize = 'small' | 'medium' | 'large';

export type AnimalStatus = 'available' | 'pending' | 'adopted';

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  breed: string;
  age: number; // in months
  size: AnimalSize;
  gender: 'male' | 'female';
  health: string[];
  description: string;
  imageUrl: string;
  galleryImages?: string[];
  status: AnimalStatus;
  dateAdded: string; // ISO date string
  adoptionFee?: number;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number; // in rescue coins
  imageUrl: string;
  category: 'food' | 'toys' | 'accessories' | 'experience';
  inStock: boolean;
  popularity?: number; // Adding the optional popularity field
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  coins: number;
  donations: number;
  adoptedAnimals: string[];
  purchaseHistory: {
    id: string;
    itemId: string;
    date: string;
    price: number;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface DonationData {
  amount: number;
  paymentMethod: string;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCVV?: string;
}

export interface AdoptionFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  reason: string;
  hasPets: boolean;
  experience: string;
}
