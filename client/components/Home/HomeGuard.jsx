'use client'

import { AuthContext } from "@/contexts/AuthContext";
import ProductsGrid from "../Products/ProductsGrid";
import { Suspense, useContext } from "react";
import { LoginForm } from "../LoginForm";
const HomeGuard = ({ products }) => {

    if (!products) {
        return <div>Loading...</div>;
    }

    // auth context
    const {user} = useContext(AuthContext)

    if (!user) {
        return <LoginForm />
    }

    return (
          <Suspense fallback={<div>Loading...</div>}>
              <ProductsGrid products={products} />
          </Suspense>
      );
}


export default HomeGuard