import ProductsGrid from "@/components/Products/ProductsGrid";
import Image from "next/image";
import axios from "axios";
import { Suspense } from "react";

async function fetchData() {
  const res = await axios.get("http://127.0.0.1:3000/api/products/");
  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const products = await res.data;
  return products;
}

export default async function Home() {
  const products = await fetchData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsGrid products={products} />
      </Suspense>
    </main>
  );
}
