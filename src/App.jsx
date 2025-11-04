import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-black">
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Xtract AI
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Transform your workflow with intelligent, visual AI agents.
      </motion.p>

      <motion.button
        className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Join the Waitlist
      </motion.button>

      <motion.div
        className="absolute bottom-10 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        © 2025 Xtract AI. Built with React.
      </motion.div>
    </div>
  );
}
