import axios from "axios";
import React, { createContext } from "react";
export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function getUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }
  
function addProductToCart(productId){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
    productId:productId
  },{ headers }).then((response) => response)
  .catch((error) => error);
}
function updateCartQuantity(productId, count){
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    
    count:count
  },{ headers }).then((response) => response)
  .catch((error) => error);
}
function deleteProductItem(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
   { headers }).then((response) => response)
  .catch((error) => error);
}
function checkOutCart(cartId, url ,formval){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
     shippingAddress:formval
  },{ headers }).then((response) => response)
  .catch((error) => error);
}
function getAllorders(cartId){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`, {
  },{ headers }).then((response) => response)
  .catch((error) => error);
}

  return (
    <CartContext.Provider value={{ getUserCart ,addProductToCart ,updateCartQuantity,deleteProductItem,checkOutCart,getAllorders}}>
      {props.children}
    </CartContext.Provider>
  );
}
