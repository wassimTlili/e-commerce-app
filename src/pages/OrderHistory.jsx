import React from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingBag, FaCalendar, FaBox } from 'react-icons/fa';

const OrderHistory = () => {
  const { orders } = useCart();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'Processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'Shipped':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400';
      case 'Delivered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <FaShoppingBag className="text-3xl text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order History</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <FaBox className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to see your orders here!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary to-secondary p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white">
                    <div>
                      <h3 className="text-xl font-bold">Order #{order.id}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <FaCalendar className="text-sm" />
                        <span className="text-sm">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">Total Amount</p>
                      <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Order Items
                    </h4>
                    <span className={`${getStatusColor(order.status)} px-4 py-1 rounded-full text-sm font-medium`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Color: {item.color}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.customerName && (
                    <div className="mt-6 pt-6 border-t dark:border-gray-700">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Shipping Information
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Customer</p>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {order.customerName}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {order.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
