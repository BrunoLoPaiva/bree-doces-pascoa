// src/pages/Builder.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptionCard from "../components/OptionCard";
import Summary from "../components/Summary";

import {
  saboresCasca,
  tiposCasca,
  tiposOvo,
  recheios,
  coberturas,
  tamanhos,
  kits,
  tabelaRecheios,
} from "../data/options";

export default function Builder() {
  const [pedido, setPedido] = useState({
    tamanho: "150",
    saborCasca: "leite",
    tipoCasca: "lisa",
    tipoOvo: "colher",
    kit: "unidade",
    recheio: "brigadeiro",
    cobertura: "kitkat",
  });

  function select(categoria, id) {
    setPedido((prev) => {
      const next = { ...prev, [categoria]: id };

      if (
        categoria === "tamanho" &&
        id === "50" &&
        next.tipoOvo === "trufado"
      ) {
        next.tipoOvo = "colher";
      }

      if (
        categoria === "tamanho" &&
        (id === "350" || id === "500") &&
        next.kit !== "unidade"
      ) {
        next.kit = "unidade";
      }

      return next;
    });
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  // ==========================================
  // LÓGICA DE NUMERAÇÃO DINÂMICA
  // ==========================================
  let stepCounter = 1;
  const stepTamanho = stepCounter++;
  const stepEstilo = stepCounter++;

  const showKit =
    pedido.tipoOvo !== "tradicional" &&
    !["350", "500"].includes(pedido.tamanho);
  const stepKit = showKit ? stepCounter++ : null;

  const stepSabor = stepCounter++;
  const stepTextura = stepCounter++;

  const showRecheio = pedido.tipoOvo !== "tradicional";
  const stepRecheio = showRecheio ? stepCounter++ : null;

  const showCobertura = pedido.tipoOvo === "colher";
  const stepCobertura = showCobertura ? stepCounter++ : null;

  return (
    <div className="flex flex-col w-full min-h-[100dvh] overflow-x-hidden relative text-[#5A2C1D]">
      {/* BG FIX (evita overflow lateral em mobile) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,194,194,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(229,152,155,0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pb-[calc(160px+env(safe-area-inset-bottom))]">
        {/* HEADER */}
        <header className="mb-12 md:mb-16 border-b border-rose-100 pb-8 md:pb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6">
            Monte seu Ovo
          </h1>
          <p className="text-[#8C7A70] text-base sm:text-lg md:text-xl font-light max-w-xl leading-relaxed">
            Crie uma experiência artesanal única, personalizada detalhe por
            detalhe.
          </p>
        </header>

        {/* TAMANHO */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.4 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            {stepTamanho}. Tamanho (Peso base)
          </h2>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {tamanhos.map((t) => (
              <button
                key={t.id}
                onClick={() => select("tamanho", t.id)}
                className={`
                  px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold
                  transition-all duration-200 text-sm md:text-base
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5989B]
                  active:scale-95
                  ${
                    pedido.tamanho === t.id
                      ? "bg-[#E5989B] text-white shadow-lg scale-[1.03]"
                      : "bg-white text-[#8C7A70] ring-1 ring-rose-100 hover:bg-rose-50"
                  }
                  flex flex-col items-center justify-center
                `}
              >
                <span>{t.nome}</span>
                <span
                  className={`text-xs mt-1 ${pedido.tamanho === t.id ? "text-white/90" : "text-[#8C7A70]/70"}`}
                >
                  R$ {t.baseLisa.toFixed(2).replace(".", ",")}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* TIPO OVO */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mt-16 md:mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            {stepEstilo}. Estilo do Ovo
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tiposOvo.map((t) => {
              if (t.id === "trufado" && pedido.tamanho === "50") return null;

              return (
                <OptionCard
                  key={t.id}
                  option={t}
                  selected={pedido.tipoOvo === t.id}
                  onClick={() => select("tipoOvo", t.id)}
                />
              );
            })}
          </div>
        </motion.div>

        {/* KIT */}
        <AnimatePresence>
          {showKit && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-16 md:mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {stepKit}. Kit (Ovos na mesma caixa)
              </h2>

              <p className="text-[#8C7A70] mb-6 md:mb-8 text-sm md:text-base">
                Os ovos serão enviados juntos na mesma embalagem especial.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                {kits.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => select("kit", k.id)}
                    className={`
                      px-5 md:px-6 py-3 rounded-full font-semibold
                      transition-all duration-200 text-sm md:text-base
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5989B]
                      active:scale-95
                      ${
                        pedido.kit === k.id
                          ? "bg-[#E5989B] text-white shadow-lg scale-[1.03]"
                          : "bg-white text-[#8C7A70] ring-1 ring-rose-100 hover:bg-rose-50"
                      }
                    `}
                  >
                    {k.nome}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GRID SECTIONS PADRÃO (Sabor e Textura) */}
        {[
          {
            title: `${stepSabor}. Sabor da Casca`,
            data: saboresCasca,
            key: "saborCasca",
          },
          {
            title: `${stepTextura}. Textura da Casca`,
            data: tiposCasca.map((tc) => {
              if (tc.id === "crocante") {
                const tamAtual = tamanhos.find((t) => t.id === pedido.tamanho);
                return { ...tc, preco: tamAtual ? tamAtual.adcCrocante : 0 };
              }
              return tc;
            }),
            key: "tipoCasca",
          },
        ].map((section) => (
          <motion.div
            key={section.key}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="mt-16 md:mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
              {section.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {section.data.map((item) => (
                <OptionCard
                  key={item.id}
                  option={item}
                  selected={pedido[section.key] === item.id}
                  onClick={() => select(section.key, item.id)}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* RECHEIO */}
        <AnimatePresence>
          {showRecheio ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-16 md:mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                {stepRecheio}. Escolha o Recheio
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {recheios.map((r) => {
                  const valRecheio =
                    tabelaRecheios[r.categoria]?.[pedido.tamanho]?.[
                      pedido.tipoOvo
                    ] || 0;

                  return (
                    <OptionCard
                      key={r.id}
                      option={{ ...r, preco: valRecheio }}
                      selected={pedido.recheio === r.id}
                      onClick={() => select("recheio", r.id)}
                    />
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 p-5 md:p-6 bg-rose-50 rounded-2xl border border-rose-100 text-[#8C7A70] text-sm md:text-base"
            >
              ✨ Ovos Tradicionais acompanham mini trufas de brigadeiro.
            </motion.div>
          )}
        </AnimatePresence>

        {/* COBERTURA */}
        <AnimatePresence>
          {showCobertura && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-16 md:mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                {stepCobertura}. Cobertura (Toppers)
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-[10%]">
                {coberturas.map((c) => {
                  const valCobertura = c.precos[pedido.tamanho] || 0;

                  return (
                    <OptionCard
                      key={c.id}
                      option={{ ...c, preco: valCobertura }}
                      selected={pedido.cobertura === c.id}
                      onClick={() => select("cobertura", c.id)}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Summary pedido={pedido} />
    </div>
  );
}
