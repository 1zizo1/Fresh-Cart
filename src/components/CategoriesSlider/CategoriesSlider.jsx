import { useEffect, useState } from 'react'
import Style from './CategoriesSlider.module.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
export default function CategoriesSlider() {
  const[categories,setCategories]= useState([])
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    loop:true,
    autoplay:true, 
  };
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

    useEffect(()=>{
      getCategories()
    },[])
  return (
    <>
  <div className="py-5">
    <h2 className='py-4 text-xl text-gray-800 font-medium'> Shop Popular Categories</h2>
    <Slider {...settings}>
    {categories.map((category)=><div key={category.id} className="px-1 rounded bg-slate-50">

      <img className='category-img w-full' src={category.image} alt={category.name} />
      <h3 className='text-center mt-2 font-light '>{category.name}</h3>
    </div>
    )}
  </Slider>
  </div>
    </>
  )
}
