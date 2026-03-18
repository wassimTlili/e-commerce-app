import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const initialProducts = [
    {
      id: 1,
      title: "Wireless Earbuds Pro",
      description: "Premium noise-canceling wireless earbuds with 30h battery life",
      price: 199.99,
      rating: 5.0,
      color: "Black",
      category: "audio",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      aosDelay: "0",
    },
    {
      id: 2,
      title: "Smart Watch Ultra",
      description: "Advanced fitness tracker with GPS and health monitoring",
      price: 349.99,
      rating: 4.8,
      color: "Silver",
      category: "wearables",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
      aosDelay: "200",
    },
    {
      id: 3,
      title: "Wireless Keyboard RGB",
      description: "Mechanical gaming keyboard with wireless connectivity",
      price: 129.99,
      rating: 4.7,
      color: "Black",
      category: "gaming",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
      aosDelay: "400",
    },
    {
      id: 4,
      title: "4K Webcam Pro",
      description: "Ultra HD webcam with auto-focus and noise reduction",
      price: 159.99,
      rating: 4.6,
      color: "Black",
      category: "camera",
      image: "https://images.unsplash.com/photo-1593642532400-2682810df593",
      aosDelay: "600",
    },
    {
      id: 5,
      title: "Gaming Mouse RGB",
      description: "High-precision wireless gaming mouse with customizable RGB",
      price: 79.99,
      rating: 4.9,
      color: "Black",
      category: "gaming",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
      aosDelay: "800",
    },
    {
      id: 6,
      title: "Portable Power Bank 20000mAh",
      description: "Fast charging portable battery pack for all devices",
      price: 49.99,
      rating: 4.5,
      color: "Black",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
      aosDelay: "0",
    },
    {
      id: 7,
      title: "USB-C Hub Multi-Port",
      description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
      price: 45.99,
      rating: 4.4,
      color: "Gray",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f",
      aosDelay: "200",
    },
    {
      id: 8,
      title: "Wireless Charging Pad",
      description: "Fast wireless charger compatible with all Qi devices",
      price: 29.99,
      rating: 4.3,
      color: "White",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1591290619762-d1c2368f6202",
      aosDelay: "400",
    },
    {
      id: 9,
      title: "Gaming Headset 7.1",
      description: "Surround sound gaming headset with noise-canceling mic",
      price: 89.99,
      rating: 4.7,
      color: "Black/Red",
      category: "audio",
      image: "https://images.unsplash.com/photo-1599669454699-248893623440",
      aosDelay: "600",
    },
    {
      id: 10,
      title: "Bluetooth Speaker Portable",
      description: "Waterproof portable speaker with 360° sound and 12h battery",
      price: 69.99,
      rating: 4.6,
      color: "Blue",
      category: "audio",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      aosDelay: "800",
    },
    {
      id: 11,
      title: "LED Ring Light Kit",
      description: "Professional ring light for streaming and photography",
      price: 55.99,
      rating: 4.5,
      color: "Black",
      category: "camera",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      aosDelay: "0",
    },
    {
      id: 12,
      title: "Smartphone Gimbal Stabilizer",
      description: "3-axis gimbal for smooth professional video recording",
      price: 119.99,
      rating: 4.8,
      color: "Black",
      category: "camera",
      image: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385",
      aosDelay: "200",
    },
    {
      id: 13,
      title: "Gaming Controller Pro",
      description: "Wireless controller with programmable buttons and vibration",
      price: 59.99,
      rating: 4.7,
      color: "Black",
      category: "gaming",
      image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
      aosDelay: "400",
    },
    {
      id: 14,
      title: "Fitness Tracker Band",
      description: "Heart rate monitor, sleep tracking, and activity tracking",
      price: 39.99,
      rating: 4.4,
      color: "Black",
      category: "wearables",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
      aosDelay: "600",
    },
    {
      id: 15,
      title: "VR Headset",
      description: "Virtual reality headset with wireless connectivity",
      price: 299.99,
      rating: 4.9,
      color: "White",
      category: "gaming",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
      aosDelay: "800",
    },
  ];

  // Load products from localStorage on initialization
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Save products to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length + 1,
      aosDelay: "0",
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      deleteProduct, 
      updateProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};
