import { useEffect, useState, Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./Components/utils/PrivateRoutes";

import ProductsList from "./Components/Product/ProductsList";
import "./App.css";
import CartList from "./Components/Cart_VOL_2/CartList";
import NewProduct from "./Components/NewProduct/NewProduct";

import Header from "./Components/Header/Header";
import MyHeader from "./Components/Header/MyHeader";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // promise
    // async await
    const getProducts = () => {
      fetch("http://localhost:8000/api/products/")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    getProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // promise
    // async await
    const getCartItems = () => {
      fetch("http://localhost:8000/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  }, []);

  const addProductHandler = async (product) => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);

    const res = await fetch("http://localhost:8000/api/products/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setProducts([...products, data]);
  };

  const addToCartHandler = async (productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart-items/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productId, quantity: quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("http://localhost:8000/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  const onRemoveHandler = async (productId, quantity) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart-items/${productId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to remove from cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("http://localhost:8000/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  const onAddHandler = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart-items-add/${productId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to remove from cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("http://localhost:8000/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  const onDeleteHandler = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart-items/${productId}/`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: productId }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to remove from cart!");
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart);
    } catch (err) {
      console.error(err);
    }
    const getCartItems = () => {
      fetch("http://localhost:8000/api/cart-items/")
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    };
    getCartItems();
  };

  return (
    <BrowserRouter>
        <Fragment>
          <div className="App">
            {/* <Header /> */}
            <Routes>
              <Route
              path="/"
              element={
                <>
                  <MyHeader />
                  <CartList
                    cartItems={cartItems}
                    onRemoveHandler={onRemoveHandler}
                    onAddHandler={onAddHandler}
                    onDeleteHandler={onDeleteHandler}
                  />
                  <ProductsList
                    className="products"
                    products={products}
                    onAddToCart={addToCartHandler}
                  />
                  <NewProduct onAddProduct={addProductHandler} />
                </>
              }
            />
              {/* <Route element={<PrivateRoutes />}>
                <Route
                  path="/"
                  element={
                    <>
                      <CartList
                        cartItems={cartItems}
                        onRemoveHandler={onRemoveHandler}
                      />
                      <ProductsList
                        className="products"
                        products={products}
                        onAddToCart={addToCartHandler}
                      />
                      <NewProduct onAddProduct={addProductHandler} />
                    </>
                  }
                />
              </Route> */}
              {/* <Route path="/login" element={<LoginPage />} exact /> */}
            </Routes>
          </div>
        </Fragment>
    </BrowserRouter>
    // <div>
    //   {/* <Cart myCartItems={cartItems} /> */}
    //   <CartList cartItems={cartItems} />
    //   {/* <NewExpense /> */}
    //   <ProductsList products={products} />
    // </div>
  );
}

export default App;
