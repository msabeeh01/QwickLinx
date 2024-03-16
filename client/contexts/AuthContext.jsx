"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const login = async (email, password) => {
    try {
      // make call to api
      const res = await axios.post("http://127.0.0.1:3000/api/users/login", {
        email,
        password,
      });

      if (res.status !== 200) {
        throw new Error("Failed to login");
      }

      const user = res.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (email, password) => {
    try {
      // make call to api
      const res = await axios.post("http://127.0.0.1:3000/api/users/register", {
        email,
        password,
      });

      if (res.status !== 201) {
        throw new Error("Failed to register");
      }

      const user = res.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout,register }}>
      {children}
    </AuthContext.Provider>
  );
};
