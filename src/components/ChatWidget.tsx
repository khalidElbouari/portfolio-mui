import { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  Drawer,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import {
  Chat,
  Close,
  Send,
  Bolt,
  WorkOutline,
  FolderOpen,
  Person
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../context/LocaleContext";
import { useChat } from "../context/ChatContext";

export default function ChatWidget() {
  const { darkMode } = useThemeContext();
  const { t } = useTranslation();
  const { isOpen, toggleChat, closeChat, unread, messages, typing, send, quickAsk } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, isOpen]);

  const headerBg = darkMode ? "rgba(15, 23, 42, 0.9)" : "rgba(255,255,255,0.9)";

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await send(text);
  };

  const quickChips = useMemo(() => ([
    { key: "skills" as const, label: t("chat.quick.skillsLabel", "Skills"), icon: <Bolt fontSize="small" /> },
    { key: "projects" as const, label: t("chat.quick.projectsLabel", "Projects"), icon: <FolderOpen fontSize="small" /> },
    { key: "experience" as const, label: t("chat.quick.experienceLabel", "Experience"), icon: <WorkOutline fontSize="small" /> },
    { key: "contact" as const, label: t("chat.quick.contactLabel", "Contact"), icon: <Person fontSize="small" /> }
  ]), [t]);

  return (
    <>
      <Tooltip title={t("chat.cta", "Let’s Talk") as string} placement="left">
        <Badge
          overlap="circular"
          color="primary"
          badgeContent={unread || null}
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1400 }}
        >
          <Fab color={darkMode ? "default" : "primary"} onClick={toggleChat} aria-label="chat">
            <Chat />
          </Fab>
        </Badge>
      </Tooltip>

      <Drawer anchor="right" open={isOpen} onClose={closeChat} PaperProps={{ sx: { width: { xs: 360, sm: 400 }, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <Box sx={{ px: 2, py: 1.5, bgcolor: headerBg, backdropFilter: "blur(8px)", borderBottom: 1, borderColor: "divider", position: "sticky", top: 0, zIndex: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ bgcolor: darkMode ? "#00d4ff" : "primary.main" }}>K</Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Khalid Elbouari</Typography>
                  <Typography variant="caption" color="text.secondary">{t("chat.subtitle", "Typically replies in minutes")}</Typography>
                </Box>
              </Stack>
              <IconButton size="small" onClick={closeChat}>
                <Close />
              </IconButton>
            </Stack>
          </Box>

          {/* Messages */}
          <Box ref={scrollRef} sx={{ flex: 1, overflowY: "auto", p: 2, background: darkMode ? "#0b0f19" : "#fafbfd" }}>
            <Stack spacing={1.5}>
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Stack direction="row" spacing={1} justifyContent={m.role === "user" ? "flex-end" : "flex-start"}>
                    {m.role !== "user" && <Avatar sx={{ width: 28, height: 28, bgcolor: darkMode ? "#00d4ff" : "primary.main" }}>K</Avatar>}
                    <Box sx={{
                      maxWidth: "80%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: m.role === "user" ? (darkMode ? "#22303c" : "#e3f2fd") : (darkMode ? "#141a26" : "#ffffff"),
                      color: "text.primary",
                      border: "1px solid",
                      borderColor: m.role === "user" ? (darkMode ? "#2c3a47" : "#bbdefb") : "divider",
                      boxShadow: m.role === "user" ? "none" : (darkMode ? "0 6px 16px rgba(0,0,0,0.25)" : "0 6px 16px rgba(0,0,0,0.06)")
                    }}>
                      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{m.text}</Typography>
                    </Box>
                    {m.role === "user" && <Avatar sx={{ width: 28, height: 28 }}>You</Avatar>}
                  </Stack>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Stack direction="row" spacing={1}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: darkMode ? "#00d4ff" : "primary.main" }}>K</Avatar>
                      <Box sx={{ px: 1.5, py: 1, borderRadius: 2, bgcolor: darkMode ? "#141a26" : "#ffffff", border: 1, borderColor: "divider" }}>
                        <Stack direction="row" spacing={0.5}>
                          {[0,1,2].map((i) => (
                            <motion.span key={i} style={{ width: 6, height: 6, borderRadius: 4, background: "#9aa4b2", display: "inline-block" }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </Stack>
          </Box>

          {/* Quick replies */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {quickChips.map((c) => (
                <Chip key={c.key} icon={c.icon} label={c.label} onClick={() => quickAsk(c.key)} sx={{ mr: 0.5, mb: 0.5 }} />
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Composer */}
          <Box sx={{ p: 1.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t("chat.placeholder", "Type a message…")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton color="primary" onClick={handleSend} disabled={!input.trim()}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
