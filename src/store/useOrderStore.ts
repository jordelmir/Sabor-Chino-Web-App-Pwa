import { create } from 'zustand';
import { Product } from '../data/menuData';

export type OrderStatus = 'validando_pago' | 'nuevo' | 'preparando' | 'listo' | 'en_camino' | 'entregado';

export interface OrderItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
  notes: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  receiptNumber?: string;
  createdAt: number; // timestamp
  type: 'Para Llevar' | 'Comer Aquí' | 'Express';
  address?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [
    {
      id: '8495',
      createdAt: Date.now() - 2 * 60000,
      type: 'Para Llevar',
      status: 'nuevo',
      customerName: 'Carlos',
      paymentMethod: 'Efectivo',
      total: 7000,
      items: [
        { id: '1', product: { id: '1', name: 'Combo 1', price: 3500, category: 'Combos', description: '', image: '' }, size: 'Unico', quantity: 1, notes: '' },
      ]
    },
    {
      id: '8496',
      createdAt: Date.now() - 5 * 60000,
      type: 'Express',
      status: 'validando_pago',
      customerName: 'María',
      paymentMethod: 'SINPE',
      receiptNumber: '987654321',
      total: 12500,
      address: '100m sur de la iglesia',
      items: [
        { id: '2', product: { id: '2', name: 'Arroz Cantonés', price: 4500, category: 'Arroces', description: '', image: '' }, size: 'Entero', quantity: 2, notes: 'Sin cebollín' },
      ]
    },
    {
      id: '8490',
      createdAt: Date.now() - 86400000 * 2, // 2 days ago
      type: 'Express',
      status: 'entregado',
      customerName: 'Cliente Web',
      paymentMethod: 'Tarjeta',
      total: 10500,
      address: 'Mi Casa',
      items: [
        { id: '3', product: { id: '3', name: 'Combo 4', price: 7000, category: 'Combos', description: '', image: '' }, size: 'Unico', quantity: 1, notes: '' },
        { id: '4', product: { id: '4', name: 'Rollitos Primavera', price: 3500, category: 'Entradas', description: '', image: '' }, size: 'Unico', quantity: 1, notes: '' },
      ]
    }
  ],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
  }))
}));
