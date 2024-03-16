"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

async function Login(email, password) {
  // make call to api
  const res = await axios.post("http://127.0.0.1:3000/api/users/login", {
    email,
    password,
  });
  if (res.status !== 200) {
    throw new Error("Failed to login");
  }
  return res.data;
}

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  return (
    <form
      className="flex flex-col gap-4 bg-white p-8 rounded shadow"
      onSubmit={(e) => {
        e.preventDefault();
        login(username, password);
      }}
    >
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        className="border rounded p-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border rounded p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => console.log(username, password)}
      >
        Login
      </button>

      <p className="text-sm text-center">
        New to QwickLinx?{" "}
        <a href="/register" className="text-blue-500 underline">
          Register
        </a>
      </p>
    </form>
  );
};



export { LoginForm};
