import React from "react";
import { useState, useRef } from "react";
import "./NewProductForm.css";

const NewProductForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const [enteredDescription, setEnteredDescription] = useState("");
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const [enteredPrice, setEnteredPrice] = useState("");
  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const fileInputRef = useRef();

  const [enteredImage, setEnteredImage] = useState(null);
  const imageChangeHandler = (event) => {
    // setEnteredImage(event.target.files[0]);
    setEnteredImage(fileInputRef.current.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const productData = {
      name: enteredName,
      description: enteredDescription,
      price: +enteredPrice,
      image: enteredImage,
    };
    props.onSaveProductData(productData);
    setEnteredName("");
    setEnteredDescription("");
    setEnteredPrice("");
    setEnteredImage(null);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-product__controls">
        <div className="new-product__control">
          <label>Product Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameChangeHandler}
          />
        </div>
        <div className="new-product__control">
          <label>Description</label>
          <input
            type="text"
            id="descrip"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className="new-product__control">
          <label>Price</label>
          <input
            type="number"
            id="price"
            min="0.01"
            step="0.01"
            value={enteredPrice}
            onChange={priceChangeHandler}
          />
        </div>
        <div className="new-product__control">
          <label>Image</label>
          <input
            ref={fileInputRef}
            type="file"
            id="image"
            onChange={imageChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Product</button>
      </div>
    </form>
  );
};

export default NewProductForm;
