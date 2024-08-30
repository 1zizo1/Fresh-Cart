import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,  // default for large screens
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,  // medium screens
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,  // small screens
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,  // extra small screens
          slidesToScroll: 1,
        }
      }
    ]
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="py-5">
      <h2 className="py-4 text-2xl text-gray-800 font-medium text-center">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id} className="px-2">
            <div className="bg-slate-50 rounded-md shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105">
              <img className="w-full h-40 object-cover" src={category.image} alt={category.name} />
              <h3 className="text-center mt-2 font-light text-gray-700">{category.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
