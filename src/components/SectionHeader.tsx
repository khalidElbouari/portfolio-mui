import { Box, Typography, useTheme } from "@mui/material";
import { Work, Code } from "@mui/icons-material";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  darkMode: boolean;
  icon: 'work' | 'code';
}

export const SectionHeader = ({ title, subtitle, darkMode: _darkMode, icon }: SectionHeaderProps) => {
  const Icon = icon === 'work' ? Work : Code;
  const theme = useTheme();
  // respect reduced motion in animations elsewhere; header has no motion

  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Icon sx={{ fontSize: 28, color: theme.palette.text.secondary }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ width: 96, height: 2, bgcolor: 'divider', mx: 'auto', mb: 2, borderRadius: 1 }} />

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ maxWidth: 640, mx: "auto", fontWeight: 400, letterSpacing: 0 }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
