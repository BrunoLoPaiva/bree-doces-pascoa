import { motion } from "framer-motion";

export default function OptionCard({ option, selected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ease-out shadow-sm border ${
        selected
          ? "ring-2 ring-rose-300 bg-rose-50/30 border-rose-200 shadow-md"
          : "hover:shadow-md bg-white border-rose-50 hover:border-rose-100"
      }`}
    >
      <div className="aspect-video w-full overflow-hidden bg-rose-50/50">
        <img
          src={option.img}
          alt={option.nome}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-3 lg:p-4 bg-white relative z-10">
        <h3 className="text-sm xl:text-base font-semibold text-[#5A2C1D] leading-tight font-sans">
          {option.nome}
        </h3>
        {option.preco > 0 && (
          <span className="text-[11px] xl:text-sm text-[#E5989B] font-bold mt-1 inline-block">
            + R$ {option.preco.toFixed(2).replace('.', ',')}
          </span>
        )}
      </div>
      {/* Soft overlay if selected */}
      {selected && (
        <div className="absolute inset-0 bg-rose-300/5 pointer-events-none" />
      )}
    </motion.div>
  );
}
