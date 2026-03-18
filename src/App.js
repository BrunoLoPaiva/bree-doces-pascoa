import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Checkout from "./pages/Checkout";
import BackgroundElevator from "./components/BackgroundElevator";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Adicionamos esta div principal para o Tailwind controlar o layout da página toda */}
        <div className="relative min-h-screen flex flex-col font-sans text-stone-800">
          
          {/* O fundo animado fica aqui, atrás de tudo */}
          <BackgroundElevator />
          
          {/* As rotas ficam em cima do fundo */}
          <Routes>          
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

        </div>
      </BrowserRouter>
    </CartProvider>
  );
}