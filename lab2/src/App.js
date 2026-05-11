import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CartProvider } from './CartProvider';
import Menu from './components/Menu';
import Home from './components/Home';
import Product from './components/Product';
import Detail from './components/Detail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

import './styles.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Menu />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/make-up" element={<Product />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
