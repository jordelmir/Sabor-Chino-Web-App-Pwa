export type SizeOption = 'Entero' | 'Medio' | 'Unico';

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  nameZh?: string;
  description?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  category: string;
  price: number;
  priceMedio?: number;
  image?: string;
  popular?: boolean;
}

export const CATEGORIES = [
  { id: 'Promociones', name: 'Promociones', nameEn: 'Promotions', nameZh: '促销', icon: '🎉' },
  { id: 'Combos', name: 'Combos', nameEn: 'Combos', nameZh: '套餐', icon: '🍱' },
  { id: 'Arroces', name: 'Arroces', nameEn: 'Rice', nameZh: '米饭', icon: '🍚' },
  { id: 'Sopas', name: 'Sopas', nameEn: 'Soups', nameZh: '汤类', icon: '🥣' },
  { id: 'Chopsuey', name: 'Chopsuey', nameEn: 'Chop Suey', nameZh: '炒杂碎', icon: '🍜' },
  { id: 'Chowmein', name: 'Chowmein', nameEn: 'Chow Mein', nameZh: '炒面', icon: '🍝' },
  { id: 'Wan Tan', name: 'Wan Tan', nameEn: 'Wonton', nameZh: '馄饨', icon: '🥟' },
  { id: 'Tacos Chinos', name: 'Tacos Chinos', nameEn: 'Spring Rolls', nameZh: '春卷', icon: '🌮' },
  { id: 'Papas Fritas', name: 'Papas Fritas', nameEn: 'French Fries', nameZh: '炸薯条', icon: '🍟' },
  { id: 'Alitas de Pollo', name: 'Alitas de Pollo', nameEn: 'Chicken Wings', nameZh: '鸡翅', icon: '🍗' },
  { id: 'Casados Especiales', name: 'Casados Especiales', nameEn: 'Special Casados', nameZh: '特色套餐', icon: '🍛' },
  { id: 'Especialidades', name: 'Especialidades', nameEn: 'Specialties', nameZh: '特色菜', icon: '🥩' },
];

