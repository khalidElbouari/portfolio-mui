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
import { CallToAction } from "./CallToAction";
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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeView, setActiveView] = useState<ViewType>("projects");
  const [activeProject, setActiveProject] = useState(0);
  const [activeExperience, setActiveExperience] = useState(0);
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    if (items.length === 0) {
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

  const handlePrevItem = () => setActiveIndex(activeIndex - 1);
  const handleNextItem = () => setActiveIndex(activeIndex + 1);

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
        title: projectLabels.title,
        subtitle: projectLabels.subtitle,
        icon: "code" as const
      }
    : {
        title: experienceLabels.title,
        subtitle: experienceLabels.subtitle,
        icon: "work" as const
      };

  // Derive project affiliation (institution/logo/website) from education entries
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
                <Code fontSize="small" /> {projectLabels.toggle}
              </ToggleButton>
              <ToggleButton value="experience" sx={{ gap: 1, px: 2 }}>
                <WorkOutline fontSize="small" /> {experienceLabels.toggle}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <MotionBox
            layout
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Box sx={{ width: "100%", maxWidth: 1080, mx: "auto" }}>
              {items.length > 0 ? renderCard(items[activeIndex], activeIndex) : null}
            </Box>

            {items.length > 1 && (
              <Stack
                direction={isSmallScreen ? "column" : "row"}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Button variant="outlined" onClick={handlePrevItem} startIcon={<ArrowBackIosNew fontSize="small" />}>
                  {t("portfolio.projects.prev", "Previous")} {activeView === "projects" ? projectLabels.toggle : experienceLabels.toggle}
                </Button>
                <Button variant="contained" onClick={handleNextItem} endIcon={<ArrowForwardIos fontSize="small" />}>
                  {t("portfolio.projects.next", "Next")} {activeView === "projects" ? projectLabels.toggle : experienceLabels.toggle}
                </Button>
              </Stack>
            )}
          </MotionBox>
        </Box>

        <CallToAction darkMode={darkMode} />
      </motion.div>
    </Container>
  );
}