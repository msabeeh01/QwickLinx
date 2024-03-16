"use client";
import axios from "axios";
import { Suspense, useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/CartContext";

const Quantity = ({
  quantity,
  setQuantity,
  cart,
  addToCart,
  removeFromCart,
  details,
}) => {
  return (
    <div className="w-full gap-2 flex justify-between flex-col">
      <div className="bg-white h-1/2 w-full overflow-hidden rounded-xl flex gap-4 place-items-center border">
        <button
          onClick={() => setQuantity(quantity - 1)}
          className="bg-gray-200 p-2 h-full hover:bg-gray-300"
        >
          -
        </button>
        <p className=" w-full text-center">{quantity}</p>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="bg-gray-200 p-2 h-full hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="w-full h-1/2">
        <button
          className="bg-yellow-300 rounded-lg h-full text-sm w-full p-2 hover:bg-yellow-400"
          onClick={() => addToCart({ ...details, quantity })}
        >
          Add to cart
        </button>
        <button onClick={() => console.log(cart)}>Check cart</button>
      </div>
    </div>
  );
};

const Carousel = ({ imgSrc, setImgSrc }) => {
  const setImg = (src) => {
    setImgSrc(src);
  };

  const Image = ({ src }) => {
    return (
      <img
        src={src}
        className="rounded-lg bg-gray-300 hover:scale-105 transition-all duration-200 cursor-pointer"
        alt=""
        onClick={() => setImg(src)}
      />
    );
  };

  return (
    <div className="grid grid-rows-1 grid-flow-col gap-4">
      {/* 5 for loop */}
      <Image src="https://picsum.photos/seed/pic1/200/300" />

      <Image src="https://picsum.photos/seed/pic2/200/300" />

      <Image src="https://picsum.photos/seed/pic3/200/300" />

      <Image src="https://picsum.photos/seed/pic4/200/300" />

      <Image src="https://picsum.photos/seed/pic5/200/300" />
    </div>
  );
};

function Page({ params }) {
  const [quantity, setQuantity] = useState(0);
  const [details, setDetails] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  // cart
  const { cart, removeFromCart, addToCart, getCart } = useContext(CartContext);

  useEffect(() => {
    fetchData();
  }, [params.productId]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://127.0.0.1:3000/api/products/${params.productId}`
    );
    const data = await res.data;
    setDetails(data);
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-row justify-center w-full bg-gray-300 md:p-24">
      <div className="bg-white rounded-l-xl p-8 w-1/3 flex flex-col place-items-center justify-evenly overflow-hidden min-h-full">
        {/* ITEM */}
        <div className="h-[400px] w-full">
          <img
            src={imgSrc || "https://picsum.photos/600"}
            className="rounded-lg h-full w-full object-cover"
            alt=""
          />
        </div>

        <div className="text-left w-full gap-4 flex flex-col">
          <h1 className="text-3xl font-bold">{details.name}</h1>
          <p className="text-md">${details.price}</p>
          <Quantity
            quantity={quantity}
            setQuantity={setQuantity}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            details={details}
          />
        </div>
      </div>

      <div className="bg-white rounded-r-xl p-8 w-2/3 border-l gap-2 flex flex-col min-h-full">
        <p>Description: {details.description}</p>
        <Carousel imgSrc={imgSrc} setImgSrc={setImgSrc} />
      </div>
    </div>
  );
}

export default Page;
