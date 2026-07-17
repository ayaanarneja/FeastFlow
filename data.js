/* ============================================================
   data.js
   Static dummy data for the Food Delivery App.
   In a real app this would come from a backend / database.
   ============================================================ */

/* ---------- Categories ---------- */
const CATEGORIES = [
  { id: "pizza", name: "Pizza", emoji: "🍕" },
  { id: "burger", name: "Burger", emoji: "🍔" },
  { id: "biryani", name: "Biryani", emoji: "🍛" },
  { id: "chinese", name: "Chinese", emoji: "🥡" },
  { id: "desserts", name: "Desserts", emoji: "🍰" },
  { id: "drinks", name: "Drinks", emoji: "🥤" },
  { id: "southindian", name: "South Indian", emoji: "🥘" },
  { id: "northindian", name: "North Indian", emoji: "🍜" }
];

/* ---------- Restaurants ---------- */
const RESTAURANTS = [
  { id: 1,  name: "Burger Hub",         rating: 4.5, deliveryTime: "25 min", category: "Burger",       price: "₹₹",   emoji: "🍔", tagline: "Stacked. Grilled. Loved." },
  { id: 2,  name: "Pizza Piazza",       rating: 4.6, deliveryTime: "30 min", category: "Pizza",        price: "₹₹₹",  emoji: "🍕", tagline: "Wood-fired, every time." },
  { id: 3,  name: "Biryani Bhavan",     rating: 4.7, deliveryTime: "35 min", category: "Biryani",      price: "₹₹",   emoji: "🍛", tagline: "Dum-cooked since 1987." },
  { id: 4,  name: "Wok This Way",       rating: 4.3, deliveryTime: "28 min", category: "Chinese",      price: "₹₹",   emoji: "🥡", tagline: "Fast, fiery, fresh." },
  { id: 5,  name: "Sweet Tooth Co.",    rating: 4.8, deliveryTime: "20 min", category: "Desserts",     price: "₹₹",   emoji: "🍰", tagline: "Dessert first, always." },
  { id: 6,  name: "Chill Sips",         rating: 4.4, deliveryTime: "15 min", category: "Drinks",       price: "₹",    emoji: "🥤", tagline: "Cold brews & cool vibes." },
  { id: 7,  name: "Dosa Junction",      rating: 4.6, deliveryTime: "22 min", category: "South Indian", price: "₹",    emoji: "🥘", tagline: "Crispy on the outside, soft inside." },
  { id: 8,  name: "Tandoori Nights",    rating: 4.5, deliveryTime: "32 min", category: "North Indian", price: "₹₹₹",  emoji: "🍜", tagline: "Smoky flavours, slow cooked." },
  { id: 9,  name: "Cheesy Slice",       rating: 4.2, deliveryTime: "27 min", category: "Pizza",        price: "₹₹",   emoji: "🍕", tagline: "More cheese, no compromise." },
  { id: 10, name: "Patty Republic",     rating: 4.1, deliveryTime: "24 min", category: "Burger",       price: "₹",    emoji: "🍔", tagline: "Small buns, big flavour." },
  { id: 11, name: "Spice Route Biryani",rating: 4.9, deliveryTime: "40 min", category: "Biryani",      price: "₹₹₹",  emoji: "🍛", tagline: "A royal legacy on a plate." },
  { id: 12, name: "Golden Dragon",      rating: 4.4, deliveryTime: "26 min", category: "Chinese",      price: "₹₹",   emoji: "🥡", tagline: "Authentic wok-tossed classics." }
];

