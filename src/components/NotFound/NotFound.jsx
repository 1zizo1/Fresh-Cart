import Style from './NotFound.module.css'
import { Link } from 'react-router-dom'
export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-100 mt-6">
        <h1 className="text-9xl font-extrabold text-green-400">404</h1>
        <p className="text-2xl font-semibold text-green-500 mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2">
          Oops! It seems like you've wandered off the beaten path.
        </p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-green-400 text-white font-semibold rounded hover:bg-green-500 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    );
}
