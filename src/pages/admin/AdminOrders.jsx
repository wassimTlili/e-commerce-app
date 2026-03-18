import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';

const AdminOrders = () => {
  const { logoutAdmin } = useAuth();
  const { orders, updateOrderStatus } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold">
                      Customer
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold">
                      Items
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold">
                      Total
                    </th>
                    <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b dark:border-gray-700 ${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                      }`}
                    >
                      <td className="py-4 px-6 text-gray-900 dark:text-white font-semibold">
                        #{order.id}
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        {order.customerName || 'Guest'}
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm">
                              {item.title} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white font-bold">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm font-medium border-none outline-none cursor-pointer`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
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

export default AdminOrders;
