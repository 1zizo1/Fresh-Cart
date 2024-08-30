import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import useProducts from "../../Hooks/useProducts";
import { WhishlistContext } from "../../Context/WhishlistContext";

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
    setLoading(false);
    if (response.data.status === "success") {
      toast.success(response.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    } else {
      toast.error(response.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    }
    console.log(response);
  }

  async function toggleWishlist(itemId) {
    try {
      const isInWishlist = wishlistitemId.includes(itemId);
      if (isInWishlist) {
        const response = await deleteItemWishlist(itemId);
        if (response.data.status === "success") {
          setWishlistitemId((prevIds) => prevIds.filter((id) => id !== itemId));
          toast.success("Removed from wishlist", { duration: 2000, position: "bottom-left" });
        } else {
          toast.error("Failed to remove from wishlist", { duration: 2000, position: "bottom-left" });
        }
      } else {
        const response = await addItemWishlist(itemId);
        if (response.data.status === "success") {
          setWishlistitemId((prevIds) => [...prevIds, itemId]);
          toast.success("Added to wishlist", { duration: 2000, position: "bottom-left" });
        } else {
          toast.error("Failed to add to wishlist", { duration: 2000, position: "bottom-left" });
        }
      }
    } catch (error) {
      toast.error("An error occurred", { duration: 2000, position: "bottom-left" });
    }
  }

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistitemId(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistitemId));
  }, [wishlistitemId]);

  let response = useProducts();
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Brands</h1>

      <div className="flex justify-center items-center mb-9">
        <i className="fa fa-search text-green-500 text-3xl mx-2"></i>
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full lg:w-1/2 focus:outline-none focus:border-green-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <button onClick={() => toggleWishlist(product.id)} className="focus:outline-none">
              {Array.isArray(wishlistitemId) && wishlistitemId.includes(product.id) ? (
                <i className="fa fa-heart text-red-600 text-xl" />
              ) : (
                <i className="fa fa-heart text-gray-400 text-xl" />
              )}
            </button>
            <Link to={`/productDetails/${product.id}/${product.title}/${product.category.name}`}>
              <img
                className="w-full h-56 object-cover rounded-md"
                src={product.imageCover}
                alt={product.title}
              />
              <span className="block mt-2 text-green-600 font-medium">{product.category.name}</span>
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700 font-semibold">{product.price} EGP</span>
                <span className="flex items-center">
                  {product.ratingsAverage}
                  <i className="fas fa-star text-yellow-500 ml-1"></i>
                </span>
              </div>
            </Link>

            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition duration-200"
              onClick={() => addProduct(product.id)}
            >
              {loading && currentProductId === product.id ? (
                <i className="fa fa-spinner animate-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
