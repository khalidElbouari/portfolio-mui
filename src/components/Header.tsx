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
import { motion } from "framer-motion";
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
  
  const MotionDiv = motion.create("div");

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

  // Detect scroll for subtle background/blur/shadow changes only
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "transparent",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "center", px: 0, py: 1 }}>
          <Box
            sx={{
              width: { xs: "calc(100% - 32px)", md: "850px" },
              maxWidth: "calc(100vw - 32px)",
              borderRadius: 4,
              bgcolor: trigger
                ? (darkMode ? "rgba(10, 10, 15, 0.95)" : "rgba(255, 255, 255, 0.95)")
                : (darkMode ? "rgba(10, 10, 15, 0.80)" : "rgba(255, 255, 255, 0.85)"),
              backdropFilter: "blur(14px)",
              border: "1px solid",
              borderColor: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
              transition: "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
              boxShadow: trigger
                ? `0 8px 32px ${darkMode ? "rgba(0, 212, 255, 0.1)" : "rgba(25, 118, 210, 0.1)"}`
                : `0 2px 10px ${darkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.08)"}`,
              px: 3
            }}
          >
            <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: 56 }}>
              {/* Logo */}
              <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
              </MotionDiv>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
                {navItems.map((item) => (
                  <MotionDiv key={item.translationKey} whileHover={{ y: -2 }}>
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
                  </MotionDiv>
                ))}
              </Box>

              {/* Right Controls */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* Social Links - show on lg+ */}
                <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 0.5, mr: 1 }}>
                  {socialLinks.map((social) => (
                    <MotionDiv key={social.label} whileHover={{ scale: 1.1, y: -1 }} whileTap={{ scale: 0.9 }}>
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
                    </MotionDiv>
                  ))}
                </Box>

                {/* Theme Toggle */}
                <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </MotionDiv>

                {/* Mobile Menu */}
                <Box sx={{ display: { xs: "block", md: "none" }, ml: 1 }}>
                  <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                      {/* Simple hamburger / close glyph via CSS round indicator */}
                      <Box
                        component="span"
                        sx={{
                          display: "block",
                          width: 20,
                          height: 2,
                          bgcolor: "currentColor",
                          position: "relative",
                          "&::before, &::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            width: 20,
                            height: 2,
                            bgcolor: "currentColor",
                            transition: "transform 200ms ease, top 200ms ease, opacity 200ms ease"
                          },
                          "&::before": {
                            top: mobileMenuOpen ? 0 : -6,
                            transform: mobileMenuOpen ? "rotate(45deg)" : "none"
                          },
                          "&::after": {
                            top: mobileMenuOpen ? 0 : 6,
                            transform: mobileMenuOpen ? "rotate(-45deg)" : "none"
                          },
                          opacity: mobileMenuOpen ? 0.9 : 1
                        }}
                      />
                    </IconButton>
                  </MotionDiv>
                </Box>
              </Box>
            </Toolbar>

            {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    height: { duration: 0.3 }
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <Box 
                    sx={{ 
                      px: 3, 
                      pb: 2, 
                      pt: 1.5,
                      mt: 1,
                      display: { md: "none" },
                      bgcolor: darkMode 
                        ? "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)" 
                        : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)",
                      backdropFilter: "blur(24px)",
                      borderTop: `1px solid ${darkMode ? "rgba(0, 212, 255, 0.2)" : "rgba(25, 118, 210, 0.15)"}`,
                      borderRadius: "0 0 16px 16px",
                      position: "relative",
                      mx: 0,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60px",
                        height: "3px",
                        backgroundColor: darkMode ? "rgba(0, 212, 255, 0.4)" : "rgba(25, 118, 210, 0.3)",
                        borderRadius: "0 0 6px 6px"
                      }
                    }}
                  >
                    {/* Mobile Navigation Items */}
                    <Box sx={{ mt: 1 }}>
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.translationKey}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: index * 0.1,
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                        >
                          <Button
                            onClick={handleNavClick(item)}
                            fullWidth
                            sx={{ 
                              justifyContent: "flex-start",
                              py: 1.2,
                              px: 3,
                              mb: 0.5,
                              color: "text.primary",
                              borderRadius: 3,
                              textTransform: "none",
                              fontSize: "1rem",
                              fontWeight: 500,
                              position: "relative",
                              overflow: "hidden",
                              background: darkMode 
                                ? "rgba(255, 255, 255, 0.03)" 
                                : "rgba(0, 0, 0, 0.02)",
                              border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
                              "&:hover": {
                                bgcolor: darkMode 
                                  ? "rgba(0, 212, 255, 0.12)" 
                                  : "rgba(25, 118, 210, 0.12)",
                                transform: "translateX(8px) scale(1.02)",
                                borderColor: darkMode ? "rgba(0, 212, 255, 0.3)" : "rgba(25, 118, 210, 0.3)",
                                boxShadow: darkMode 
                                  ? "0 4px 20px rgba(0, 212, 255, 0.15)" 
                                  : "0 4px 20px rgba(25, 118, 210, 0.15)"
                              },
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: "4px",
                                background: darkMode 
                                  ? "linear-gradient(135deg, #00d4ff, #ff6b9d)" 
                                  : "linear-gradient(135deg, #1976d2, #9c27b0)",
                                transform: "scaleY(0)",
                                transformOrigin: "bottom",
                                transition: "transform 0.3s ease"
                              },
                              "&:hover::before": {
                                transform: "scaleY(1)"
                              },
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                right: 16,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: "primary.main",
                                opacity: 0,
                                transition: "opacity 0.3s ease"
                              },
                              "&:hover::after": {
                                opacity: 1
                              },
                              transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              {/* Add icons for each menu item */}
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: "primary.main",
                                  opacity: 0.7,
                                  transition: "all 0.3s ease"
                                }}
                              />
                              {t(item.translationKey)}
                            </Box>
                          </Button>
                        </motion.div>
                      ))}
                    </Box>
                    
                    {/* Divider */}
                    <Box 
                      sx={{ 
                        height: 1, 
                        background: darkMode 
                          ? "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent)" 
                          : "linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.2), transparent)",
                        my: 1.5,
                        mx: 0
                      }} 
                    />
                    
                    {/* Mobile Social Links with improved layout */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <Typography
                        variant="caption" 
                        sx={{ 
                          display: "block",
                          textAlign: "center",
                          mb: 1.5,
                          color: "text.secondary",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "1px"
                        }}
                      >
                        Connect
                      </Typography>
                      
                      <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
                        {socialLinks.map((social, index) => (
                          <motion.div
                            key={social.label}
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: 0.5 + index * 0.1,
                              duration: 0.3
                            }}
                          >
                            <IconButton
                              component="a"
                              href={social.href}
                              target={social.external ? "_blank" : undefined}
                              rel={social.external ? "noopener noreferrer" : undefined}
                              sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 3,
                                background: darkMode 
                                  ? "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 157, 0.1))" 
                                  : "linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(156, 39, 176, 0.1))",
                                border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"}`,
                                color: "text.primary",
                                "&:hover": {
                                  background: darkMode 
                                    ? "linear-gradient(135deg, #00d4ff, #ff6b9d)" 
                                    : "linear-gradient(135deg, #1976d2, #9c27b0)",
                                  color: "white",
                                  transform: "translateY(-3px)",
                                  boxShadow: darkMode 
                                    ? "0 8px 25px rgba(0, 212, 255, 0.4)" 
                                    : "0 8px 25px rgba(25, 118, 210, 0.4)"
                                },
                                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                              }}
                            >
                              {social.icon}
                            </IconButton>
                          </motion.div>
                        ))}
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
              )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
