import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";

export default function AllOrders() {
  const { getAllorders, getUserCart } = useContext(CartContext);
  const [cartId, setCartId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getCartId() {
    try {
      const response = await getUserCart();
      setCartId(response.data.cartId);
    } catch (err) {
      setError("Failed to fetch cart ID");
    }
  }

  async function fetchOrders() {
    try {
      const response = await getAllorders();
      setOrders(response.data.products);
      console.log(response.data.products);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCartId();
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <></>
    // <div className="max-w-4xl mx-auto p-4">
    //   <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
    //     Your Orders
    //   </h2>
    //   {orders.length === 0 ? (
    //     <p className="text-center text-gray-500">No orders found.</p>
    //   ) : (
    //     <div className="space-y-6">
    //       {orders.map((order) => (
    //         <div
    //           key={order._id}
    //           className="border rounded-lg p-6 shadow-lg hover:bg-slate-100 transition-all duration-150"
    //         >
    //           <div className="flex justify-between items-center mb-4">
    //             <h3 className="text-lg font-semibold text-gray-900">
    //               Order #{order._id}
    //             </h3>
    //             <span
    //               className={`text-sm ${
    //                 order.isPaid ? "text-green-600" : "text-red-600"
    //               } font-medium`}
    //             >
    //               {order.isPaid ? "Paid" : "Unpaid"}
    //             </span>
    //           </div>
    //           <div className="mb-4">
    //             <h4 className="text-md font-medium text-gray-800">
    //               Shipping Address
    //             </h4>
    //             <p className="text-gray-700">
    //               {order.shippingAddress.details}, {order.shippingAddress.city}
    //             </p>
    //             <p className="text-gray-700">Phone: {order.shippingAddress.phone}</p>
    //           </div>
    //           <div className="mb-4">
    //             <h4 className="text-md font-medium text-gray-800">Items</h4>
    //             <ul className="space-y-4">
    //               {order.cartItems.map((item) => (
    //                 <li key={item._id} className="flex items-center space-x-4">
    //                   <img
    //                     src={item.product.imageCover}
    //                     alt={item.product.title}
    //                     className="w-16 h-16 object-cover rounded-md"
    //                   />
    //                   <div className="flex-grow">
    //                     <h5 className="text-gray-900 font-semibold">{item.product.title}</h5>
    //                     <p className="text-gray-700">Quantity: {item.count}</p>
    //                     <p className="text-gray-700">Price: ${item.price}</p>
    //                   </div>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //           <div className="flex justify-between items-center">
    //             <h4 className="text-md font-medium text-gray-800">Total Price</h4>
    //             <span className="text-gray-900 font-semibold">${order.totalOrderPrice}</span>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
}
