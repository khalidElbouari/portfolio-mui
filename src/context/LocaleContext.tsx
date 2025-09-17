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
import cvEn from "../data/cv.json";
import cvFr from "../data/cv.fr.json";
import cvAr from "../data/cv.ar.json";

type LocaleResources = typeof en;
type CvData = typeof cvEn;

const resources = {
  en,
  fr,
  ar
} as const;

export type Locale = keyof typeof resources;

const cvResources: Partial<Record<Locale, CvData>> = {
  en: cvEn,
  fr: cvFr,
  ar: cvAr
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

  const cvData = useMemo(() => cvResources[locale] ?? cvEn, [locale]);

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
