import { useState, useContext, useEffect } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WhishlistContext } from "../../Context/WhishlistContext";

export default function Navbar() {
  const [cartNum, setCartNum] = useState(0);
  const [wishNum, setWishNum] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // State to manage menu open/close

  const { getUserWishlist } = useContext(WhishlistContext);
  const { getUserCart } = useContext(CartContext);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();

  async function getWishlistNum() {
    let res = await getUserWishlist();
    setWishNum(res.data.count);
  }

  async function getCartNum() {
    const response = await getUserCart();
    setCartNum(response.data.numOfCartItems);
  }

  function logOut() {
    navigate("/login");
    localStorage.removeItem("userToken");
    setUserLogin(null);
  }

  useEffect(() => {
    getCartNum();
    getWishlistNum();
  }, [cartNum, wishNum]);

  return (
    <nav className="bg-gray-200 text-center lg:fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center p-5">
        <div className="flex justify-between w-full lg:w-auto">
          <img width={150} className="mx-2" src={logo} alt="fresh cart logo" />
          {/* Toggler Button for Mobile Menu */}
          <button
            className="lg:hidden flex items-center p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-4 lg:flex-row ${isOpen ? "block" : "hidden"} transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 items-center ">
            {userLogin !== null ? (
              <>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to=""
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to="brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to="products"
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to="categories"
                  >
                    Categories
                  </NavLink>
                </li>
              </>
            ) : null}

            {userLogin === null ? (
              <>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to="register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              
              <>
              
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1 relative">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to="/wishlist"
                  >
                    <i className="fa fa-heart text-2xl"></i>{" "}
                    {wishNum > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {wishNum}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1 relative">
                  <NavLink
                    className="mx-2 text-lg text-slate-900 font-light py-2"
                    to="cart"
                  >
                    <i className="fa fa-cart-plus text-2xl"></i>{" "}
                    {cartNum > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartNum}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nanLink py-2 hover:bg-slate-100 transition-all duration-150 rounded hover:scale-110 mx-1">
                  <span
                    onClick={logOut}
                    className="mx-2 rounded cursor-pointer bg-red-600 text-sm text-slate-900 font-light hover:bg-red-400 p-2"
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
