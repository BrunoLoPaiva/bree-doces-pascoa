// src/pages/Builder.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="flex flex-col w-full min-h-[100dvh] overflow-x-hidden relative text-[#5A2C1D]">
      {/* Background gradients for a soft delicate look */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,194,194,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(229,152,155,0.05),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto p-6 md:p-12 lg:p-20 pb-40">
        <header className="mb-16 border-b border-rose-100 pb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#5A2C1D] mb-6">
                Monte seu Ovo
            </h1>
            <p className="text-[#8C7A70] text-xl font-light tracking-wide max-w-xl">Crie uma experiência artesanal única, personalizada detalhe por detalhe com carinho.</p>
        </header>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#5A2C1D]">1. Tamanho (Peso)</h2>
          <div className="flex flex-wrap gap-4">
            {tamanhos.map((t) => (
              <button
                key={t.id}
                onClick={() => select("tamanho", t.id)}
                className={`px-10 py-4 rounded-full font-bold transition-all duration-300 ease-out border-none text-lg ${
                  pedido.tamanho === t.id
                    ? "bg-[#E5989B] text-white shadow-xl shadow-rose-200/50 scale-105"
                    : "bg-white text-[#8C7A70] ring-1 ring-rose-100 hover:ring-rose-200 hover:bg-rose-50/50 shadow-sm"
                }`}
              >
                {t.nome}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.1 }}>
          <h2 className="text-3xl font-bold mb-8 text-[#5A2C1D]">2. Sabor da Casca</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.2 }} className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-[#5A2C1D]">3. Textura da Casca</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.3 }} className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-[#5A2C1D]">4. Estilo do Ovo</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
              className="mt-20 overflow-hidden"
            >
              <h2 className="text-3xl font-bold mb-8 text-[#5A2C1D]">5. Escolha o Recheio</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
              className="mt-20 overflow-hidden"
            >
              <h2 className="text-3xl font-bold mb-8 text-[#5A2C1D]">6. Cobertura (Toppings)</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
      </div>

      <Summary pedido={pedido} />
    </div>
  );
}

