import React, { useState } from "react";
import Product from "./Product";
import Card from "../UI/Card";
import './SearchBar.css'

const ProductsList = ({ products, onAddToCart }) => {
  // search bar that runs locally on the data recieved by the api
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <Card className="products">
        <ul className="products-list">
            <input
              type="search"
              name="q"
              placeholder="Search..."
              onChange={handleChange}
              value={searchInput}
            />
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchInput)
            )
            .map((product) => (
              <Product
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
        </ul>
      </Card>
    </div>
  );
};

export default ProductsList;
