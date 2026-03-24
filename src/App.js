import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Checkout from "./pages/Checkout";
import BackgroundElevator from "./components/BackgroundElevator";

// 1. Importar o ErrorBoundary
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    /* 2. Envolver a aplicação inteira com o Error Boundary */
    <ErrorBoundary>
      <CartProvider>
        <BrowserRouter>
          <div className="relative min-h-screen flex flex-col font-sans text-stone-800 pb-[10%]">
            <BackgroundElevator />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  );
}
