export interface CartItem {
  id: string;
  fileName: string;
  fileUrl: string;
  material: Material;
  finish: Finish;
  quantity: number;
  dimensions: Dimensions;
  volume: number;
  price: number;
}

export interface Dimensions {
  x: number;
  y: number;
  z: number;
}

export type Material = 'pla' | 'abs' | 'nylon' | 'petg' | 'resin';

export type Finish = 'rough' | 'smooth' | 'polished' | 'painted';

export interface MaterialOption {
  id: Material;
  name: string;
  description: string;
  properties: string[];
  price: number;
}

export interface FinishOption {
  id: Finish;
  name: string;
  description: string;
  price: number;
}

export interface OrderDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingMethod: string;
  paymentMethod: string;
}