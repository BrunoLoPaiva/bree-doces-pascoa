import { motion } from "framer-motion";

export default function OptionCard({ option, selected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out shadow-sm ${
        selected
          ? "ring-4 ring-orange-400 shadow-md shadow-orange-900/10"
          : "hover:shadow-lg bg-white ring-1 ring-zinc-200"
      }`}
    >
      <div className="aspect-video w-full overflow-hidden bg-zinc-100">
        <img
          src={option.img}
          alt={option.nome}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 bg-white relative z-10">
        <h3 className="font-medium text-zinc-900">{option.nome}</h3>
        {option.preco > 0 && (
          <span className="text-sm text-orange-600 font-medium mt-1 inline-block">
            +R$ {option.preco.toFixed(2)}
          </span>
        )}
      </div>
      
      {/* Check/Glow overlay if selected */}
      {selected && (
        <div className="absolute inset-0 bg-orange-400/5 pointer-events-none" />
      )}
    </motion.div>
  );
}
