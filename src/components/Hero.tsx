import {
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import {
  ArrowDownward,
  Code,
  Terminal,
  SmartToy,
  Download,
  Psychology,
  Speed
} from "@mui/icons-material";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useChat } from "../context/ChatContext";
import { useEffect, useMemo, useState } from "react";

const skillConfigs = [
  {
    nameKey: "hero.skills.fullStack.title",
    descriptionKey: "hero.skills.fullStack.description",
    icon: <Code />,
    color: "#00d4ff"
  },
  {
    nameKey: "hero.skills.microservices.title",
    descriptionKey: "hero.skills.microservices.description",
    icon: <Terminal />,
    color: "#6366f1"
  },
  {
    nameKey: "hero.skills.quality.title",
    descriptionKey: "hero.skills.quality.description",
    icon: <Psychology />,
    color: "#f59e0b"
  },
  {
    nameKey: "hero.skills.performance.title",
    descriptionKey: "hero.skills.performance.description",
    icon: <Speed />,
    color: "#10b981"
  }
];

// Emoji-only set to avoid font glyph issues on some systems
const _floatingElementsSafe = [
  { icon: "💻", delay: 0 },
  { icon: "⚙️", delay: 0.5 },
  { icon: "🚀", delay: 1 },
  { icon: "🧠", delay: 1.5 },
  { icon: "🔧", delay: 2 },
  { icon: "📦", delay: 2.5 }
];

