import React, { useState } from "react";
import Card from "../UI/Card";
import "./CartItem.css";
import "./CartImage.css";
import "./extendedCartProduct.css";

const CartItem = ({ cartItems, onRemoveHandler }) => {
  const [openProduct, setOpenProduct] = useState(false);

  const openProductHandler = () => {
    setOpenProduct(true);
  };

  const closeProductHandler = () => {
    setOpenProduct(false);
  };

  const productId = cartItems.id;
  console.log(productId);

  // const [quantity] = useState(1)

  const total = cartItems.product.price * cartItems.quantity;

  return (
    <>
      {!openProduct && (
        <Card className="cart-item">
          <div className="product-image-cart">
            <img
              className="small-image"
              src={"http://127.0.0.1:8000" + cartItems.product.image}
              alt={cartItems.product.name}
            />
          </div>
          <div className="cart-item__description">
            <h2>{cartItems.product.name}</h2>
            <button className="astext" onClick={openProductHandler}>
              More...
            </button>
          </div>
          <div className="cart-item__button-container-main">
            <div className="cart-item__price">₪{cartItems.product.price}</div>
            <div className="cart-item__total-price">
              Total: ₪{total.toFixed(2)}
            </div>
            <div className="cart-item__quantity">{cartItems.quantity}</div>
            <button
              className="cart-item__remove-btn"
              onClick={() => {
                onRemoveHandler(productId);
              }}
            >
              REMOVE
            </button>
          </div>
        </Card>
      )}
      {openProduct && (
        <Card className="ext-cart-item">
          <div className="product-image-cart">
            <img
              className="small-image"
              src={"http://127.0.0.1:8000" + cartItems.product.image}
              alt={cartItems.product.name}
            />
          </div>
          <div className="cart-item__description">
            <h2>{cartItems.product.name}</h2>
            <button className="astext" onClick={closeProductHandler}>
              More...
            </button>
          </div>
          <div className="cart-item__button-container-main">
            <div className="cart-item__price">₪{cartItems.product.price}</div>
            <div className="cart-item__total-price">
              Total: ₪{total.toFixed(2)}
            </div>
            <div className="cart-item__quantity">{cartItems.quantity}</div>
            <button
              className="cart-item__add-btn-sm"
              onClick={() => {
                onRemoveHandler(productId);
              }}
            >
              +
            </button>
            <button
              className="cart-item__remove-btn-sm"
              onClick={() => {
                onRemoveHandler(productId);
              }}
            >
              -
            </button>
          </div>
        </Card>
      )}
    </>
  );
};

export default CartItem;
