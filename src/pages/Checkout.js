import { motion } from "framer-motion";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-light mb-4">Checkout</h1>
        <p className="text-zinc-500">Em breve...</p>
      </motion.div>
    </div>
  );
}
