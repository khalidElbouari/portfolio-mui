import { Box, Typography, useTheme } from "@mui/material";
import { Work, Code } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  darkMode: boolean;
  icon?: 'work' | 'code' | 'none';
  sx?: object;
}

export const SectionHeader = ({ title, subtitle, darkMode, icon, sx }: SectionHeaderProps) => {
  const IconComp = icon === 'work' ? Work : icon === 'code' ? Code : null;
  const theme = useTheme();
  // respect reduced motion in animations elsewhere; header has no motion

  return (
    <Box sx={{ textAlign: "center", mb: 4, ...sx }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg,
              ${theme.palette.primary.main},
              ${theme.palette.secondary.main || alpha(theme.palette.primary.main, 0.7)})`
          }
        }}
      >
        {IconComp && (
          <IconComp sx={{
            fontSize: { xs: 32, sm: 36, md: 40 },
            color: theme.palette.text.secondary,
            filter: darkMode ? 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' : 'drop-shadow(0 0 8px rgba(0,0,0,0.1))'
          }} />
        )}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
            background: darkMode
              ? `linear-gradient(90deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.7)})`
              : `linear-gradient(90deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.8)})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{
          maxWidth: 640,
          mx: "auto",
          fontWeight: 500,
          letterSpacing: 0,
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          lineHeight: 1.6
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
