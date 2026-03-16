// src/pages/Builder.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EggViewer from "../components/EggViewer";
import OptionCard from "../components/OptionCard";
import Summary from "../components/Summary";

// Importando os novos dados
import {
  saboresCasca,
  tiposCasca,
  tiposOvo,
  recheios,
  coberturas,
  tamanhos,
} from "../data/options";

export default function Builder() {
  const [pedido, setPedido] = useState({
    saborCasca: "leite",
    tipoCasca: "lisa",
    tipoOvo: "colher",
    recheio: "brigadeiro",
    cobertura: "kitkat",
    tamanho: "300",
  });

  function select(categoria, id) {
    setPedido({ ...pedido, [categoria]: id });
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-[100dvh] bg-zinc-50 overflow-hidden relative">
      {/* Lado Esquerdo - Fixo com o Ovo 3D */}
      <div
        className="w-full h-[45dvh] lg:h-full lg:w-1/2 bg-zinc-950 flex-shrink-0 relative z-10"
      >
        <EggViewer pedido={pedido} />
      </div>

      {/* Lado Direito - Rolagem com as Opções */}
      <div
        className="w-full flex-1 lg:w-1/2 overflow-y-auto p-5 pb-32 lg:p-12 xl:p-20 lg:pb-40 bg-zinc-50 relative z-20 rounded-t-[2rem] -mt-8 lg:mt-0 lg:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.15)] lg:shadow-none"
      >
        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-medium mb-6 text-zinc-800">1. Sabor da Casca</h2>
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {saboresCasca.map((s) => (
              <OptionCard
                key={s.id}
                option={s}
                selected={pedido.saborCasca === s.id}
                onClick={() => select("saborCasca", s.id)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.1 }} className="mt-12">
          <h2 className="text-2xl font-medium mb-6 text-zinc-800">2. Textura da Casca</h2>
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {tiposCasca.map((t) => (
              <OptionCard
                key={t.id}
                option={t}
                selected={pedido.tipoCasca === t.id}
                onClick={() => select("tipoCasca", t.id)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12">
          <h2 className="text-2xl font-medium mb-6 text-zinc-800">3. Estilo do Ovo</h2>
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {tiposOvo.map((t) => (
              <OptionCard
                key={t.id}
                option={t}
                selected={pedido.tipoOvo === t.id}
                onClick={() => select("tipoOvo", t.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Recheios */}
        <AnimatePresence>
          {pedido.tipoOvo !== "tradicional" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }} 
              className="mt-12 overflow-hidden"
            >
              <h2 className="text-2xl font-medium mb-6 text-zinc-800">4. Escolha o Recheio</h2>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {recheios.map((r) => (
                  <OptionCard
                    key={r.id}
                    option={r}
                    selected={pedido.recheio === r.id}
                    onClick={() => select("recheio", r.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coberturas */}
        <AnimatePresence>
          {pedido.tipoOvo === "colher" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }} 
              className="mt-12 overflow-hidden"
            >
              <h2 className="text-2xl font-medium mb-6 text-zinc-800">5. Cobertura (Toppings)</h2>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {coberturas.map((c) => (
                  <OptionCard
                    key={c.id}
                    option={c}
                    selected={pedido.cobertura === c.id}
                    onClick={() => select("cobertura", c.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 border-t border-zinc-200 pt-12">
          <h2 className="text-2xl font-medium mb-6 text-zinc-800">Tamanho (Peso)</h2>
          <div className="flex flex-wrap gap-4">
            {tamanhos.map((t) => (
              <button
                key={t.id}
                onClick={() => select("tamanho", t.id)}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ease-out border-none ${
                  pedido.tamanho === t.id
                    ? "bg-zinc-900 text-white shadow-xl shadow-zinc-900/20 scale-105"
                    : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:ring-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {t.nome}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <Summary pedido={pedido} />
    </div>
  );
}
