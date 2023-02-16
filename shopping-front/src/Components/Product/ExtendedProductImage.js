import React from "react";
import "./ExtendedProductImage.css"

const ExtendedProductImage = (product) => {
  return (
    <div className="ext-product-image">
      <img
        className="ext-small-image"
        src={"http://127.0.0.1:8000" + product.image}
        alt={product.name}
      />
    </div>
  );
};

export default ExtendedProductImage;
