"use client";

import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {register} = useContext(AuthContext)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between md:p-24">
      <form
        className="flex flex-col gap-4 bg-white p-8 rounded shadow"
        onSubmit={(e) => {
          e.preventDefault();
          register(email, password);
        //   redirect to /
            window.location.href = "/"
        }}
      >
        <h2 className="text-2xl font-bold">Register</h2>
        <input
          className="border rounded p-2"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="submit"
        >
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account? {" "}
          <a href="/" className="text-blue-500 underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
