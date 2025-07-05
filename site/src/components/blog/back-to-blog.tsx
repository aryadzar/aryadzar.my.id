import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import PreserveLink from "../preserve-link";

interface goBackLinkProps{
    link : 'blog' | 'project'
}
export default function BackToBlog({link } : goBackLinkProps ) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <PreserveLink
        to={`/${link}`}
        className="inline-flex items-center mt-5 gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <ArrowLeft className="w-4 h-4" />
        </motion.div>
        <span>Go back</span>
      </PreserveLink>
    </motion.div>
  );
}
