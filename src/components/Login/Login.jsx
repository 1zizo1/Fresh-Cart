import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formValues) {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues);
      setIsLoading(false);
      if (response.data.message === 'success') {
        localStorage.setItem('userToken', response.data.token);
        setUserLogin(response.data.token);
        navigate("/");
      } else {
        setApiError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setApiError(error.response.data.message || 'An error occurred');
      } else {
        setApiError('Network error or server not reachable');
      }
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with a capital letter and be 6-11 characters long"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-200 py-6 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* SVG Icon above the heading */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM21 21c0-5.523-4.477-10-10-10S1 15.477 1 21"
            ></path>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
          Log In
        </h2>

        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 animate-fadeIn" role="alert">
            {apiError}
          </div>
        )}

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Email address:
            </label>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.email}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your Password:
            </label>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.password}
            </div>
          ) : null}

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/forgetpassword" className="text-sm text-green-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center mt-6">
            {isLoading ? (
              <button
                type="button"
                className="btn text-white bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                disabled
              >
                <i className="fas fa-spinner fa-spin"></i> Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="btn text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Login
              </button>
            )}

            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?
              <span className="font-semibold text-green-700">
                <Link to="/register"> Register Now</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
