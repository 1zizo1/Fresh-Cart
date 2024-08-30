import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import CheckOut from '../CheckOut/CheckOut';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);

  const { getUserCart, updateCartQuantity, deleteProductItem } = useContext(CartContext);

  async function getCartItems() {
    const response = await getUserCart();
    setCartDetails(response.data.data);
  }

  async function updateCartCount(productId, count) {
    const response = await updateCartQuantity(productId, count);
    setCartDetails(response.data.data);
  }

  async function deleteItem(productId) {
    const response = await deleteProductItem(productId);
    setCartDetails(response.data.data);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100">
      <h2 className="text-center text-3xl py-4 text-green-600">Shopping Cart</h2>
      <h3 className="text-center text-slate-500 text-lg font-light">
        Total Cart Price: {cartDetails?.totalCartPrice} EGP
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-50 text-gray-700 uppercase text-sm hidden sm:table-header-group">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Qty</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products.map((product) => (
              <tr key={product.product.id} className="border-b">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img src={product.product.imageCover} className="w-16 h-16 object-cover rounded" alt={product.product.title} />
                  <div>
                    <p className="text-gray-900 font-semibold">{product.product.title}</p>
                    <p className="text-gray-500 text-sm sm:hidden">{product.price} EGP</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateCartCount(product.product.id, product.count - 1)}
                      className="text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button
                      onClick={() => updateCartCount(product.product.id, product.count + 1)}
                      className="text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full h-6 w-6 flex items-center justify-center focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell text-gray-900 font-semibold">{product.price} EGP</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(product.product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <Link to={'/CheckOut'} className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500 transition-all">
          Check Out
        </Link>
      </div>
    </div>
  );
}
