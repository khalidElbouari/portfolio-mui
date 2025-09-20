import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Fade,
  Grow
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import {
  CalendarMonth,
  School,
  Grade,
  LocationOn,
  WorkspacePremium,
  Code,
  EmojiEvents
} from "@mui/icons-material";
import { containerVariants, sectionVariants } from "../utils/animations";
import { useState } from "react";

export default function Education() {
  const { darkMode } = useThemeContext();
  const { cv, t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Enhanced color scheme
  const timelineGradient = darkMode 
    ? "linear-gradient(180deg, #00d4ff 0%, #0891b2 50%, #0e7490 100%)"
    : "linear-gradient(180deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)";
  
  const cardBackground = darkMode
    ? "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.85) 100%)"
    : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)";

  const glowColor = darkMode ? "rgba(0,212,255,0.3)" : "rgba(59,130,246,0.2)";

  // Timeline item animation variants
  const timelineItemVariants = {
    hidden: { 
      opacity: 0, 
      x: isTablet ? -20 : -50,
      scale: 0.95
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    })
  };

  // Pulse animation for active items
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const getStatusColor = (status?: string) => {
    if (status === "In progress") return darkMode ? "#10b981" : "#059669";
    return darkMode ? "#8b5cf6" : "#7c3aed";
  };

  const getProjectIcon = (project: string) => {
    if (project.toLowerCase().includes("java")) return <Code />;
    if (project.toLowerCase().includes("smart")) return <EmojiEvents />;
    return <WorkspacePremium />;
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Box component={motion.section} variants={sectionVariants}>
          <SectionHeader
            title={t("portfolio.resume.education", "Education")}
            subtitle={t("portfolio.resume.educationSubtitle", "Academic journey and achievements")}
            darkMode={darkMode}
            icon="education"
          />

          {/* Timeline Container */}
          <Box
            sx={{
              position: "relative",
              mt: { xs: 4, md: 6 },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                left: { xs: 20, sm: 30, md: "50%" },
                transform: { md: "translateX(-1.5px)" },
                width: 3,
                background: timelineGradient,
                borderRadius: 999,
                boxShadow: `0 0 20px ${glowColor}`,
              }
            }}
          >
            <Stack spacing={{ xs: 4, md: 6 }}>
              {cv.education.map((edu, idx) => {
                const isLeft = !isTablet && idx % 2 === 0;
                const isActive = edu.status === "In progress";
                
                return (
                  <motion.div
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={timelineItemVariants}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: { 
                          xs: "flex-start", 
                          md: isLeft ? "flex-end" : "flex-start" 
                        },
                        pl: { xs: 6, sm: 8, md: 0 },
                        pr: { xs: 0, md: 0 }
                      }}
                    >
                      {/* Timeline Node */}
                      <Box
                        component={motion.div}
                        animate={isActive ? pulseAnimation : {}}
                        sx={{
                          position: "absolute",
                          left: { xs: 20, sm: 30, md: "50%" },
                          transform: { 
                            xs: "translate(-50%, 8px)", 
                            md: "translate(-50%, 16px)" 
                          },
                          zIndex: 2
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            borderRadius: "50%",
                            background: cardBackground,
                            border: `3px solid ${theme.palette.background.default}`,
                            boxShadow: `0 0 25px ${isActive ? glowColor : 'transparent'}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            "&::before": isActive ? {
                              content: '""',
                              position: "absolute",
                              inset: -8,
                              borderRadius: "50%",
                              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                              animation: "pulse 2s ease-in-out infinite"
                            } : {}
                          }}
                        >
                          <School 
                            sx={{ 
                              fontSize: { xs: 20, md: 24 },
                              background: timelineGradient,
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              color: "transparent"
                            }} 
                          />
                        </Box>
                      </Box>

                      {/* Education Card */}
                      <Paper
                        elevation={hoveredIndex === idx ? 12 : 4}
                        sx={{
                          width: { xs: "100%", md: "45%" },
                          background: cardBackground,
                          backdropFilter: "blur(20px)",
                          border: "1px solid",
                          borderColor: darkMode 
                            ? "rgba(255,255,255,0.08)" 
                            : "rgba(0,0,0,0.06)",
                          borderRadius: 3,
                          overflow: "hidden",
                          position: "relative",
                          transform: hoveredIndex === idx ? "scale(1.02)" : "scale(1)",
                          transition: "all 0.3s ease",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: isActive ? timelineGradient : "transparent"
                          }
                        }}
                      >
                        <Box sx={{ p: { xs: 2.5, sm: 3, md: 3.5 } }}>
                          {/* Header with Institution Logo */}
                          <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
                            <Avatar
                              src={edu.institutionLogo}
                              alt={edu.institution}
                              sx={{
                                width: { xs: 48, md: 56 },
                                height: { xs: 48, md: 56 },
                                bgcolor: darkMode 
                                  ? "rgba(255,255,255,0.05)" 
                                  : "rgba(0,0,0,0.03)",
                                border: "2px solid",
                                borderColor: darkMode 
                                  ? "rgba(255,255,255,0.1)" 
                                  : "rgba(0,0,0,0.08)"
                              }}
                            >
                              <School />
                            </Avatar>
                            
                            <Box flex={1}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 700,
                                  fontSize: { xs: "1rem", md: "1.125rem" },
                                  mb: 0.5
                                }}
                              >
                                {edu.degree}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                              >
                                {edu.institution}
                              </Typography>
                            </Box>
                          </Stack>

                          {/* Details Grid */}
                          <Stack spacing={1.5} mb={2}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CalendarMonth 
                                fontSize="small" 
                                sx={{ color: "text.secondary", fontSize: 18 }} 
                              />
                              <Typography variant="body2" color="text.secondary">
                                {edu.period}
                              </Typography>
                            </Box>
                            
                            {edu.location && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <LocationOn 
                                  fontSize="small" 
                                  sx={{ color: "text.secondary", fontSize: 18 }} 
                                />
                                <Typography variant="body2" color="text.secondary">
                                  {edu.location}
                                </Typography>
                              </Box>
                            )}

                            {edu.grade && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Grade 
                                  fontSize="small" 
                                  sx={{ color: "text.secondary", fontSize: 18 }} 
                                />
                                <Typography variant="body2" color="text.secondary">
                                  {t("portfolio.resume.grade", "Grade")}: {edu.grade}
                                </Typography>
                              </Box>
                            )}
                          </Stack>

                          {/* Status and Projects */}
                          <Stack spacing={1.5}>
                            {edu.status && (
                              <Chip 
                                label={edu.status}
                                size="small"
                                sx={{
                                  alignSelf: "flex-start",
                                  background: `${getStatusColor(edu.status)}20`,
                                  color: getStatusColor(edu.status),
                                  border: `1px solid ${getStatusColor(edu.status)}40`,
                                  fontWeight: 600,
                                  animation: isActive ? "pulse 2s ease-in-out infinite" : "none"
                                }}
                              />
                            )}
                            
                            {edu.projects && (
                              <Box>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary" 
                                  sx={{ fontWeight: 600, mb: 1, display: "block" }}
                                >
                                  Key Projects:
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                  {edu.projects.map((project, pidx) => (
                                    <Chip
                                      key={pidx}
                                      icon={getProjectIcon(project)}
                                      label={project}
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        fontSize: "0.75rem",
                                        height: 26,
                                        borderColor: darkMode 
                                          ? "rgba(255,255,255,0.15)" 
                                          : "rgba(0,0,0,0.12)",
                                        "& .MuiChip-icon": {
                                          fontSize: 16
                                        }
                                      }}
                                    />
                                  ))}
                                </Stack>
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      </Paper>
                    </Box>
                  </motion.div>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </Container>
  );
}