import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-#001529">
      <img
        src="404_NotFound.png"
        alt="404_NotFound"
        className="max-w-full mb-6 w-96"
      />
      <p className="text-4xl font-bold">Not Found Data</p>
      <a
        href="/"
        className="inline-block px-6 py-3 font-medium text-white rounded-xl transition shadow-md bg-blue-500 hover:bg-blue-700"
      >
        Back Home Page
      </a>
    </div>
  );
}

export default NotFound;
