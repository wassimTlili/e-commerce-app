import React from 'react';
import { FaStar } from "react-icons/fa6";
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';




const Products = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className='mt-14 mb-12'>
        <div className='container'>
            {/*header section*/}
            <div className=' text-center mb-10 max-w-[600px] mx-auto'>
                <p data-aos="fade-up" className='text-sm text-primary'>Top Selling Electronic Accessories </p>
                <h1 data-aos="fade-up" className='text-3xl font-bold'>Tech Accessories</h1>
                <p data-aos="fade-up" className='text-xs text-gray-400'>
                    Explore our premium collection of wireless earbuds, gaming gear, smart devices, and cutting-edge tech accessories
                </p>

            </div>
            {/*body section*/}
            <div>
                <div
                className='grid grid-cols-1 sm:grid-cols-3 *
                md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
                    {/*card section */}

                    {
                        products.map((data)=>(
                            <div 
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            key={data.id} className='space-y-3'>
                                <img src={data.image} alt={data.title}
                                 className='h-[220px] w-[150px] object-cover
                                 rounded-md' />
                                 <div>
                                    <h3 className='font-semibold'>{data.title}</h3>
                                    <p className='text-sm text-gray-600'>{data.color}</p>
                                    <div className='flex items-center justify-between'>
                                      <div className='flex items-center gap-1'>
                                          <FaStar className='text-yellow-400'/>
                                          <span>{data.rating}</span>
                                      </div>
                                      <p className='text-lg font-bold text-primary'>${data.price}</p>
                                    </div>
                                    <button
                                      onClick={() => handleAddToCart(data)}
                                      className='w-full mt-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-all duration-200'
                                    >
                                      Add to Cart
                                    </button>
                                 </div>

                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Products
