// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { calcularPrecoTotal } from '../data/options';

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
    // Usar functional updater para evitar stale closure — sempre usa o estado mais recente
    setCart((prev) => [...prev, { ...pedido, precoTotal, id: Date.now() }]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Recalcular o total dinamicamente para evitar preço armazenado desatualizado
  const totalCarrinho = cart.reduce((acc, item) => {
    const precoCalculado = calcularPrecoTotal(item);
    // Fallback: se o cálculo retornar 0 mas há precoTotal armazenado, usar o armazenado
    return acc + (precoCalculado > 0 ? precoCalculado : (item.precoTotal || 0));
  }, 0);

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
