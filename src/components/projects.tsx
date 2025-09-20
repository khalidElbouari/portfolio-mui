import {
  Box,
  Button,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Code, WorkOutline, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import { ExperienceCard } from "./ExperienceCard";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { containerVariants, sectionVariants } from "../utils/animations";

type ViewType = "projects" | "experience";

const MotionBox = motion.create(Box); 
const NAVIGATION_EVENT = "portfolio:navigate";

export default function Projects() {
  const { darkMode } = useThemeContext();
  const theme = useTheme();
  const { cv: cvData, locale, t } = useTranslation();
  const isRtl = locale === "ar";

  const projectLabels = {
    title: t("portfolio.projects.title"),
    subtitle: t("portfolio.projects.subtitle"),
    toggle: t("portfolio.projects.toggle")
  };
  const experienceLabels = {
    title: t("portfolio.experience.title"),
    subtitle: t("portfolio.experience.subtitle"),
    toggle: t("portfolio.experience.toggle")
  };
  const projectsCount = cvData.projects.length;
  const experienceCount = cvData.experience.length;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeView, setActiveView] = useState<ViewType>("projects");
  const [activeProject, setActiveProject] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setActiveProject((prev) => {
      if (cvData.projects.length === 0) {
        return 0;
      }
      return prev < cvData.projects.length ? prev : cvData.projects.length - 1;
    });
  }, [cvData.projects.length]);

  useEffect(() => {
    setActiveExperience((prev) => {
      if (cvData.experience.length === 0) {
        return 0;
      }
      return prev < cvData.experience.length ? prev : cvData.experience.length - 1;
    });
  }, [cvData.experience.length]);

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const detail = (event as CustomEvent<{ view?: ViewType }>).detail;
      const view = detail?.view;

      if (view === "projects" || view === "experience") {
        setActiveView(view);
        if (view === "projects") {
          setActiveProject(0);
        } else {
          setActiveExperience(0);
        }
      }
    };

    window.addEventListener(NAVIGATION_EVENT, handleNavigation as EventListener);
    return () => window.removeEventListener(NAVIGATION_EVENT, handleNavigation as EventListener);
  }, []);

  const handleViewChange = (
    _: ReactMouseEvent<HTMLElement>,
    newView: ViewType | null
  ) => {
    if (newView && newView !== activeView) {
      setActiveView(newView);
    }
  };

  const items = activeView === "projects" ? cvData.projects : cvData.experience;
  const activeIndex = activeView === "projects" ? activeProject : activeExperience;

  const setActiveIndex = (value: number) => {
    if (items.length === 0 || isTransitioning) {
      return;
    }
    const bounded = (value + items.length) % items.length;
    if (activeView === "projects") {
      setActiveProject(bounded);
    } else {
      setActiveExperience(bounded);
    }
  };

  const updateImageIndex = (key: string, delta: number, total: number) => {
    if (total <= 1) {
      return;
    }
    setImageIndices((prev) => {
      const current = prev[key] ?? 0;
      const next = (current + delta + total) % total;
      return { ...prev, [key]: next };
    });
  };

  // Enhanced navigation with smooth transitions
  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = direction === 'prev' ? activeIndex - 1 : activeIndex + 1;
    setActiveIndex(newIndex);

    // Smooth scroll for mobile/small screens
    if (isSmallScreen && cardContainerRef.current) {
      setTimeout(() => {
        const element = cardContainerRef.current;
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          const offset = isMobile ? 120 : 100;
          
          window.scrollTo({
            top: elementTop - offset,
            behavior: "smooth"
          });
        }
      }, 100);
    }

    // Reset transition lock
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrevItem = () => handleNavigation('prev');
  const handleNextItem = () => handleNavigation('next');

  const onTouchStart = (event: React.TouchEvent) => setTouchStart(event.touches[0].clientX);
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart == null) {
      return;
    }
    const dx = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        handleNextItem();
      } else {
        handlePrevItem();
      }
    }
    setTouchStart(null);
  };

  const viewConfig = activeView === "projects"
    ? {
        title: `${projectLabels.title} (${projectsCount})`,
        subtitle: projectLabels.subtitle,
        icon: "none" as const
      }
    : {
        title: `${experienceLabels.title} (${experienceCount})`,
        subtitle: experienceLabels.subtitle,
        icon: "work" as const
      };

  const findProjectAffiliation = (
    title: string
  ): { orgName?: string; orgLogo?: string; orgWebsite?: string } => {
    try {
      const eduList = Array.isArray(cvData.education) ? cvData.education : [];
      for (const edu of eduList as any[]) {
        const names = Array.isArray(edu.projects) ? edu.projects : [];
        if (names.includes(title)) {
          return {
            orgName: edu.institution,
            orgLogo: edu.institutionLogo,
            orgWebsite: edu.website
          };
        }
      }
    } catch {
      // ignore
    }
    return {};
  };

  const renderCard = (item: any, index: number) => {
    const key = `${activeView}-${index}`;
    const totalImages = Array.isArray(item.images) ? item.images.length : 0;
    const imageIndex = imageIndices[key] ?? 0;
    const onPrevImage = () => updateImageIndex(key, -1, totalImages);
    const onNextImage = () => updateImageIndex(key, 1, totalImages);

    if (activeView === "projects") {
      const { orgName, orgLogo, orgWebsite } = findProjectAffiliation(item.title);
      return (
        <ProjectCard
          key={key}
          project={item}
          darkMode={darkMode}
          imageIndex={imageIndex}
          onPrevImage={onPrevImage}
          onNextImage={onNextImage}
          orgName={orgName}
          orgLogo={orgLogo}
          orgWebsite={orgWebsite}
        />
      );
    }

    return (
      <ExperienceCard
        key={key}
        experience={item}
        darkMode={darkMode}
        imageIndex={imageIndex}
        onPrevImage={onPrevImage}
        onNextImage={onNextImage}
      />
    );
  };

  return (
    <Container id="projects" maxWidth="xl" sx={{ py: 8, direction: isRtl ? "rtl" : "ltr" }}>
      <motion.div
        ref={containerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Box component={motion.section} variants={sectionVariants} sx={{ mb: 8 }}>
          <SectionHeader
            title={viewConfig.title}
            subtitle={viewConfig.subtitle}
            darkMode={darkMode}
            icon={viewConfig.icon}
          />

          <Stack
            direction={isSmallScreen ? "column" : isRtl ? "row-reverse" : "row"}
            spacing={3}
            alignItems={isSmallScreen ? "stretch" : "center"}
            justifyContent="space-between"
            sx={{ mb: 4 }}
          >
            <ToggleButtonGroup
              value={activeView}
              exclusive
              onChange={handleViewChange}
              sx={{
                alignSelf: isSmallScreen ? "stretch" : "flex-start",
                bgcolor: darkMode ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.05)",
                borderRadius: 3,
                p: 0.5,
                flexDirection: isRtl ? "row-reverse" : "row"
              }}
            >
              <ToggleButton value="projects" sx={{ gap: 1, px: 2 }}>
                <Code fontSize="small" /> {projectLabels.toggle} ({projectsCount})
              </ToggleButton>
              <ToggleButton value="experience" sx={{ gap: 1, px: 2 }}>
                <WorkOutline fontSize="small" /> {experienceLabels.toggle} ({experienceCount})
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Main Content Container */}
          <Box sx={{ position: "relative" }}>
            {/* Card Container with Enhanced Animation */}
            <MotionBox
              ref={cardContainerRef}
              layout
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4
              }}
              sx={{
                width: "100%",
                maxWidth: 1200,
                mx: "auto",
                minHeight: { xs: 520, sm: 580, md: 640, lg: 540 },
                mb: 3,
                overflow: "visible"
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {items.length > 0 && (
                <motion.div
                  key={`${activeView}-${activeIndex}`}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {renderCard(items[activeIndex], activeIndex)}
                </motion.div>
              )}
            </MotionBox>

            {/* Navigation Controls - Fixed Position for Larger Screens */}
            {items.length > 1 && (
              <Box
                sx={{
                  position: isSmallScreen ? "static" : "sticky",
                  bottom: isSmallScreen ? "auto" : 20,
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: isSmallScreen ? 2 : 0,
                  mb: isSmallScreen ? 0 : 4,
                  direction: "ltr"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: isSmallScreen ? 0 : 1.5,
                    bgcolor: isSmallScreen ? "transparent" : (darkMode ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)"),
                    backdropFilter: isSmallScreen ? "none" : "blur(16px)",
                    borderRadius: isSmallScreen ? 0 : 4,
                    border: isSmallScreen ? "none" : `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                    boxShadow: isSmallScreen ? "none" : (darkMode 
                      ? "0 8px 32px rgba(0,212,255,0.15)" 
                      : "0 8px 32px rgba(25,118,210,0.15)")
                  }}
                >
                  <Stack
                    direction={isMobile ? "column" : "row"}
                    spacing={isMobile ? 1 : 2}
                    sx={{ 
                      width: isMobile ? "100%" : "auto",
                      maxWidth: isMobile ? "400px" : "auto"
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handlePrevItem}
                      disabled={isTransitioning}
                      dir="ltr"
                      startIcon={<ArrowBackIosNew fontSize="small" />}
                      fullWidth={isMobile}
                      sx={{
                        py: { xs: 1.5, sm: 1.2, md: 1 },
                        px: { xs: 3, sm: 2.5, md: 2 },
                        borderRadius: 2.5,
                        fontWeight: 600,
                        fontSize: { xs: "0.9rem", sm: "0.85rem" },
                        borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)",
                        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: darkMode ? "rgba(0,212,255,0.08)" : "rgba(25,118,210,0.08)",
                          transform: "translateY(-2px)",
                          boxShadow: darkMode 
                            ? "0 6px 20px rgba(0,212,255,0.25)" 
                            : "0 6px 20px rgba(25,118,210,0.25)"
                        },
                        "&:disabled": {
                          opacity: 0.6,
                          transform: "none"
                        }
                      }}
                    >
                      {t("portfolio.projects.prev", "Previous")} {activeView === "projects" ? projectLabels.toggle : experienceLabels.toggle}
                    </Button>
                    
                    <Button
                      variant="contained"
                      onClick={handleNextItem}
                      disabled={isTransitioning}
                      dir="ltr"
                      endIcon={<ArrowForwardIos fontSize="small" />}
                      fullWidth={isMobile}
                      sx={{
                        py: { xs: 1.5, sm: 1.2, md: 1 },
                        px: { xs: 3, sm: 2.5, md: 2 },
                        borderRadius: 2.5,
                        fontWeight: 600,
                        fontSize: { xs: "0.9rem", sm: "0.85rem" },
                        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        boxShadow: darkMode 
                          ? "0 4px 16px rgba(0,212,255,0.3)" 
                          : "0 4px 16px rgba(25,118,210,0.3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: darkMode 
                            ? "0 8px 24px rgba(0,212,255,0.4)" 
                            : "0 8px 24px rgba(25,118,210,0.4)"
                        },
                        "&:disabled": {
                          opacity: 0.6,
                          transform: "none"
                        }
                      }}
                    >
                      {t("portfolio.projects.next", "Next")} {activeView === "projects" ? projectLabels.toggle : experienceLabels.toggle}
                    </Button>
                  </Stack>

                  {/* Progress Indicator - Enhanced */}
                  {!isMobile && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.75,
                        alignItems: "center",
                        ml: 3,
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        bgcolor: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                        backdropFilter: "blur(8px)"
                      }}
                    >
                      {Array.from({ length: items.length }).map((_, index) => (
                        <Box
                          key={index}
                          component={motion.div}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          sx={{
                            width: index === activeIndex ? 24 : 10,
                            height: 10,
                            borderRadius: index === activeIndex ? 2 : "50%",
                            bgcolor: index === activeIndex 
                              ? "primary.main" 
                              : (darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"),
                            transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            cursor: "pointer",
                            boxShadow: index === activeIndex 
                              ? (darkMode ? "0 2px 8px rgba(0,212,255,0.4)" : "0 2px 8px rgba(25,118,210,0.4)")
                              : "none"
                          }}
                          onClick={() => !isTransitioning && setActiveIndex(index)}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

      </motion.div>
    </Container>
  );
}