import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { FaArrowLeft, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';

const AdminProducts = () => {
  const { logoutAdmin } = useAuth();
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <FaArrowLeft />
              Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
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
        {/* Search and Add Button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            to="/admin/add-product"
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Add New Product
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
