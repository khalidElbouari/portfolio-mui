// ExperienceCard.tsx
import {
  Box,
  Typography,
  Chip,
  Paper,
  Stack,
  Divider,
  IconButton
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Business,
  CalendarMonth,
  WorkOutline,
  ArrowBackIosNew,
  ArrowForwardIos
} from "@mui/icons-material";
import { getTechIcon, getTechColor } from "../utils/techConfig";
import { techChipVariants } from "../utils/animations";

interface ExperienceCardProps {
  experience: any;
  darkMode: boolean;
  imageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export const ExperienceCard = ({
  experience,
  darkMode,
  imageIndex,
  onPrevImage,
  onNextImage
}: ExperienceCardProps) => {
  const images: string[] = Array.isArray(experience.images) ? experience.images : [];
  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[imageIndex % images.length] : undefined;

  return (
    <Box component={motion.div} layout transition={{ type: "spring", stiffness: 260, damping: 25 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: darkMode
            ? "linear-gradient(180deg, rgba(12,21,36,0.9) 0%, rgba(12,21,36,0.65) 100%)"
            : "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(255,255,255,0.98) 100%)",
          border: "1px solid",
          borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
          backdropFilter: "blur(10px)"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2.5, md: 3.5 }
          }}
        >
          {hasImages && (
            <Box
              sx={{
                position: "relative",
                flexBasis: { md: "40%" },
                borderRadius: 2.5,
                overflow: "hidden",
                height: { xs: 200, md: 300 },
                bgcolor: "rgba(15,23,42,0.08)"
              }}
            >
              <Box
                component="img"
                src={activeImage}
                alt={`${experience.position} visual ${imageIndex + 1}`}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {images.length > 1 && (
                <>
                  <IconButton
                    size="small"
                    onClick={onPrevImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 8,
                      transform: "translateY(-50%)",
                      bgcolor: "rgba(15,15,20,0.55)",
                      color: "#fff",
                      '&:hover': { bgcolor: "rgba(15,15,20,0.8)" }
                    }}
                  >
                    <ArrowBackIosNew fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={onNextImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 8,
                      transform: "translateY(-50%)",
                      bgcolor: "rgba(15,15,20,0.55)",
                      color: "#fff",
                      '&:hover': { bgcolor: "rgba(15,15,20,0.8)" }
                    }}
                  >
                    <ArrowForwardIos fontSize="small" />
                  </IconButton>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 12,
                      px: 1,
                      py: 0.25,
                      borderRadius: 999,
                      bgcolor: "rgba(15,15,20,0.65)",
                      color: "#fff",
                      fontSize: "0.7rem"
                    }}
                  >
                    {imageIndex + 1} / {images.length}
                  </Box>
                </>
              )}
            </Box>
          )}

          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <WorkOutline sx={{ color: darkMode ? "#00d4ff" : "#1976d2" }} />
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {experience.position}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Business fontSize="small" color="action" />
                <Typography variant="body2" color="text.primary" fontWeight={500}>
                  {experience.company}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <CalendarMonth fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {experience.period}
                </Typography>
                {experience.duration && (
                  <Chip
                    label={experience.duration}
                    size="small"
                    sx={{
                      bgcolor: darkMode ? "rgba(0,212,255,0.12)" : "rgba(25,118,210,0.12)",
                      color: darkMode ? "#00d4ff" : "#1976d2",
                      fontWeight: 600,
                      height: 24
                    }}
                  />
                )}
              </Stack>
            </Box>

            <Divider sx={{ opacity: 0.5 }} />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 6,
                overflow: "hidden"
              }}
            >
              {experience.description}
            </Typography>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: "block" }}>
                Tech Stack
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                <AnimatePresence>
                  {experience.technologies.map((tech: string, idx: number) => (
                    <motion.div
                      key={tech}
                      variants={techChipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      custom={idx}
                    >
                      <Chip
                        icon={getTechIcon(tech)}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: `${getTechColor(tech)}15`,
                          color: getTechColor(tech),
                          border: `1px solid ${getTechColor(tech)}30`,
                          height: 26,
                          fontSize: "0.75rem",
                          '& .MuiChip-icon': {
                            fontSize: "1rem"
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Box>
            </Box>

            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1.25 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Impact & Future Additions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reserve this space for detailed metrics, responsibilities, or per-image notes. Layout gracefully
                adapts as the content grows.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
