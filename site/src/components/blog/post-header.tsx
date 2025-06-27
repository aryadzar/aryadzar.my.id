import { motion } from "framer-motion";

export default function PostHeader({ title, date }: { title: string; date: string }) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <p className="text-gray-400">{date}</p>
      <motion.h1
        className="text-3xl md:text-5xl font-bold mt-2 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {title}
      </motion.h1>
    </motion.div>
  );
}
