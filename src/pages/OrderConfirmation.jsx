import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No order found</p>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 md:p-12 text-center">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Thank you for your purchase, {order.customerName}!
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Number</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">#{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Date</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                <p className="text-lg font-bold text-primary">${order.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <p className="text-lg font-bold text-yellow-600">{order.status}</p>
              </div>
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-left">
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-left bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
            <p className="text-blue-800 dark:text-blue-400">
              A confirmation email has been sent to <strong>{order.email}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-semibold"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
