import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PostBody({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="post-content prose prose-invert max-w-none prose-p:mx-auto 
        prose-img:object-contain prose-img:mx-auto prose-video:mx-auto prose-iframe:mx-auto
        prose-img:rounded-xl prose-video:rounded-xl prose-iframe:rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      {children}
    </motion.div>
  );
}
