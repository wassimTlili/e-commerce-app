import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { FaArrowLeft, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const AddProduct = () => {
  const { logoutAdmin } = useAuth();
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    rating: 5.0,
    color: '',
    category: 'audio',
    image: ''
  });

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating)
    };

    addProduct(newProduct);
    alert('Product added successfully!');
    navigate('/admin/products');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/products"
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <FaArrowLeft />
              Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Wireless Gaming Mouse"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Product description..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="99.99"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating (0-5) *
                </label>
                <input
                  type="number"
                  name="rating"
                  required
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color *
                </label>
                <input
                  type="text"
                  name="color"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Black, White, RGB"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="audio">Audio Devices</option>
                  <option value="gaming">Gaming Gear</option>
                  <option value="wearables">Smart Wearables</option>
                  <option value="mobile">Mobile Accessories</option>
                  <option value="camera">Camera & Photo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Use Unsplash or any image URL
              </p>
            </div>

            {formData.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image Preview
                </label>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <FaPlus />
                Add Product
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
