import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/builder" element={<Builder />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
