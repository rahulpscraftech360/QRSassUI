import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <div className="flex flex-col min-h-[100vh] items-center justify-center gap-2 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
            404 Error
          </h1>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Oops! Page Not Found
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Sorry, we couldn't find the page you were looking for. We suggest
            you go back to the homepage.
          </p>
        </div>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="#"
        >
          Go to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
