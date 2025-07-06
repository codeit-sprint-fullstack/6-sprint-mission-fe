import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-7xl font-extrabold">404</h1>
          <p className="mt-6 text-2xl font-medium">Oops! Page not found</p>
          <p className="mt-4 mb-8 text-base">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-black px-6 py-2 font-semibold text-white transition hover:bg-gray-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
