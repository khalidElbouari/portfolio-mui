import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Button,
  useScrollTrigger
} from "@mui/material";
import { 
  Brightness4, 
  Brightness7,
  GitHub,
  LinkedIn,
  Email
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";

const SCROLL_OFFSET = 80;
const NAVIGATION_EVENT = "portfolio:navigate";

type NavView = "projects" | "experience";

type NavItem = {
  translationKey: `header.menu.${string}`;
  targetId: string;
  view?: NavView;
};

const navItems: NavItem[] = [
  { translationKey: "header.menu.about", targetId: "hero" },
  { translationKey: "header.menu.projects", targetId: "projects", view: "projects" },
  { translationKey: "header.menu.experience", targetId: "projects", view: "experience" },
  { translationKey: "header.menu.skills", targetId: "skills" }
];

const socialLinks = [
  { icon: <GitHub fontSize="small" />, href: "https://github.com/khalidElbouari", label: "GitHub", external: true },
  { icon: <LinkedIn fontSize="small" />, href: "https://www.linkedin.com/in/khalid-elbouari-228237236/", label: "LinkedIn", external: true },
  { icon: <Email fontSize="small" />, href: "mailto:khalid.fati7i.hb@gmail.com", label: "Email" }
];

export default function Header() {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleNavClick = (item: NavItem) => () => {
    if (typeof window === "undefined") {
      return;
    }

    setMobileMenuOpen(false);

    const element = document.getElementById(item.targetId);
    if (element) {
      const yPosition = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, yPosition), behavior: "smooth" });
    }

    if (item.view) {
      window.dispatchEvent(new CustomEvent(NAVIGATION_EVENT, { detail: { view: item.view } }));
    }
  };

  // Detect scroll for dynamic header styling
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Fixed outer wrapper keeps header centered in LTR and RTL */}
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 1100
          }}
        >
          <AppBar
            position="static"
            elevation={0}
            sx={{
              width: { xs: "calc(100% - 32px)", md: "900px" },
              maxWidth: "calc(100vw - 32px)",
              borderRadius: 4,
              bgcolor: trigger 
                ? (darkMode ? "rgba(10, 10, 15, 0.95)" : "rgba(255, 255, 255, 0.95)")
                : "transparent",
              backdropFilter: trigger ? "blur(20px)" : "none",
              border: trigger ? "1px solid" : "none",
              borderColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: trigger 
                ? `0 8px 32px ${darkMode ? "rgba(0, 212, 255, 0.1)" : "rgba(25, 118, 210, 0.1)"}` 
                : "none",
              pointerEvents: "auto"
            }}
          >
          <Toolbar sx={{ justifyContent: "space-between", px: 3, py: 1 }}>
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
                  cursor: "pointer",
                  letterSpacing: "-0.02em"
                }}
              >
                Khalid.dev
              </Typography>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.translationKey}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  <Button
                    onClick={handleNavClick(item)}
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                      px: 3,
                      py: 1.5,
                      borderRadius: 3,
                      position: "relative",
                      textTransform: "none",
                      fontSize: "0.95rem",
                      overflow: "hidden",
                      "&:hover": {
                        backgroundColor: darkMode 
                          ? "rgba(0, 212, 255, 0.08)" 
                          : "rgba(25, 118, 210, 0.08)",
                        transform: "translateY(-2px)",
                      },
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        width: 0,
                        height: 2,
                        backgroundColor: "primary.main",
                        borderRadius: "2px 2px 0 0",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)"
                      },
                      "&:hover:before": {
                        width: "70%"
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {t(item.translationKey)}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Enhanced Right Side Controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Social Links - Hidden on mobile */}
              {/* Hide social icons on md to avoid duplication with info panel; show on lg+ */}
              <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 0.5, mr: 1 }}>
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      component="a"
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
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
                  </motion.div>
                ))}
              </Box>

              {/* Enhanced Theme Toggle */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <IconButton 
                  onClick={toggleDarkMode}
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: darkMode 
                      ? "rgba(255, 255, 255, 0.08)" 
                      : "rgba(0, 0, 0, 0.06)",
                    border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"}`,
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      borderColor: "primary.main",
                      transform: "translateY(-1px)",
                      boxShadow: darkMode 
                        ? "0 4px 20px rgba(0, 212, 255, 0.3)"
                        : "0 4px 20px rgba(25, 118, 210, 0.3)"
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: darkMode ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                  </motion.div>
                </IconButton>
              </motion.div>

              {/* Enhanced Mobile Menu */}
              <Box sx={{ display: { xs: "block", md: "none" }, ml: 1 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: darkMode 
                        ? "rgba(255, 255, 255, 0.08)" 
                        : "rgba(0, 0, 0, 0.06)",
                      border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"}`,
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        borderColor: "primary.main"
                      }
                    }}
                  >
                    <motion.div
                      animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                    </motion.div>
                  </IconButton>
                </motion.div>
              </Box>
            </Box>
          </Toolbar>

          {/* Enhanced Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ overflow: "hidden" }}
              >
                <Box 
                  sx={{ 
                    px: 3, 
                    pb: 3, 
                    display: { md: "none" },
                    bgcolor: darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    borderTop: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
                  }}
                >
                  {/* Mobile Navigation Items */}
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.translationKey}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Button
                        onClick={handleNavClick(item)}
                        fullWidth
                        sx={{ 
                          justifyContent: "flex-start",
                          py: 1.5,
                          px: 2,
                          mb: 0.5,
                          color: "text.primary",
                          borderRadius: 2,
                          textTransform: "none",
                          fontSize: "1rem",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: darkMode 
                              ? "rgba(0, 212, 255, 0.08)" 
                              : "rgba(25, 118, 210, 0.08)",
                            transform: "translateX(8px)"
                          },
                          transition: "all 0.2s ease"
                        }}
                      >
                        {t(item.translationKey)}
                      </Button>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "center" }}>
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={social.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          component="a"
                          href={social.href}
                          target={social.external ? "_blank" : undefined}
                          rel={social.external ? "noopener noreferrer" : undefined}
                          size="small"
                          sx={{
                            bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "primary.contrastText"
                            }
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
          </AppBar>
        </Box>
      </motion.div>
    </>
  );
}
