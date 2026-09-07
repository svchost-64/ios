import { Category, OfficialModelPreset } from '../types/apple';

export const CATEGORIES: { id: Category; label: string; icon: string; countLabel: string }[] = [
  { id: 'iphone', label: 'iPhone', icon: 'Smartphone', countLabel: 'Modelos Pro y Base' },
  { id: 'watch', label: 'Apple Watch', icon: 'Watch', countLabel: 'Series 10 & Ultra 2' },
  { id: 'mac', label: 'MacBook', icon: 'Laptop', countLabel: 'Pro & Air M3/M4' },
  { id: 'ipad', label: 'iPad', icon: 'Tablet', countLabel: 'Pro M4 & Air M2' },
  { id: 'audio', label: 'AirPods', icon: 'Headphones', countLabel: 'Max, Pro & Serie 4' },
];

export const OFFICIAL_MODEL_PRESETS: OfficialModelPreset[] = [
  // iPhone 16 Pro Max
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    category: 'iphone',
    tagline: 'Titanio Grado 5. Chip A18 Pro. Control de Cámara.',
    basePriceCOP: 6499000,
    defaultBadge: 'Nuevo',
    colors: [
      { name: 'Titanio Desierto', hex: '#C5B49E', finishType: 'titanium' },
      { name: 'Titanio Natural', hex: '#9A9690', finishType: 'titanium' },
      { name: 'Titanio Blanco', hex: '#F2F1ED', finishType: 'titanium' },
      { name: 'Titanio Negro', hex: '#373634', finishType: 'titanium' },
    ],
    variants: [
      { id: '256gb', label: '256 GB', priceModifier: 0 },
      { id: '512gb', label: '512 GB', priceModifier: 750000, badge: 'Más Vendido' },
      { id: '1tb', label: '1 TB', priceModifier: 1500000, badge: 'Pro Max' },
    ],
    specs: {
      chip: 'Apple A18 Pro (CPU 6 núcleos, GPU 6 núcleos)',
      display: 'Super Retina XDR OLED 6.9" ProMotion 120Hz',
      camera: 'Fusion 48 MP + Ultra gran angular 48 MP + Teleobjetivo 5x',
      battery: 'Hasta 33 horas de reproducción de video',
      finish: 'Diseño en titanio con parte posterior de vidrio mate',
      connectivity: 'USB-C compatible con USB 3 (hasta 10 Gb/s)',
    },
    sampleImages: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-desert-titanium-select?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-natural-titanium-select?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-white-titanium-select?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-black-titanium-select?wid=940&hei=1112&fmt=png-alpha',
    ],
  },
  // iPhone 16 Pro
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    category: 'iphone',
    tagline: 'Construido para Apple Intelligence. Pantalla 6.3 pulgadas.',
    basePriceCOP: 5499000,
    defaultBadge: 'Nuevo',
    colors: [
      { name: 'Titanio Desierto', hex: '#C5B49E', finishType: 'titanium' },
      { name: 'Titanio Natural', hex: '#9A9690', finishType: 'titanium' },
      { name: 'Titanio Blanco', hex: '#F2F1ED', finishType: 'titanium' },
      { name: 'Titanio Negro', hex: '#373634', finishType: 'titanium' },
    ],
    variants: [
      { id: '128gb', label: '128 GB', priceModifier: 0 },
      { id: '256gb', label: '256 GB', priceModifier: 450000, badge: 'Recomendado' },
      { id: '512gb', label: '512 GB', priceModifier: 1150000 },
      { id: '1tb', label: '1 TB', priceModifier: 1850000 },
    ],
    specs: {
      chip: 'Apple A18 Pro con Neural Engine de 16 núcleos',
      display: 'Super Retina XDR 6.3" con ProMotion',
      camera: 'Sistema Pro 48MP con teleobjetivo 5x',
      battery: 'Hasta 27 horas de reproducción de video',
      finish: 'Borde de titanio pulido con Ceramic Shield de última generación',
    },
    sampleImages: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-desert-titanium-select?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-natural-titanium-select?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-white-titanium-select?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-black-titanium-select?wid=940&hei=1112&fmt=png-alpha',
    ],
  },
  // Apple Watch Ultra 2
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    category: 'watch',
    tagline: 'El reloj deportivo y de expedición definitivo en Titanio Negro.',
    basePriceCOP: 4299000,
    defaultBadge: 'Titanio Grado 5',
    colors: [
      { name: 'Titanio Negro', hex: '#262629', finishType: 'titanium' },
      { name: 'Titanio Natural', hex: '#A29E97', finishType: 'titanium' },
    ],
    variants: [
      { id: '49mm', label: 'Caja 49 mm (GPS + Cellular)', priceModifier: 0, badge: 'Ultra Titanio' },
    ],
    specs: {
      caseSize: 'Caja de titanio de 49 mm con cristal de zafiro',
      display: 'Pantalla Retina siempre activa de hasta 3,000 nits',
      battery: 'Hasta 36 horas de uso normal (hasta 72 hrs modo bajo consumo)',
      chip: 'Chip S9 SiP con doble toque y Siri en el dispositivo',
      connectivity: 'GPS de precisión y doble frecuencia L1 y L5',
    },
    sampleImages: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ultra-black-titanium-ocean-dark-select-202409?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ultra-natural-titanium-ocean-blue-select-202409?wid=940&hei=1112&fmt=png-alpha',
    ],
  },
  // Apple Watch Series 10
  {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    category: 'watch',
    tagline: 'El diseño más delgado hasta la fecha. Pantalla OLED gran angular.',
    basePriceCOP: 2199000,
    defaultBadge: 'Nuevo',
    colors: [
      { name: 'Negro Azabache (Jet Black)', hex: '#0B0B0C', finishType: 'aluminum' },
      { name: 'Oro Rosa', hex: '#DEB3A3', finishType: 'aluminum' },
      { name: 'Plata', hex: '#D6D8DC', finishType: 'aluminum' },
      { name: 'Titanio Pizarra', hex: '#3C3B3F', finishType: 'titanium' },
      { name: 'Titanio Natural', hex: '#A39F98', finishType: 'titanium' },
    ],
    variants: [
      { id: '42mm', label: '42 mm', priceModifier: 0 },
      { id: '46mm', label: '46 mm', priceModifier: 180000, badge: 'Recomendado' },
    ],
    specs: {
      caseSize: 'Cajas de 42 mm o 46 mm con 9.7 mm de grosor',
      display: 'OLED con ángulo de visión amplio y tasa de refresco ultra rápida',
      battery: 'Carga ultrarrápida: 80% en aproximadamente 30 minutos',
      chip: 'Chip S10 SiP de 64 bits',
    },
    sampleImages: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/s10-case-unselect-gallery-1-202409?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/s10-case-unselect-gallery-2-202409?wid=940&hei=1112&fmt=png-alpha',
    ],
  },
  // AirPods Pro 2
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    category: 'audio',
    tagline: 'Chip H2. Hasta 2 veces más Cancelación de Ruido. Audio Adaptativo.',
    basePriceCOP: 1299000,
    defaultBadge: 'Destacado',
    colors: [
      { name: 'Blanco Puro', hex: '#FFFFFF', finishType: 'ceramic' },
    ],
    variants: [
      { id: 'magsafe-usbc', label: 'Estuche de carga MagSafe (USB-C)', priceModifier: 0 },
    ],
    specs: {
      chip: 'Chip Apple H2 para una acústica superior',
      anc: 'Cancelación Activa de Ruido 2x y Reconocimiento de Conversación',
      battery: 'Hasta 6 horas con una carga (30 horas totales con el estuche)',
      connectivity: 'Estuche MagSafe con bocina integrada y buscador de precisión',
    },
    sampleImages: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=940&hei=1112&fmt=png-alpha',
    ],
  },
  // MacBook Pro 14"
  {
    id: 'macbook-pro-14-m3',
    name: 'MacBook Pro 14"',
    category: 'mac',
    tagline: 'Poder profesional sin concesiones. Liquid Retina XDR de 120Hz.',
    basePriceCOP: 8499000,
    defaultBadge: 'Pro Display',
    colors: [
      { name: 'Negro Espacial (Space Black)', hex: '#262729', finishType: 'aluminum' },
      { name: 'Plata (Silver)', hex: '#E3E4E6', finishType: 'aluminum' },
    ],
    variants: [
      { id: '512gb-16gb', label: '16 GB RAM | 512 GB SSD', priceModifier: 0 },
      { id: '1tb-24gb', label: '24 GB RAM | 1 TB SSD', priceModifier: 1600000, badge: 'M3 Pro Alto Rendimiento' },
      { id: '2tb-36gb', label: '36 GB RAM | 2 TB SSD', priceModifier: 3400000, badge: 'M3 Max Ultra' },
    ],
    specs: {
      chip: 'Apple M3 Pro (CPU de 12 núcleos, GPU de 18 núcleos)',
      display: 'Liquid Retina XDR de 14.2 pulgadas con ProMotion hasta 1600 nits',
      battery: 'Hasta 22 horas de autonomía',
      connectivity: '3 puertos Thunderbolt 4, HDMI, ranura SDXC y MagSafe 3',
    },
    sampleImages: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202410?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-silver-select-202410?wid=940&hei=1112&fmt=png-alpha',
    ],
  },
  // iPad Pro M4
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro M4',
    category: 'ipad',
    tagline: 'Ultra Retina XDR OLED. Diseño más delgado que un iPod Nano.',
    basePriceCOP: 5199000,
    defaultBadge: 'Nuevo',
    colors: [
      { name: 'Negro Espacial', hex: '#28282A', finishType: 'aluminum' },
      { name: 'Plata', hex: '#DFE0E2', finishType: 'aluminum' },
    ],
    variants: [
      { id: '11-256gb', label: '11 pulgadas | 256 GB', priceModifier: 0 },
      { id: '11-512gb', label: '11 pulgadas | 512 GB', priceModifier: 850000 },
      { id: '13-256gb', label: '13 pulgadas | 256 GB', priceModifier: 1400000, badge: 'Gran Formato' },
      { id: '13-512gb', label: '13 pulgadas | 512 GB', priceModifier: 2250000 },
    ],
    specs: {
      chip: 'Chip Apple M4 de última generación para IA',
      display: 'Pantalla OLED de doble capa Ultra Retina XDR',
      finish: 'Tan solo 5.1 mm de grosor',
      connectivity: 'Compatible con Apple Pencil Pro y Magic Keyboard',
    },
    sampleImages: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-unselect-gallery-1-202405?wid=940&hei=1112&fmt=png-alpha',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-unselect-gallery-2-202405?wid=940&hei=1112&fmt=png-alpha',
    ],
  },
];
