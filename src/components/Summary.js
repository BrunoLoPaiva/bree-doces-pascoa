import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CheckCircle2, ChevronUp } from "lucide-react";
import { saboresCasca, tiposCasca, tiposOvo, recheios, coberturas, tamanhos } from "../data/options";

export default function Summary({ pedido }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const whatsapp = "5514996917274";

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

  function finalizar() {
    let msg = "Olá! Montei meu ovo de páscoa artesanal:\n\n";
    for (let k in pedido) {
      const nomeCategoria = k.replace(/([A-Z])/g, ' $1').trim();
      const nomeOpcao = getNomeOpcao(k, pedido[k]);
      msg += `• ${nomeCategoria.charAt(0).toUpperCase() + nomeCategoria.slice(1)}: ${nomeOpcao}\n`;
    }
    msg += `\n*Total estimado: R$ ${precoTotal.toFixed(2).replace('.', ',')}*`;
    
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`);
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
        className="fixed bottom-0 left-0 w-full bg-zinc-900 lg:bg-zinc-900/90 lg:backdrop-blur-md rounded-t-3xl p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-50 
        lg:bottom-10 lg:right-10 lg:left-auto lg:w-80 lg:rounded-3xl lg:p-6 lg:shadow-2xl ring-1 ring-zinc-800 flex flex-col"
      >
        {/* Cabeçalho mobile (clicável para expandir) / Fixo no desktop */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between mb-4 lg:mb-4 lg:cursor-default cursor-pointer group"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-orange-500 w-5 h-5" />
              <h3 className="font-semibold text-lg text-zinc-100 leading-none mt-0.5">Seu Pedido</h3>
            </div>
            {/* Mostrar o total resumido quando colapsado no mobile */}
            {!isExpanded && (
               <span className="text-zinc-400 text-sm mt-1 lg:hidden">
                 R$ {precoTotal.toFixed(2).replace('.', ',')}
               </span>
            )}
          </div>
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }} 
            className="lg:hidden bg-zinc-800 p-1.5 rounded-full group-hover:bg-zinc-700 transition-colors"
          >
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          </motion.div>
        </div>

        {/* Lista de Itens (Colapsável no mobile, sempre visível no desktop) */}
        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[50vh] opacity-100 mb-6' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:mb-6 overflow-hidden lg:overflow-visible'}`}>
          <div className="bg-zinc-800/50 rounded-xl p-4 overflow-y-auto text-sm text-zinc-400 ring-1 ring-zinc-800 max-h-[40vh] lg:max-h-[25vh]">
            {Object.entries(pedido).map(([key, value]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-zinc-800 last:border-0 hover:bg-zinc-800 transition-colors rounded-sm px-1">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium text-zinc-100 text-right">{getNomeOpcao(key, value)}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-end justify-between px-1">
            <span className="text-zinc-400 font-medium">Total Estimado</span>
            <span className="text-2xl font-bold text-orange-400">
              R$ {precoTotal.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={finalizar}
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-6 rounded-2xl font-medium shadow-lg shadow-green-600/20 hover:bg-[#128C7E] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Finalizar Pedido
        </motion.button>
      </motion.div>
    </>
  );
}
