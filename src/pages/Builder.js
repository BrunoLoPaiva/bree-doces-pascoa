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
    <div className="flex flex-col w-full min-h-[100dvh] bg-zinc-950 overflow-x-hidden relative text-zinc-100">
      {/* Background gradients similar to Hero */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,111,72,0.1),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(212,189,170,0.05),transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto p-6 md:p-12 lg:p-20 pb-40">
        <header className="mb-12 border-b border-zinc-900 pb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-100 to-orange-400 mb-4 drop-shadow-sm">
                Monte seu Ovo
            </h1>
            <p className="text-zinc-400 text-lg font-light tracking-wide">Personalize cada detalhe da sua experiência artesanal.</p>
        </header>

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-medium mb-6 text-zinc-200">1. Sabor da Casca</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.1 }} className="mt-16">
          <h2 className="text-2xl font-medium mb-6 text-zinc-200">2. Textura da Casca</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.2 }} className="mt-16">
          <h2 className="text-2xl font-medium mb-6 text-zinc-200">3. Estilo do Ovo</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
              className="mt-16 overflow-hidden"
            >
              <h2 className="text-2xl font-medium mb-6 text-zinc-200">4. Escolha o Recheio</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
              className="mt-16 overflow-hidden"
            >
              <h2 className="text-2xl font-medium mb-6 text-zinc-200">5. Cobertura (Toppings)</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.5, delay: 0.3 }} className="mt-16 border-t border-zinc-900 pt-16">
          <h2 className="text-2xl font-medium mb-6 text-zinc-200">Tamanho (Peso)</h2>
          <div className="flex flex-wrap gap-4">
            {tamanhos.map((t) => (
              <button
                key={t.id}
                onClick={() => select("tamanho", t.id)}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ease-out border-none ${
                  pedido.tamanho === t.id
                    ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20 scale-105"
                    : "bg-zinc-900 text-zinc-400 ring-1 ring-zinc-800 hover:ring-zinc-700 hover:bg-zinc-800"
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
