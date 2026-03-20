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

// Mapeamento sequencial: recheio -> cobertura sugerida
const coberturaSequencial = {
  brigadeiro: "kinder",
  beijinho: "morango",
  pacoca: "amendoin",
  dois_amores: "confete",
  ninho_nutella: "nutella",
  maracuja: "ovomaltine",
  sensacao: "oreo",
};

function criarOvoInicial() {
  return { saborCasca: null, tipoCasca: null, recheio: null, cobertura: null };
}

function sincronizarOvos(ovosAtuais, novoMult) {
  const novosOvos = [];
  for (let i = 0; i < novoMult; i++) {
    // Preserva ovo já configurado, mas não auto-preenche novos
    novosOvos.push(ovosAtuais[i] || criarOvoInicial());
  }
  return novosOvos;
}

// Retorna se um ovo está completamente configurado
function ovoCompleto(ovo, tipoOvo) {
  if (!ovo.saborCasca) return false;
  if (!ovo.tipoCasca) return false;
  if (tipoOvo === "tradicional") return true; // Tradicional só tem casca/sabor
  if (!ovo.recheio) return false;
  if (tipoOvo === "colher" && !ovo.cobertura) return false;
  return true;
}

export default function Builder() {
  const [pedido, setPedido] = useState({
    tamanho: "150",
    tipoOvo: "colher",
    kit: "unidade",
    ovoAtivo: 0,
    ovos: [criarOvoInicial()],
  });

  function select(categoria, id) {
    setPedido((prev) => {
      const next = { ...prev, [categoria]: id };

      // Ajuste de tipoOvo ao mudar tamanho
      if (categoria === "tamanho" && id === "50" && next.tipoOvo === "trufado") {
        next.tipoOvo = "colher";
      }

      // Resetar kit inválido ao mudar tamanho
      if (categoria === "tamanho") {
        const invalidKits = {
          150: ["quarteto"],
          250: ["quarteto"],
          350: ["dupla", "trio", "quarteto"],
          500: ["dupla", "trio", "quarteto"],
        }[id] || [];
        if (invalidKits.includes(next.kit)) {
          next.kit = "unidade";
        }
      }

      // Ao mudar kit, resetar todos os ovos para o estado inicial
      if (categoria === "kit") {
        const k = kits.find((x) => x.id === id);
        const mult = k ? k.mult : 1;
        next.ovos = Array.from({ length: mult }, () => criarOvoInicial());
        next.ovoAtivo = 0;
      }

      // Ao mudar tipo do ovo, resetar recheio e cobertura de todos
      if (categoria === "tipoOvo") {
        next.ovos = prev.ovos.map(() => criarOvoInicial());
        next.ovoAtivo = 0;
      }

      return next;
    });
  }

  function selectOvo(campo, valor) {
    setPedido((prev) => {
      const novosOvos = prev.ovos.map((ovo, i) => {
        if (i !== prev.ovoAtivo) return ovo;
        const novoOvo = { ...ovo, [campo]: valor };
        return novoOvo;
      });

      // Ovo resultante após a seleção
      const ovoResultante = novosOvos[prev.ovoAtivo];
      const isKitMultiLocal = prev.ovos.length > 1;

      // Avança para o próximo ovo SOMENTE quando o ovo atual estiver completo
      let proximoOvoAtivo = prev.ovoAtivo;
      if (isKitMultiLocal && prev.ovoAtivo < prev.ovos.length - 1) {
        if (ovoCompleto(ovoResultante, prev.tipoOvo)) {
          proximoOvoAtivo = prev.ovoAtivo + 1;
        }
      }

      return { ...prev, ovos: novosOvos, ovoAtivo: proximoOvoAtivo };
    });
  }

  const isKitMulti = pedido.ovos.length > 1;

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

  const stepSabor = pedido.ovos.length === 1 ? stepCounter++ : null;
  const stepTextura = pedido.ovos.length === 1 ? stepCounter++ : null;

  const showOvos = isKitMulti || pedido.tipoOvo !== "tradicional";
  const stepOvos = showOvos ? stepCounter++ : null;

  const ovoAtual = pedido.ovos[pedido.ovoAtivo] || pedido.ovos[0];

  return (
    <div className="flex flex-col w-full min-h-[100dvh] overflow-x-hidden relative text-[#5A2C1D]">
      {/* BG FIX */}
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
              const isUnavailable =
                t.id === "trufado" && pedido.tamanho === "50";

              return (
                <div key={t.id} className="relative">
                  <OptionCard
                    option={t}
                    selected={pedido.tipoOvo === t.id}
                    onClick={() => !isUnavailable && select("tipoOvo", t.id)}
                    className={
                      isUnavailable ? "opacity-50 pointer-events-none" : ""
                    }
                  />
                  {isUnavailable && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-20">
                      <span className="bg-[#5A2C1D]/80 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                        Indisponível para 50g
                      </span>
                    </div>
                  )}
                </div>
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
                Cada ovo terá seu próprio recheio e topper — você escolhe um a um!
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                {kits.map((k) => {
                  const savings = {
                    dupla: 3,
                    trio: 5,
                    quarteto: 10,
                  }[k.id];

                  const isKitAvailable = {
                    unidade: true,
                    dupla: ["50", "150","250"].includes(pedido.tamanho),
                    trio: ["50", "150", "250"].includes(pedido.tamanho),
                    quarteto: pedido.tamanho === "50",
                  }[k.id];

                  return (
                    <div key={k.id} className="relative">
                      <button
                        onClick={() => isKitAvailable && select("kit", k.id)}
                        className={`
                          px-5 md:px-6 py-3 rounded-2xl font-semibold
                          transition-all duration-200 text-sm md:text-base
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5989B]
                          active:scale-95
                          flex flex-col items-center
                          ${
                            pedido.kit === k.id
                              ? "bg-[#E5989B] text-white shadow-lg scale-[1.03]"
                              : "bg-white text-[#8C7A70] ring-1 ring-rose-100 hover:bg-rose-50"
                          }
                          ${!isKitAvailable ? "opacity-40 cursor-not-allowed grayscale" : ""}
                        `}
                      >
                        <span>{k.nome}</span>
                        {savings && (
                          <span
                            className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mt-0.5 ${pedido.kit === k.id ? "text-white/80" : "text-[#E5989B]"}`}
                          >
                            Economize R$ {savings.toFixed(2).replace(".", ",")}
                          </span>
                        )}
                      </button>
                      {!isKitAvailable && (
                        <div className="absolute inset-x-0 -bottom-6 flex justify-center pointer-events-none whitespace-nowrap">
                          <span className="text-[10px] text-[#E5989B] font-bold">
                            Indisponível p/ {pedido.tamanho}g
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GRID SECTIONS PADRÃO (Sabor e Textura - apenas se NÃO for kit) */}
        {!isKitMulti && (
          <>
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
                      selected={pedido.ovos[0][section.key] === item.id}
                      onClick={() => selectOvo(section.key, item.id)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </>
        )}

        {/* RECHEIO + TOPPER UNIFICADO */}
        <AnimatePresence>
          {showOvos ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-16 md:mt-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {stepOvos}. {isKitMulti ? "Monte cada Ovo" : "Recheio e Topper"}
              </h2>
              <p className="text-[#8C7A70] text-sm md:text-base mb-6 md:mb-8">
                {isKitMulti
                  ? "Monte um ovo por vez — avança ao completar"
                  : pedido.tipoOvo === "colher"
                  ? "Escolha o recheio e o topper do seu ovo"
                  : "Escolha o recheio do seu ovo"}
              </p>

              {/* ABAS DE OVO (kit multi) */}
              {isKitMulti && (
                <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                  {pedido.ovos.map((ovo, idx) => {
                    const isAtivo = idx === pedido.ovoAtivo;
                    const concluido = ovoCompleto(ovo, pedido.tipoOvo);
                    const desbloqueado = pedido.ovos
                      .slice(0, idx)
                      .every((o) => ovoCompleto(o, pedido.tipoOvo));
                    const clicavel = isAtivo || concluido || desbloqueado;
                    return (
                      <button
                        key={idx}
                        disabled={!clicavel}
                        onClick={() =>
                          clicavel &&
                          setPedido((prev) => ({ ...prev, ovoAtivo: idx }))
                        }
                        className={`
                          relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold
                          text-sm transition-all duration-200 focus:outline-none
                          ${
                            isAtivo
                              ? "bg-[#E5989B] text-white shadow-md scale-[1.03]"
                              : concluido
                              ? "bg-rose-50 text-[#E5989B] ring-1 ring-[#E5989B]/40 hover:bg-rose-100 cursor-pointer active:scale-95"
                              : "opacity-40 bg-white text-[#8C7A70] ring-1 ring-rose-100 cursor-not-allowed"
                          }
                        `}
                      >
                        <span className={`
                          w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black
                          ${isAtivo ? "bg-white/30 text-white" : concluido ? "bg-[#E5989B] text-white" : "bg-rose-100 text-[#8C7A70]"}
                        `}>
                          {concluido && !isAtivo ? "✓" : !clicavel ? "🔒" : idx + 1}
                        </span>
                        <span>Ovo {idx + 1}</span>
                        {concluido && !isAtivo && (
                          <span className="hidden sm:inline text-[10px] opacity-70 font-normal">
                             {saboresCasca.find((s) => s.id === ovo.saborCasca)?.nome?.split(" ")[0]}
                             {ovo.recheio && <> • {recheios.find((r) => r.id === ovo.recheio)?.nome?.split(" ")[0]}</>}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* CONTEÚDO ANIMADO DO OVO ATIVO */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={pedido.ovoAtivo}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* === SABOR E TEXTURA (apenas se for kit) === */}
                  {isKitMulti && (
                    <>
                      <div className="mb-10 md:mb-12">
                        <p className="text-base font-bold text-[#5A2C1D] mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#E5989B] text-white text-xs flex items-center justify-center font-black">1</span>
                          Sabor do Chocolate{ovoAtual.saborCasca && <span className="text-[#E5989B] text-sm font-normal">— {saboresCasca.find((s) => s.id === ovoAtual.saborCasca)?.nome}</span>}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                          {saboresCasca.map((s) => (
                            <OptionCard
                              key={s.id}
                              option={s}
                              selected={ovoAtual.saborCasca === s.id}
                              onClick={() => selectOvo("saborCasca", s.id)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mb-10 md:mb-12">
                        <p className={`text-base font-bold mb-4 flex items-center gap-2 transition-opacity duration-300 ${
                          ovoAtual.saborCasca ? "text-[#5A2C1D]" : "text-[#8C7A70] opacity-50"
                        }`}>
                          <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-black transition-colors duration-300 ${
                            ovoAtual.saborCasca ? "bg-[#E5989B] text-white" : "bg-rose-100 text-[#8C7A70]"
                          }`}>2</span>
                          Textura da Casca{ovoAtual.tipoCasca && <span className="text-[#E5989B] text-sm font-normal">— {tiposCasca.find((t) => t.id === ovoAtual.tipoCasca)?.nome}</span>}
                        </p>
                        <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-opacity duration-300 ${
                          ovoAtual.saborCasca ? "opacity-100" : "opacity-40 pointer-events-none"
                        }`}>
                          {tiposCasca.map((tc) => {
                            if (tc.id === "crocante") {
                              const tamAtual = tamanhos.find((t) => t.id === pedido.tamanho);
                              return { ...tc, preco: tamAtual ? tamAtual.adcCrocante : 0 };
                            }
                            return tc;
                          }).map((t) => (
                            <OptionCard
                              key={t.id}
                              option={t}
                              selected={ovoAtual.tipoCasca === t.id}
                              onClick={() => selectOvo("tipoCasca", t.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* === RECHEIO === */}
                  <div className="mb-10 md:mb-12">
                    <p className={`text-base font-bold mb-4 flex items-center gap-2 transition-opacity duration-300 ${
                      (!isKitMulti || (ovoAtual.saborCasca && ovoAtual.tipoCasca)) ? "text-[#5A2C1D]" : "text-[#8C7A70] opacity-50"
                    }`}>
                      <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-black transition-colors duration-300 ${
                        (!isKitMulti || (ovoAtual.saborCasca && ovoAtual.tipoCasca)) ? "bg-[#E5989B] text-white" : "bg-rose-100 text-[#8C7A70]"
                      }`}>{isKitMulti ? "3" : "1"}</span>
                      Recheio{ovoAtual.recheio && <span className="text-[#E5989B] text-sm font-normal">— {recheios.find((r) => r.id === ovoAtual.recheio)?.nome}</span>}
                    </p>
                    <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-opacity duration-300 ${
                      (!isKitMulti || (ovoAtual.saborCasca && ovoAtual.tipoCasca)) ? "opacity-100" : "opacity-40 pointer-events-none"
                    }`}>
                      {recheios.map((r) => {
                        const valRecheio =
                          tabelaRecheios[r.categoria]?.[pedido.tamanho]?.[
                            pedido.tipoOvo
                          ] || 0;
                        return (
                          <OptionCard
                            key={r.id}
                            option={{ ...r, preco: valRecheio }}
                            selected={ovoAtual.recheio === r.id}
                            onClick={() => selectOvo("recheio", r.id)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* === TOPPER (só colher) === */}
                  {pedido.tipoOvo === "colher" && (
                    <div className="mb-[10%]">
                      <p className={`text-base font-bold mb-4 flex items-center gap-2 transition-opacity duration-300 ${
                        ovoAtual.recheio ? "text-[#5A2C1D]" : "text-[#8C7A70] opacity-50"
                      }`}>
                        <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-black transition-colors duration-300 ${
                          ovoAtual.recheio ? "bg-[#E5989B] text-white" : "bg-rose-100 text-[#8C7A70]"
                        }`}>{isKitMulti ? "4" : "2"}</span>
                        Topper{ovoAtual.cobertura && <span className="text-[#E5989B] text-sm font-normal">— {coberturas.find((c) => c.id === ovoAtual.cobertura)?.nome}</span>}
                        {!ovoAtual.recheio && <span className="text-xs font-normal italic opacity-60">(escolha o recheio primeiro)</span>}
                      </p>
                      <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-opacity duration-300 ${
                        ovoAtual.recheio ? "opacity-100" : "opacity-40 pointer-events-none"
                      }`}>
                        {coberturas.map((c) => {
                          const valCobertura = c.precos[pedido.tamanho] || 0;
                          return (
                            <OptionCard
                              key={c.id}
                              option={{ ...c, preco: valCobertura }}
                              selected={ovoAtual.cobertura === c.id}
                              onClick={() => selectOvo("cobertura", c.id)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {/* === MENSAGEM TRADICIONAL === */}
                  {pedido.tipoOvo === "tradicional" && (
                    <div className="mt-10 p-5 md:p-6 bg-rose-50 rounded-2xl border border-rose-100 text-[#8C7A70] text-sm md:text-base mb-10">
                      ✨ Ovos Tradicionais acompanham mini trufas de brigadeiro.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 p-5 md:p-6 bg-rose-50 rounded-2xl border border-rose-100 text-[#8C7A70] text-sm md:text-base"
            >
              ✨ Escolha o sabor e a textura acima para começar.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Summary pedido={pedido} />
    </div>
  );
}
