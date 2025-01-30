import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-24 sm:py-32">
      <div className="text-center animate-fadeIn">
        <p className="text-5xl font-bold text-indigo-600 drop-shadow-md">404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Oops! Page Not Found
        </h1>
        <p className="mt-6 text-lg text-gray-700 max-w-lg mx-auto">
          Sorry, the page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-indigo-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
