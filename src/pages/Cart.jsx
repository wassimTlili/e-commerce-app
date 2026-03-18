import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add some accessories to get started!
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {item.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Color: {item.color}
                  </p>
                  <p className="text-2xl font-bold text-primary mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white w-12 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Items ({getCartCount()})</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/"
                className="block w-full text-center text-primary hover:text-primary/80 mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
