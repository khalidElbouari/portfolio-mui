import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { PlayArrow, Pause } from "@mui/icons-material";

interface PlaybackControlsProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  activeIndex: number;
  setActiveIndex: (value: number) => void;
  items: any[];
  darkMode: boolean;
  color: 'project' | 'experience';
}

export const PlaybackControls = ({ 
  isPlaying, 
  setIsPlaying, 
  activeIndex, 
  setActiveIndex, 
  items, 
  darkMode,
  color 
}: PlaybackControlsProps) => {
  const primaryColor = color === 'experience' 
    ? (darkMode ? "#00d4ff" : "#1976d2")
    : (darkMode ? "#ff6b9d" : "#9c27b0");

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <IconButton
          onClick={() => setIsPlaying(!isPlaying)}
          sx={{
            bgcolor: `${primaryColor}15`,
            "&:hover": { 
              bgcolor: `${primaryColor}25` 
            }
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
      </motion.div>

      <Box sx={{ display: "flex", gap: 1 }}>
        {items.map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Box
              onClick={() => {
                setActiveIndex(index);
                setIsPlaying(false);
              }}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: activeIndex === index ? primaryColor : "grey.500",
                opacity: activeIndex === index ? 1 : 0.5,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};