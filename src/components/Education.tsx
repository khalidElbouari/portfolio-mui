import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import {
  CalendarMonth,
  School
} from "@mui/icons-material";
import { containerVariants, sectionVariants } from "../utils/animations";

export default function Education() {
  const { darkMode } = useThemeContext();
  const { cv, t } = useTranslation();
  const theme = useTheme();

  const timelineColor = darkMode ? "#00d4ff" : "#1976d2";
  const trackColor = darkMode ? "rgba(0,212,255,0.25)" : "rgba(25,118,210,0.2)";

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
            title={t("portfolio.resume.education", "Education")}
            subtitle={t("portfolio.resume.educationSubtitle", "Academic background and notable results")}
            darkMode={darkMode}
            icon="work"
          />

          <Box
            sx={{
              position: "relative",
              pl: { xs: 2.5, md: 4 },
              pb: 1,
              '&::before': {
                content: '""',
                position: "absolute",
                top: 16,
                bottom: 16,
                left: { xs: 16, md: 24 },
                width: 3,
                borderRadius: 999,
                background: trackColor
              }
            }}
          >
            <Stack spacing={{ xs: 3.5, md: 4.5 }}>
              {cv.education.map((edu, idx) => (
                <Box
                  key={idx}
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 2, md: 3 }
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: 16, md: 24 },
                      top: 4,
                      transform: "translate(-50%, 0)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      bgcolor: theme.palette.background.default,
                      border: `3px solid ${timelineColor}`,
                      zIndex: 1,
                      '&::after': {
                        content: '""',
                        position: "absolute",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: timelineColor,
                        opacity: 0.25
                      }
                    }}
                  />

                  <Box
                    sx={{
                      ml: { xs: 0, md: 7 },
                      borderRadius: 3,
                      background: darkMode
                        ? "linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.6) 100%)"
                        : "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(255,255,255,0.98) 100%)",
                      border: "1px solid",
                      borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
                      backdropFilter: "blur(8px)",
                      p: { xs: 2.5, md: 3 },
                      width: "100%"
                    }}
                  >
                    <Stack spacing={1.25}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: timelineColor,
                            color: theme.palette.getContrastText(timelineColor),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <School fontSize="small" />
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {edu.degree}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {edu.institution}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.25, alignItems: { sm: "center" } }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarMonth fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {edu.period}
                          </Typography>
                        </Stack>

                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {edu.status && (
                            <Chip size="small" label={edu.status} sx={{ height: 24 }} />
                          )}
                          {edu.grade && (
                            <Chip size="small" label={`${t("portfolio.resume.grade", "Grade")}: ${edu.grade}`} sx={{ height: 24 }} />
                          )}
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
