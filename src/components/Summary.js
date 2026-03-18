import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { saboresCasca, tiposCasca, tiposOvo, recheios, coberturas, tamanhos } from "../data/options";

export default function Summary({ pedido }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  // Agrupa todas as opções para facilitar a busca do preço
  const allOptions = {
    saborCasca: saboresCasca,
    tipoCasca: tiposCasca,
    tipoOvo: tiposOvo,
    recheio: recheios,
    cobertura: coberturas,
    tamanho: tamanhos,
  };

  // Calcula o preço total iterando sobre o pedido atual
  const calcularTotal = () => {
    let total = 0;
    for (const [categoria, idSelecionado] of Object.entries(pedido)) {
      // Ignorar recheio se for tradicional
      if (categoria === "recheio" && pedido.tipoOvo === "tradicional") continue;
      // Ignorar cobertura se não for de colher
      if (categoria === "cobertura" && pedido.tipoOvo !== "colher") continue;

      if (allOptions[categoria]) {
        const opcao = allOptions[categoria].find(opt => opt.id === idSelecionado);
        if (opcao && opcao.preco) {
          total += opcao.preco;
        }
      }
    }
    return total;
  };

  const precoTotal = calcularTotal();

  // Encontra o nome bonitinho da opção selecionada para mostrar no UI/WPP
  const getNomeOpcao = (categoria, id) => {
    if (!allOptions[categoria]) return id;
    const opcao = allOptions[categoria].find(opt => opt.id === id);
    return opcao ? opcao.nome : id;
  };

  function handleAddToCart() {
    addToCart(pedido, precoTotal);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }


  return (
    <>
      {/* Overlay para fechar no mobile */}
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

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md rounded-t-[2.5rem] p-6 shadow-[0_-10px_40px_rgba(244,194,194,0.15)] z-50 
        lg:bottom-10 lg:right-10 lg:left-auto lg:w-96 lg:rounded-[2rem] lg:p-8 lg:shadow-2xl ring-1 ring-rose-100 flex flex-col"
      >
        {/* Cabeçalho mobile (clicável para expandir) / Fixo no desktop */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between mb-4 lg:mb-6 lg:cursor-default cursor-pointer group"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-[#E5989B] w-5 h-5" />
              <h3 className="font-bold text-xl text-[#5A2C1D] leading-none mt-1">Seu Pedido</h3>
            </div>
            {/* Mostrar o total resumido quando colapsado no mobile */}
            {!isExpanded && (
               <span className="text-[#8C7A70] text-sm mt-1 lg:hidden">
                 R$ {precoTotal.toFixed(2).replace('.', ',')}
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

        {/* Lista de Itens (Colapsável no mobile, sempre visível no desktop) */}
        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[50vh] opacity-100 mb-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-8 overflow-hidden lg:overflow-visible'}`}>
          <div className="bg-rose-50/30 rounded-2xl p-5 overflow-y-auto text-sm text-[#8C7A70] ring-1 ring-rose-100/50 max-h-[40vh] lg:max-h-[30vh]">
            {Object.entries(pedido).map(([key, value]) => {
              // Filtros de visibilidade para o resumo
              if (key === "recheio" && pedido.tipoOvo === "tradicional") return null;
              if (key === "cobertura" && pedido.tipoOvo !== "colher") return null;

              return (
                <div key={key} className="flex justify-between py-2 border-b border-rose-100/50 last:border-0 hover:bg-white/40 transition-colors rounded-lg px-2">
                  <span className="capitalize font-sans opacity-80">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-semibold text-[#5A2C1D] text-right">{getNomeOpcao(key, value)}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex items-end justify-between px-2">
            <span className="text-[#8C7A70] font-medium font-sans">Total Estimado</span>
            <span className="text-3xl font-bold text-[#E5989B]">
              R$ {precoTotal.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
        
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full font-bold shadow-lg transition-all duration-300 text-lg ${
              added 
                ? "bg-[#25D366] text-white shadow-green-200/50" 
                : "bg-[#E5989B] text-white shadow-rose-200/50 hover:bg-[#d88689]"
            }`}
          >
            
            {added ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Na cesta de ovos!
              </>
            ) : (
              <>
                <div className="w-6 h-6" />
                <img src="./cesta1.png" alt="" className="w-10 h-10 ml-[-28px]"/>
                Adicionar à cesta de ovos!
              </>
            )}
          </motion.button>

          {cart.length > 0 && (
            <button
              onClick={() => navigate("/checkout")}
              className="w-full flex items-center justify-center gap-2 text-[#E5989B] font-bold py-2 hover:text-[#d88689] transition-colors group"
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
