import React from "react";
import "./ProductImage.css"

const ProductImage = (product) => {
  return (
    <div className="product-image">
      <img
        className="small-image"
        src={"http://127.0.0.1:8000" + product.image}
        alt={product.name}
      />
    </div>
  );
};

export default ProductImage;
