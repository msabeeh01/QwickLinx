"use client";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = window.localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  // add item to cart
  const addToCart = (item) => {
    // check if item is already in cart, if it is just add quantity
    if (cart.some((i) => i._id === item._id)) {
      const newCart = cart.map((i) => {
        if (i._id === item._id) {
          i.quantity += item.quantity;
        }
        return i;
      });
    } else {
      // Add the item to the cart state
      setCart((prevCart) => [...prevCart, item]);
    }

    // Also add the item to local storage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    currentCart.push(item);
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  const getCart = () => {
    // Get the cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cart);
  };

  // remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item._id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};
