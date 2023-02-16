import React, { useState } from "react";

import CartItem from "./CartItem";
import "./CartList.css";

const CartList = ({ cartItems, onRemoveHandler, onAddHandler, onDeleteHandler }) => {
  
  // controlling the cart by toggling it to be closed or open
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const inCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-obj">
      {!isEditing && (
        <>
          <div className="cart-item__total">Items In Cart: {inCart}</div>
          <button onClick={startEditingHandler}>Open Cart</button>
        </>
      )}

      {isEditing && (
        <div>
          {cartItems.map((myitem) => (
            <CartItem
              key={myitem.id}
              cartItems={myitem}
              onRemoveHandler={onRemoveHandler}
              onAddHandler={onAddHandler}
              onDeleteHandler={onDeleteHandler}
            />
          ))}
          <div className="cart-item__total">Total: ₪{subtotal.toFixed(2)}</div>
          <div className="cart-item__total">Items In Cart: {inCart}</div>
          <button onClick={stopEditingHandler}>Close </button>
        </div>
      )}
    </div>
  );
};

export default CartList;
