// CallToAction.tsx
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Email, LinkedIn, GitHub } from "@mui/icons-material";

interface CallToActionProps {
  darkMode: boolean;
}

export const CallToAction = ({ darkMode }: CallToActionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          mt: 8,
          p: 6,
          textAlign: "center",
          borderRadius: 4,
          background: darkMode
            ? "linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)",
          border: `2px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
          backdropFilter: "blur(10px)"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: darkMode
              ? "linear-gradient(45deg, #ff6b9d, #00d4ff)"
              : "linear-gradient(45deg, #9c27b0, #1976d2)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          Let's Build Something Amazing Together
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
          I'm always excited to work on new projects and collaborate with innovative teams. 
          Feel free to reach out!
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<Email />}
              sx={{
                background: darkMode
                  ? "linear-gradient(45deg, #ff6b9d, #00d4ff)"
                  : "linear-gradient(45deg, #9c27b0, #1976d2)",
                fontSize: "1rem",
                py: 1.5,
                px: 3
              }}
            >
              Get in Touch
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              startIcon={<LinkedIn />}
              sx={{
                borderColor: darkMode ? "#00d4ff" : "#1976d2",
                color: darkMode ? "#00d4ff" : "#1976d2",
                fontSize: "1rem",
                py: 1.5,
                px: 3,
                "&:hover": {
                  borderColor: darkMode ? "#ff6b9d" : "#9c27b0",
                  bgcolor: darkMode ? "rgba(255, 107, 157, 0.1)" : "rgba(156, 39, 176, 0.05)"
                }
              }}
            >
              LinkedIn
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              startIcon={<GitHub />}
              sx={{
                borderColor: darkMode ? "#00d4ff" : "#1976d2",
                color: darkMode ? "#00d4ff" : "#1976d2",
                fontSize: "1rem",
                py: 1.5,
                px: 3,
                "&:hover": {
                  borderColor: darkMode ? "#ff6b9d" : "#9c27b0",
                  bgcolor: darkMode ? "rgba(255, 107, 157, 0.1)" : "rgba(156, 39, 176, 0.05)"
                }
              }}
            >
              GitHub
            </Button>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};
