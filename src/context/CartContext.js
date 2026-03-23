import React, { createContext, useContext, useState, useEffect } from "react";
import { calcularPrecoTotal } from "../data/options";

const CartContext = createContext();
const CART_KEY = "bree_pascoa_cart";
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
    localStorage.setItem(
      CART_KEY,
      JSON.stringify({ items: cart, timestamp: Date.now() }),
    );
  }, [cart]);

  const addToCart = (pedido, precoTotal) => {
    const generateId = () =>
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    setCart((prev) => [
      ...prev,
      { ...pedido, precoTotal, id: generateId(), quantity: 1 },
    ]);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, (item.quantity || 1) + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCarrinho = cart.reduce((acc, item) => {
    return acc + calcularPrecoTotal(item) * (item.quantity || 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
