import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";
export default function ResetPassword() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLogin } = useContext(UserContext);

  async function handleResetPassword(formValues) {
    setIsLoading(true);
    try {
      const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValues);
      console.log(response);
      
      setIsLoading(false);
      if (response?.status === 200) {
        localStorage.setItem('userToken', response.data.token);
        setUserLogin(response.data.token);

        console.log(response.data.token);
        
        toast.success('Password reset successful!', { duration: 2000, position: 'top-center' });
        navigate("/");
      } else {
        toast.error('Password reset failed. Please try again.', { duration: 2000, position: 'top-center' });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred', { duration: 2000, position: 'top-center' });
      } else {
        toast.error('Network error or server not reachable', { duration: 2000, position: 'top-center' });
      }
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with a capital letter and be 6-11 characters long"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-200">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v7l4 4m-4-4V4m0 0C6.5 4 4 6.5 4 10s2.5 6 6 6"
            />
          </svg>
          <h2 className="text-2xl font-bold text-green-600">Reset Password</h2>
        </div>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-3 px-4 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute top-0 left-0 text-gray-500 text-sm transform -translate-y-1/2 scale-75 origin-top-left transition-transform duration-300 ease-in-out peer-focus:scale-75 peer-focus:-translate-y-1/2"
            >
              Enter your Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.email}
            </div>
          )}

          <div className="relative">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-3 px-4 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="newPassword"
              className="absolute top-0 left-0 text-gray-500 text-sm transform -translate-y-1/2 scale-75 origin-top-left transition-transform duration-300 ease-in-out peer-focus:scale-75 peer-focus:-translate-y-1/2"
            >
              Enter your New Password
            </label>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.newPassword}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between">
            {isLoading ? (
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-5 w-full text-white bg-yellow-500 rounded-lg font-medium disabled:opacity-50"
                disabled
              >
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v7l4 4m-4-4V4m0 0C6.5 4 4 6.5 4 10s2.5 6 6 6"
                  />
                </svg>
                Resetting Password...
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center py-2.5 px-5 w-full text-white bg-green-700 rounded-lg font-medium hover:bg-green-800"
              >
                Submit
              </button>
            )}
          </div>

          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?{' '}
            <span className="font-semibold text-green-700">
              <Link to={'/register'}>Register Now</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
