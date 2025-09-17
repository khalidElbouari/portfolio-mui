import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Projects from "./components/projects";
import SkillsAndCerts from "./components/SkillsAndCerts";
import ChatWidget from "./components/ChatWidget";
import { ChatProvider } from "./context/ChatContext";

export default function App() {
  return (
    <ChatProvider>
      <Box
        sx={{
          minHeight: "100vh",
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? "linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(3,7,18,1) 100%)"
              : "linear-gradient(180deg, #fafcff 0%, #ffffff 100%)"
        }}
      >
        <Header />
        <Hero />
        {/* 1) Education */}
        <Education />
        {/* 2) Featured Projects - Professional Experience */}
        <Projects />
        {/* 3) Certifications & Skills (including Languages) */}
        <SkillsAndCerts />

        {/* Floating chat */}
        <ChatWidget />
      </Box>
    </ChatProvider>
  );
}
