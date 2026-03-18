import React from 'react'
import Image1 from '../../assets/hero/women.png'
import Image2 from '../../assets/hero/shopping.png'
import Image3 from '../../assets/hero/sale.png'
import Slider from 'react-slick'

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "50% OFF on Premium Electronics",
    description:
      "Discover cutting-edge technology with wireless earbuds, smartwatches, and gaming accessories at unbeatable prices.",
  },
  {
    id: 2,
    img: Image2,
    title: "Smart Gadgets for Modern Life",
    description:
      "Upgrade your tech game with our collection of innovative electronic accessories designed for performance and style.",
  },
  {
    id: 3,
    img: Image3,
    title: "Mega Tech Sale - Up to 70% OFF",
    description:
      "Limited time offer on gaming peripherals, audio devices, and smart wearables. Shop now and save big!",
  },
];



const Hero = () => {
    var settings = {
        dots : false,
        arrows:false,
        infinite:true,
        speed: 800,
        slidesToScroll: 1 ,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase : " ease-in-out",
        pauseOnHover: false,
        pauseOnFocus:true,
    }
  return (
    <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px]
    bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white
    duration-200 '>
        {/*bg pattern*/}
        <div className='h-[700px] w-[700px] bg-primary/40 absolute 
        -top-1/2 right-0 rounded-3xl rotate-45 -z-9 '>

        </div>
        {/*hero section*/}
        <div className="container pb-8 sm:pb-0">
           <Slider {...settings} >

            {ImageList.map((data)=>(
                 <div>
                 <div className='grid grid-cols-1 sm:grid-cols-2'>
                     {/*text content section*/}
                     <div className='flex flex-col justify-center gap-4 pt-12
                     sm:pt-0 text-center sm:text-left oeder-2 sm:order-1 relative z-10'>
                         <h1 
                         data-aos="zoom-out"
                         data-aos-duration="500"
                         data-aos-once="true"
                         className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                         <p
                         data-aos="zoom-out"
                         data-aos-duration="500"
                         data-aos-once="true" 
                         className='text-sm'>{data.description}</p>
                         <div 
                         data-aos="zoom-out"
                         data-aos-duration="500"
                         data-aos-once="true">
                             <button className='bg-gradient-to-r from-primary to-secondry
                             hover:scale-105 duration-200 text-white py-2 px-2 rounded-full'>
                                 Order Now!
                             </button>
                         </div>
 
                     </div>
                     {/*text content section*/}
                     <div className='order-1 sm:order-2'>
                         <div className='relative z-10'>
                             <img src={data.img} alt="" 
                             className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px]
                              sm:scale-120 object-contain mx-auto'/>
                         </div>
                     </div>
 
 
                 </div>
             </div>
            ))}

          
           </Slider>

        </div>

      
    </div>
  )
}

export default Hero
