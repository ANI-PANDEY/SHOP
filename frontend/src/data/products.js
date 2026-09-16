export const SUBCATEGORIES = {
  'staples': ['All', 'Spices & Masalas', 'Grains & Tea'],
  'fruits-vegetables': ['All', 'Fresh Vegetables', 'Fresh Fruits'],
  'dairy': ['All', 'Milk & Curd', 'Butter & Cheese'],
  'snacks': ['All', 'Chocolates', 'Dry Fruits', 'Ready Snacks'],
  'drinks': ['All', 'Sodas', 'Juices'],
  'personal-care': ['All', 'Hair Care', 'Soaps & Skincare', 'Hygiene'],
  'household': ['All', 'Detergents', 'Cleaning Supplies'],
  'baby-care': ['All', 'Baby Food', 'Nutrition']
};

export const SAMPLE_PRODUCTS = [
  // 1. BEVERAGES & DRINKS
  { _id: '1.1', name: 'Thums Up Cold Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80', price: 40, discountPrice: 40, weightOptions: ['200ml', '500ml', '1.25L'], category: 'drinks', subcategory: 'Sodas' },
  { _id: '1.2', name: 'Sprite Refreshing Drink', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80', price: 40, discountPrice: 40, weightOptions: ['200ml', '500ml', '1.25L'], category: 'drinks', subcategory: 'Sodas' },
  { _id: '1.3', name: 'Fanta Orange Soda', image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=800&q=80', price: 40, discountPrice: 40, weightOptions: ['200ml', '500ml'], category: 'drinks', subcategory: 'Sodas' },
  { _id: '1.4', name: 'Limca Drink', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80', price: 40, discountPrice: 40, weightOptions: ['500ml', '1.25L'], category: 'drinks', subcategory: 'Sodas' },
  { _id: '1.5', name: 'Appy Fizz Sparkling Drink', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451b02?w=800&q=80', price: 20, discountPrice: 20, weightOptions: ['160ml', '600ml'], category: 'drinks', subcategory: 'Juices' },
  { _id: '1.6', name: 'Frooti Mango Drink', image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=80', price: 10, discountPrice: 10, weightOptions: ['160ml (Tetra)', '600ml (Pet)'], category: 'drinks', subcategory: 'Juices' },
  { _id: '1.7', name: 'Maaza Mango Juice', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80', price: 45, discountPrice: 40, weightOptions: ['600ml', '1.2L'], category: 'drinks', subcategory: 'Juices' },
  { _id: '1.8', name: 'Amul Masti Spiced Buttermilk', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80', price: 15, discountPrice: 15, weightOptions: ['200ml (Tetra)', '200ml (Cup)'], category: 'drinks', subcategory: 'Juices' },
  { _id: '1.9', name: 'Horlicks Health Drink Jar', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80', price: 235, discountPrice: 220, weightOptions: ['500g Jar', '1kg Tin'], category: 'drinks', subcategory: 'Juices' },
  { _id: '1.10', name: 'Glucon-D Instant Energy', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&q=80', price: 75, discountPrice: 70, weightOptions: ['200g Pack', '500g Pack'], category: 'drinks', subcategory: 'Juices' },

  // 2. CHOCOLATES & CONFECTIONERY
  { _id: '2.1', name: 'Cadbury Dairy Milk Chocolate', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80', price: 20, discountPrice: 20, weightOptions: ['₹5 Pack', '₹10 Pack', '₹20 Pack', 'Maha Pack'], category: 'snacks', subcategory: 'Chocolates' },
  { _id: '2.2', name: 'Dairy Milk Silk Oreo', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&q=80', price: 85, discountPrice: 80, weightOptions: ['60g', '130g'], category: 'snacks', subcategory: 'Chocolates' },
  { _id: '2.3', name: 'Cadbury Celebrations Gift Box', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80', price: 175, discountPrice: 165, weightOptions: ['130g Box', '250g Box'], category: 'snacks', subcategory: 'Chocolates' },
  { _id: '2.4', name: 'Dairy Milk Silk Fruit & Nut', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80', price: 85, discountPrice: 80, weightOptions: ['55g', '137g'], category: 'snacks', subcategory: 'Chocolates' },
  { _id: '2.5', name: 'Bikaji Elaichi Soan Papdi Box', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&q=80', price: 140, discountPrice: 125, weightOptions: ['250g Box', '500g Box'], category: 'snacks', subcategory: 'Ready Snacks' },
  { _id: '2.6', name: 'Pramod Raita Boondi Pack', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6288599?w=800&q=80', price: 45, discountPrice: 40, weightOptions: ['200g Pouch', '400g Pouch'], category: 'snacks', subcategory: 'Ready Snacks' },
  { _id: '2.7', name: 'Laxmi Dalmoth Special Namkeen', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', price: 90, discountPrice: 85, weightOptions: ['400g Pack'], category: 'snacks', subcategory: 'Ready Snacks' },

  // 3. SPICES & COOKING INGREDIENTS
  { _id: '3.1', name: 'Everest Powdered Spices (Haldi/Mirch)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80', price: 80, discountPrice: 75, weightOptions: ['100g (Tikhalal)', '100g (Haldi)', '100g (Dhaniya)'], category: 'staples', subcategory: 'Spices & Masalas' },
  { _id: '3.2', name: 'Everest Blended Masalas (Garam/Chhole)', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80', price: 65, discountPrice: 60, weightOptions: ['50g (Garam Masala)', '50g (Chhole Masala)', '50g (Meat Masala)'], category: 'staples', subcategory: 'Spices & Masalas' },
  { _id: '3.3', name: 'Sudha Pure Cow Ghee 1L Tin', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80', price: 620, discountPrice: 535, weightOptions: ['500ml', '1L Tin'], category: 'dairy', subcategory: 'Butter & Cheese' },
  { _id: '3.4', name: 'Fortune Kachi Ghani Mustard Oil 1L', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80', price: 165, discountPrice: 132, weightOptions: ['1L Pouch', '1L Bottle', '5L Jar'], category: 'staples', subcategory: 'Spices & Masalas' },
  { _id: '3.5', name: 'MDH & Goldiee Masale Pack', image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80', price: 75, discountPrice: 72, weightOptions: ['100g (Fish Masala)', '100g (Meat Masala)'], category: 'staples', subcategory: 'Spices & Masalas' },
  { _id: '3.6', name: 'Kissan Tomato Ketchup Squeezy', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80', price: 120, discountPrice: 110, weightOptions: ['950g Refill', '500g Bottle'], category: 'staples', subcategory: 'Spices & Masalas' },

  // 4. LAUNDRY, DISHWASH & HOME CLEANING
  { _id: '4.1', name: 'Surf Excel Easy Wash Detergent', image: 'https://images.unsplash.com/photo-1584820927498-cafe8c1c969b?w=800&q=80', price: 210, discountPrice: 195, weightOptions: ['1kg Powder', '1L Liquid'], category: 'household', subcategory: 'Detergents' },
  { _id: '4.2', name: 'Rin Detergent Bar & Powder', image: 'https://images.unsplash.com/photo-1585250005728-6617ba3f86e9?w=800&q=80', price: 80, discountPrice: 75, weightOptions: ['1kg (Powder)', '250g (Bar)'], category: 'household', subcategory: 'Detergents' },
  { _id: '4.3', name: 'Comfort Fabric Conditioner Bottle', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80', price: 220, discountPrice: 200, weightOptions: ['860ml (Blue)', '860ml (Pink)'], category: 'household', subcategory: 'Detergents' },
  { _id: '4.4', name: 'Vim Liquid Gel Dishwash', image: 'https://images.unsplash.com/photo-1585250005728-6617ba3f86e9?w=800&q=80', price: 115, discountPrice: 105, weightOptions: ['500ml Pouch', '250ml Bottle'], category: 'household', subcategory: 'Cleaning Supplies' },

  // 5. PERSONAL CARE, HYGIENE & COSMETICS
  { _id: '5.1', name: 'Color Mate Hair Color Box', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80', price: 45, discountPrice: 40, weightOptions: ['Dark Brown (9.1)', 'Natural Black'], category: 'personal-care', subcategory: 'Hair Care' },
  { _id: '5.2', name: 'Lux & Pears Beauty Soaps Pack', image: 'https://images.unsplash.com/photo-1600857062241-9c60e360e206?w=800&q=80', price: 140, discountPrice: 130, weightOptions: ['3x100g (Lux)', '3x125g (Pears)'], category: 'personal-care', subcategory: 'Soaps & Skincare' },
  { _id: '5.3', name: 'Dettol Hygiene Soap Multi-Pack', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80', price: 120, discountPrice: 115, weightOptions: ['4x125g (Dettol)', '4x100g (Godrej)'], category: 'personal-care', subcategory: 'Soaps & Skincare' },

  // 6. HEALTH NUTRITION & COOKIES
  { _id: '6.1', name: 'Britannia NutriChoice Oats Cookies Pack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', price: 30, discountPrice: 28, weightOptions: ['75g Pack', '150g Pack'], category: 'snacks', subcategory: 'Ready Snacks' },
  { _id: '6.2', name: 'Bournvita Chocolate Health Drink Jar', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&q=80', price: 320, discountPrice: 300, weightOptions: ['500g Jar', '1kg Refill'], category: 'baby-care', subcategory: 'Nutrition' },
  { _id: '6.3', name: 'Complan NutriGro Health Powder Box', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80', price: 350, discountPrice: 330, weightOptions: ['400g Jar', '500g Box'], category: 'baby-care', subcategory: 'Nutrition' },

  // 7. DRY FRUITS & NUTS
  { _id: '7.1', name: 'Premium Almonds (Badam) Pack', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&q=80', price: 850, discountPrice: 780, weightOptions: ['1kg Jar', '500g Jar', '250g Jar'], category: 'snacks', subcategory: 'Dry Fruits' },
  { _id: '7.2', name: 'Premium Cashews (Kaju) Pack', image: 'https://images.unsplash.com/photo-1536591375315-1b8626993322?w=800&q=80', price: 950, discountPrice: 890, weightOptions: ['1kg Jar', '500g Jar', '250g Jar'], category: 'snacks', subcategory: 'Dry Fruits' }
];
