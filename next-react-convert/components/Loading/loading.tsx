// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// export default function EnhancedLoading({ done = false }: { done?: boolean }) {
//   const [progress, setProgress] = useState(0)
//   const [loadingText, setLoadingText] = useState("Memuat data...")

//   // const loadingMessages = ["Memuat data...", "Mengambil informasi...", "Hampir selesai...", "Menyiapkan konten..."]

//   useEffect(() => {
//     if (done) {
//       setProgress(100);
//       return;
//     }

//     const progressInterval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(progressInterval);
//           return 100;
//         }
//         return prev + Math.random() * 15;
//       });
//     }, 200);

//     const textInterval = setInterval(() => {
//       const messages = ["Memuat data...", "Mengambil informasi...", "Hampir selesai...", "Menyiapkan konten..."];
//       setLoadingText((prev) => {
//         const i = messages.indexOf(prev);
//         return messages[(i + 1) % messages.length];
//       });
//     }, 1500);

//     return () => {
//       clearInterval(progressInterval);
//       clearInterval(textInterval);
//     };
//   }, [done]);

//   return (
//     <div className="min-h-screen  bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#000000] flex flex-col items-center justify-center text-white relative overflow-hidden">
//       {/* Animated background particles */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
//             animate={{
//               x: [0, Math.random() * 100 - 50],
//               y: [0, Math.random() * 100 - 50],
//               opacity: [0.3, 0.8, 0.3],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main loading container */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="relative z-10 flex flex-col items-center"
//       >
//         {/* Loading image with enhanced animations */}
//         <motion.div
//           className="relative mb-8"
//           animate={{
//             rotate: [0, 5, -5, 0],
//             scale: [1, 1.05, 1],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
//           <img
//             src="https://media.tenor.com/EGaqu3rgp3cAAAAi/wanderer-genshin-wanderer.gif"
//             alt="Loading..."
//             className="relative z-10 w-32 h-32 object-cover rounded-full border-4 border-gradient-to-r from-blue-400 to-purple-400"
//           />
//         </motion.div>

//         {/* Animated loading text */}
//         <AnimatePresence mode="wait">
//           <motion.p
//             key={loadingText}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="text-xl font-medium text-gray-300 mb-6"
//           >
//             {loadingText}
//           </motion.p>
//         </AnimatePresence>

//         {/* Progress bar */}
//         <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
//           <motion.div
//             className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
//             initial={{ width: 0 }}
//             animate={{ width: `${Math.min(progress, 100)}%` }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//           />
//         </div>

//         {/* Loading dots animation */}
//         <div className="flex space-x-2 mt-6">
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className="w-3 h-3 bg-blue-400 rounded-full"
//               animate={{
//                 scale: [1, 1.5, 1],
//                 opacity: [0.5, 1, 0.5],
//               }}
//               transition={{
//                 duration: 1,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>

//       {/* Subtle glow effect */}
//       <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-900/5 to-transparent pointer-events-none" />
//     </div>
//   )
// }

export default function Loading() { return ( <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center text-white"> <img src="https://media.tenor.com/EGaqu3rgp3cAAAAi/wanderer-genshin-wanderer.gif" alt="Loading..." className=" mb-4 animate-pulse" /> <p className="text-lg text-gray-400">Loading post...</p>

</div> ) }