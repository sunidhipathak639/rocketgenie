import { 
  Code, 
  Wifi, 
  Home, 
  UserCheck, 
  Smartphone, 
  Gem, 
  Sofa, 
  ShoppingBag, 
  Laptop, 
  Stethoscope, 
  Sparkles, 
  GraduationCap, 
  Wrench, 
  BookOpen, 
  Shirt, 
  Briefcase, 
  Camera, 
  Flower2, 
  Scissors, 
  Car, 
  AirVent 
} from 'lucide-react';

export const CATEGORY_STYLE_MAP: Record<string, { icon: any, color: string, image: string }> = {
  'Website developer': { 
    icon: Code, 
    color: 'from-blue-600 to-indigo-700', 
    image: '/images/categories/website_developer.png' 
  },
  'WIFI D2H': { 
    icon: Wifi, 
    color: 'from-sky-500 to-blue-600', 
    image: '/images/categories/tech.png' 
  },
  'Real Estate': { 
    icon: Home, 
    color: 'from-emerald-600 to-teal-700', 
    image: '/images/categories/real_estate.png' 
  },
  'Placement services': { 
    icon: UserCheck, 
    color: 'from-violet-600 to-purple-700', 
    image: '/images/categories/placement_services.png' 
  },
  'Mobile Shop, Accessories': { 
    icon: Smartphone, 
    color: 'from-orange-500 to-red-600', 
    image: '/images/categories/mobile_shop.png' 
  },
  'Jewellery Showroom': { 
    icon: Gem, 
    color: 'from-amber-400 to-yellow-600', 
    image: '/images/categories/fashion.png' 
  },
  'Furniture': { 
    icon: Sofa, 
    color: 'from-amber-700 to-orange-900', 
    image: '/images/categories/furniture.png' 
  },
  'Footwear': { 
    icon: ShoppingBag, 
    color: 'from-pink-600 to-rose-700', 
    image: '/images/categories/footwear.png' 
  },
  'Electronics Items': { 
    icon: Laptop, 
    color: 'from-slate-700 to-slate-900', 
    image: '/images/categories/tech.png' 
  },
  'Dentists': { 
    icon: Stethoscope, 
    color: 'from-cyan-500 to-blue-500', 
    image: '/images/categories/health.png' 
  },
  'Cosmatic': { 
    icon: Sparkles, 
    color: 'from-fuchsia-500 to-pink-600', 
    image: '/images/categories/fashion.png' 
  },
  'Computer Training Institutes': { 
    icon: GraduationCap, 
    color: 'from-indigo-600 to-blue-800', 
    image: '/images/categories/education.png' 
  },
  'Computer Laptop Repair': { 
    icon: Wrench, 
    color: 'from-zinc-600 to-zinc-800', 
    image: '/images/categories/tech.png' 
  },
  'Coaching': { 
    icon: BookOpen, 
    color: 'from-blue-700 to-indigo-900', 
    image: '/images/categories/education.png' 
  },
  'Cloths': { 
    icon: Shirt, 
    color: 'from-rose-500 to-pink-600', 
    image: '/images/categories/fashion.png' 
  },
  'Chartered Accountant': { 
    icon: Briefcase, 
    color: 'from-neutral-700 to-neutral-900', 
    image: '/images/categories/placement_services.png' 
  },
  'CCTV camera, accessories': { 
    icon: Camera, 
    color: 'from-gray-700 to-slate-900', 
    image: '/images/categories/tech.png' 
  },
  'Body Massage Centers': { 
    icon: Flower2, 
    color: 'from-emerald-500 to-teal-600', 
    image: '/images/categories/health.png' 
  },
  'Beauty Spa': { 
    icon: Scissors, 
    color: 'from-pink-500 to-rose-600', 
    image: '/images/categories/health.png' 
  },
  'Bags': { 
    icon: ShoppingBag, 
    color: 'from-amber-800 to-orange-900', 
    image: '/images/categories/fashion.png' 
  },
  'Automobiles': { 
    icon: Car, 
    color: 'from-red-600 to-red-800', 
    image: '/images/categories/automobiles.png' 
  },
  'AC Service': { 
    icon: AirVent, 
    color: 'from-cyan-600 to-blue-700', 
    image: '/images/categories/tech.png' 
  },
};
