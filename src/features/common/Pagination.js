import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      {/* Mobile View */}
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          className="inline-flex items-center text-indigo-600 font-medium hover:underline hover:scale-110 cursor-pointer transition-all duration-300 ease-out"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
          Previous
        </div>
        <div
          onClick={() => handlePage(page < totalPages ? page + 1 : page)}
          className="inline-flex items-center text-indigo-600 font-medium hover:underline hover:scale-110 cursor-pointer transition-all duration-300 ease-out"
        >
          Next
          <ChevronRightIcon className="h-5 w-5 ml-1" aria-hidden="true" />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="inline-flex items-center space-x-3"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <div
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className={`flex items-center text-gray-500 hover:text-indigo-600 hover:scale-110 hover:shadow-lg cursor-pointer transition-all duration-300 ease-out ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </div>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                onClick={() => handlePage(index + 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 ease-out ${
                  index + 1 === page
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-110"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:text-indigo-600"
                } hover:shadow-md`}
              >
                {index + 1}
              </div>
            ))}

            {/* Next Button */}
            <div
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              className={`flex items-center text-gray-500 hover:text-indigo-600 hover:scale-110 hover:shadow-lg cursor-pointer transition-all duration-300 ease-out ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
