export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export const categories = [
  { id: 'hoodies', name: 'Hanorace', count: '3 articole' },
  { id: 'tshirts', name: 'Tricouri', count: '3 articole' },
  { id: 'blouses', name: 'Bluze', count: '0 articole' },
  { id: 'jackets', name: 'Jachete', count: '0 articole' },
  { id: 'accessories', name: 'Accesorii', count: '3 articole' },
  { id: 'mystery-box', name: 'Mystery Box', count: '0 articole' },
  { id: 'albums', name: 'Albume', count: '0 articole' },
  { id: 'artprints', name: 'Tablouri', count: '0 articole' },

] as const;

export const products: Product[] = [
  {
    id: 'samurai-hoodie',
    name: 'Hanorac Samurai',
    category: 'hoodies',
    price: 89.99,
    description: 'Hanorac premium de înaltă calitate, cu blazonul samurai brodat pe piept. Confecționat din bumbac organic de 400gsm cu interior fleece periat pentru căldură și confort maxim. Manșete și tiv din nervură, glugă cu șnur ajustabil și buzunar tip cangur completează această piesă esențială din colecția Legenda Vie.',
    shortDescription: 'Hanorac premium cu blazon samurai brodat.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Albastru Marin', hex: '#1a1a3e' },
      { name: 'Burgund', hex: '#4a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'oni-mask-hoodie',
    name: 'Hanorac Mască Oni',
    category: 'hoodies',
    price: 94.99,
    description: 'Inspirat de masca tradițională japoneză oni, acest hanorac prezintă un print îndrăzneț pe spate cu detalii complexe. Croiala oversized oferă o siluetă contemporană de streetwear, păstrând estetica războinicului. Fabricat dintr-un amestec sustenabil de bumbac, cu un finisaj moale.',
    shortDescription: 'Hanorac oversized cu print mască oni pe spate.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Gri', hex: '#3a3a3a' },
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'kanji-hoodie',
    name: 'Hanorac Kanji',
    category: 'hoodies',
    price: 79.99,
    description: 'Design minimalist cu impact maxim. Hanoracul kanji prezintă caractere de caligrafie pictate manual, reprezentând „spiritul războinicului" pe mânecă. Confecționat din bumbac french terry, cu o croială lejeră. Perfect pentru stratificare sau pentru a face o declarație prin el însuși.',
    shortDescription: 'Hanorac minimalist cu caligrafie kanji pictată manual.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Alb', hex: '#e8e0d8' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'warrior-tee',
    name: 'Tricou Războinicul',
    category: 'tshirts',
    price: 39.99,
    description: 'Baza oricărei garderobe. Acest tricou premium prezintă o siluetă samurai subtilă, serigrafiată pe piept cu cerneluri premium pe bază de apă. 240gsm 100% bumbac inelar asigură durabilitate și o senzație premium care se îmbunătățește cu fiecare spălare.',
    shortDescription: 'Tricou din bumbac greu cu siluetă samurai.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Alb', hex: '#e8e0d8' },
      { name: 'Oliv', hex: '#4a4a2a' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'rising-sun-tee',
    name: 'Tricou Soarele Răsare',
    category: 'tshirts',
    price: 44.99,
    description: 'Un omagiu adus zorilor unei noi ere. Tricoul Soarele Răsare prezintă un print gradient vibrant pe piept, înfățișând soarele străpungând norii de furtună — o metaforă pentru reziliență și renaștere. Bumbac jersey preshrunk cu croială lejeră.',
    shortDescription: 'Tricou cu print gradient vibrant simbolizând reziliența.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Albastru Marin', hex: '#1a1a3e' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'street-samurai-tee',
    name: 'Tricou Samurai Străzii',
    category: 'tshirts',
    price: 42.99,
    description: 'Acolo unde tradiția întâlnește străzile. Acest tricou combină arta clasică japoneză tip woodblock cu elemente moderne de graffiti. Cusut dublu pentru durabilitate maximă. Croiala oversized și umerii căzuți îi conferă acea atmosferă effortless streetwear.',
    shortDescription: 'Design tradițional-modern cu umeri căzuți.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Gri', hex: '#3a3a3a' },
      { name: 'Burgund', hex: '#4a1a1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'samurai-beanie',
    name: 'Căciulă Samurai',
    category: 'accessories',
    price: 29.99,
    description: 'Păstrează-te cald în stil războinic. Această căciulă groasă tricotată are un patch samurai (blazon) brodat. Fabricată dintr-un amestec moale de acril-lână, cu bandă interioară fleece pentru confort suplimentar. O mărime universală, cu margine pliabilă adâncă.',
    shortDescription: 'Căciulă groasă tricotată cu patch samurai brodat.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Gri', hex: '#3a3a3a' },
    ],
  },
  {
    id: 'samurai-cap',
    name: 'Șapcă Samurai',
    category: 'accessories',
    price: 34.99,
    description: 'O reinterpretare modernă a șepcii clasice. Prezintă logo-ul Legenda Vie brodat în fir argintiu metalic pe panoul frontal. Design nestructurat cu șase panouri, boruri precurbate, închidere snapback ajustabilă și o bandă interioară subtilă pentru confort.',
    shortDescription: 'Șapcă unstructured cu broderie logo argintiu metalic.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Negru', hex: '#0a0a0a' },
      { name: 'Oliv', hex: '#4a4a2a' },
    ],
  },
  {
    id: 'samurai-tote',
    name: 'Tote Bag Samurai',
    category: 'accessories',
    price: 24.99,
    description: 'Poartă-ți esențialele cu onoare. Această geantă tote din pânză rezistentă prezintă un print de mari dimensiuni al logo-ului samurai pe ambele părți. Cusături ranforsate la punctele de stres, bretele extra-late pentru confort la purtare și un buzunar interior.',
    shortDescription: 'Tote bag din pânză rezistentă cu print logo samurai.',
    images: ['/assets/merch.png', '/assets/samurailogo.png'],
    colors: [
      { name: 'Natural', hex: '#c8b8a8' },
      { name: 'Negru', hex: '#0a0a0a' },
    ],
  },
  {
    id: 'manuscris-cd',
    name: 'Manuscris (CD)',
    category: 'music',
    price: 14.99,
    description: 'Albumul de debut de la Legenda Vie. Manuscris este o călătorie de 14 piese prin coridoarele minții războinicului, îmbinând rapul românesc puternic cu orchestrația cinematică. Fiecare CD vine cu un booklet de versuri ce include artwork original și un cod de descărcare digitală.',
    shortDescription: 'Albumul de debut pe CD cu booklet și cod descărcare digitală.',
    images: ['/assets/book-isolated.png', '/assets/book.jpg'],
    sizes: ['CD'],
  },
  {
    id: 'manuscris-vinyl',
    name: 'Manuscris (Vinil)',
    category: 'music',
    price: 34.99,
    description: 'Ediție limitată dublu LP, presată pe vinil mov marble de 180g. Ambalată într-o copertă gatefold de lux cu finisaj spot-gloss. Include un poster 24×36 cu arta albumului și un card de descărcare digitală. Fiecare copie este numerotată manual. Limitat la 500 de exemplare în întreaga lume.',
    shortDescription: 'Ediție limitată dublu LP pe vinil mov marble.',
    images: ['/assets/book-isolated.png', '/assets/book.jpg'],
    sizes: ['LP'],
  },
  {
    id: 'manuscris-digital',
    name: 'Manuscris (Digital)',
    category: 'music',
    price: 9.99,
    description: 'Descărcare digitală instantanee a albumului complet Manuscris în formate FLAC (lossless) și MP3 (320kbps) de înaltă calitate. Include piesa bonus exclusiv digitală „Drumul Războinicului" și un booklet digital cu versuri și credite.',
    shortDescription: 'Descărcare digitală în FLAC + MP3 cu piesă bonus.',
    images: ['/assets/book-isolated.png', '/assets/book.jpg'],
  },
];
