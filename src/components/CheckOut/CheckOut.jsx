import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";  // Import Yup for validation
import { CartContext } from "../../Context/CartContext";

export default function CheckOut() {
  const { checkOutCart, getUserCart } = useContext(CartContext);
  const [cartId, setCartId] = useState('');
  const url = 'http://localhost:5173/allorders';

  async function getCartId() {
    const response = await getUserCart();
    setCartId(response.data.cartId);
  }

  async function handleCheckout(cartId, url) {
    let response = await checkOutCart(cartId, url, formik.values);
    if (response.data.status === 'success') {
      window.location.href = response.data.session.url;
    }
  }

  const formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    validationSchema: Yup.object({
      city: Yup.string()
        .required("City is required")
        .min(2, "City must be at least 2 characters long"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^\d+$/, "Phone must contain only numbers")
        .min(10, "Phone number must be at least 10 digits"),
      details: Yup.string().required("Details are required"),
    }),
    onSubmit: () => {
      handleCheckout(cartId, url);
    },
  });

  useEffect(() => {
    getCartId();
  }, []);

  return (
    <>
      <div className="py-6 max-w-xl mx-auto bg-slate-200 p-4 rounded mt-4">
        <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">
          Pay now
        </h2>

        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.details && formik.errors.details
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
              required
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="text-red-500 text-sm">{formik.errors.details}</div>
            ) : null}
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your details:
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
              required
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Phone:
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer ${
                formik.touched.city && formik.errors.city
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder=" "
              required
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm">{formik.errors.city}</div>
            ) : null}
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your city:
            </label>
          </div>
          <button
            type="submit"
            className="btn text-white bg-green-700 hover:bg-green-800 hover:scale-105 transition-all duration-150 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
