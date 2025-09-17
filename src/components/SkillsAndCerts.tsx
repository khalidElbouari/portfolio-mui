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
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Launch } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import { containerVariants, sectionVariants } from "../utils/animations";
import { getTechColor, getTechIcon } from "../utils/techConfig";

const bubbleTransition: Transition = { type: "spring", stiffness: 260, damping: 18 };

export default function SkillsAndCerts() {
  const { darkMode } = useThemeContext();
  const { cv, t } = useTranslation();
  const theme = useTheme();

  const certifications = cv.certifications ?? [];
  const skillEntries = useMemo(() => Object.entries(cv.skills ?? {}), [cv.skills]);

  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);

  const activeCert = activeCertIndex != null ? certifications[activeCertIndex] : null;

  const certCardBg = darkMode
    ? "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(10,16,28,0.75) 100%)"
    : "linear-gradient(135deg, rgba(244,247,255,0.95) 0%, rgba(255,255,255,0.98) 100%)";

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Box component={motion.section} variants={sectionVariants}>
          <SectionHeader
            title={`${t("portfolio.resume.skills", "Skills")} & ${t("portfolio.resume.certifications", "Certifications")}`}
            subtitle={t("portfolio.resume.skillsSubtitle", "Curated skills and verified certifications")}
            darkMode={darkMode}
            icon="code"
          />

          <Box sx={{ display: "grid", gap: 3.5 }}>
            {/* Certifications */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                px: { xs: 2.5, md: 4 },
                py: { xs: 3, md: 4 },
                background: darkMode
                  ? "linear-gradient(135deg, rgba(10,15,28,0.95) 0%, rgba(10,15,28,0.78) 100%)"
                  : "linear-gradient(135deg, rgba(250,252,255,0.96) 0%, rgba(241,244,255,0.94) 100%)",
                border: "1px solid",
                borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
                backdropFilter: "blur(10px)"
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
                {t("portfolio.resume.certifications", "Certifications")}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 2.5, md: 3 },
                  gridTemplateColumns: {
                    xs: "repeat(auto-fit, minmax(220px, 1fr))",
                    md: "repeat(auto-fit, minmax(240px, 1fr))"
                  }
                }}
              >
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={`${cert.name}-${idx}`}
                    whileHover={{ translateY: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        height: "100%",
                        p: 2.25,
                        borderRadius: 3,
                        background: certCardBg,
                        border: "1px solid",
                        borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden",
                          mb: 2,
                          height: 120,
                          bgcolor: alpha(theme.palette.text.primary, 0.05)
                        }}
                      >
                        <Box
                          component="img"
                          src={cert.image}
                          alt={`${cert.name} badge`}
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>

                      <Stack spacing={1.2} sx={{ pb: 1 }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                            {cert.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {cert.issuer}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {cert.year}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Button
                          variant="text"
                          size="small"
                          endIcon={<Launch fontSize="small" />}
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                          {t("portfolio.resume.certificationVerify", "Verify")}
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setActiveCertIndex(idx)}
                          sx={{ textTransform: "none", borderRadius: 999 }}
                        >
                          {t("portfolio.resume.certificationMore", "Details")}
                        </Button>
                      </Stack>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </Paper>

            {/* Skills */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                px: { xs: 2.5, md: 4 },
                py: { xs: 3, md: 4 },
                background: darkMode
                  ? "linear-gradient(135deg, rgba(10,15,28,0.92) 0%, rgba(14,20,35,0.78) 100%)"
                  : "linear-gradient(135deg, rgba(250,252,255,0.96) 0%, rgba(242,246,255,0.94) 100%)",
                border: "1px solid",
                borderColor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
                backdropFilter: "blur(10px)"
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5 }}>
                {t("portfolio.resume.skills", "Skills")}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 2.5, md: 3 },
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(3, minmax(0, 1fr))"
                  }
                }}
              >
                {skillEntries.map(([category, list]) => (
                  <Box key={category} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
                      {t(`portfolio.resume.categories.${category}`, category)}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
                      {(list as string[]).map((tech) => {
                        const color = getTechColor(tech);
                        const icon = getTechIcon(tech);
                        return (
                          <motion.div
                            key={`${category}-${tech}`}
                            whileHover={{ translateY: -4, scale: 1.05 }}
                            transition={bubbleTransition}
                          >
                            <Tooltip title={tech} arrow>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  px: 1.75,
                                  py: 1,
                                  borderRadius: 999,
                                  bgcolor: alpha(color, 0.15),
                                  border: `1px solid ${alpha(color, 0.3)}`,
                                  color,
                                  boxShadow: `0 10px 24px ${alpha(color, 0.28)}`,
                                  transition: "all 0.3s ease",
                                  flex: "0 0 auto"
                                }}
                              >
                                <Box sx={{ display: "flex", alignItems: "center", fontSize: 18 }}>
                                  {icon}
                                </Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {tech}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </motion.div>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
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
              />
              <Typography variant="body2" color="text.secondary">
                {t("portfolio.resume.certificationIssued", "Issued by")}: {activeCert.issuer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("portfolio.resume.certificationYear", "Year")}: {activeCert.year}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setActiveCertIndex(null)}>
              {t("common.close", "Close")}
            </Button>
            <Button
              variant="contained"
              endIcon={<Launch fontSize="small" />}
              href={activeCert.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("portfolio.resume.certificationVerify", "View verification")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
