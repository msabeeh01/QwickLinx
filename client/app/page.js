import { LoginForm } from "@/components/LoginForm";
import ProductsGrid from "@/components/Products/ProductsGrid";
import axios from "axios";
import { Suspense, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import HomeGuard from "@/components/Home/HomeGuard";


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
      <HomeGuard products={products}/>
    </main>
  );
}
