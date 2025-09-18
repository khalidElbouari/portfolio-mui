import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { useTranslation } from "./LocaleContext";

export type ChatRole = "user" | "bot" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: number;
}

interface ChatApiResponse {
  reply?: string;
  error?: string;
  details?: string;
}

interface ChatContextValue {
  isOpen: boolean;
  typing: boolean;
  messages: ChatMessage[];
  unread: number;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  send: (text: string) => Promise<void>;
  quickAsk: (topic: "skills" | "projects" | "experience" | "contact") => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const STORAGE_KEY = "portfolio.chat.messages";
const OPEN_KEY = "portfolio.chat.open";
const DEFAULT_API_URL = "https://khalid-bot-api-ke22.vercel.app/api/chat";
const API_URL = (typeof import.meta !== "undefined" && import.meta.env?.VITE_CHAT_API_URL) || DEFAULT_API_URL;

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(OPEN_KEY) === "1";
  });
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const controllerRef = useRef<AbortController | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as ChatMessage[];
    } catch {
      /* ignore */
    }
    // Seed with a friendly greeting
    return [
      {
        id: uid(),
        role: "bot",
        text: t("chat.greeting", "Hi, I’m Khalid. How can I help?"),
        timestamp: Date.now()
      }
    ];
  });

  // Persist state
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(OPEN_KEY, isOpen ? "1" : "0");
    if (isOpen) setUnread(0);
  }, [isOpen]);

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);
  const toggleChat = useCallback(() => setOpen((v) => !v), []);

  const append = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
    if (!isOpen) setUnread((n) => n + 1);
  }, [isOpen]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: uid(), role: "user", text: trimmed, timestamp: Date.now() };
    append(userMsg);

    // Cancel previous request if any
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    // Type indicator
    setTyping(true);

    // Small, realistic delay
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await delay(400 + Math.random() * 500);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const backendError = typeof data === "object" && data !== null
          ? (data as ChatApiResponse).error ?? (data as ChatApiResponse).details
          : null;
        const message = typeof backendError === "string"
          ? backendError
          : t("chat.error", "Oops! Something went wrong. Please try again later.");
        throw new Error(message);
      }

      const reply = typeof data === "object" && data && typeof (data as ChatApiResponse).reply === "string"
        ? (data as ChatApiResponse).reply as string
        : t("chat.fallback", "Thanks! I'll get back to you shortly.");

      await delay(200 + Math.random() * 400);
      append({ id: uid(), role: "bot", text: reply, timestamp: Date.now() });
    } catch (error) {
      const message = error instanceof Error && error.message
        ? error.message
        : t("chat.error", "Oops! Something went wrong. Please try again later.");

      append({
        id: uid(),
        role: "bot",
        text: message,
        timestamp: Date.now()
      });
    } finally {
      setTyping(false);
    }
  }, [append, t]);

  const quickAsk = useCallback(async (topic: "skills" | "projects" | "experience" | "contact") => {
    const promptMap: Record<typeof topic, string> = {
      skills: t("chat.quick.skills"),
      projects: t("chat.quick.projects"),
      experience: t("chat.quick.experience"),
      contact: t("chat.quick.contact")
    } as const;
    await send(promptMap[topic]);
  }, [send, t]);

  const value: ChatContextValue = useMemo(() => ({
    isOpen,
    typing,
    messages,
    unread,
    openChat,
    closeChat,
    toggleChat,
    send,
    quickAsk
  }), [isOpen, typing, messages, unread, openChat, closeChat, toggleChat, send, quickAsk]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}

