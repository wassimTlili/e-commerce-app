import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { FaBox, FaShoppingCart, FaSignOutAlt, FaPlus, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  const { logoutAdmin, adminEmail } = useAuth();
  const { products } = useProducts();
  const { orders } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">{adminEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{products.length}</p>
              </div>
              <FaBox className="text-4xl text-primary" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
              <FaShoppingCart className="text-4xl text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingOrders}</p>
              </div>
              <FaChartLine className="text-4xl text-yellow-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
              </div>
              <FaChartLine className="text-4xl text-blue-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <FaBox className="text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Manage Products</h3>
            <p className="text-white/80">Add, edit, or delete products from your store</p>
          </Link>

          <Link
            to="/admin/add-product"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <FaPlus className="text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Add New Product</h3>
            <p className="text-white/80">Add a new accessory to your catalog</p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <FaShoppingCart className="text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">View Orders</h3>
            <p className="text-white/80">Manage customer orders and shipping</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Items</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Total</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">#{order.id}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{order.items.length}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
