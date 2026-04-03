const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  {
    title: 'Wireless Bluetooth Headphones',
    price: 89.99,
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Consumer Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&auto=format',
    rating: 4.5,
    supplierInfo: {
      name: 'TechCorp Electronics',
      location: 'Shenzhen, China',
      contact: 'contact@techcorp.com'
    },
    stock: 150
  },
  {
    title: 'Smartphone 128GB',
    price: 699.99,
    description: 'Latest smartphone with advanced camera system and fast performance.',
    category: 'Consumer Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop&auto=format',
    rating: 4.7,
    supplierInfo: {
      name: 'Global Mobile Inc',
      location: 'Seoul, South Korea',
      contact: 'sales@globalmobile.com'
    },
    stock: 75
  },
  {
    title: 'Gaming Laptop 16GB RAM',
    price: 1299.99,
    description: 'Powerful gaming laptop with dedicated graphics card and high refresh rate display.',
    category: 'Consumer Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format',
    rating: 4.8,
    supplierInfo: {
      name: 'GameTech Solutions',
      location: 'Taipei, Taiwan',
      contact: 'support@gametech.com'
    },
    stock: 25
  },
  {
    title: 'Modern Sofa Set',
    price: 899.99,
    description: 'Comfortable 3-piece sofa set with premium fabric upholstery.',
    category: 'Home & Outdoor',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop&auto=format',
    rating: 4.3,
    supplierInfo: {
      name: 'HomeStyle Furniture',
      location: 'Jakarta, Indonesia',
      contact: 'info@homestyle.com'
    },
    stock: 30
  },
  {
    title: 'LED Desk Lamp',
    price: 45.99,
    description: 'Adjustable LED desk lamp with multiple brightness levels and USB charging port.',
    category: 'Home & Outdoor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format',
    rating: 4.2,
    supplierInfo: {
      name: 'LightWorks Co',
      location: 'Guangzhou, China',
      contact: 'orders@lightworks.com'
    },
    stock: 200
  },
  {
    title: 'Kitchen Blender 800W',
    price: 79.99,
    description: 'Powerful 800W blender with multiple speed settings and stainless steel blades.',
    category: 'Home & Outdoor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&auto=format',
    rating: 4.4,
    supplierInfo: {
      name: 'KitchenPro Appliances',
      location: 'Bangkok, Thailand',
      contact: 'service@kitchenpro.com'
    },
    stock: 120
  },
  {
    title: 'Wireless Gaming Mouse',
    price: 59.99,
    description: 'Ergonomic wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    category: 'Consumer Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop&auto=format',
    rating: 4.6,
    supplierInfo: {
      name: 'GamerZone Accessories',
      location: 'Hong Kong, China',
      contact: 'support@gamerzone.hk'
    },
    stock: 180
  },
  {
    title: 'Outdoor Camping Tent',
    price: 149.99,
    description: 'Waterproof 4-person camping tent with easy setup and ventilation system.',
    category: 'Home & Outdoor',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=300&h=200&fit=crop&auto=format',
    rating: 4.1,
    supplierInfo: {
      name: 'Adventure Gear Ltd',
      location: 'Vancouver, Canada',
      contact: 'info@adventuregear.ca'
    },
    stock: 45
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data seeded successfully');
    process.exit();
  })
  .catch(err => console.log(err));