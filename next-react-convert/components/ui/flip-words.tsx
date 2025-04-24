"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // corrected import
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [isClient, setIsClient] = useState(false); // ⬅️ detect client-side
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true); // ✅ run only on client
  }, []);

  const startAnimation = useCallback(() => {
    const nextIndex = (words.indexOf(currentWord) + 1) % words.length;
    const word = words[nextIndex];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timeout = setTimeout(() => {
        startAnimation();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isAnimating, duration, startAnimation]);

  if (!isClient) return null; // ✅ avoid SSR mismatch

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        key={currentWord}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
          className
        )}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
