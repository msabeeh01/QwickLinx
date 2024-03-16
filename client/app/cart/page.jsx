"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [currentItem, setCurrentItem] = useState({});
  const [myCart, setMyCart] = useState([]);
  const [address, setAddress] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setMyCart(cart);
  }, [cart]);

  const removeItem = (item_id) => {
    setCurrentItem({});
    removeFromCart(item_id);
  };

  const Checkout = async (e) => {
    e.preventDefault();
    // create an order here
    const token = user.token;
    const products = myCart;

    try {
      // send the order
      const res = await axios.post("http://127.0.0.1:3000/api/users/order", {
        token,
        address,
        products,
      });

      if (res.status !== 201) {
        throw new Error("Failed to create order");
      }

      // empty cart
      setMyCart([]);

      // redirect
      window.location.href = "/orders";

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row justify-center w-full bg-gray-300 md:p-24">
      <div className="bg-white rounded-l-xl p-8 w-full md:w-1/3 flex flex-col place-items-center justify-evenly overflow-hidden min-h-full">
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

      <div className="bg-white rounded-r-xl justify-between p-8 w-full md:w-2/3 border-l gap-2 flex flex-col min-h-full">
        <ul className="flex flex-col gap-4 h-[80%] overflow-y-scroll p-4">
          {myCart &&
            myCart.map((item) => (
              <div
                className="bg-gray-200 w-full rounded relative"
                key={item._id}
              >
                <button
                  className="absolute -top-3 -left-2 rounded-full flex items-center bg-white shadow justify-center"
                  onClick={() => removeItem(item._id)}
                >
                  <MdCancel color="red" size={30} />
                </button>

                <div
                  className="flex gap-4 justify-between p-4 cursor-pointer hover:bg-gray-300 rounded"
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
                </div>
              </div>
            ))}
        </ul>

        <div className="p-4 flex flex-col gap-4 flex-grow">
          <p className="text-xl font-bold">
            Total: ${myCart.reduce((a, b) => a + b.price, 0)}
          </p>
          <form
            onSubmit={(e) => {
              Checkout(e);
            }}
          >
            <input
              type="text"
              placeholder="Address"
              className="p-2 rounded-lg border"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button
              className="bg-yellow-300 rounded-lg h-full text-sm w-full p-2 hover:bg-yellow-400"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
