import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { FaStar, FaFilter, FaTh, FaList } from 'react-icons/fa';

const Shop = () => {
  const { category } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'audio', name: 'Audio Devices', icon: '🎧' },
    { id: 'gaming', name: 'Gaming Gear', icon: '🎮' },
    { id: 'wearables', name: 'Wearables', icon: '⌚' },
    { id: 'mobile', name: 'Mobile Accessories', icon: '📱' },
    { id: 'camera', name: 'Camera & Photo', icon: '📷' },
  ];

  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop/${cat}`);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  const getCategoryName = () => {
    const cat = categories.find(c => c.id === selectedCategory);
    return cat ? cat.name : 'All Products';
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getCategoryName()}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our premium collection of electronic accessories
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaFilter className="text-primary" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categories</h3>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setPriceRange([0, 100])}
                    className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Under $100
                  </button>
                  <button
                    onClick={() => setPriceRange([0, 200])}
                    className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Under $200
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredProducts.length}
                </span>{' '}
                products found
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>

                {/* View Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FaTh />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'list'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No products found in this category
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    data-aos="fade-up"
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className={
                        viewMode === 'grid'
                          ? 'w-full h-48 object-cover'
                          : 'w-48 h-48 object-cover'
                      }
                    />
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {product.title}
                        </h3>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="text-sm font-semibold">{product.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.color}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
