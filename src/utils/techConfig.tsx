// utils/techConfig.tsx
import React from "react";
import { SvgIcon } from "@mui/material";
import { Code } from "@mui/icons-material";
import {
  siOpenjdk,
  siSpring,
  siHibernate,
  siReact,
  siTypescript,
  siJavascript,
  siAngular,
  siHtml5,
  siCss3,
  siApachemaven,
  siGit,
  siGithub,
  siGitlab,
  siDocker,
  siMysql,
  siOracle,
  siJunit5,
  siTrello,
  siGrafana
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const iconMap: Record<string, SimpleIcon> = {
  Java: siOpenjdk,
  "Spring Boot": siSpring,
  "Spring Cloud": siSpring,
  Hibernate: siHibernate,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Angular: siAngular,
  "HTML/CSS": siHtml5,
  HTML: siHtml5,
  CSS: siCss3,
  Maven: siApachemaven,
  Git: siGit,
  GitHub: siGithub,
  GitLab: siGitlab,
  Docker: siDocker,
  "Docker Compose": siDocker,
  MySQL: siMysql,
  "Oracle DB": siOracle,
  JPA: siOpenjdk,
  JUnit: siJunit5,
  Trello: siTrello,
  Grafana: siGrafana
};

export const getTechIcon = (tech: string): React.ReactElement => {
  const icon = iconMap[tech];
  if (icon) {
    return (
      <SvgIcon viewBox="0 0 24 24" fontSize="inherit">
        <path d={icon.path} />
      </SvgIcon>
    );
  }
  return <Code fontSize="inherit" />;
};

export const getTechColor = (tech: string): string => {
  const icon = iconMap[tech];
  if (icon?.hex) {
    return `#${icon.hex}`;
  }

  const fallbackMap: Record<string, string> = {
    Microservices: "#8b5cf6",
    XML: "#00618A",
    XSLT: "#00618A",
    XPath: "#00618A",
    "SQL Server": "#CC2927",
    "Azure Service Bus": "#0078D4",
    Zipkin: "#0D5D8C",
    Loki: "#00BFA5"
  };

  return fallbackMap[tech] || "#6b7280";
};
