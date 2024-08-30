import { useEffect, useState } from "react";
import axios from "axios";

export default function GetBrands() {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch brands data from the API
  async function GetBrands() {
    try {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands`
      );
      console.log(res.data.data);
      setBrands(res.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  // Fetch brands on component mount
  useEffect(() => {
    GetBrands();
  }, []);

  // Filter brands based on the search term
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-white text-center mb-6">Brands</h1>

      <div className="mb-9 justify-center gap-2 mt-7 flex items-center">
      <i className="fa mx-2 fa-search font-bold text-3xl text-green-500 "></i>

        <input
          type="text"
          placeholder="Search brands..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2  border rounded w-1/2 focus:outline-none focus:border-green-400"
        />
      </div>

      {/* Display filtered brands */}
      <div className="flex flex-wrap justify-center gap-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            className="card relative gap-y-2 hover:z-10 rounded hover:border-green-400 border-transparent border hover:scale-125 transition-all duration-500 w-full sm:w-1/2 md:w-1/5"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-48 object-cover rounded"
            />
            <div className="absolute bottom-0 w-full p-2 bg-opacity-75 text-center">
              <button className="btn">See more...</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
