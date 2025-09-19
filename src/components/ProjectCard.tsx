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
  ArrowForwardIos
} from "@mui/icons-material";
import { getTechIcon, getTechColor } from "../utils/techConfig";
import { techChipVariants } from "../utils/animations";

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

  return (
    <Box component={motion.div} layout transition={{ type: "spring", stiffness: 260, damping: 25 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: darkMode
            ? "linear-gradient(180deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 100%)"
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
                flexBasis: { md: "45%" },
                borderRadius: 2.5,
                overflow: "hidden",
                height: { xs: 220, md: 320 },
                bgcolor: "rgba(15,23,42,0.08)"
              }}
            >
              <Box
                component="img"
                src={activeImage}
                alt={`${project.title} preview ${imageIndex + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
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
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  letterSpacing: "-0.01em"
                }}
              >
                {project.title}
              </Typography>

              {(orgLogo || orgName) && (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  {orgLogo && (
                    <Box
                      component="img"
                      src={orgLogo}
                      alt={orgName ? `${orgName} logo` : "Organization logo"}
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: 1,
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

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <CalendarMonth fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {project.period}
                </Typography>
                {project.duration && (
                  <Chip
                    label={project.duration}
                    size="small"
                    sx={{
                      bgcolor: darkMode ? "rgba(255,107,157,0.12)" : "rgba(156,39,176,0.12)",
                      color: darkMode ? "#ff6b9d" : "#9c27b0",
                      height: 24,
                      fontWeight: 600
                    }}
                  />
                )}
              </Stack>
            </Box>

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
              {project.description}
            </Typography>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: "block" }}>
                Technologies
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                <AnimatePresence>
                  {project.technologies.map((tech: string, idx: number) => (
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
                Project Highlights
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Designed for extensibility: add per-image notes, metrics, or links here without layout shifts.
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                pt: 1.5,
                borderTop: "1px solid",
                borderColor: "divider"
              }}
            >
              {project.githubLink ? (
                <IconButton
                  size="small"
                  component="a"
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
                    '&:hover': {
                      bgcolor: "primary.main",
                      color: "primary.contrastText"
                    }
                  }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  size="small"
                  disabled
                  sx={{
                    bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)"
                  }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              )}
              {project.projectLink ? (
                <IconButton
                  size="small"
                  component="a"
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
                    '&:hover': {
                      bgcolor: "primary.main",
                      color: "primary.contrastText"
                    }
                  }}
                >
                  <Launch fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  size="small"
                  disabled
                  sx={{
                    bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)"
                  }}
                >
                  <Launch fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
