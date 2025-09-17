import { ToggleButton, ToggleButtonGroup, type ToggleButtonGroupProps } from "@mui/material";
import { type MouseEvent } from "react";
import { useTranslation, type Locale } from "../context/LocaleContext";

type LanguageSwitcherProps = Pick<ToggleButtonGroupProps, "size" | "color"> & {
  dense?: boolean;
};

export function LanguageSwitcher({ size = "small", color = "primary", dense = false }: LanguageSwitcherProps) {
  const { locale, setLocale, availableLocales } = useTranslation();

  const handleChange = (_: MouseEvent<HTMLElement>, nextLocale: string | null) => {
    if (!nextLocale) {
      return;
    }

    if (nextLocale === locale) {
      return;
    }

    setLocale(nextLocale as Locale);
  };

  return (
    <ToggleButtonGroup
      value={locale}
      exclusive
      onChange={handleChange}
      size={size}
      color={color}
      sx={{
        borderRadius: 3,
        gap: dense ? 0 : 0.5,
        p: dense ? 0 : 0.5,
        bgcolor: "transparent"
      }}
    >
      {availableLocales.map(({ code, label }) => (
        <ToggleButton
          key={code}
          value={code}
          sx={{
            px: dense ? 1.5 : 2,
            py: dense ? 0.5 : 0.75,
            fontWeight: 600,
            letterSpacing: "0.08em"
          }}
        >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}