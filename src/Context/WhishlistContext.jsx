import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let WhishlistContext = createContext();
export default function WhishlistContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function getUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  async function deleteItemWishlist(itemId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async function addItemWishlist(itemId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist/`,
        {
          productId: itemId,
        },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  // const toggleWishlistItem = async (itemId) => {
  //     const isInWishlist = wishlist.some(item => item._id === itemId);
  //     if (isInWishlist) {
  //         await deleteItemWishlist(itemId);
  //     } else {
  //         await addItemWishlist(itemId);
  //     }
  // };

  return (
    <WhishlistContext.Provider
      value={{ getUserWishlist, deleteItemWishlist, addItemWishlist }}
    >
      {props.children}
    </WhishlistContext.Provider>
  );
}
