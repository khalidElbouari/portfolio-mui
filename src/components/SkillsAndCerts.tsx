import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Launch, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import { containerVariants, sectionVariants } from "../utils/animations";
import { getTechColor, getTechIcon } from "../utils/techConfig";

// Fallback functions in case the utils are not working
const fallbackGetTechColor = (tech: string): string => {
  const colors: { [key: string]: string } = {
    Java: "#f89820",
    "Spring Boot": "#6db33f",
    React: "#61dafb",
    Angular: "#dd0031",
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    HTML: "#e34f26",
    CSS: "#1572b6",
    MySQL: "#4479a1",
    Docker: "#2496ed",
    Git: "#f05032"
  };
  return colors[tech] || "#6366f1";
};

const fallbackGetTechIcon = (tech: string): React.ReactNode => {
  const icons: { [key: string]: string } = {
    Java: "☕",
    "Spring Boot": "🍃",
    React: "⚛️",
    Angular: "🅰️",
    TypeScript: "📘",
    JavaScript: "📜",
    HTML: "📄",
    CSS: "🎨",
    MySQL: "🗄️",
    Docker: "🐳",
    Git: "📝"
  };
  return icons[tech] || "🔧";
};

export default function SkillsAndCerts() {
  const { darkMode } = useThemeContext();
  const { cv, t } = useTranslation();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const certsPerPage = isXs ? 1 : isSm ? 2 : 3;
  const [certPage, setCertPage] = useState(0);
 
  // Safely get certifications with fallback
  const certifications = cv?.certifications ?? [];
 
  const totalCertPages = Math.max(1, Math.ceil(certifications.length / certsPerPage));
  useEffect(() => {
    if (certPage >= totalCertPages) {
      setCertPage(totalCertPages - 1);
    }
  }, [certPage, totalCertPages]);
 
  const startIdx = certPage * certsPerPage;
  const endIdx = Math.min(startIdx + certsPerPage, certifications.length);
  const visibleCerts = certifications.slice(startIdx, endIdx);
  const showCertNav = certifications.length > certsPerPage;
  const handlePrevCerts = () => setCertPage((p) => (p - 1 + totalCertPages) % totalCertPages);
  const handleNextCerts = () => setCertPage((p) => (p + 1) % totalCertPages);

  // Safely get skills with fallback
  const skillEntries = useMemo(
    () => {
      if (!cv?.skills || typeof cv.skills !== 'object') {
        return [];
      }
      return Object.entries(cv.skills) as Array<[string, string[]]>;
    },
    [cv?.skills]
  );

  const categorySummary = useMemo(
    () =>
      skillEntries.map(([category, list]) => ({
        key: category,
        label: t(`portfolio.resume.categories.${category}`, category),
        items: Array.isArray(list) ? list : []
      })),
    [skillEntries, t]
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(
    categorySummary.length > 0 ? categorySummary[0].key : null
  );

  useEffect(() => {
    if (!categorySummary.length) {
      setActiveCategory(null);
      return;
    }
    setActiveCategory((prev) => {
      if (prev && categorySummary.some((item) => item.key === prev)) {
        return prev;
      }
      return categorySummary[0].key;
    });
  }, [categorySummary]);

  const activeCategoryData = useMemo(() => {
    if (!activeCategory) {
      return { key: null, label: '', items: [] as string[] };
    }
    return (
      categorySummary.find((entry) => entry.key === activeCategory) ?? {
        key: activeCategory,
        label: activeCategory,
        items: [] as string[]
      }
    );
  }, [activeCategory, categorySummary]);


  const skillIntroTitle = t(
    'portfolio.resume.skillsMinimal.title',
    'Tech stack, streamlined'
  );

  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);

  const activeCert = activeCertIndex !== null ? certifications[activeCertIndex] : null;

  const certCardBg = theme.palette.background.paper;

  // Safe tech color and icon functions with fallback
  const safeGetTechColor = (tech: string): string => {
    try {
      return getTechColor(tech);
    } catch {
      return fallbackGetTechColor(tech);
    }
  };

  const safeGetTechIcon = (tech: string): React.ReactNode => {
    try {
      return getTechIcon(tech);
    } catch {
      return fallbackGetTechIcon(tech);
    }
  };

  return (
    <Container id="skills" maxWidth="xl" sx={{ py: { xs: 6, sm: 8, md: 10 } }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Box component={motion.section} variants={sectionVariants}>
          <SectionHeader
            title={`${t("portfolio.resume.skills", "Skills")} | ${t("portfolio.resume.certifications", "Certifications")}`}
            subtitle={t("portfolio.resume.skillsSubtitle", "Curated skills and verified certifications")}
            darkMode={darkMode}
            icon="none"
            sx={{
              mb: 5,
              '& .MuiTypography-h2': {
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 800
              }
            }}
          />

          <Box sx={{ display: "grid", gap: 3.5 }}>
            {/* Certifications */}
            {certifications.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 0,
                  px: { xs: 2.5, md: 4 },
                  py: { xs: 3, md: 4 },
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '1.5rem' }}>
                    {t("portfolio.resume.certifications", "Certifications")} ({certifications.length})
                  </Typography>
                  {showCertNav && (
                    <Stack direction="row" spacing={1} sx={{ direction: 'ltr' }}>
                      <IconButton
                        size="small"
                        onClick={handlePrevCerts}
                        aria-label="Previous certifications"
                        sx={{
                          bgcolor: 'transparent',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <ArrowBackIosNew fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={handleNextCerts}
                        aria-label="Next certifications"
                        sx={{
                          bgcolor: 'transparent',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <ArrowForwardIos fontSize="small" />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gap: { xs: 2, md: 2.5 },
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)"
                    }
                  }}
                >
                  {visibleCerts.map((cert, idx) => {
                    const absoluteIdx = startIdx + idx;
                    return (
                      <motion.div
                        key={`${cert.name}-${absoluteIdx}`}
                        whileHover={{ translateY: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            height: "100%",
                            p: 1,
                            borderRadius: 3,
                            backgroundColor: certCardBg,
                            position: "relative",
                            overflow: "hidden",
                            boxShadow: "none",
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-4px) scale(1.01)',
                              boxShadow: theme.shadows[4]
                            }
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              borderRadius: 2,
                              overflow: "hidden",
                              mb: 1.5,
                              aspectRatio: '4 / 3',
                              maxHeight: { xs: 120, sm: 140, md: 160 },
                              width: "100%",
                              bgcolor: alpha(theme.palette.text.primary, 0.05),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Box
                              component="img"
                              src={cert.image}
                              alt={`${cert.name} badge`}
                              sx={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                                display: "block",
                                mx: "auto",
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                  transform: 'scale(1.05)'
                                }
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </Box>
 
                          <Stack spacing={0.8} sx={{ pb: 1 }}>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 800,
                                  lineHeight: 1.2,
                                  fontSize: '0.95rem'
                                }}
                              >
                                {cert.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '0.85rem'
                                }}
                              >
                                {cert.issuer}
                              </Typography>
                            </Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                fontWeight: 500,
                                fontSize: '0.75rem'
                              }}
                            >
                              {cert.year}
                            </Typography>
                          </Stack>
 
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box
                              component="a"
                              href={cert.link ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ textDecoration: "none" }}
                            >
                              <Button
                                variant="text"
                                size="small"
                                endIcon={<Launch fontSize="small" />}
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                  }
                                }}
                              >
                                {t("portfolio.resume.certificationVerify", "Verify")}
                              </Button>
                            </Box>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setActiveCertIndex(absoluteIdx)}
                              sx={{
                                textTransform: "none",
                                borderRadius: 999,
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                borderColor: alpha(theme.palette.text.primary, 0.3),
                                '&:hover': {
                                  borderColor: theme.palette.primary.main,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                }
                              }}
                            >
                              {t("portfolio.resume.certificationMore", "Details")}
                            </Button>
                          </Stack>
                        </Paper>
                      </motion.div>
                    );
                  })}
                </Box>
              </Paper>
            )}

            {/* Skills */}
            {categorySummary.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 0,
                  px: { xs: 2.5, md: 4 },
                  py: { xs: 3, md: 4 },
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                <Stack spacing={{ xs: 3, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {skillIntroTitle}
                    </Typography>
                  </Box>

                  {/* Category Buttons - Simplified */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      justifyContent: 'center'
                    }}
                  >
                    {categorySummary.map((category) => {
                      const isActive = category.key === activeCategory;
                      return (
                        <Box
                          key={category.key}
                          component={motion.button}
                          type="button"
                          onClick={() => setActiveCategory(category.key)}
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                          sx={{
                            borderRadius: 25,
                            px: 3,
                            py: 1.2,
                            background: isActive
                              ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                              : alpha(theme.palette.background.paper, darkMode ? 0.3 : 0.7),
                            color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                            border: '1px solid',
                            borderColor: isActive
                              ? theme.palette.primary.main
                              : alpha(theme.palette.divider, 0.5),
                            fontSize: { xs: 13, sm: 14, md: 16 },
                            fontWeight: isActive ? 700 : 600,
                            textTransform: 'capitalize',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            boxShadow: isActive
                              ? `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`
                              : `0 2px 10px ${alpha(theme.palette.divider, 0.1)}`,
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(90deg,
                                ${alpha(theme.palette.primary.main, 0.1)},
                                transparent)`,
                              opacity: isActive ? 1 : 0,
                              transition: 'opacity 0.3s ease'
                            }
                          }}
                        >
                          {category.label}
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Compact Technologies Grid */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: { xs: 1, sm: 1.2, md: 1.5 },
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      py: 1
                    }}
                  >
                    {activeCategoryData.items.map((tech, index) => {
                      const color = safeGetTechColor(tech);
                      const icon = safeGetTechIcon(tech);
                      return (
                        <Box
                          key={`${activeCategoryData.key}-${tech}`}
                          component={motion.div}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.03,
                            type: "spring",
                            stiffness: 300
                          }}
                          whileHover={{
                            scale: 1.15,
                            translateY: -6,
                            transition: { duration: 0.25 }
                          }}
                          whileTap={{ scale: 1.05 }}
                          sx={{
                            textAlign: 'center',
                            position: 'relative',
                            width: { xs: 72, sm: 80, md: 92 },
                            cursor: 'pointer'
                          }}
                        >
                          {/* Icon Container */}
                          <Box
                            sx={{
                              mx: 'auto',
                              width: { xs: 52, sm: 58, md: 64 },
                              height: { xs: 52, sm: 58, md: 64 },
                              borderRadius: 2.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: color,
                              border: `1px solid ${alpha(color, 0.25)}`,
                              backgroundColor: `${alpha(color, 0.06)}`,
                              fontSize: { xs: 22, sm: 26, md: 30 },
                              transition: 'transform 0.2s ease',
                              cursor: 'pointer',
                              boxShadow: 'none'
                            }}
                          >
                            {icon}
                          </Box>
                          
                          {/* Technology Name */}
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 0.8,
                              fontWeight: 700,
                              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                              display: 'block',
                              lineHeight: 1.1,
                              color: theme.palette.text.primary,
                              transition: 'all 0.2s ease',
                              textShadow: darkMode ? `0 0 8px ${alpha(color, 0.4)}` : 'none'
                            }}
                          >
                            {tech}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>

                </Stack>
              </Paper>
            )}
          </Box>
        </Box>
      </motion.div>

      {activeCert && (
        <Dialog open onClose={() => setActiveCertIndex(null)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>{activeCert.name}</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5}>
              <Box
                component="img"
                src={activeCert.image}
                alt={`${activeCert.name} badge`}
                sx={{ width: "100%", borderRadius: 2, objectFit: "cover" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {t("portfolio.resume.certificationIssued", "Issued by")}: {activeCert.issuer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("portfolio.resume.certificationYear", "Year")}: {activeCert.year}
              </Typography>
              {Array.isArray(activeCert.skillsAcquired) && activeCert.skillsAcquired.length > 0 && (
                <Box sx={{ mt: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    {t("portfolio.resume.skillsAcquired", "Skills acquired")}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {activeCert.skillsAcquired.map((skill: string, i: number) => (
                      <Chip
                        key={`${activeCert.name}-skill-${i}`}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontWeight: 700,
                          borderColor: alpha(theme.palette.text.primary, 0.2),
                          backgroundColor: alpha(theme.palette.text.primary, 0.04)
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setActiveCertIndex(null)}>
              {t("common.close", "Close")}
            </Button>
            <Box
              component="a"
              href={activeCert?.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                endIcon={<Launch fontSize="small" />}
              >
                {t("portfolio.resume.certificationVerify", "View verification")}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
