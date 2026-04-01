import { motion } from "framer-motion";
import { Instagram, Phone } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden text-[#5A2C1D] px-4 md:px-8 pt-12">
      {/* Banner */}
      <div className="absolute top-0 left-0 w-full bg-[#5A2C1D] text-white py-2 px-4 text-center text-xs md:text-sm font-bold z-50">
        ✨ Agradecemos todos os pedidos desta Páscoa!
      </div>

      {/* Glow central */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(244,194,194,0.5),transparent_60%)] rounded-full blur-3xl"
      />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(244,194,194,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(229,152,155,0.15),transparent_50%)] pointer-events-none" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDF9F6]/80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <motion.img
            variants={itemVariants}
            src="logo.png"
            className="w-32 sm:w-40 lg:w-52 mb-6 drop-shadow-sm"
          />

          {/* Título */}
          <motion.h1
            variants={itemVariants}
            className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] mb-4"
          >
            Temporada de Páscoa{" "}
            <span className="text-[#E5989B]">encerrada</span>
          </motion.h1>

          {/* Texto */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg text-[#8C7A70] max-w-xl mb-8"
          >
            A produção de ovos personalizados foi finalizada para esta Páscoa.
            Muito obrigado por cada pedido realizado 💖
          </motion.p>

          {/* Contatos */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8"
          >
            {/* Instagram */}
            <a
              href="https://instagram.com/bree_doces"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-[#E5989B] font-semibold hover:opacity-80 transition"
            >
              <Instagram size={20} />
              @bree_doces
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5514996917274"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-[#E5989B] font-semibold hover:opacity-80 transition"
            >
              <Phone size={20} />
              (14) 99691-7274
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
