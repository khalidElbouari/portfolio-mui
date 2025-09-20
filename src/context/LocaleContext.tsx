import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";
import cvEnRaw from "../data/cv.json";
import cvFrRaw from "../data/cv.fr.json";
import cvArRaw from "../data/cv.ar.json";

type LocaleResources = typeof en;

type CvEducation = {
  degree: string;
  institution: string;
  institutionLogo: string;
  period: string;
  location?: string;
  website?: string;
  status?: string;
  grade?: string;
  projects?: string[];
};

type CvCertification = {
  name: string;
  issuer: string;
  year?: string;
  link?: string;
  image: string;
  category?: string;
  skillsAcquired?: string[];
};

type CvProject = {
  title: string;
  period: string;
  duration?: string;
  description: string;
  technologies?: string[];
  images?: string[];
  projectLink?: string;
  githubLink?: string;
};

type CvExperience = {
  position: string;
  company: string;
  companyLogo?: string;
  website?: string;
  location?: string;
  period: string;
  duration?: string;
  description?: string;
  technologies?: string[];
  images?: string[];
  achievements?: string[];
  roleType?: string;
};

type CvData = {
  personal: {
    name: string;
    title: string;
    phone: string;
    email: string;
    address: string;
    portfolio: string;
    linkedin: string;
    github: string;
    profilePicture: string;
  };
  summary: string;
  education: CvEducation[];
  experience: CvExperience[];
  projects: CvProject[];
  certifications: CvCertification[];
  skills: Record<string, string[]>;
  languages: Array<{ name: string; level: string }>;
  softSkills?: string[];
};

/**
 * Prefix a path with the Vite base for subpath deployments (e.g. GitHub Pages).
 * Leaves absolute URLs (http/https/data) untouched.
 */
const withBase = (p: string): string => {
  if (!p) return p;
  if (p.startsWith("http://") || p.startsWith("https://") || p.startsWith("data:")) return p;
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const clean = p.startsWith("/") ? p.slice(1) : p;
  return `${base}${clean}`;
};

/**
 * Deeply traverse an object/array and prefix any string starting with "/"
 * with the current Vite base. This makes JSON-defined asset paths (e.g. "/images/...") work
 * when the app is hosted under a subpath like "/repo-name/".
 */
function normalizeAssets<T>(obj: T): T {
  if (obj == null) return obj;
  if (typeof obj === "string") {
    return (obj.startsWith("/") ? withBase(obj) : obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((v) => normalizeAssets(v)) as unknown as T;
  }
  if (typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[k] = normalizeAssets(v as unknown);
    }
    return out as unknown as T;
  }
  return obj;
}

const resources = {
  en,
  fr,
  ar
} as const;

export type Locale = keyof typeof resources;

const cvResources: Partial<Record<Locale, CvData>> = {
  en: cvEnRaw as CvData,
  fr: cvFrRaw as CvData,
  ar: cvArRaw as CvData
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
  availableLocales: Array<{ code: Locale; label: string }>;
  cv: CvData;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "portfolio.locale";
const FALLBACK_LOCALE: Locale = "en";
const localeKeys = Object.keys(resources) as Locale[];

type Dictionary = Record<string, unknown>;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return FALLBACK_LOCALE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && localeKeys.includes(stored)) {
    return stored;
  }

  const navigatorLocale = window.navigator.language?.slice(0, 2).toLowerCase() as Locale | undefined;
  if (navigatorLocale && localeKeys.includes(navigatorLocale)) {
    return navigatorLocale;
  }

  return FALLBACK_LOCALE;
}

function resolveValue(dictionary: Dictionary, path: string[]): unknown {
  return path.reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === "object" && segment in (acc as Dictionary)) {
      return (acc as Dictionary)[segment];
    }
    return undefined;
  }, dictionary);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    }
  }, [locale]);

  const changeLocale = useCallback((next: Locale) => {
    if (!localeKeys.includes(next)) {
      return;
    }
    setLocaleState((prev) => (prev === next ? prev : next));
  }, []);

  const translate = useCallback(
    (key: string, fallback?: string) => {
      const segments = key.split(".");
      const primaryDictionary = resources[locale] as Dictionary;
      const fallbackDictionary = resources[FALLBACK_LOCALE] as Dictionary;

      const primaryValue = resolveValue(primaryDictionary, segments);
      const fallbackValue = locale === FALLBACK_LOCALE
        ? undefined
        : resolveValue(fallbackDictionary, segments);

      const resolved = primaryValue ?? fallbackValue;

      if (resolved == null) {
        return fallback ?? key;
      }

      if (typeof resolved === "string" || typeof resolved === "number") {
        return String(resolved);
      }

      return fallback ?? key;
    },
    [locale]
  );

  const availableLocales = useMemo(
    () => localeKeys.map((code) => ({
      code,
      label: ((resources[code] as LocaleResources).locale?.label ?? code.toUpperCase()) as string
    })),
    []
  );

  const cvData = useMemo(
    () => normalizeAssets((cvResources[locale] ?? (cvEnRaw as CvData)) as CvData),
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: changeLocale,
      t: translate,
      availableLocales,
      cv: cvData
    }),
    [availableLocales, changeLocale, cvData, locale, translate]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export function useTranslation() {
  return useLocale();
}
