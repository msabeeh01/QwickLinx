import ProductsGrid from "@/components/Products/ProductsGrid";
import Image from "next/image";

// test products, name, price, description
const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$10",
    description: "This is product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$20",
    description: "This is product 2",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$30",
    description: "This is product 3",
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductsGrid products={products}/>
    </main>
  );
}
