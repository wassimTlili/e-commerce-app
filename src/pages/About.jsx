import React from 'react';
import { FaStore, FaShieldAlt, FaTruck, FaHeadset } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Accessoir BHS
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your premier destination for cutting-edge electronic accessories and smart gadgets
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg">
            <p>
              Founded in 2024, Accessoir BHS has become a leading destination for tech enthusiasts 
              seeking premium electronic accessories that combine innovation, quality, and performance.
            </p>
            <p>
              We believe that technology accessories are essential tools that enhance your digital lifestyle. 
              That's why we carefully curate each product in our collection, ensuring that every item meets 
              our high standards of quality, functionality, and design.
            </p>
            <p>
              From wireless audio devices and gaming peripherals to smart wearables and productivity tools, 
              our collection represents the finest in modern electronic accessories.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaStore className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Latest Technology
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cutting-edge electronic accessories and gadgets
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaShieldAlt className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Authentic Products
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              100% genuine products with warranty
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaTruck className="text-5xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Free Shipping
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fast and free delivery worldwide
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FaHeadset className="text-5xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Dedicated customer service team
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            To provide our customers with exceptional electronic accessories that enhance their digital 
            lifestyle and productivity, while delivering an unparalleled shopping experience.
          </p>
          <p className="text-lg">
            We are committed to offering the latest technology, competitive prices, and building lasting 
            relationships with our customers through excellent service and quality products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
