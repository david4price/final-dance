import React, { useState } from "react";
import Card from "../UI/Card";
import "./Product.css";
import ProductImage from "./ProductImage";
import "./extendedProduct.css";
import ExtendedProductImage from "./ExtendedProductImage";

const Product = ({ product, onAddToCart }) => {
  const [openProduct, setOpenProduct] = useState(false);

  const openProductHandler = () => {
    setOpenProduct(true);
  };

  const closeProductHandler = () => {
    setOpenProduct(false);
  };

  const [quantity] = useState(1);

  const productId = product.id;

  return (
    <>
      {!openProduct && (
        <Card className="product-item">
          <ProductImage image={product.image} />
          <div className="product-item__description">
            <h2>{product.name}</h2>
            <div className="product-item__description-container">
              <p>{product.description.substring(0, 63)}...</p>
              <button className="astext" onClick={openProductHandler}>
                More...
              </button>
            </div>
          </div>
          <div className="product-item__button-container-main">
            <div className="product-item__price">₪{product.price}</div>
            <div className="product-item__button-container">
              <button
                onClick={() => {
                  onAddToCart(productId, quantity);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </Card>
      )}
      {openProduct && (
        <Card className="ext-product-item">
          <ExtendedProductImage image={product.image} />
          <div className="ext-product-item__description">
            <h2>{product.name}</h2>
            <div className="ext-product-item__description-container">
              <p>{product.description}</p>
              <button className="astext" onClick={closeProductHandler}>
                ...Less
              </button>
            </div>
          </div>
          <div className="ext-product-item__button-container-main">
            <div className="ext-product-item__price">₪{product.price}</div>
            <div className="ext-product-item__button-container">
              <button
                onClick={() => {
                  onAddToCart(productId, quantity);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Product;
