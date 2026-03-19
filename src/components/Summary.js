// src/components/Summary.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getNomeOpcao, calcularPrecoTotal } from "../data/options";

export default function Summary({ pedido }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const precoTotal = calcularPrecoTotal(pedido);

  function handleAddToCart() {
    addToCart(pedido, precoTotal);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      {/* BACKDROP MOBILE */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* SUMMARY */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="
          fixed bottom-0 left-0 w-full 
          bg-white/80 backdrop-blur-md 
          rounded-t-[2.5rem] 
          p-5 md:p-6
          shadow-[0_-10px_40px_rgba(244,194,194,0.15)] 
          z-50 
          ring-1 ring-rose-100 
          flex flex-col

          min-h-[120px] md:min-h-[140px]

          lg:bottom-10 lg:right-10 lg:left-auto lg:w-96 
          lg:rounded-[2rem] lg:p-8 lg:shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between mb-4 lg:mb-6 lg:cursor-default cursor-pointer group"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-[#E5989B] w-5 h-5" />
              <h3 className="font-bold text-lg md:text-xl text-[#5A2C1D] leading-none mt-1">
                Seu Pedido
              </h3>
            </div>

            {!isExpanded && (
              <span className="text-[#8C7A70] text-sm mt-1 lg:hidden">
                R$ {precoTotal.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="lg:hidden bg-rose-50 p-2 rounded-full group-hover:bg-rose-100 transition-colors"
          >
            <ChevronUp className="w-4 h-4 text-[#E5989B]" />
          </motion.div>
        </div>

        {/* CONTEÚDO EXPANSÍVEL */}
        <div
          className={`
            transition-all duration-300 ease-in-out
            overflow-hidden lg:overflow-visible
            ${
              isExpanded
                ? "max-h-[50vh] opacity-100 mb-6"
                : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-8"
            }
          `}
        >
          <div className="bg-rose-50/30 rounded-2xl p-4 md:p-5 overflow-y-auto text-sm text-[#8C7A70] ring-1 ring-rose-100/50 max-h-[40vh] lg:max-h-[30vh]">
            {Object.entries(pedido).map(([key, value]) => {
              if (key === "recheio" && pedido.tipoOvo === "tradicional")
                return null;
              if (key === "cobertura" && pedido.tipoOvo !== "colher")
                return null;
              if (key === "kit" && pedido.tipoOvo === "tradicional")
                return null;

              return (
                <div
                  key={key}
                  className="flex justify-between py-2 border-b border-rose-100/50 last:border-0 hover:bg-white/40 transition-colors rounded-lg px-2"
                >
                  <span className="capitalize opacity-80 text-xs md:text-sm">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>

                  <span className="font-semibold text-[#5A2C1D] text-right text-xs md:text-sm">
                    {getNomeOpcao(key, value)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* TOTAL */}
          <div className="mt-5 md:mt-6 flex items-end justify-between px-1 md:px-2">
            <span className="text-[#8C7A70] text-sm md:text-base">
              Total Estimado
            </span>

            <span className="text-2xl md:text-3xl font-bold text-[#E5989B]">
              R$ {precoTotal.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col gap-2 md:gap-3">
          <motion.button
            key={added ? "added" : "not-added"}
            initial={added ? { scale: 0.95 } : { scale: 1 }}
            animate={
              added
                ? {
                    scale: [1, 1.1, 1],
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }
                : { scale: 1 }
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`
              w-full flex items-center justify-center gap-2 
              py-3 px-4 rounded-full font-bold 
              shadow-lg transition-all duration-300 
              text-base md:text-lg
              ${
                added
                  ? "bg-[#25D366] text-white shadow-green-200/50"
                  : "bg-[#E5989B] text-white shadow-rose-200/50 hover:bg-[#d88689]"
              }
            `}
          >
            {added ? (
              <>
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                Na cesta de ovos!
              </>
            ) : (
              <>Adicionar à cesta de ovos!</>
            )}
          </motion.button>

          {cart.length > 0 && (
            <button
              onClick={() => navigate("/checkout")}
              className="w-full flex items-center justify-center gap-2 text-[#E5989B] font-bold py-2 text-sm md:text-base hover:text-[#d88689] transition-colors group"
            >
              Ver cesta de ovos ({cart.length})
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}
