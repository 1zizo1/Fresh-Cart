// import { useState } from 'react'
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import About from "./components/About/About";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/Allorders/Allorders";
import WhishlistContextProvider from "./Context/WhishlistContext";
import Wishlist from "./components/Wishlist/Wishlist";
import ForgetPassword from "./components/forgetPassword/forgetPassword";
import SubmitCode from "./components/submitCode/submitCode";
import ResetPassword from "./components/Resetpassword/Resetpassword";
const query = new QueryClient();
//   {
//   defaultOptions:{
//   }
// }

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:productId/:name/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },

      { path: "login", element: <Login /> },
      { path: "resetcode", element: <SubmitCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
      },
      { path: "register", element: <Register /> },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <WhishlistContextProvider>
            <RouterProvider router={routers} />
            <ReactQueryDevtools />
            <Toaster />
          </WhishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
