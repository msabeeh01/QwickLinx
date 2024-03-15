"use client";

import { Suspense } from "react";
import { FaStar } from "react-icons/fa6";

const Product = ({ product }) => {
  return (
    <div
      className="flex flex-col justify-evenly p-4 w-96 h-[550px] bg-base-100 shadow-xl hover:scale-105 transition-all duration-200 rounded-lg"
      onClick={() => (window.location.href = `/product/${product._id}`)}
    >
      <figure className="h-full bg-gray-200 rounded-t-md overflow-y-hidden">
        <Suspense fallback={<div className="text-black">Loading...</div>}>
          <img
            src="https://picsum.photos/200/300"
            alt="Shoes"
            className="rounded-xl object-cover w-full "
          />
        </Suspense>
      </figure>
      <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-b-md text-justify">
        <div className="h-full">
          <p className="text-sm font-bold">{product.name}</p>
          <p className="text-sm">{product.price}</p>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-sm text-gray-500 flex gap-2 place-items-center">
            <FaStar color="orange" />
            {product.rating}
          </p>
        </div>
        {/* <div className="flex flex-row gap-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Product;
