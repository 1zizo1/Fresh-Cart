// eslint-disable-next-line no-unused-vars
import Style from "./RecentProducts.module.css";
// import axios from "axios";
import { Link } from "react-router-dom";

import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import useProducts from "../../Hooks/useProducts";
import { WhishlistContext } from "../../Context/WhishlistContext";
// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };
export default function RecentProducts() {
  const [loading, setLoading] = useState(false);
  const [currentProductId, setcurrentProductId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistitemId, setWishlistitemId] = useState([]);

  let { addProductToCart } = useContext(CartContext);
  let { deleteItemWishlist, addItemWishlist } = useContext(WhishlistContext);
  async function addProduct(productId) {
    setcurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      setLoading(false);
      toast.success(response.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    } else {
      setLoading(false);
      toast.error(response.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    }
    console.log(response);
  }


  async function toggleWishlist (itemId){  
    try {
      // Check if the item is already in the wishlist
      const isInWishlist = wishlistitemId.includes(itemId);
  
      if (isInWishlist) {
        // Remove item from wishlist
        const response = await deleteItemWishlist(itemId);
  
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => prevIds.filter(id => id !== itemId));
          toast.success('Removed from wishlist', { duration: 2000, position: 'bottom-left' });
        } else {
          toast.error('Failed to remove from wishlist', { duration: 2000, position: 'bottom-left' });
        }
      } else {
        // Add item to wishlist
        const response = await addItemWishlist(itemId);
  
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => [...prevIds, itemId]);
          toast.success('Added to wishlist', { duration: 2000, position: 'bottom-left' });
        } else {
          toast.error('Failed to add to wishlist', { duration: 2000, position: 'bottom-left' });
        }
      }
    } catch (error) {
      toast.error('An error occurred', { duration: 2000, position: 'bottom-left' });
    }
  }
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlistitemId(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistitemId));
  }, [wishlistitemId]);
  let response = useProducts();
  // console.log(response.data);
  const filteredProducts = response.data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (response.isLoading) {
    return (
      <div className="py-8 w-full flex justify-center">
        <HashLoader color="green" />
      </div>
    );
  }
  if (response.isError) {
    return (
      <div className="py-8 w-full flex justify-center">
        <h3>{response.error}</h3>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl text-white text-center mb-6">Brands</h1>

      <div className="mb-9 justify-center gap-2 mt-7 flex items-center">
        <i className="fa mx-2 fa-search font-bold text-3xl text-green-500 "></i>

        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2  border rounded w-1/2 focus:outline-none focus:border-green-400"
        />
      </div>

      <div className="row gap-y-4">
        {filteredProducts?.map((product) => (
          <div key={product.id} className="w-1/5 px-4">
            <div className="product py-2">
              <div className="">
             
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="focus:outline-none"
                >
                  { Array.isArray(wishlistitemId) && wishlistitemId.includes(product.id) ? (
                    <i className=" fa fa-heart text-red-600 text-xl" />
                  ) : (
                    <i className="fa fa-heart text-gray-400 text-xl" />
                  )}

                </button>
              </div>
              <Link
                to={`/productDetails/${product.id}/${product.title}/${product.category.name}`}
              >
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block font-light text-green-600">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
              </Link>

              <button
                className="btn"
                onClick={() => {
                  addProduct(product.id);
                }}
              >
                {loading && currentProductId === product.id ? (
                  <i className="fa fa-spinner"></i>
                ) : (
                  "add to cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
