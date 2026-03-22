// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const CART_KEY = 'bree_pascoa_cart';
const EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 horas

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedData = localStorage.getItem(CART_KEY);
      if (!savedData) return [];
      const { items, timestamp } = JSON.parse(savedData);
      if (!timestamp || Date.now() - timestamp > EXPIRATION_MS) {
        localStorage.removeItem(CART_KEY);
        return [];
      }
      return items || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify({ items: cart, timestamp: Date.now() }));
  }, [cart]);

  const addToCart = (pedido, precoTotal) => {
    setCart([...cart, { ...pedido, precoTotal, id: Date.now() }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCarrinho = cart.reduce((acc, item) => acc + item.precoTotal, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
