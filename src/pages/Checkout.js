// src/pages/Checkout.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { getNomeOpcao, calcularPrecoTotal } from "../data/options";
import {
  Trash2,
  ShoppingCart,
  MessageCircle,
  ArrowLeft,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const whatsapp = "5514996917274";
  const [confirming, setConfirming] = useState(false);

  // Recalcular preços dinâmicamente ao finalizar (ignora preço guardado)
  const totalCarrinhoAtual = cart.reduce(
    (acc, item) => acc + calcularPrecoTotal(item),
    0
  );

  function finalizarPedido() {
    let msg =
      "*Olá, Bree Doces!* Gostaria de fazer o meu pedido de Páscoa:\n\n";

    cart.forEach((item, index) => {
      const nomeTamanho = getNomeOpcao("tamanho", item.tamanho);
      const nomeTipo = getNomeOpcao("tipoOvo", item.tipoOvo);
      msg += `*ITEM #${index + 1} - ${nomeTamanho} ${nomeTipo}*\n`;

      const addLine = (label, value) => {
        if (value) msg += `*${label}:* ${value}\n`;
      };

      const isKitMulti = item.ovos && item.ovos.length > 1;

      // Casca (apenas para ovo único)
      if (!isKitMulti) {
        const ovoUnico = item.ovos?.[0] || {};
        addLine("Sabor da Casca", getNomeOpcao("saborCasca", ovoUnico.saborCasca || item.saborCasca));
        addLine("Textura da Casca", getNomeOpcao("tipoCasca", ovoUnico.tipoCasca || item.tipoCasca));
      }

      if (isKitMulti) {
        addLine("Formato", getNomeOpcao("kit", item.kit));
        msg += `*Composição:*\n`;
        item.ovos.forEach((ovo, i) => {
          const nomeSabor = getNomeOpcao("saborCasca", ovo.saborCasca);
          const nomeTextura = getNomeOpcao("tipoCasca", ovo.tipoCasca);
          const nomeRecheio = getNomeOpcao("recheio", ovo.recheio);
          const nomeCobertura = ovo.cobertura
            ? ` + ${getNomeOpcao("cobertura", ovo.cobertura)}`
            : "";

          if (item.tipoOvo === "tradicional") {
            msg += `  Ovo ${i + 1}: ${nomeSabor} (${nomeTextura})\n`;
          } else {
            msg += `  Ovo ${i + 1}: ${nomeSabor} (${nomeTextura}) - ${nomeRecheio}${nomeCobertura}\n`;
          }
        });
      } else {
        if (item.kit && item.kit !== "unidade") {
          addLine("Formato", getNomeOpcao("kit", item.kit));
        }

        const ovoUnico = item.ovos?.[0];
        if (ovoUnico && item.tipoOvo !== "tradicional") {
          addLine("Recheio", getNomeOpcao("recheio", ovoUnico.recheio));
          if (item.tipoOvo === "colher" && ovoUnico.cobertura) {
            addLine("Topper/Cobertura", getNomeOpcao("cobertura", ovoUnico.cobertura));
          }
        }
      }

      // Usar preço recalculado dinamicamente
      const precoAtual = calcularPrecoTotal(item);
      msg += `Subtotal: R$ ${precoAtual.toFixed(2).replace(".", ",")}\n\n`;
    });

    msg += `----------------------------------\n`;
    msg += `*TOTAL DO PEDIDO: R$ ${totalCarrinhoAtual.toFixed(2).replace(".", ",")}*\n\n`;
    msg += `Aguardando confirmação e dados para pagamento!`;

    // Limpar carrinho ANTES do redirect para evitar pedidos duplicados
    // (se o redirect for instantâneo, o setTimeout nunca executaria)
    clearCart();
    window.location.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#5A2C1D] p-6 relative overflow-hidden">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,194,194,0.15),transparent_70%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10 relative"
        >
          <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-rose-100 shadow-xl shadow-rose-100/50">
            <ShoppingCart className="w-10 h-10 text-[#E5989B]" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter mb-4 text-[#5A2C1D]">
            Sua cesta está vazia
          </h1>
          <p className="text-[#8C7A70] mb-10 max-w-sm mx-auto text-lg font-light leading-relaxed">
            Você ainda não adicionou nenhuma doçura ao seu pedido.
          </p>
          <button
            onClick={() => navigate("/builder")}
            className="group bg-[#E5989B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#d88689] flex items-center gap-3 mx-auto shadow-lg shadow-rose-200/50"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Voltar para o Monte seu Ovo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#5A2C1D] p-6 md:p-12 lg:p-20 relative overflow-x-hidden pt-16 md:pt-24">
      {/* Banner de Escassez */}
      <div className="absolute top-0 left-0 w-full bg-[#5A2C1D] text-white py-2 px-4 text-center text-xs md:text-sm font-bold z-50">
        ⚠️ Só serão aceitos pedidos até 31/03! Garanta já o seu
      </div>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,194,194,0.1),transparent_50%)] pointer-events-none" />

      {/* MODAL DE CONFIRMAÇÃO */}
      <AnimatePresence>
        {confirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-[#E5989B]" />
              </div>
              <h2 className="text-xl font-bold text-[#5A2C1D] mb-2">
                Confirmar Pedido?
              </h2>
              <p className="text-[#8C7A70] text-sm mb-2 leading-relaxed">
                Você será redirecionado ao WhatsApp para confirmar seu pedido.
              </p>
              <p className="text-[#E5989B] font-bold text-lg mb-6">
                Total: R$ {totalCarrinhoAtual.toFixed(2).replace(".", ",")}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="flex-1 py-3 rounded-full border border-rose-100 text-[#8C7A70] font-bold hover:bg-rose-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={() => {
                    setConfirming(false);
                    finalizarPedido();
                  }}
                  className="flex-1 py-3 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#1fb355] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-12 flex items-center justify-between border-b border-rose-100 pb-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter text-[#5A2C1D]">
              Sua cesta de ovos
            </h1>
            <p className="text-[#8C7A70] mt-2 font-sans italic">
              {cart.length}{" "}
              {cart.length === 1
                ? "item selecionado com carinho"
                : "itens selecionados com carinho"}
            </p>
          </div>
          <button
            onClick={() => navigate("/builder")}
            className="hidden md:flex items-center gap-2 text-[#E5989B] hover:text-[#d88689] font-bold"
          >
            <Plus className="w-5 h-5" /> Adicionar outro
          </button>
        </header>

        <div className="grid gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-[2.5rem] p-8 relative group border border-rose-50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-rose-100 text-[#E5989B] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                        Item #{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-[#5A2C1D]">
                        {getNomeOpcao("tamanho", item.tamanho)} -{" "}
                        {getNomeOpcao("tipoOvo", item.tipoOvo)}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm text-[#8C7A70]">
                      {item.tipoOvo !== "tradicional" && (
                        <div className="flex justify-between border-b border-rose-50 pb-2">
                          <span className="font-sans opacity-70">Formato:</span>
                          <span className="text-[#5A2C1D] font-bold">
                            {getNomeOpcao("kit", item.kit)}
                          </span>
                        </div>
                      )}

                      {/* Casca no topo apenas para ovo único */}
                      {!(item.ovos && item.ovos.length > 1) && (
                        <>
                          <div className="flex justify-between border-b border-rose-50 pb-2">
                            <span className="font-sans opacity-70">
                              Sabor da Casca:
                            </span>
                            <span className="text-[#5A2C1D] font-bold">
                              {getNomeOpcao("saborCasca", item.ovos?.[0]?.saborCasca || item.saborCasca)}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-rose-50 pb-2">
                            <span className="font-sans opacity-70">Textura:</span>
                            <span className="text-[#5A2C1D] font-bold">
                              {getNomeOpcao("tipoCasca", item.ovos?.[0]?.tipoCasca || item.tipoCasca)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Ovos do kit — exibição individual */}
                    {item.tipoOvo !== "tradicional" && item.ovos && (
                      <div className="mt-4">
                        {item.ovos.length > 1 ? (
                          <>
                            <p className="text-[10px] uppercase tracking-widest font-black text-[#E5989B] mb-2">
                              Composição do Kit
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.ovos.map((ovo, i) => {
                                const nomeSabor = getNomeOpcao("saborCasca", ovo.saborCasca);
                                const nomeTextura = getNomeOpcao("tipoCasca", ovo.tipoCasca);
                                const nomeRecheio = getNomeOpcao("recheio", ovo.recheio);
                                const nomeCobertura = ovo.cobertura
                                  ? getNomeOpcao("cobertura", ovo.cobertura)
                                  : null;
                                return (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2 bg-rose-50/60 rounded-xl px-3 py-2 ring-1 ring-rose-100"
                                  >
                                    <span className="w-5 h-5 bg-[#E5989B] text-white rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                                      {i + 1}
                                    </span>
                                    <div className="text-xs">
                                      <div className="font-bold text-[#5A2C1D]">
                                        {nomeSabor} ({nomeTextura})
                                      </div>
                                      {item.tipoOvo !== "tradicional" && (
                                        <div className="text-[#8C7A70] mt-0.5">
                                          {nomeRecheio}{nomeCobertura && ` + ${nomeCobertura}`}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm text-[#8C7A70]">
                            <div className="flex justify-between border-b border-rose-50 pb-2">
                              <span className="font-sans opacity-70">Recheio:</span>
                              <span className="text-[#5A2C1D] font-bold">
                                {getNomeOpcao("recheio", item.ovos[0]?.recheio)}
                              </span>
                            </div>
                            {item.tipoOvo === "colher" && item.ovos[0]?.cobertura && (
                              <div className="flex justify-between border-b border-rose-50 pb-2">
                                <span className="font-sans opacity-70">Cobertura:</span>
                                <span className="text-[#5A2C1D] font-bold">
                                  {getNomeOpcao("cobertura", item.ovos[0]?.cobertura)}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-6 min-w-[140px]">
                    <div className="text-3xl font-bold text-[#E5989B]">
                      R$ {calcularPrecoTotal(item).toFixed(2).replace(".", ",")}
                    </div>
                    {/* Botão de lixeira sempre visível (inclusive mobile) */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-4 text-rose-200 hover:text-red-400 transition-colors bg-rose-50/50 rounded-2xl"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-rose-100 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
            <div>
              <span className="text-[#8C7A70] uppercase tracking-[0.2em] text-xs font-black mb-3 block opacity-60">
                Total do Pedido
              </span>
              <div className="text-5xl md:text-7xl font-bold text-[#E5989B]">
                R$ {totalCarrinhoAtual.toFixed(2).replace(".", ",")}
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full md:w-auto md:min-w-[280px]">
              <motion.button
                onClick={() => setConfirming(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#25D366] text-white py-5 px-10 rounded-full font-black text-xl shadow-xl flex items-center justify-center gap-4 hover:bg-[#1fb355] transition-all"
              >
                <MessageCircle className="w-7 h-7" /> Finalizar pedido
              </motion.button>

              {/* Quebra de Objeções */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs md:text-sm text-[#8C7A70] font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">💳</span>
                  Aceitamos Pix, Cartões de Débito e Crédito (sujeito a taxas
                  das operadoras).
                </div>
                <div className="hidden sm:block opacity-20">|</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">💵</span>
                  Confirmação do pedido mediante pagamento de 50% do valor total.
                </div>
                <div className="hidden sm:block opacity-20">|</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🛵</span>
                  Consulte a taxa de entrega ou retire no local
                </div>
              </div>

              <button
                onClick={() => navigate("/builder")}
                className="text-[#8C7A70] hover:text-[#E5989B] font-bold flex items-center justify-center gap-2 mt-2"
              >
                <Plus className="w-5 h-5" /> Adicionar outro ovo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
