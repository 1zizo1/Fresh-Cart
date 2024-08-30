import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // Fetch categories data from the API
  async function GetCategories() {
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      console.log(res.data.data);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Fetch categories on component mount
  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-white text-center mb-6">Categories</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="card relative rounded-lg overflow-hidden shadow-lg w-full sm:w-1/2 md:w-1/5"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 absolute inset-0   flex items-center justify-center bg-black bg-opacity-50 z-10">
              <h2 className="text-lg  font-semibold text-white   text-center">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
