import React from "react";
import ProductForm from "./product-form";

const Product = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-2xl mb-5">Product Page</h1>
        <ProductForm />
      </div>
    </div>
  );
};

export default Product;
