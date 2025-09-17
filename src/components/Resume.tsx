import { Box, Chip, Container, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import {
  CalendarMonth,
  School,
  WorkspacePremium,
  Translate
} from "@mui/icons-material";
import { containerVariants, sectionVariants, techChipVariants } from "../utils/animations";
import { getTechColor } from "../utils/techConfig";

export default function Resume() {
  const { darkMode } = useThemeContext();
  const { cv, locale, t } = useTranslation();
  const isRtl = locale === "ar";

  const labels = {
    title: t("portfolio.resume.title", "Background & Skills"),
    subtitle: t("portfolio.resume.subtitle", "Education, certifications, skills, and languages"),
    education: t("portfolio.resume.education", "Education"),
    certifications: t("portfolio.resume.certifications", "Certifications"),
    skills: t("portfolio.resume.skills", "Skills"),
    languages: t("portfolio.resume.languages", "Languages"),
    categories: {
      backend: t("portfolio.resume.categories.backend", "Backend"),
      frontend: t("portfolio.resume.categories.frontend", "Frontend"),
      devops: t("portfolio.resume.categories.devops", "DevOps"),
      databases: t("portfolio.resume.categories.databases", "Databases"),
      other: t("portfolio.resume.categories.other", "Other")
    }
  };

  const cardBg = darkMode
    ? "linear-gradient(135deg, rgba(0, 212, 255, 0.06) 0%, rgba(255, 107, 157, 0.04) 50%, rgba(10, 10, 20, 0.9) 100%)"
    : "linear-gradient(135deg, rgba(25, 118, 210, 0.04) 0%, rgba(156, 39, 176, 0.03) 50%, rgba(255, 255, 255, 0.98) 100%)";

  return (
    <Container maxWidth="xl" sx={{ py: 8, direction: isRtl ? "rtl" : "ltr" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Box
          component={motion.section}
          variants={sectionVariants}
          sx={{
            p: { xs: 2, sm: 4, md: 6 },
            borderRadius: 4,
            background: darkMode
              ? "linear-gradient(135deg, rgba(30, 30, 40, 0.5) 0%, rgba(20, 20, 30, 0.85) 100%)"
              : "linear-gradient(135deg, rgba(245, 248, 255, 0.9) 0%, rgba(240, 244, 250, 0.95) 100%)",
            border: `2px solid ${darkMode ? "rgba(0, 212, 255, 0.08)" : "rgba(25, 118, 210, 0.08)"}`,
            backdropFilter: "blur(10px)"
          }}
        >
          <SectionHeader
            title={labels.title}
            subtitle={labels.subtitle}
            darkMode={darkMode}
            icon="code"
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Education */}
            <Box>
              <Paper
                sx={{ p: 2.5, borderRadius: 3, background: cardBg, border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <School sx={{ color: darkMode ? "#00d4ff" : "#1976d2" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{labels.education}</Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {cv.education.map((edu, idx) => (
                    <Tooltip
                      key={idx}
                      title={
                        <Box>
                          {edu.status && (
                            <Typography variant="body2">{edu.status}</Typography>
                          )}
                          {edu.grade && (
                            <Typography variant="body2">{t("portfolio.resume.grade", "Grade")}: {edu.grade}</Typography>
                          )}
                        </Box>
                      }
                      arrow
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background: darkMode
                            ? "linear-gradient(135deg, rgba(0, 212, 255, 0.06), rgba(255, 255, 255, 0.02))"
                            : "linear-gradient(135deg, rgba(25, 118, 210, 0.04), rgba(0, 0, 0, 0.01))",
                          border: `1px solid ${darkMode ? "rgba(0, 212, 255, 0.15)" : "rgba(25, 118, 210, 0.15)"}`,
                          transition: "all .25s",
                          '&:hover': { transform: 'translateY(-4px)', boxShadow: darkMode ? '0 8px 20px rgba(0, 212, 255, 0.15)' : '0 8px 20px rgba(25, 118, 210, 0.12)' }
                        }}
                      >
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{edu.degree}</Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                              {edu.institution}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <CalendarMonth fontSize="small" color="action" />
                              <Typography variant="caption" color="text.secondary">{edu.period}</Typography>
                            </Stack>
                            {edu.status && (
                              <Chip size="small" label={edu.status} sx={{ height: 22 }} />
                            )}
                            {edu.grade && (
                              <Chip size="small" label={`${t("portfolio.resume.grade", "Grade")}: ${edu.grade}`} sx={{ height: 22 }} />
                            )}
                          </Stack>
                        </Stack>
                      </Paper>
                    </Tooltip>
                  ))}
                </Stack>
              </Paper>
            </Box>

            {/* Certifications */}
            <Box>
              <Paper
                sx={{ p: 2.5, borderRadius: 3, background: cardBg, border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <WorkspacePremium sx={{ color: darkMode ? "#ff6b9d" : "#9c27b0" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{labels.certifications}</Typography>
                </Stack>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                  {cv.certifications.map((cert, idx) => (
                    <Tooltip key={idx} title={`${cert.issuer}${cert.year ? ` • ${cert.year}` : ''}`} arrow>
                      <Chip
                        label={cert.name}
                        sx={{
                          width: '100%',
                          justifyContent: 'space-between',
                          bgcolor: darkMode ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
                          border: `1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Paper>
            </Box>

            {/* Skills */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Paper
                sx={{ p: 2.5, borderRadius: 3, background: cardBg, border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{labels.skills}</Typography>
                </Stack>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                  {Object.entries(cv.skills).map(([key, list]) => (
                    <Box key={key}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                        {labels.categories[key as keyof typeof labels.categories] || key}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(list as string[]).map((tech, i) => (
                          <motion.div key={tech} variants={techChipVariants} initial="hidden" animate="visible" custom={i} whileHover="hover">
                            <Tooltip title={tech} arrow>
                              <Chip
                                label={tech}
                                size="small"
                                sx={{
                                  bgcolor: `${getTechColor(tech)}15`,
                                  color: getTechColor(tech),
                                  border: `1px solid ${getTechColor(tech)}30`,
                                  height: 26,
                                }}
                              />
                            </Tooltip>
                          </motion.div>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>

            {/* Languages */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Paper
                sx={{ p: 2.5, borderRadius: 3, background: cardBg, border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <Translate sx={{ color: darkMode ? "#10b981" : "#2e7d32" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>{labels.languages}</Typography>
                </Stack>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {cv.languages.map((lng, idx) => (
                    <Tooltip key={idx} title={lng.level} arrow>
                      <Chip
                        label={`${lng.name}`}
                        variant="outlined"
                        sx={{ height: 28 }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
