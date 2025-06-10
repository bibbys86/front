import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from "./Success";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/headphones").then(res => setItems(res.data));
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>🎧 Headphone Shop</h1>
        <nav>
          <Link to="/">상품목록</Link> | <Link to="/cart">장바구니</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <div>
              {items.map(item => (
                <div key={item.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
                  <img src={item.imageUrl} alt={item.model} width="150" />
                  <h3>{item.brand} {item.model}</h3>
                  <p>{item.price.toLocaleString()}원</p>
                  <button onClick={() => addToCart(item)}>장바구니 담기</button>
                </div>
              ))}
            </div>
          } />
          <Route path="/cart" element={<Cart cart={cart} remove={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
