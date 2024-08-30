import { NavLink } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center lg:text-left py-4">
      <div className="container mx-auto px-4">
        {/* Footer Top - Links */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 border-b border-gray-300">
        <img width={150} className="mx-2" src={logo} alt="fresh cart logo" />

          <div className="mb-4 lg:mb-0">
          </div>

          <ul className="flex flex-col lg:flex-row">
            <li className="navLink py-2 mx-2">
              <NavLink className="text-lg text-slate-900 font-light" to="/">
                Home
              </NavLink>
            </li>
            <li className="navLink py-2 mx-2">
              <NavLink className="text-lg text-slate-900 font-light" to="/brands">
                Brands
              </NavLink>
            </li>
            <li className="navLink py-2 mx-2">
              <NavLink className="text-lg text-slate-900 font-light" to="/products">
                Products
              </NavLink>
            </li>
            <li className="navLink py-2 mx-2">
              <NavLink className="text-lg text-slate-900 font-light" to="/categories">
                Categories
              </NavLink>
            </li>
            <li className="navLink py-2 mx-2">
              <NavLink className="text-lg text-slate-900 font-light" to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex justify-center py-4">
          <a href="https://www.facebook.com" className="mx-2 hover:scale-125 transition-all duration-300">
            <i className="fab fa-facebook text-green-400"></i>
          </a>
          <a href="https://www.twitter.com" className="mx-2 hover:scale-125 transition-all duration-300">
            <i className="fab fa-twitter text-green-400"></i>
          </a>
          <a href="https://www.youtube.com" className="mx-2 hover:scale-125 transition-all duration-300">
            <i className="fab fa-youtube text-green-400"></i>
          </a>
          <a href="https://www.instagram.com" className="mx-2 hover:scale-125 transition-all duration-300">
            <i className="fab fa-instagram text-green-400"></i>
          </a>
          <a href="https://www.github.com" className="mx-2 hover:scale-125 transition-all duration-300">
            <i className="fab fa-github text-green-400"></i>
          </a>
        </div>

        {/* Footer Bottom - Copyright */}
        <div className="text-center py-4 text-slate-600">
          © 2024 Fresh Cart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
