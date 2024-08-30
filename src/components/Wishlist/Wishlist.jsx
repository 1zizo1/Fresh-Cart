import { useContext, useEffect, useState } from "react";
import { WhishlistContext } from "../../Context/WhishlistContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function Wishlist() {
  const { getUserWishlist,deleteItemWishlist } = useContext(WhishlistContext);
  const [wishlist, setWishlist] = useState([]);
  const [wishCount, setWishCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentProductId, setcurrentProductId] = useState('second')
  let { addProductToCart } = useContext(CartContext);

  async function getWishlist() {
    let res = await getUserWishlist();
    setWishlist(res.data.data);
    setWishCount(res.data.count);
    
  }
  async function deleteItem(itemId) {
    let res = await deleteItemWishlist(itemId);
    setWishlist(res.data.data);
    setWishCount(res.data.count);
    console.log(itemId);
    if (res.data.status === "success") {
      setLoading(false);
      toast.success(res.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    } else {
      setLoading(false);
      toast.error(res.data.message, {
        duration: 2000,
        position: "bottom-left",
      });
    }
  }
  async function addProduct(productId) {
    setcurrentProductId(productId)
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

  useEffect(() => {
    getWishlist();
  }, [wishlist]);

  return (
    <>
      <div className="p-4 bg-green-100 ">
        <h2 className="text-center font-semibold text-3xl py-4 text-green-600">
          Wishlist
        </h2>
        <h3 className="text-center text-slate-500 text-lg font-light mb-6">
          Total: {wishCount}
        </h3>
        <div className="grid gap-4  grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist?.map((product) => (
            <div
              key={product._id}
              className="bg-white md:p-4 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className=" flex items-center justify-between p-2">
                <span>
                <i className="fa fa-star text-yellow-500 p-1"></i>
                {product.ratingsAverage}
                </span>
                <span
                    onClick={() => {
                      deleteItem(product._id);
                    }}
                    className="cursor-pointer text-sm text-red-600 hover:text-red-800"
                  >
                    <i className="fa fa-trash text-xl"></i>
                  </span>


              </div>
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full  md:h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <p className="text-gray-700 mt-2">{product.price} EGP</p>

                <div className="mt-4 md:flex-row flex-col gap-2 flex items-stretch text-center  md:justify-between items-center">
                  <span
                  
                    className="cursor-pointer bg-yellow-400 text-nowrap px-2 py-1 rounded text-sm text-red-600 hover:text-red-800"
                  >
                     <Link rel="stylesheet"  to={`/productDetails/${product.id}/${product.title}/${product.category?.name}`}> See more.. </Link>
                  </span>
                  
                  <Link
                    
                    onClick={()=>{
                      addProduct(product.id)
                    }}
                    className="text-sm bg-green-500 text-white text-nowrap px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  >
                    {loading && currentProductId === product.id ?<i className="fa fa-spinner"></i>:'add to cart'}
                   
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
