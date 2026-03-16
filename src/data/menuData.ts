export type SizeOption = 'Entero' | 'Medio' | 'Unico';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  priceMedio?: number;
  image?: string;
  popular?: boolean;
}

export const CATEGORIES = [
  'Promociones',
  'Combos',
  'Arroces',
  'Sopas',
  'Chopsuey',
  'Chowmein',
  'Wan Tan',
  'Tacos Chinos',
  'Papas Fritas',
  'Alitas de Pollo',
  'Casados Especiales',
  'Especialidades',
];

export const MENU_DATA: Product[] = [
  // Promociones
  { id: 'promo-1', name: 'Promo Viernes', description: '2 Enteros de Cantonés', category: 'Promociones', price: 5500, popular: true },
  { id: 'promo-2', name: 'Promo Sábado', description: '2 Enteros de Cantonés + Alitas', category: 'Promociones', price: 8000, popular: true },
  { id: 'promo-3', name: 'Promo Domingo', description: '2 Enteros de Cantonés + Alitas + Papas Grandes + Refresco 2.5L', category: 'Promociones', price: 11000, popular: true },
  
  // Combos
  { id: 'combo-1', name: 'Combo 1', description: 'Cuarto de Cantonés, 3 Alitas + Papas', category: 'Combos', price: 2500 },
  { id: 'combo-2', name: 'Combo 2', description: 'Medio de Cantonés, 5 Alitas + Papas', category: 'Combos', price: 3000 },
  { id: 'combo-3', name: 'Combo 3', description: 'Cuarto de Cantonés, 5 Alitas + Papas + Refresco', category: 'Combos', price: 3500 },
  { id: 'combo-4', name: 'Combo 4', description: 'Entero de Cantonés, 10 Alitas + Papas Grandes', category: 'Combos', price: 7000 },

  // Arroces
  { id: 'arr-1', name: 'Arroz Sabor Chino', category: 'Arroces', price: 3500, priceMedio: 2500 },
  { id: 'arr-2', name: 'Arroz Con Camarones', category: 'Arroces', price: 4000, priceMedio: 2500 },
  { id: 'arr-3', name: 'Arroz Cantonés', category: 'Arroces', price: 3000, priceMedio: 2000, popular: true },
  { id: 'arr-4', name: 'Arroz con Pollo', category: 'Arroces', price: 3000, priceMedio: 2000 },
  { id: 'arr-5', name: 'Arroz con Lechón', category: 'Arroces', price: 3000, priceMedio: 2000 },
  { id: 'arr-6', name: 'Arroz con Lomito', category: 'Arroces', price: 4500, priceMedio: 2500 },
  { id: 'arr-7', name: 'Arroz con Chorizo Chino', category: 'Arroces', price: 4500, priceMedio: 2500 },
  { id: 'arr-8', name: 'Arroz con Mariscos', category: 'Arroces', price: 4500 },
  { id: 'arr-9', name: 'Arroz Mar y Tierra', category: 'Arroces', price: 4500 },

  // Sopas
  { id: 'sop-1', name: 'Sopa de Pollo', category: 'Sopas', price: 3000 },
  { id: 'sop-2', name: 'Sopa de Lomito', category: 'Sopas', price: 3300 },
  { id: 'sop-3', name: 'Sopa Wan tan', category: 'Sopas', price: 3800 },
  { id: 'sop-4', name: 'Sopa de Mariscos en Agua', category: 'Sopas', price: 3800 },
  { id: 'sop-5', name: 'Sopa de Mariscos en Leche', category: 'Sopas', price: 4500 },

  // Chopsuey
  { id: 'chop-1', name: 'Sabor Chino', category: 'Chopsuey', price: 3500, priceMedio: 2800 },
  { id: 'chop-2', name: 'Camarones', category: 'Chopsuey', price: 4500, priceMedio: 2800 },
  { id: 'chop-3', name: 'Pollo', category: 'Chopsuey', price: 3000, priceMedio: 2200 },
  { id: 'chop-4', name: 'Lechón', category: 'Chopsuey', price: 3000, priceMedio: 2200 },
  { id: 'chop-5', name: 'Lomito', category: 'Chopsuey', price: 4500, priceMedio: 2800 },
  { id: 'chop-6', name: 'Chorizo Chino', category: 'Chopsuey', price: 4500, priceMedio: 2800 },
  { id: 'chop-7', name: 'Vegetariano', category: 'Chopsuey', price: 3000, priceMedio: 2000 },

  // Chowmein
  { id: 'chow-1', name: 'Sabor Chino', category: 'Chowmein', price: 4000, priceMedio: 2800 },
  { id: 'chow-2', name: 'Camarones', category: 'Chowmein', price: 4500, priceMedio: 2800 },
  { id: 'chow-3', name: 'Pollo', category: 'Chowmein', price: 3200, priceMedio: 2200 },
  { id: 'chow-4', name: 'Lechón', category: 'Chowmein', price: 3200, priceMedio: 2300 },
  { id: 'chow-5', name: 'Lomito', category: 'Chowmein', price: 4500, priceMedio: 2800 },
  { id: 'chow-6', name: 'Chorizo Chino', category: 'Chowmein', price: 4500, priceMedio: 2800 },
  { id: 'chow-7', name: 'Vegetariano', category: 'Chowmein', price: 3000, priceMedio: 2000 },

  // Wan Tan
  { id: 'wan-1', name: 'Camarones', category: 'Wan Tan', price: 3200 },
  { id: 'wan-2', name: 'Pollo', category: 'Wan Tan', price: 2800 },

  // Tacos Chinos
  { id: 'tac-1', name: 'Tacos Chinos (3 unid)', category: 'Tacos Chinos', price: 2500 },

  // Papas Fritas
  { id: 'pap-1', name: 'Papas Fritas Grandes', category: 'Papas Fritas', price: 2000 },
  { id: 'pap-2', name: 'Papas Fritas Pequeñas', category: 'Papas Fritas', price: 1500 },

  // Alitas de Pollo
  { id: 'ali-1', name: 'Alitas de Pollo (5 unid)', category: 'Alitas de Pollo', price: 1700 },
  { id: 'ali-2', name: 'Alitas de Pollo (10 unid)', category: 'Alitas de Pollo', price: 3000 },

  // Casados Especiales
  { id: 'cas-1', name: 'Casado con Camarón Empanizado', category: 'Casados Especiales', price: 4000 },
  { id: 'cas-2', name: 'Casado con Pescado', category: 'Casados Especiales', price: 4000 },
  { id: 'cas-3', name: 'Casado con Lomito Salteado', category: 'Casados Especiales', price: 4000 },
  { id: 'cas-4', name: 'Casado con Pollo en Salsa Agridulce', category: 'Casados Especiales', price: 4000 },
  { id: 'cas-5', name: 'Casado Chino en Salsa y Seco', category: 'Casados Especiales', price: 4000 },

  // Especialidades
  { id: 'esp-1', name: 'Lomito con Brócoli', category: 'Especialidades', price: 4500 },
  { id: 'esp-2', name: 'Camarones con vegetales', category: 'Especialidades', price: 4500 },
  { id: 'esp-3', name: 'Pollo con Brócoli', category: 'Especialidades', price: 4000 },
  { id: 'esp-4', name: 'Lomito con vegetales', category: 'Especialidades', price: 4500 },
  { id: 'esp-5', name: 'Camarones con Brócoli', category: 'Especialidades', price: 4500 },
  { id: 'esp-6', name: 'Vegetales en Salsa de Ostión', category: 'Especialidades', price: 3000 },
  { id: 'esp-7', name: 'Vegetales mar y Tierra', category: 'Especialidades', price: 4500 },
  { id: 'esp-8', name: 'Pollo en Salsa Agridulce', category: 'Especialidades', price: 4000 },
];
