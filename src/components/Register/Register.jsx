import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isloading, setIsloading] = useState(false);
  let { setUserLogin } = useContext(UserContext);

  function handleRegister(formvalues) {
    setIsloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formvalues)
      .then((apiResponse) => {
        setIsloading(false);
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          navigate("/");
        }
      })
      .catch((apiResponse) => {
        setIsloading(false);
        setApiError(apiResponse?.response?.data?.message);
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum length is 3").max(10, "Maximum length is 10").required(),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string().matches(/^\d{11}$/, "Phone must be an Egyptian number").required("Phone number is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with a capital letter and be 6-11 characters long").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match").required("Password confirmation is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
          <div className="flex justify-center">
            {/* SVG Icon */}
            <svg className="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5C6.753 4.5 2.5 8.753 2.5 14c0 3.25 2.458 7.04 7.568 9.326a.75.75 0 00.631 0C16.042 21.04 18.5 17.25 18.5 14c0-5.247-4.253-9.5-9.5-9.5zM12 9c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Register now</h2>
          {apiError && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-slate-100" role="alert">
              {apiError}
            </div>
          )}
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {/* Form Fields */}
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Name"
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email"
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Phone"
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <div className="text-red-600 text-sm mt-1">{formik.errors.rePassword}</div>
              )}
            </div>

            {isloading ? (
              <button
                type="button"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-500 rounded-md focus:outline-none focus:bg-yellow-600"
                disabled
              >
                <i className="fas fa-spinner fa-spin"></i> Registering...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >
                Register
              </button>
            )}

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline">
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
