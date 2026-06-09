import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ProTextType({
  text,
  typingSpeed = 34,
  deletingSpeed = 20,
  initialDelay = 250,
  pauseDuration = 1500,
  loop = true,
  showCursor = true,
  cursor = "|",
  startOnVisible = true,
  className = "",
}) {
  const phrases = useMemo(() => (Array.isArray(text) ? text : [text ?? ""]), [text]);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!startOnVisible || !ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible || phrases.length === 0) return undefined;

    const currentText = phrases[textIndex] ?? "";
    let timeout;

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setTextIndex((index) => (index + 1) % phrases.length);
        setCharIndex(0);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((value) => value.slice(0, -1));
        }, deletingSpeed);
      }
    } else if (charIndex < currentText.length) {
      timeout = setTimeout(
        () => {
          setDisplayedText((value) => value + currentText[charIndex]);
          setCharIndex((index) => index + 1);
        },
        charIndex === 0 ? initialDelay : typingSpeed
      );
    } else if (loop && phrases.length > 1) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    deletingSpeed,
    displayedText,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    pauseDuration,
    phrases,
    textIndex,
    typingSpeed,
  ]);

  return (
    <span ref={ref} className={className}>
      <span>{displayedText}</span>
      {showCursor && (
        <motion.span
          aria-hidden="true"
          className="ml-1 inline-block text-[#00c2b8]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        >
          {cursor}
        </motion.span>
      )}
    </span>
  );
}
