import { Box, Container, Stack, Typography, IconButton, Button, Divider } from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";

const SCROLL_OFFSET = 80;
const NAVIGATION_EVENT = "portfolio:navigate";

export default function Footer() {
  const { darkMode } = useThemeContext();
  const { t, locale } = useTranslation();
  const isRtl = locale === "ar";
  const MotionDiv = motion.create("div");

  const socialLinks = [
    { icon: <GitHub fontSize="small" />, href: "https://github.com/khalidElbouari", label: "GitHub", external: true },
    { icon: <LinkedIn fontSize="small" />, href: "https://www.linkedin.com/in/khalid-elbouari-228237236/", label: "LinkedIn", external: true },
    { icon: <Email fontSize="small" />, href: "mailto:khalid.fati7i.hb@gmail.com", label: t("hero.social.email", "Email") }
  ];

  const handleNavClick = (targetId: string, view?: "projects" | "experience") => () => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(targetId);
    if (element) {
      const yPosition = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, yPosition), behavior: "smooth" });
    }

    if (view) {
      window.dispatchEvent(new CustomEvent(NAVIGATION_EVENT, { detail: { view } }));
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        px: 0,
        py: 5,
        direction: isRtl ? "rtl" : "ltr",
        background: darkMode
          ? "linear-gradient(180deg, rgba(12,21,36,0.9) 0%, rgba(12,21,36,0.65) 100%)"
          : "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(255,255,255,0.98) 100%)",
        borderTop: "1px solid",
        borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"
      }}
    >
      <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", md: isRtl ? "row-reverse" : "row" }}
            spacing={{ xs: 2.5, md: 3 }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
          >
            <Stack spacing={0.5}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: darkMode
                    ? "linear-gradient(45deg, #00d4ff 30%, #ff6b9d 90%)"
                    : "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  letterSpacing: "-0.02em"
                }}
              >
                Khalid.dev
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("footer.tagline", "Crafting digital excellence.")}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap" }}>
              <Button size="small" onClick={handleNavClick("hero")} sx={{ textTransform: "none" }}>
                {t("header.menu.about")}
              </Button>
              <Button size="small" onClick={handleNavClick("projects", "projects")} sx={{ textTransform: "none" }}>
                {t("header.menu.projects")}
              </Button>
              <Button size="small" onClick={handleNavClick("projects", "experience")} sx={{ textTransform: "none" }}>
                {t("header.menu.experience")}
              </Button>
              <Button size="small" onClick={handleNavClick("skills")} sx={{ textTransform: "none" }}>
                {t("header.menu.skills")}
              </Button>
            </Stack>

            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => (
                <MotionDiv key={social.label} whileHover={{ scale: 1.1, y: -1 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    component="a"
                    href={social.href}
                    target={"external" in social && social.external ? "_blank" : undefined}
                    rel={"external" in social && social.external ? "noopener noreferrer" : undefined}
                    size="small"
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        transform: "translateY(-1px)"
                      },
                      transition: "all 0.2s ease"
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </MotionDiv>
              ))}
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction={{ xs: "column", md: isRtl ? "row-reverse" : "row" }}
            spacing={1}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
          >
            <Typography variant="caption" color="text.secondary">
              {t("footer.builtWith", "Built with React, Vite, and MUI.")}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`${t("footer.copyrightPrefix", "©")} ${new Date().getFullYear()} Khalid Elbouari — ${t(
                "footer.rights",
                "All rights reserved."
              )}`}
            </Typography>
          </Stack>
      </Container>
    </Box>
  );
}