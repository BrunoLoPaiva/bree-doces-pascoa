import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({ start }) {
  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden text-[#5A2C1D] px-4 md:px-6">
      {/* Background gradients suaves */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(244,194,194,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(229,152,155,0.15),transparent_50%)] pointer-events-none" />

      {/* Container Principal - Adicionado h-full e justify-center para centralizar verticalmente na tela */}
      <div className="relative z-10 flex flex-col items-center md:items-start max-w-6xl mx-auto w-full h-full justify-center">

        {/* LOGO DA BREE DOCES - Margem inferior reduzida para economizar espaço vertical */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 md:mb-8 w-full flex justify-center md:justify-start"
        >
          <img
            src='logo.png'
            alt="Bree Doces"
            className="w-36 md:w-56 drop-shadow-sm"
          />
        </motion.div>

        {/* Layout GRID: Gaps verticais reduzidos para manter tudo visível */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4 md:gap-y-6 w-full items-center text-center md:text-left">

          {/* TÍTULO */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 md:col-start-1 md:row-start-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#5A2C1D] drop-shadow-sm leading-tight"
          >
            Crie o Ovo de Páscoa <br className="hidden lg:block" /> dos seus sonhos
          </motion.h1>

          {/* IMAGEM DO COELHO - Adicionado max-h-[Xvh] para não quebrar a tela em monitores menores */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-2 md:col-start-2 md:row-start-1 md:row-span-3 flex justify-center md:justify-end w-full max-w-[170px] sm:max-w-[220px] md:max-w-none mx-auto"
          >
            <img
              src="coelho.png"
              alt="Coelhinho da Páscoa com cesta"
              className="w-full h-auto max-h-[35vh] md:max-h-[65vh] object-contain drop-shadow-2xl transition-transform lg:scale-110 lg:mb-10"
              style={{ filter: "drop-shadow(0px 20px 30px rgba(90, 44, 29, 0.12))" }}
            />
          </motion.div>

          {/* PARÁGRAFO */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="order-3 md:col-start-1 md:row-start-2 text-base sm:text-lg md:text-xl font-light text-[#8C7A70] tracking-wide leading-relaxed max-w-xl font-sans mx-auto md:mx-0"
          >
            Do chocolate ideal aos nossos recheios artesanais.
            <span className="block mt-1 md:mt-2 font-medium text-[#E5989B]">
              Monte uma combinação perfeita e exclusiva para você.
            </span>
          </motion.p>

          {/* BOTÃO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="order-4 md:col-start-1 md:row-start-3 w-full flex justify-center md:justify-start"
          >
            <motion.button
              onClick={start}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(229, 152, 155, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 w-full sm:w-auto bg-[#E5989B] text-white px-6 py-4 md:px-10 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-xl shadow-rose-200/50 transition-all hover:bg-[#d88689]"
            >
              <img src="ovos-de-pascoa.png" alt="Ovo de Páscoa" className="w-6 sm:w-8 md:w-10" />
              Montar meu Ovo
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}