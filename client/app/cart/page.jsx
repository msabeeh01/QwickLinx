"use client";
import { CartContext } from "@/contexts/CartContext";
import { useContext, useEffect, useState } from "react";
const Cart = () => {
  const { cart } = useContext(CartContext);
  const [currentItem, setCurrentItem] = useState({});
  const [myCart, setMyCart] = useState([]);

  useEffect(() => {
    setMyCart(cart);
  }, []);

  return (
    <div className="flex min-h-screen flex-row justify-center w-full bg-gray-300 md:p-24">
      <div className="bg-white rounded-l-xl p-8 w-1/3 flex flex-col place-items-center justify-evenly overflow-hidden min-h-full">
        {/* ITEM */}
        {currentItem && (
          <>
            <div className="h-[400px] w-full">
              <img
                src={`https://picsum.photos/seed/${currentItem._id}/600`}
                className="rounded-lg h-full w-full object-cover"
                alt=""
              />
            </div>

            <div className="text-left w-full gap-4 flex flex-col">
              <h1 className="text-3xl font-bold">{currentItem.name}</h1>
              <p className="text-md">${currentItem.price}</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-r-xl p-8 w-2/3 border-l gap-2 flex flex-col min-h-full">
        <ul className="flex flex-col gap-4">
          {myCart &&
            myCart.map((item) => (
              <button
                className="bg-gray-200 w-full rounded p-4 flex gap-4 place-items-center justify-between"
                key={item._id}
                onClick={() => setCurrentItem(item)}
              >
                <div className="text-left">
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <div className="text-right">
                  <p>${item.price}</p>
                  <p className="text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </button>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
