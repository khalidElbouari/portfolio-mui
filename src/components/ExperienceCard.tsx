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
  ArrowForwardIos,
  Visibility,
  LocationOn,
  Timeline
} from "@mui/icons-material";
import { getTechIcon, getTechColor } from "../utils/techConfig";
import { techChipVariants } from "../utils/animations";
import { useState } from "react";
import { ImageModal } from "./ImageModal";

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
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Box component={motion.div} layout transition={{ type: "spring", stiffness: 260, damping: 25 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            background: darkMode
              ? "linear-gradient(180deg, rgba(12,21,36,0.95) 0%, rgba(12,21,36,0.75) 100%)"
              : "linear-gradient(180deg, rgba(248,250,252,0.98) 0%, rgba(255,255,255,0.99) 100%)",
            border: "1px solid",
            borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
            backdropFilter: "blur(12px)",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: { xs: "auto", md: 480, lg: 380 }
            }}
          >
            {/* Compact Image Section */}
            {hasImages && (
              <Box
                sx={{
                  position: "relative",
                  flex: "0 0 auto",
                  width: { xs: "100%", md: 420, lg: 420 },
                  maxWidth: { xs: "100%", md: 420 },
                  aspectRatio: "16 / 9",
                  borderRight: { md: "1px solid" },
                  borderColor: "divider",
                  bgcolor: darkMode ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.04)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    "& .image": {
                      transform: "scale(1.03)"
                    }
                  }
                }}
                onClick={openModal}
              >
                {/* Main Image */}
                <Box
                  component={motion.img}
                  key={activeImage}
                  src={activeImage}
                  alt={`${experience.company} preview ${imageIndex + 1}`}
                  className="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  }}
                />
                {/* Right-edge gradient to visually integrate image with content (md+) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: { md: 12, lg: 16 },
                    pointerEvents: "none",
                    zIndex: 1,
                    background: darkMode
                      ? "linear-gradient(to right, rgba(12,21,36,0), rgba(12,21,36,0.12))"
                      : "linear-gradient(to right, rgba(255,255,255,0), rgba(15,23,42,0.08))",
                    display: { xs: "none", md: "block" }
                  }}
                />


                {/* Image Navigation - Compact */}
                {images.length > 1 && (
                  <>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrevImage();
                      }}
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        width: 32,
                        height: 32,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        backdropFilter: "blur(8px)",
                        zIndex: 2,
                        transition: "all 0.3s ease",
                        "&:hover": { 
                          bgcolor: "rgba(0,0,0,0.8)",
                          transform: "scale(1.1)"
                        }
                      }}
                    >
                      <ArrowBackIosNew fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNextImage();
                      }}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 32,
                        height: 32,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        backdropFilter: "blur(8px)",
                        zIndex: 2,
                        transition: "all 0.3s ease",
                        "&:hover": { 
                          bgcolor: "rgba(0,0,0,0.8)",
                          transform: "scale(1.1)"
                        }
                      }}
                    >
                      <ArrowForwardIos fontSize="small" />
                    </IconButton>
                    
                    {/* Compact Image Counter */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backdropFilter: "blur(8px)",
                        zIndex: 2
                      }}
                    >
                      {imageIndex + 1}/{images.length}
                    </Box>
                  </>
                )}
              </Box>
            )}

            {/* Content Section - Now takes more space */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                p: { xs: 3, sm: 4, lg: 3 },
                gap: { xs: 2.5, lg: 2 }
              }}
            >
              {/* Header with Company Info */}
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <WorkOutline fontSize="medium" color="primary" />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      fontSize: { xs: "1.3rem", sm: "1.4rem", lg: "1.25rem" }
                    }}
                  >
                    {experience.position}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <Business fontSize="small" color="action" />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      fontSize: "1.05rem"
                    }}
                  >
                    {experience.company}
                  </Typography>
                </Stack>

                {experience.location && (
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {experience.location}
                    </Typography>
                  </Stack>
                )}

                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
                  <CalendarMonth fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {experience.period}
                  </Typography>
                  {experience.duration && (
                    <Chip
                      label={experience.duration}
                      size="small"
                      sx={{
                        bgcolor: darkMode ? "rgba(255,193,7,0.15)" : "rgba(255,152,0,0.15)",
                        color: darkMode ? "#ffc107" : "#ff9800",
                        height: 26,
                        fontWeight: 600,
                        fontSize: "0.75rem"
                      }}
                    />
                  )}
                  {experience.type && (
                    <Chip
                      label={experience.type}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 26,
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        borderColor: "primary.main",
                        color: "primary.main"
                      }}
                    />
                  )}
                </Stack>
              </Box>

              <Divider sx={{ opacity: 0.5 }} />

              {/* Description */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: "0.95rem", lg: "0.9rem" },
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden"
                }}
              >
                {experience.description}
              </Typography>

              {/* Key Achievements - Compact */}
              {experience.achievements && experience.achievements.length > 0 && (
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}>
                    Key Achievements
                  </Typography>
                  <Stack spacing={1}>
                    {experience.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <Timeline fontSize="small" color="primary" sx={{ mt: 0.2, fontSize: "0.9rem" }} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ 
                            lineHeight: 1.5, 
                            fontSize: { xs: "0.9rem", lg: "0.85rem" },
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden"
                          }}
                        >
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                    {experience.achievements.length > 2 && (
                      <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        sx={{ fontStyle: "italic", ml: 3 }}
                      >
                        +{experience.achievements.length - 2} more achievements
                      </Typography>
                    )}
                  </Stack>
                </Box>
              )}

              {/* Technologies - Compact */}
              {experience.technologies && experience.technologies.length > 0 && (
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}>
                    Technologies & Tools
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    <AnimatePresence>
                      {experience.technologies.slice(0, 8).map((tech: string, idx: number) => (
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
                              bgcolor: `${getTechColor(tech)}18`,
                              color: getTechColor(tech),
                              border: `1px solid ${getTechColor(tech)}35`,
                              height: { xs: 28, lg: 26 },
                              fontSize: { xs: "0.75rem", lg: "0.72rem" },
                              fontWeight: 500,
                              '& .MuiChip-icon': {
                                fontSize: { xs: "0.9rem", lg: "0.85rem" }
                              },
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "translateY(-1px)",
                                boxShadow: `0 4px 12px ${getTechColor(tech)}25`
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                      {experience.technologies.length > 8 && (
                        <Chip
                          label={`+${experience.technologies.length - 8} more`}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: { xs: 28, lg: 26 },
                            fontSize: { xs: "0.75rem", lg: "0.72rem" },
                            fontWeight: 500
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </Box>
                </Box>
              )}

              {/* Action Button */}
              <Box sx={{ mt: "auto" }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider"
                  }}
                >
                  {hasImages && (
                    <IconButton
                      size="medium"
                      onClick={openModal}
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: darkMode ? "rgba(0,212,255,0.12)" : "rgba(25,118,210,0.12)",
                        color: darkMode ? "#00d4ff" : "#1976d2",
                        border: `1px solid ${darkMode ? "rgba(0,212,255,0.3)" : "rgba(25,118,210,0.3)"}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: darkMode ? "rgba(0,212,255,0.2)" : "rgba(25,118,210,0.2)",
                          transform: "translateY(-2px)",
                          boxShadow: darkMode 
                            ? "0 6px 20px rgba(0,212,255,0.4)" 
                            : "0 6px 20px rgba(25,118,210,0.4)"
                        }
                      }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Image Modal */}
      <ImageModal
        open={modalOpen}
        onClose={closeModal}
        images={images}
        initialIndex={imageIndex}
        title={`${experience.position} at ${experience.company}`}
      />
    </>
  );
};