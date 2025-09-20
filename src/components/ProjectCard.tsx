// ProjectCard.tsx
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Paper,
  Stack
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitHub,
  Launch,
  CalendarMonth,
  ArrowBackIosNew,
  ArrowForwardIos,
  Visibility
} from "@mui/icons-material";
import { getTechIcon, getTechColor } from "../utils/techConfig";
import { techChipVariants } from "../utils/animations";
import { useState } from "react";
import { ImageModal } from "./ImageModal";

interface ProjectCardProps {
  project: any;
  darkMode: boolean;
  imageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  orgName?: string;
  orgLogo?: string;
  orgWebsite?: string;
}

export const ProjectCard = ({
  project,
  darkMode,
  imageIndex,
  onPrevImage,
  onNextImage,
  orgName,
  orgLogo,
  orgWebsite
}: ProjectCardProps) => {
  const images: string[] = Array.isArray(project.images) ? project.images : [];
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
              ? "linear-gradient(180deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 100%)"
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
                  alt={`${project.title} preview ${imageIndex + 1}`}
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
              {/* Header */}
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    letterSpacing: "-0.02em",
                    fontSize: { xs: "1.3rem", sm: "1.4rem", lg: "1.25rem" }
                  }}
                >
                  {project.title}
                </Typography>

                {(orgLogo || orgName) && (
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                    {orgLogo && (
                      <Box
                        component="img"
                        src={orgLogo}
                        alt={orgName ? `${orgName} logo` : "Organization logo"}
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: 1.5,
                          border: "1px solid",
                          borderColor: "divider",
                          objectFit: "contain",
                          bgcolor: "background.paper"
                        }}
                      />
                    )}
                    {orgName && (
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ fontWeight: 600 }}
                        component={orgWebsite ? "a" : "span"}
                        href={orgWebsite}
                        target={orgWebsite ? "_blank" : undefined}
                        rel={orgWebsite ? "noopener noreferrer" : undefined}
                      >
                        {orgName}
                      </Typography>
                    )}
                  </Stack>
                )}

                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
                  <CalendarMonth fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {project.period}
                  </Typography>
                  {project.duration && (
                    <Chip
                      label={project.duration}
                      size="small"
                      sx={{
                        bgcolor: darkMode ? "rgba(255,107,157,0.15)" : "rgba(156,39,176,0.15)",
                        color: darkMode ? "#ff6b9d" : "#9c27b0",
                        height: 26,
                        fontWeight: 600,
                        fontSize: "0.75rem"
                      }}
                    />
                  )}
                </Stack>
              </Box>

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
                {project.description}
              </Typography>

              {/* Technologies */}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}>
                  Technologies Used
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <AnimatePresence>
                    {project.technologies.slice(0, 8).map((tech: string, idx: number) => (
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
                    {project.technologies.length > 8 && (
                      <Chip
                        label={`+${project.technologies.length - 8} more`}
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

              {/* Action Buttons */}
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
                  {project.githubLink ? (
                    <IconButton
                      size="medium"
                      component="a"
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)"}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          transform: "translateY(-2px)",
                          boxShadow: darkMode 
                            ? "0 6px 20px rgba(0,212,255,0.3)" 
                            : "0 6px 20px rgba(25,118,210,0.3)"
                        }
                      }}
                    >
                      <GitHub fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="medium"
                      disabled
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)"
                      }}
                    >
                      <GitHub fontSize="small" />
                    </IconButton>
                  )}
                  {project.projectLink ? (
                    <IconButton
                      size="medium"
                      component="a"
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)"}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          transform: "translateY(-2px)",
                          boxShadow: darkMode 
                            ? "0 6px 20px rgba(0,212,255,0.3)" 
                            : "0 6px 20px rgba(25,118,210,0.3)"
                        }
                      }}
                    >
                      <Launch fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="medium"
                      disabled
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)"
                      }}
                    >
                      <Launch fontSize="small" />
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
        title={project.title}
      />
    </>
  );
};