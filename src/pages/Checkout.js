import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { getNomeOpcao } from "../data/options";
import { Trash2, ShoppingCart, MessageCircle, ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, removeFromCart, totalCarrinho, clearCart } = useCart();
  const navigate = useNavigate();
  const whatsapp = "5514996917274";

  function finalizarPedido() {
    let msg = "Olá! Gostaria de fazer o pedido dos seguintes ovos:\n\n";

    cart.forEach((item, index) => {
      msg += `*Ovo #${index + 1}*\n`;
      for (const [kat, val] of Object.entries(item)) {
        if (kat === "id" || kat === "precoTotal") continue;
        
        // Reaproveitando os filtros de visibilidade
        if (kat === "recheio" && item.tipoOvo === "tradicional") continue;
        if (kat === "cobertura" && item.tipoOvo !== "colher") continue;

        const nomeCat = kat.replace(/([A-Z])/g, ' $1').trim();
        msg += `• ${nomeCat.charAt(0).toUpperCase() + nomeCat.slice(1)}: ${getNomeOpcao(kat, val)}\n`;
      }
      msg += `Subtotal: R$ ${item.precoTotal.toFixed(2).replace('.', ',')}\n\n`;
    });

    msg += `--- \n*Total Geral: R$ ${totalCarrinho.toFixed(2).replace('.', ',')}*`;

    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`);
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#5A2C1D] p-6 relative overflow-hidden">
        {/* Gradiente pastel centralizado */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,194,194,0.15),transparent_70%)] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 relative">
          
          {/* Ícone no círculo estilo vitrine */}
          <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-rose-100 shadow-xl shadow-rose-100/50">
            <ShoppingCart className="w-10 h-10 text-[#E5989B]" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tighter mb-4 text-[#5A2C1D]">
            Seu cesta de ovos está vazio
          </h1>
          
          <p className="text-[#8C7A70] mb-10 max-w-sm mx-auto text-lg font-light leading-relaxed">
            Você ainda não adicionou nenhuma doçura ao seu pedido. Que tal montar um ovo artesanal agora mesmo?
          </p>
          
          <button
            onClick={() => navigate("/builder")}
            className="group bg-[#E5989B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#d88689] transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg shadow-rose-200/50 hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Voltar para o Monte seu Ovo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#5A2C1D] p-6 md:p-12 lg:p-20 relative overflow-x-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,194,194,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-12 flex items-center justify-between border-b border-rose-100 pb-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter text-[#5A2C1D]">
              Sua cesta de ovos
            </h1>
            <p className="text-[#8C7A70] mt-2 font-sans italic">{cart.length} {cart.length === 1 ? 'item selecionado com carinho' : 'itens selecionados com carinho'}</p>
          </div>
          <button 
            onClick={() => navigate("/builder")}
            className="hidden md:flex items-center gap-2 text-[#E5989B] hover:text-[#d88689] transition-colors font-bold"
          >
            <Plus className="w-5 h-5" />
            Adicionar outro
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
                className="bg-white rounded-[2.5rem] p-8 relative group border border-rose-50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-rose-100 text-[#E5989B] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                        Item #{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-[#5A2C1D]">
                        {getNomeOpcao("tamanho", item.tamanho)} - {getNomeOpcao("tipoOvo", item.tipoOvo)}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm text-[#8C7A70]">
                      <div className="flex justify-between border-b border-rose-50 pb-2">
                        <span className="font-sans opacity-70">Sabor da Casca:</span>
                        <span className="text-[#5A2C1D] font-bold">{getNomeOpcao("saborCasca", item.saborCasca)}</span>
                      </div>
                      <div className="flex justify-between border-b border-rose-50 pb-2">
                        <span className="font-sans opacity-70">Textura:</span>
                        <span className="text-[#5A2C1D] font-bold">{getNomeOpcao("tipoCasca", item.tipoCasca)}</span>
                      </div>
                      {item.tipoOvo !== "tradicional" && (
                        <div className="flex justify-between border-b border-rose-50 pb-2">
                          <span className="font-sans opacity-70">Recheio:</span>
                          <span className="text-[#5A2C1D] font-bold">{getNomeOpcao("recheio", item.recheio)}</span>
                        </div>
                      )}
                      {item.tipoOvo === "colher" && (
                        <div className="flex justify-between border-b border-rose-50 pb-2">
                          <span className="font-sans opacity-70">Cobertura:</span>
                          <span className="text-[#5A2C1D] font-bold">{getNomeOpcao("cobertura", item.cobertura)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-6 min-w-[140px]">
                    <div className="text-3xl font-bold text-[#E5989B]">
                      R$ {item.precoTotal.toFixed(2).replace('.', ',')}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-4 text-rose-200 hover:text-red-400 transition-colors bg-rose-50/50 rounded-2xl md:opacity-0 group-hover:opacity-100"
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50/50 blur-[80px] -mr-32 -mt-32 pointer-events-none rounded-full" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
            <div>
              <span className="text-[#8C7A70] uppercase tracking-[0.2em] text-xs font-black mb-3 block opacity-60">Total do Pedido</span>
              <div className="text-5xl md:text-7xl font-bold text-[#E5989B]">
                R$ {totalCarrinho.toFixed(2).replace('.', ',')}
              </div>
            </div>
            
            <div className="flex flex-col gap-5 min-w-[320px]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={finalizarPedido}
                className="w-full bg-[#25D366] text-white py-5 px-10 rounded-full font-black text-xl shadow-xl shadow-green-100 flex items-center justify-center gap-4 hover:bg-[#1fb355] transition-all"
              >
                <MessageCircle className="w-7 h-7" />
                Finalizar no WhatsApp
              </motion.button>
              
              <button 
                onClick={() => navigate("/builder")}
                className="text-[#8C7A70] hover:text-[#E5989B] transition-colors text-base font-bold flex items-center justify-center gap-2 group"
              >
                <Plus className="w-5 h-5" />
                <span>Adicionar outro ovo ao pedido</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