export const MENU_DATA: Product[] = [
  // Promociones
  { id: 'promo-1', name: 'Promo Viernes', description: '2 Enteros de Cantonés', category: 'Promociones', price: 5500, popular: true, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'promo-2', name: 'Promo Sábado', description: '2 Enteros de Cantonés + Alitas', category: 'Promociones', price: 8000, popular: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800' },
  { id: 'promo-3', name: 'Promo Domingo', description: '2 Enteros de Cantonés + Alitas + Papas Grandes + Refresco 2.5L', category: 'Promociones', price: 11000, popular: true, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  
  // Combos
  { id: 'combo-1', name: 'Combo 1', description: 'Cuarto de Cantonés, 3 Alitas + Papas', category: 'Combos', price: 2500, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800' },
  { id: 'combo-2', name: 'Combo 2', description: 'Medio de Cantonés, 5 Alitas + Papas', category: 'Combos', price: 3000, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800' },
  { id: 'combo-3', name: 'Combo 3', description: 'Cuarto de Cantonés, 5 Alitas + Papas + Refresco', category: 'Combos', price: 3500, image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&q=80&w=800' },
  { id: 'combo-4', name: 'Combo 4', description: 'Entero de Cantonés, 10 Alitas + Papas Grandes', category: 'Combos', price: 7000, image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=800' },

  // Arroces
  { id: 'arr-1', name: 'Arroz Sabor Chino', category: 'Arroces', price: 3500, priceMedio: 2500, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-2', name: 'Arroz Con Camarones', category: 'Arroces', price: 4000, priceMedio: 2500, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-3', name: 'Arroz Cantonés', category: 'Arroces', price: 3000, priceMedio: 2000, popular: true, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-4', name: 'Arroz con Pollo', category: 'Arroces', price: 3000, priceMedio: 2000, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-5', name: 'Arroz con Lechón', category: 'Arroces', price: 3000, priceMedio: 2000, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-6', name: 'Arroz con Lomito', category: 'Arroces', price: 4500, priceMedio: 2500, image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-7', name: 'Arroz con Chorizo Chino', category: 'Arroces', price: 4500, priceMedio: 2500, image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-8', name: 'Arroz con Mariscos', category: 'Arroces', price: 4500, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 'arr-9', name: 'Arroz Mar y Tierra', category: 'Arroces', price: 4500, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800' },

  // Sopas
  { id: 'sop-1', name: 'Sopa de Pollo', category: 'Sopas', price: 3000, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' },
  { id: 'sop-2', name: 'Sopa de Lomito', category: 'Sopas', price: 3300, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' },
  { id: 'sop-3', name: 'Sopa Wan tan', category: 'Sopas', price: 3800, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' },
  { id: 'sop-4', name: 'Sopa de Mariscos en Agua', category: 'Sopas', price: 3800, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' },
  { id: 'sop-5', name: 'Sopa de Mariscos en Leche', category: 'Sopas', price: 4500, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' },

  // Chopsuey
  { id: 'chop-1', name: 'Sabor Chino', category: 'Chopsuey', price: 3500, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
  { id: 'chop-2', name: 'Camarones', category: 'Chopsuey', price: 4500, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
  { id: 'chop-3', name: 'Pollo', category: 'Chopsuey', price: 3000, priceMedio: 2200, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
  { id: 'chop-4', name: 'Lechón', category: 'Chopsuey', price: 3000, priceMedio: 2200, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
  { id: 'chop-5', name: 'Lomito', category: 'Chopsuey', price: 4500, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
  { id: 'chop-6', name: 'Chorizo Chino', category: 'Chopsuey', price: 4500, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },
  { id: 'chop-7', name: 'Vegetariano', category: 'Chopsuey', price: 3000, priceMedio: 2000, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800' },

  // Chowmein
  { id: 'chow-1', name: 'Sabor Chino', category: 'Chowmein', price: 4000, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 'chow-2', name: 'Camarones', category: 'Chowmein', price: 4500, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 'chow-3', name: 'Pollo', category: 'Chowmein', price: 3200, priceMedio: 2200, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 'chow-4', name: 'Lechón', category: 'Chowmein', price: 3200, priceMedio: 2300, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 'chow-5', name: 'Lomito', category: 'Chowmein', price: 4500, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 'chow-6', name: 'Chorizo Chino', category: 'Chowmein', price: 4500, priceMedio: 2800, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 'chow-7', name: 'Vegetariano', category: 'Chowmein', price: 3000, priceMedio: 2000, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },

  // Wan Tan
  { id: 'wan-1', name: 'Camarones', category: 'Wan Tan', price: 3200, image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800' },
  { id: 'wan-2', name: 'Pollo', category: 'Wan Tan', price: 2800, image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800' },

  // Tacos Chinos
  { id: 'tac-1', name: 'Tacos Chinos (3 unid)', category: 'Tacos Chinos', price: 2500, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800' },

  // Papas Fritas
  { id: 'pap-1', name: 'Papas Fritas Grandes', category: 'Papas Fritas', price: 2000, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800' },
  { id: 'pap-2', name: 'Papas Fritas Pequeñas', category: 'Papas Fritas', price: 1500, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800' },

  // Alitas de Pollo
  { id: 'ali-1', name: 'Alitas de Pollo (5 unid)', category: 'Alitas de Pollo', price: 1700, image: 'https://images.unsplash.com/photo-1524114664604-cd8133cd67ad?auto=format&fit=crop&q=80&w=800' },
  { id: 'ali-2', name: 'Alitas de Pollo (10 unid)', category: 'Alitas de Pollo', price: 3000, image: 'https://images.unsplash.com/photo-1524114664604-cd8133cd67ad?auto=format&fit=crop&q=80&w=800' },

  // Casados Especiales
  { id: 'cas-1', name: 'Casado con Camarón Empanizado', category: 'Casados Especiales', price: 4000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
  { id: 'cas-2', name: 'Casado con Pescado', category: 'Casados Especiales', price: 4000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
  { id: 'cas-3', name: 'Casado con Lomito Salteado', category: 'Casados Especiales', price: 4000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
  { id: 'cas-4', name: 'Casado con Pollo en Salsa Agridulce', category: 'Casados Especiales', price: 4000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
  { id: 'cas-5', name: 'Casado Chino en Salsa y Seco', category: 'Casados Especiales', price: 4000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },

  // Especialidades
  { id: 'esp-1', name: 'Lomito con Brócoli', category: 'Especialidades', price: 4500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'esp-2', name: 'Camarones con vegetales', category: 'Especialidades', price: 4500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'esp-3', name: 'Pollo con Brócoli', category: 'Especialidades', price: 4000, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'esp-4', name: 'Lomito con vegetales', category: 'Especialidades', price: 4500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'esp-5', name: 'Camarones con Brócoli', category: 'Especialidades', price: 4500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'esp-6', name: 'Vegetales en Salsa de Ostión', category: 'Especialidades', price: 3000, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'esp-7', name: 'Vegetales mar y Tierra', category: 'Especialidades', price: 4500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
  { id: 'esp-8', name: 'Pollo en Salsa Agridulce', category: 'Especialidades', price: 4000, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800' },
];