const floatingElements = [
  { icon: "ÃƒÂ¢Ã…Â¡Ã‚Â¡", delay: 0 },
  { icon: "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬", delay: 0.5 },
  { icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡", delay: 1 },
  { icon: "ÃƒÂ¢Ã‚Â­Ã‚Â", delay: 1.5 },
  { icon: "ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯", delay: 2 },
  { icon: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â§", delay: 2.5 }
];

export default function Hero() {
  const { darkMode } = useThemeContext();
  const theme = useTheme();
  const { t, locale } = useTranslation();
  const isCompact = useMediaQuery(theme.breakpoints.down("sm"));
  const isRtl = locale === "ar";
  const { openChat } = useChat();
  // Keep legacy floatingElements referenced to avoid TS unused var error
  void floatingElements;
  // Keep safe emoji list referenced as well (not rendered)
  void _floatingElementsSafe;

  const skills = useMemo(
    () =>
      skillConfigs.map((skill) => ({
        ...skill,
        name: t(skill.nameKey),
        description: t(skill.descriptionKey)
      })),
    [locale, t]
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const skillCount = skills.length || 1;
  const activeSkill = skills[currentSkill % skillCount] ?? skills[0];

  const greetingEmoji = t("hero.emoji", "\uD83D\uDC4B");
  const greetingText = t("hero.greeting");
  const titleLineOne = t("hero.title.line1");
  const titleLineTwo = t("hero.title.line2");
  const subtitleBefore = t("hero.subtitle.before");
  const subtitleHighlight = t("hero.subtitle.highlight");
  const subtitleAfter = t("hero.subtitle.after");
  const focusLabel = t("hero.focusLabel");
  const primaryCta = t("hero.ctaPrimary");
  const secondaryCta = t("hero.ctaSecondary");
  const chatLabel = isCompact
    ? ({ en: "AI Chat", fr: "Assistant IA", ar: "دردشة AI" } as const)[locale] ?? secondaryCta
    : secondaryCta;
  const resumeLabel = isCompact
    ? ({ en: "Download CV", fr: "Téléch. CV", ar: "تحميل السيرة" } as const)[locale] ?? primaryCta
    : primaryCta;
  const badgeSubtitle = t("hero.badgeSubtitle");
  const textAlign = isRtl ? 'right' : 'left';
  const headingLetterSpacing = isRtl ? '0' : '-0.02em';
  const greetingLetterSpacing = isRtl ? '0' : '0.1em';
  const labelLetterSpacing = isRtl ? '0' : '0.05em';
  const bodyLetterSpacing = isRtl ? '0' : '0.05em';
  const contentFlexDirection = isRtl ? { xs: 'column', lg: 'row-reverse' } : { xs: 'column', lg: 'row' };
  // Keep language switcher position fixed regardless of RTL/LTR
  const languageSwitcherJustify = { xs: 'center', lg: 'flex-end' };


  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50 
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skillCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [skillCount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
};

// Locale-aware resume download
const resumePaths = {
  en: "/resume/Elbouari%20Khalid%20cv-english.pdf",
  fr: "/resume/Elbouari%20Khalid%20cv-french.pdf",
  ar: "/resume/Elbouari%20Khalid%20cv-arabic.pdf"
} as const;

const resumeFileNames = {
  en: "Khalid-Elbouari-CV-EN.pdf",
  fr: "Khalid-Elbouari-CV-FR.pdf",
  ar: "Khalid-Elbouari-CV-AR.pdf"
} as const;

const downloadResume = () => {
  const loc = (locale as "en" | "fr" | "ar") ?? "en";
  const href = resumePaths[loc] ?? resumePaths.en;
  const filename = resumeFileNames[loc] ?? resumeFileNames.en;

  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};


  return (
    <Box
      id="hero"
      component={motion.div}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        direction: isRtl ? 'rtl' : 'ltr',
        background: theme.palette.background.default,
        pt: { xs: 12, md: 8 }
      }}
    >
      {/* Decorative background animations removed for cohesion & performance */}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: languageSwitcherJustify,
            mb: { xs: 3, lg: 1 },
            direction: "ltr"
          }}
        >
          <LanguageSwitcher dense />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: contentFlexDirection,
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "90vh",
            py: { xs: 4, md: 8 },
            px: { xs: 2, md: 4 }
          }}
        >
          {/* Enhanced Left Content */}
          <Box sx={{ flex: 1, maxWidth: { xs: "100%", lg: "55%" }, pr: isRtl ? 0 : { lg: 4 }, pl: isRtl ? { lg: 4 } : 0, textAlign: textAlign, display: "flex", flexDirection: "column", alignItems: isRtl ? "flex-end" : "flex-start", order: { xs: 2, lg: 0 }, mt: { xs: 3, lg: 0 } }}>
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 3 }}>
                <motion.div
                  animate={{ 
                    rotate: [0, 14, -8, 14, -4, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    repeatDelay: 3 
                  }}
                  style={{ display: "inline-block", ...(isRtl ? { marginLeft: "12px" } : { marginRight: "12px" }) }}
                >
                  {greetingEmoji}
                </motion.div>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    letterSpacing: greetingLetterSpacing,
                    fontSize: { xs: "0.8rem", md: "0.95rem" },
                    textAlign: textAlign,
                  }}
                >
                  {greetingText}
                </Typography>
              </Box>
            </motion.div>
            {/* Main Headline */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem", lg: "3.5rem" },
                  fontWeight: 900,
                  lineHeight: { xs: 1.1, md: 1.05 },
                  mb: 3,
                  letterSpacing: headingLetterSpacing,
                  textAlign: textAlign,
                }}
              >
                <Box component="span" sx={{ display: "block", mb: 1 }}>
                  {titleLineOne}
                </Box>
                <Box 
                  component="span" 
                  sx={{ 
                    textAlign,
                    background: darkMode
                      ? "linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #0ea5e9 100%)"
                      : "linear-gradient(135deg, #2563eb 0%, #0ea5e9 50%, #2563eb 100%)",
                    backgroundSize: "200% 200%",
                    animation: "gradientShift 4s ease infinite",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    display: "block"
                  }}
                >
                  {titleLineTwo}
                </Box>
              </Typography>
            </motion.div>

            {/* Enhanced Description */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  lineHeight: 1.7,
                  maxWidth: 600,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  fontWeight: 400,
                  letterSpacing: bodyLetterSpacing,
                  textAlign: textAlign,
                }}
              >
                {subtitleBefore}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                  {subtitleHighlight}
                </Box>
                {subtitleAfter}
              </Typography>
            </motion.div>
            {/* Enhanced Action Buttons (moved above skills) */}
            <motion.div variants={itemVariants}>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 4 }}>
                {/* AI Assistant Chat (contained) */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SmartToy />}
                    sx={{
                      py: 1.3,
                      px: 2.5,
                      borderRadius: 4,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      position: "relative",
                      overflow: "hidden",
                      background: darkMode
                        ? "linear-gradient(135deg, #00d4ff, #0099cc)"
                        : "linear-gradient(135deg, #1976d2, #1565c0)",
                      boxShadow: darkMode
                        ? "0 8px 25px rgba(0, 212, 255, 0.3)"
                        : "0 8px 25px rgba(25, 118, 210, 0.3)",
                      "&:hover": {
                        boxShadow: darkMode
                          ? "0 12px 35px rgba(0, 212, 255, 0.4)"
                          : "0 12px 35px rgba(25, 118, 210, 0.4)"
                      },
                      "& .MuiButton-startIcon": {
                        transition: "transform 0.3s ease",
                        mr: 0.5
                      },
                      "&:hover .MuiButton-startIcon": {
                        transform: "translateY(-2px) scale(1.1)"
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-150%",
                        height: "100%",
                        width: "50%",
                        background:
                          "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
                        transform: "skewX(-20deg)",
                        animation: "buttonShine 2.2s ease-in-out infinite"
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                    onClick={openChat}
                  >
                    {chatLabel}
                  </Button>
                </motion.div>

                {/* Download My Resume (outlined, enhanced) */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Download />}
                    sx={{
                      py: 1.3,
                      px: 2.5,
                      borderRadius: 4,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      position: "relative",
                      overflow: "hidden",
                      borderWidth: 2,
                      borderColor: "primary.main",
                      color: "primary.main",
                      "& .MuiButton-startIcon": {
                        transition: "transform 0.3s ease",
                        mr: 0.5
                      },
                      "&:hover .MuiButton-startIcon": {
                        transform: "translateY(-2px) scale(1.1)"
                      },
                      "&:hover": {
                        borderWidth: 2,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        boxShadow: darkMode
                          ? "0 8px 25px rgba(0, 212, 255, 0.3)"
                          : "0 8px 25px rgba(25, 118, 210, 0.3)"
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-150%",
                        height: "100%",
                        width: "50%",
                        background:
                          "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
                        transform: "skewX(-20deg)",
                        animation: "buttonShine 2.6s ease-in-out infinite"
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                    onClick={downloadResume}
                  >
                    {resumeLabel}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>

            {/* Dynamic Skills Showcase (moved below buttons) */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                    fontWeight: 500,
                    letterSpacing: labelLetterSpacing,
                    textAlign: textAlign,
                  }}
                >
                  {focusLabel}
                </Typography>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkill}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${activeSkill.color}15, ${activeSkill.color}05)`,
                        border: `1px solid ${activeSkill.color}30`,
                        backdropFilter: "blur(10px)"
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box
                          sx={{
                            color: activeSkill.color,
                            mr: 2,
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          {activeSkill.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: activeSkill.color
                          }}
                        >
                          {activeSkill.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          ml: 4
                        }}
                      >
                        {activeSkill.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </motion.div>

          </Box>

          {/* Enhanced Right Side - Interactive 3D Element */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, lg: 0 },
              mt: { xs: 0, lg: 0 },
              position: "relative",
              transform: { lg: "translateY(-50px)" }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                width: "min(450px, 90vw)",
                height: "min(450px, 90vw)",
                position: "relative"
              }}
            >
              {/* Main Interactive Element */}
              <motion.div
                animate={{
                  rotateY: mousePos.x * 0.5,
                  rotateX: mousePos.y * 0.3,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Main Shape */}
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                    background: darkMode
                      ? `conic-gradient(from 0deg,
                          rgba(14, 165, 233, 0.45) 0deg,
                          rgba(37, 99, 235, 0.35) 120deg,
                          rgba(14, 116, 144, 0.3) 240deg,
                          rgba(37, 99, 235, 0.45) 360deg)`
                      : `conic-gradient(from 0deg,
                          rgba(59, 130, 246, 0.28) 0deg,
                          rgba(14, 165, 233, 0.22) 120deg,
                          rgba(59, 130, 246, 0.16) 240deg,
                          rgba(14, 165, 233, 0.3) 360deg)`,
                    backdropFilter: "blur(30px)",
                    border: `2px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: darkMode
                      ? "0 24px 60px rgba(14, 165, 233, 0.2)"
                      : "0 24px 60px rgba(37, 99, 235, 0.18)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: darkMode
                        ? "radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.35) 0%, transparent 55%)"
                        : "radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.22) 0%, transparent 55%)",
                      animation: "pulse 4s ease-in-out infinite alternate"
                    }
                  }}
                >
                  {/* Center Content */}
                  <Box
                    sx={{
                      textAlign: "center",
                      position: "relative",
                      zIndex: 2,
                      transform: "translateY(-16px)"
                    }}
                  >
                    <Box
                      component="img"
                      src="/khalid-profile-1.png"
                      alt="Portrait of Khalid"
                      sx={{
                        width: { xs: 320, sm: 320 },
                        height: { xs: 320, sm: 320 },
                        borderRadius: "50%",
                        objectFit: "cover",
                        mx: "auto",
                        border: darkMode
                          ? "4px solid rgba(37, 197, 213, 0.45)"
                          : "4px solid rgba(37, 99, 235, 0.4)",
                        boxShadow: darkMode
                          ? "0 20px 36px rgba(14, 165, 233, 0.28)"
                          : "0 20px 36px rgba(37, 99, 235, 0.22)",
                        mb: 1
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        letterSpacing: greetingLetterSpacing,
                        fontSize: "0.85rem"
                      }}
                    >
                      {badgeSubtitle}
                    </Typography>
                  </Box>
                </Box>

                {/* Orbiting Elements */}
                {skills.slice(0, 4).map((skill, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      rotate: { duration: 15 + i * 2, repeat: Infinity, ease: "linear" }
                    }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: -360
                      }}
                      transition={{
                        scale: { duration: 3, repeat: Infinity, delay: i * 0.5 },
                        rotate: { duration: 15 + i * 2, repeat: Infinity, ease: "linear" }
                      }}
                      style={{
                        position: "absolute",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
                        border: `2px solid ${skill.color}60`,
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: skill.color,
                        top: `${20 + Math.sin(i * Math.PI / 2) * 30}%`,
                        left: `${20 + Math.cos(i * Math.PI / 2) * 30}%`,
                        boxShadow: `0 8px 25px ${skill.color}30`
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Floating Tech Icons */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      position: "absolute",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: skills[i % skills.length].color,
                      top: `${15 + (i * 6) % 70}%`,
                      left: `${10 + (i * 8) % 80}%`,
                      filter: "blur(0.5px)"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2
        }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <IconButton
            sx={{
              width: 56,
              height: 56,
              bgcolor: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
              border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"}`,
              "&:hover": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                transform: "translateY(-4px)",
                boxShadow: darkMode 
                  ? "0 8px 25px rgba(0, 212, 255, 0.3)"
                  : "0 8px 25px rgba(25, 118, 210, 0.3)"
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <ArrowDownward />
          </IconButton>
        </motion.div>
      </motion.div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes pulse {
            0% { opacity: 0.4; transform: scale(1); }
            100% { opacity: 0.8; transform: scale(1.02); }
          }

          @keyframes buttonShine {
            0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
            50% { opacity: 0.55; }
            100% { transform: translateX(150%) skewX(-20deg); opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
}
