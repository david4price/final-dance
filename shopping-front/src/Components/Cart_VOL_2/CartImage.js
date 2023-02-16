import React from "react";
import "./CartImage.css"

const ProductImage = (cartItems) => {
  return (
    <div className="product-image">
      <img
        className="small-image"
        src={"http://127.0.0.1:8000" + cartItems.product.image}
        alt={product.name}
      />
    </div>
  );
};

export default ProductImage;
