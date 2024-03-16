"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
const Order = () => {
  const { user } = useContext(AuthContext);
  // fetch orders via user.token
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/api/users/orders", {
        headers: { token: user.token },
      });
      console.log(res.data.orders.orders);
      setEmail(res.data.orders.email);
      setOrders(res.data.orders.orders);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (order_id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:3000/api/users/del/${order_id}`,
        {
          headers: { token: user.token },
        }
      );
      console.log(res.data);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row justify-center w-full bg-gray-300 md:p-24">
      <div className="bg-white rounded-xl justify-between p-8 w-full md:w-2/3 border-l gap-2 flex flex-col min-h-full">
        <ul className="flex flex-col gap-4  p-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="flex flex-col relative gap-4 bg-gray-200 p-4 rounded-xl"
            >
              <button
                className="absolute -top-3 bg-white rounded-full shadow -left-3"
                onClick={() => deleteOrder(order._id)}
              >
                <MdCancel className="text-3xl text-red-600" />
              </button>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">Order ID: {order._id}</p>
                <p className="font-bold text-gray-500">
                  Address: {order.address}
                </p>
                <p className="font-bold text-gray-500">Email: {email}</p>
                <p className="font-bold text-gray-500 flex gap-1">
                  Status: <p className="text-green-500">Order Placed</p>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {order.products.map((product) => (
                  <div
                    key={product}
                    className="flex flex-col gap-4 bg-gray-300 p-4 rounded-xl"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-xl font-bold">Product ID: {product}</p>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;
