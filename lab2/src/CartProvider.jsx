import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const API = 'http://localhost:9999';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from json-server "carts" table
  const reloadCart = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/carts`);
      setCart(res.data || []);
    } catch (err) {
      console.error('Cannot load cart', err);
    }
  }, []);

  useEffect(() => {
    reloadCart();
  }, [reloadCart]);

  // Total quantity for badge on Menu
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Add a product to cart (increase quantity if exists)
  const addToCart = async (product) => {
    const existing = cart.find((c) => c.id === product.id);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + 1 };
      await axios.put(`${API}/carts/${existing.id}`, updated);
    } else {
      const newItem = {
        id: product.id, // use product id as cart row id for simplicity
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      };
      await axios.post(`${API}/carts`, newItem);
    }
    await reloadCart();
  };

  const updateQuantity = async (cartId, newQty) => {
    if (newQty <= 0) {
      await removeFromCart(cartId);
      return;
    }
    const item = cart.find((c) => c.id === cartId);
    if (!item) return;
    await axios.put(`${API}/carts/${cartId}`, { ...item, quantity: newQty });
    await reloadCart();
  };

  const removeFromCart = async (cartId) => {
    await axios.delete(`${API}/carts/${cartId}`);
    await reloadCart();
  };

  const clearCart = async () => {
    await Promise.all(cart.map((item) => axios.delete(`${API}/carts/${item.id}`)));
    await reloadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        reloadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
