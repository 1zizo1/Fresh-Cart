import { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import CheckOut from '../CheckOut/CheckOut'


export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null)

let { getUserCart,updateCartQuantity,deleteProductItem } =useContext(CartContext) 
async function getCartItems(){
  const response = await getUserCart()
  console.log(response.data);
  setCartDetails(response.data.data)
}
async function updateCartCount( productId,count){
  const response = await updateCartQuantity(productId,count)
  setCartDetails(response.data.data);
}
async function deleteItem( productId){
  const response = await deleteProductItem(productId)
  setCartDetails(response.data.data);
}
useEffect(() => {
  getCartItems()
 }, [cartDetails])
  return (
    <>
<div className="relative p-2 overflow-x-auto  sm:rounded-lg">
  <h2 className='text-center  text-3xl py-4 text-green-600'> Shoping Cart</h2>
  <h3 className='text-center text-slate-500 text-lg font-light'>Total Cart Price: {cartDetails?.totalCartPrice} EGP</h3>
  <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
{cartDetails?.products.map((product) =>

<tr key={product.product.id} className="bg-white border-b  hover:bg-gray-50">
<td className="p-4">
  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
</td>
<td className="px-6 py-4 font-semibold text-gray-900 ">
  {product.product.title}
</td>
<td className="px-6 py-4">
  <div className="flex items-center">
    <button onClick={()=>{
      updateCartCount(product.product.id, product.count -1)
    }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
      <span className="sr-only">Quantity button</span>
      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
      </svg>
    </button>
    <div>
<span>{product.count}</span>
    </div>
    <button onClick={()=>{
      updateCartCount(product.product.id, product.count +1)
    }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
      <span className="sr-only">Quantity button</span>
      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
      </svg>
    </button>
  </div>
</td>
<td className="px-6 py-4 font-semibold text-gray-900 ">
  {product.price} EGP
</td>
<td className="px-6 py-4">
  <span onClick={()=>{
    deleteItem(product.product.id)
  }}  className=" cursor-pointer font-medium text-red-600 hover:underline">Remove</span>
</td>
</tr>

)}



    </tbody>
 
  </table>
     <div className='flex justify-end pe-10'> 
      <span className=' w-1/5 pe-10'>
      <Link to={'/CheckOut'} className='btn cursor-pointer text-center text-nowrap'>
        Check out
      </Link>
      </span>
    </div>
</div>

    </>
  )
}
