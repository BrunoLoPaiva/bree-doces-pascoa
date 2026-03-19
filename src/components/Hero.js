import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const eggs = [{ src: "ovo1.jpeg" }, { src: "ovo2.jpeg" }, { src: "ovo3.jpeg" }];

function RotatingEggs() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % eggs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (i) => {
    const relative = (i - index + eggs.length) % eggs.length;
    if (relative === 0) return "center";
    if (relative === 1) return "right";
    return "left";
  };

  // Coordenadas exatas para o Framer Motion animar de forma fluida
  const positionStyles = {
    center: {
      top: "35%",
      left: "27.5%",
      width: "45%",
      scale: 1.05,
      zIndex: 30,
      opacity: 1,
    },
    left: {
      top: "5%",
      left: "5%",
      width: "32%",
      scale: 0.9,
      zIndex: 10,
      opacity: 0.9,
    },
    right: {
      top: "10%",
      left: "63%",
      width: "32%",
      scale: 0.9,
      zIndex: 10,
      opacity: 0.9,
    },
  };

  return (
    <div className="relative w-full h-full">
      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(244,194,194,0.5),transparent_60%)] rounded-full blur-2xl"
      />

      {eggs.map((egg, i) => {
        const pos = getPosition(i);
        const isCenter = pos === "center";

        return (
          <motion.div
            key={egg.src}
            className="absolute rounded-[1rem] overflow-hidden border-[5px] border-white shadow-xl bg-white"
            initial={false}
            animate={positionStyles[pos]}
            // Transição suave (mola suave) em vez do pulo seco
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 1,
            }}
          >
            {/* Imagem */}
            <img
              src={egg.src}
              className="w-full h-full object-cover rounded-[0.8rem]"
              alt="Ovo"
            />
            {/* Progress bar (apenas no centro) */}
            {isCenter && (
              <div className="absolute top-2 left-2 right-2 z-50">
                <div className="h-[4px] bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    key={index}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 5,
                      ease: "linear",
                    }}
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Coelho (ajustado para direita) */}
      <motion.img
        src="coelho.png"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-2%] right-[-10%] lg:right-[-20%] w-[55%] lg:w-[60%] z-40 drop-shadow-2xl"
        style={{
          filter: "drop-shadow(-10px 15px 25px rgba(90, 44, 29, 0.15))",
        }}
      />
    </div>
  );
}

export default function Hero({ start }) {
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
    // REMOVIDO o bg-[#FDF9F6] para a animação do fundo poder aparecer
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden text-[#5A2C1D] px-4 md:px-8 bg-transparent pt-12">
      {/* Banner de Escassez */}
      <div className="absolute top-0 left-0 w-full bg-[#5A2C1D] text-white py-2 px-4 text-center text-xs md:text-sm font-bold z-50">
        ⚠️ Só serão aceitos pedidos até 31/03! Garanta já o seu
      </div>

      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(244,194,194,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(229,152,155,0.15),transparent_50%)] pointer-events-none" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDF9F6]/80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center h-full py-6 lg:py-0">
        {/* COLAGEM */}
        <div className="relative w-full h-[42vh] min-h-[280px] lg:h-[550px] max-w-[520px] mx-auto order-1 lg:order-2">
          <RotatingEggs />
        </div>

        {/* TEXTO */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          {/* Logo */}
          <motion.img
            variants={itemVariants}
            src="logo.png"
            className="w-32 sm:w-40 lg:w-56 mb-4 drop-shadow-sm"
          />

          {/* Título */}
          <motion.h1
            variants={itemVariants}
            className="text-[1.9rem] sm:text-4xl md:text-5xl lg:text-[4.2rem] font-bold tracking-[-0.02em] leading-[1.05] mb-4"
          >
            Crie o Ovo de Páscoa{" "}
            <span className="text-[#E5989B]">dos seus sonhos</span>
          </motion.h1>

          {/* Texto */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-xl text-[#8C7A70] max-w-xl mb-8"
          >
            Escolha cada detalhe do seu ovo, do chocolate aos recheios
            artesanais.
            <span className="block mt-2 font-medium text-[#E5989B]">
              Uma experiência única, feita só para você ou para presentear
              alguém especial.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.button
            variants={itemVariants}
            onClick={start}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 60px -15px rgba(229,152,155,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 bg-[#E5989B] text-white px-8 py-4 lg:px-10 lg:py-5 rounded-full text-lg lg:text-xl font-bold overflow-hidden transition-all hover:bg-[#d88689]"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition" />
            <img
              src="ovos-de-pascoa.png"
              className="w-6 lg:w-8"
              alt="Ovo de Páscoa"
            />
            Criar meu Ovo agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
