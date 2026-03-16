import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2 } from "lucide-react";

export default function Summary({ pedido }) {
  const whatsapp = "5514996917274";

  function finalizar() {
    let msg = "Olá! Montei meu ovo de páscoa:\n\n";
    for (let k in pedido) {
      msg += `• ${k.charAt(0).toUpperCase() + k.slice(1)}: ${pedido[k]}\n`;
    }
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-80 bg-white rounded-3xl p-6 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-200 flex flex-col z-50"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="text-orange-500 w-5 h-5" />
        <h3 className="font-semibold text-lg text-zinc-900">Seu Pedido</h3>
      </div>

      <div className="bg-zinc-50 rounded-xl p-4 mb-6 max-h-48 overflow-y-auto text-sm text-zinc-600 ring-1 ring-zinc-100 inset-shadow-sm">
        {Object.entries(pedido).map(([key, value]) => (
          <div key={key} className="flex justify-between py-1.5 border-b border-zinc-200 last:border-0">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="font-medium text-zinc-900 text-right">{value}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={finalizar}
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-6 rounded-xl font-medium shadow-lg shadow-green-600/20 hover:bg-[#128C7E] transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        Finalizar no WhatsApp
      </motion.button>
    </motion.div>
  );
}
