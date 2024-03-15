'use client';
import { Suspense } from "react";
import Product from "./Product";
import { useState } from "react";

const ProductsGrid = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden w-full flex justify-center">
        {/* search bar */}
        <input type="text" className="p-2 w-96" placeholder="Search by name..." onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProducts &&
          filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
