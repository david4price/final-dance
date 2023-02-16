import React, { useState } from "react";

import "./NewProduct.css";
import NewProductForm from "./NewProductForm";

const NewProduct = (props) => {

  // toggoling the from to be open or closed
  const [isEditing, setIsEditing] = useState(false);

  const saveProductDataHandler = async (enteredProductData) => {
    const productData = {
      ...enteredProductData,
      id: Math.random().toString(),
    };
    props.onAddProduct(productData);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-product">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Product</button>
      )}
      {isEditing && (
        <NewProductForm
          onSaveProductData={saveProductDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewProduct;
