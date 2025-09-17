import { motion } from "framer-motion";

interface FloatingElementsProps {
  darkMode: boolean;
}

export const FloatingElements = ({ darkMode }: FloatingElementsProps) => {
  return (
    <>
      {/* Floating gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(156, 39, 176, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0
        }}
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(25, 118, 210, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0
        }}
      />

      {/* Animated particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: darkMode ? "#00d4ff" : "#1976d2",
            opacity: 0.6,
            zIndex: 1
          }}
        />
      ))}
    </>
  );
};