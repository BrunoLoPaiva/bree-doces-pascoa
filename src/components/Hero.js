import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({ start }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,111,72,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(212,189,170,0.1),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-100 to-orange-400 mb-6 drop-shadow-sm">
            Bree Doces
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-300 tracking-wide">
            Crie o seu ovo de Páscoa artesanal, <br className="hidden md:block"/> feito sob medida.
          </p>
        </motion.div>

        <motion.button
          onClick={start}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="group flex items-center gap-3 bg-zinc-100 text-zinc-900 px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all hover:bg-white"
        >
          Começar Experiência
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