/* ---------- Food Items ----------
   Each item belongs to a restaurant (restaurantId) and a category.
   veg: true/false drives the veg/non-veg badge.
------------------------------------------------- */
const FOOD_ITEMS = [
  // Burger Hub (1)
  { id: 101, restaurantId: 1, name: "Classic Cheese Burger", description: "Grilled patty, cheddar, lettuce, house sauce", price: 180, rating: 4.5, veg: false, category: "Burger", emoji: "🍔" },
  { id: 102, restaurantId: 1, name: "Veggie Delight Burger", description: "Crispy veg patty with tangy mayo", price: 150, rating: 4.3, veg: true, category: "Burger", emoji: "🍔" },
  { id: 103, restaurantId: 1, name: "Double Smash Burger", description: "Two smashed patties, double cheese", price: 240, rating: 4.7, veg: false, category: "Burger", emoji: "🍔" },
  { id: 104, restaurantId: 1, name: "Peri Peri Fries", description: "Crispy fries tossed in peri peri spice", price: 110, rating: 4.4, veg: true, category: "Burger", emoji: "🍟" },
  { id: 105, restaurantId: 1, name: "Chicken Nuggets (6pc)", description: "Golden fried nuggets with dip", price: 160, rating: 4.2, veg: false, category: "Burger", emoji: "🍗" },

  // Pizza Piazza (2)
  { id: 201, restaurantId: 2, name: "Margherita Pizza", description: "Classic tomato, mozzarella & basil", price: 249, rating: 4.6, veg: true, category: "Pizza", emoji: "🍕" },
  { id: 202, restaurantId: 2, name: "Farmhouse Pizza", description: "Loaded with bell peppers, onion & corn", price: 299, rating: 4.5, veg: true, category: "Pizza", emoji: "🍕" },
  { id: 203, restaurantId: 2, name: "Pepperoni Pizza", description: "Spicy pepperoni with extra cheese", price: 349, rating: 4.8, veg: false, category: "Pizza", emoji: "🍕" },
  { id: 204, restaurantId: 2, name: "Garlic Breadsticks", description: "Baked with garlic butter & herbs", price: 129, rating: 4.4, veg: true, category: "Pizza", emoji: "🥖" },
  { id: 205, restaurantId: 2, name: "Chicken Tikka Pizza", description: "Smoky tikka chunks, onions & chilli", price: 369, rating: 4.7, veg: false, category: "Pizza", emoji: "🍕" },

  // Biryani Bhavan (3)
  { id: 301, restaurantId: 3, name: "Chicken Dum Biryani", description: "Slow-cooked basmati rice with spiced chicken", price: 220, rating: 4.8, veg: false, category: "Biryani", emoji: "🍛" },
  { id: 302, restaurantId: 3, name: "Veg Biryani", description: "Fragrant rice with mixed vegetables", price: 170, rating: 4.4, veg: true, category: "Biryani", emoji: "🍛" },
  { id: 303, restaurantId: 3, name: "Mutton Biryani", description: "Tender mutton, aromatic spices", price: 280, rating: 4.9, veg: false, category: "Biryani", emoji: "🍛" },
  { id: 304, restaurantId: 3, name: "Raita", description: "Cool yogurt with cucumber & spices", price: 40, rating: 4.2, veg: true, category: "Biryani", emoji: "🥣" },
  { id: 305, restaurantId: 3, name: "Egg Biryani", description: "Boiled eggs tossed in spiced rice", price: 190, rating: 4.5, veg: false, category: "Biryani", emoji: "🍛" },

  // Wok This Way (4)
  { id: 401, restaurantId: 4, name: "Veg Hakka Noodles", description: "Stir-fried noodles with fresh veggies", price: 160, rating: 4.3, veg: true, category: "Chinese", emoji: "🍜" },
  { id: 402, restaurantId: 4, name: "Chilli Chicken", description: "Crispy chicken tossed in spicy sauce", price: 220, rating: 4.6, veg: false, category: "Chinese", emoji: "🥡" },
  { id: 403, restaurantId: 4, name: "Veg Manchurian", description: "Fried veg balls in tangy gravy", price: 180, rating: 4.4, veg: true, category: "Chinese", emoji: "🥡" },
  { id: 404, restaurantId: 4, name: "Spring Rolls", description: "Crispy rolls stuffed with veggies", price: 140, rating: 4.2, veg: true, category: "Chinese", emoji: "🥟" },
  { id: 405, restaurantId: 4, name: "Fried Rice", description: "Wok-tossed rice with egg & spring onion", price: 170, rating: 4.3, veg: false, category: "Chinese", emoji: "🍚" },

  // Sweet Tooth Co. (5)
  { id: 501, restaurantId: 5, name: "Chocolate Brownie", description: "Fudgy brownie with molten centre", price: 120, rating: 4.9, veg: true, category: "Desserts", emoji: "🍫" },
  { id: 502, restaurantId: 5, name: "Red Velvet Cupcake", description: "Soft cupcake with cream cheese frosting", price: 90, rating: 4.7, veg: true, category: "Desserts", emoji: "🧁" },
  { id: 503, restaurantId: 5, name: "Gulab Jamun (4pc)", description: "Soft milk dumplings in sugar syrup", price: 80, rating: 4.6, veg: true, category: "Desserts", emoji: "🍡" },
  { id: 504, restaurantId: 5, name: "Belgian Waffle", description: "Crispy waffle with chocolate drizzle", price: 150, rating: 4.8, veg: true, category: "Desserts", emoji: "🧇" },
  { id: 505, restaurantId: 5, name: "Ice Cream Sundae", description: "Triple scoop with nuts & syrup", price: 130, rating: 4.5, veg: true, category: "Desserts", emoji: "🍨" },

  // Chill Sips (6)
  { id: 601, restaurantId: 6, name: "Mango Lassi", description: "Chilled yogurt drink with fresh mango", price: 90, rating: 4.6, veg: true, category: "Drinks", emoji: "🥭" },
  { id: 602, restaurantId: 6, name: "Cold Coffee", description: "Frothy iced coffee with cream", price: 110, rating: 4.4, veg: true, category: "Drinks", emoji: "🥤" },
  { id: 603, restaurantId: 6, name: "Fresh Lime Soda", description: "Zesty lime with soda & mint", price: 60, rating: 4.3, veg: true, category: "Drinks", emoji: "🍋" },
  { id: 604, restaurantId: 6, name: "Strawberry Milkshake", description: "Thick shake with real strawberries", price: 130, rating: 4.7, veg: true, category: "Drinks", emoji: "🍓" },
  { id: 605, restaurantId: 6, name: "Masala Chaas", description: "Spiced buttermilk, cooling & tangy", price: 50, rating: 4.2, veg: true, category: "Drinks", emoji: "🥛" },

  // Dosa Junction (7)
  { id: 701, restaurantId: 7, name: "Masala Dosa", description: "Crispy dosa filled with spiced potato", price: 110, rating: 4.7, veg: true, category: "South Indian", emoji: "🥘" },
  { id: 702, restaurantId: 7, name: "Idli Sambar (4pc)", description: "Steamed rice cakes with sambar & chutney", price: 90, rating: 4.5, veg: true, category: "South Indian", emoji: "🍥" },
  { id: 703, restaurantId: 7, name: "Medu Vada (3pc)", description: "Crispy fried lentil doughnuts", price: 80, rating: 4.4, veg: true, category: "South Indian", emoji: "🍩" },
  { id: 704, restaurantId: 7, name: "Uttapam", description: "Thick pancake topped with onion & tomato", price: 120, rating: 4.3, veg: true, category: "South Indian", emoji: "🥞" },
  { id: 705, restaurantId: 7, name: "Filter Coffee", description: "Traditional South Indian filter coffee", price: 40, rating: 4.8, veg: true, category: "South Indian", emoji: "☕" },

  // Tandoori Nights (8)
  { id: 801, restaurantId: 8, name: "Butter Chicken", description: "Creamy tomato gravy with tandoori chicken", price: 280, rating: 4.8, veg: false, category: "North Indian", emoji: "🍛" },
  { id: 802, restaurantId: 8, name: "Paneer Tikka Masala", description: "Grilled paneer in rich spiced gravy", price: 240, rating: 4.6, veg: true, category: "North Indian", emoji: "🧀" },
  { id: 803, restaurantId: 8, name: "Dal Makhani", description: "Slow-cooked black lentils with butter", price: 180, rating: 4.5, veg: true, category: "North Indian", emoji: "🍲" },
  { id: 804, restaurantId: 8, name: "Tandoori Roti (2pc)", description: "Whole wheat bread from the clay oven", price: 40, rating: 4.3, veg: true, category: "North Indian", emoji: "🫓" },
  { id: 805, restaurantId: 8, name: "Seekh Kebab", description: "Minced meat skewers, char-grilled", price: 260, rating: 4.7, veg: false, category: "North Indian", emoji: "🍢" },

  // Cheesy Slice (9)
  { id: 901, restaurantId: 9, name: "Four Cheese Pizza", description: "Mozzarella, cheddar, parmesan & feta", price: 349, rating: 4.5, veg: true, category: "Pizza", emoji: "🍕" },
  { id: 902, restaurantId: 9, name: "Paneer Tikka Pizza", description: "Spiced paneer with onion & capsicum", price: 319, rating: 4.4, veg: true, category: "Pizza", emoji: "🍕" },
  { id: 903, restaurantId: 9, name: "BBQ Chicken Pizza", description: "Smoky BBQ sauce with grilled chicken", price: 369, rating: 4.6, veg: false, category: "Pizza", emoji: "🍕" },
  { id: 904, restaurantId: 9, name: "Cheesy Garlic Dip", description: "Melted cheese dip with garlic", price: 99, rating: 4.2, veg: true, category: "Pizza", emoji: "🧄" },

  // Patty Republic (10)
  { id: 1001, restaurantId: 10, name: "Mini Slider Trio", description: "Three mini burgers, three flavours", price: 190, rating: 4.3, veg: false, category: "Burger", emoji: "🍔" },
  { id: 1002, restaurantId: 10, name: "Aloo Tikki Burger", description: "Spiced potato patty with chutneys", price: 100, rating: 4.1, veg: true, category: "Burger", emoji: "🍔" },
  { id: 1003, restaurantId: 10, name: "Mexican Bean Burger", description: "Bean patty with jalapeños & salsa", price: 160, rating: 4.4, veg: true, category: "Burger", emoji: "🌮" },
  { id: 1004, restaurantId: 10, name: "Onion Rings", description: "Crispy battered onion rings", price: 90, rating: 4.0, veg: true, category: "Burger", emoji: "🧅" },

  // Spice Route Biryani (11)
  { id: 1101, restaurantId: 11, name: "Hyderabadi Chicken Biryani", description: "Signature dum biryani with fried onions", price: 260, rating: 4.9, veg: false, category: "Biryani", emoji: "🍛" },
  { id: 1102, restaurantId: 11, name: "Paneer Biryani", description: "Fragrant rice with marinated paneer", price: 210, rating: 4.6, veg: true, category: "Biryani", emoji: "🍛" },
  { id: 1103, restaurantId: 11, name: "Prawn Biryani", description: "Coastal-style rice with spiced prawns", price: 320, rating: 4.7, veg: false, category: "Biryani", emoji: "🍤" },
  { id: 1104, restaurantId: 11, name: "Chicken 65", description: "Deep fried spicy chicken bites", price: 190, rating: 4.5, veg: false, category: "Biryani", emoji: "🍗" },

  // Golden Dragon (12)
  { id: 1201, restaurantId: 12, name: "Schezwan Noodles", description: "Fiery Schezwan sauce tossed noodles", price: 170, rating: 4.5, veg: true, category: "Chinese", emoji: "🍜" },
  { id: 1202, restaurantId: 12, name: "Honey Chilli Potato", description: "Crispy potato in sweet chilli glaze", price: 150, rating: 4.6, veg: true, category: "Chinese", emoji: "🥔" },
  { id: 1203, restaurantId: 12, name: "Kung Pao Chicken", description: "Peanuts, chilli & spring onion stir-fry", price: 240, rating: 4.7, veg: false, category: "Chinese", emoji: "🥡" },
  { id: 1204, restaurantId: 12, name: "Dim Sum Basket (6pc)", description: "Steamed dumplings, assorted fillings", price: 210, rating: 4.5, veg: false, category: "Chinese", emoji: "🥟" }
];
