import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ start }) {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden text-[#5A2C1D] px-6">
      {/* Background gradients suaves */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(244,194,194,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(229,152,155,0.15),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-[-5vh]">
        
        {/* LOGO DA BREE DOCES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <img 
            src='logo.png'
            alt="Bree Doces" 
            className="w-56 md:w-72 drop-shadow-sm mx-auto" 
          />
        </motion.div>

        {/* TEXTOS REFINADOS E DESEJÁVEIS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-12 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#5A2C1D] drop-shadow-sm leading-tight">
            Crie o Ovo de Páscoa <br className="hidden md:block" /> dos seus sonhos
          </h1>
          
          <p className="text-lg md:text-2xl font-light text-[#8C7A70] tracking-wide leading-relaxed max-w-2xl mx-auto font-sans">
            Do chocolate nobre aos nossos recheios artesanais. 
            <span className="block mt-2 font-medium text-[#E5989B]">
              Monte uma combinação perfeita e exclusiva para você.
            </span>
          </p> 
        </motion.div>

        {/* BOTÃO DE AÇÃO CHAMATIVO */}
        <motion.button
          onClick={start}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(229, 152, 155, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="group flex items-center gap-3 bg-[#E5989B] text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold shadow-xl shadow-rose-200/50 transition-all hover:bg-[#d88689]"
        >
          <img src="ovos-de-pascoa.png" alt="Bree Doces" className="w-10" />
          Montar meu Ovo Artesanal
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform ml-2" />
        </motion.button>
        
      </div>
    </section>
  );
}