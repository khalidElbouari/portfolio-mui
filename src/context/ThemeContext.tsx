import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Save to localStorage whenever darkMode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev: boolean) => !prev);

  // Enhanced theme with better colors and typography
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { 
            main: darkMode ? "#00d4ff" : "#1976d2",
            light: darkMode ? "#4de6ff" : "#42a5f5",
            dark: darkMode ? "#00a8cc" : "#1565c0",
            contrastText: darkMode ? "#000000" : "#ffffff"
          },
          secondary: { 
            main: darkMode ? "#ff6b9d" : "#9c27b0",
            light: darkMode ? "#ff9ec7" : "#ba68c8",
            dark: darkMode ? "#cc5577" : "#7b1fa2"
          },
          background: {
            default: darkMode ? "#0a0a0f" : "#f8fafc",
            paper: darkMode ? "#0f172a" : "#ffffff"
          },
          text: {
            primary: darkMode ? "#f1f5f9" : "#1e293b",
            secondary: darkMode ? "#94a3b8" : "#64748b"
          },
          divider: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
          action: {
            hover: darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
            selected: darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
          }
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          h1: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1
          },
          h2: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.2
          },
          h3: {
            fontWeight: 700,
            letterSpacing: "-0.01em"
          },
          h4: {
            fontWeight: 600,
            letterSpacing: "-0.005em"
          },
          h5: {
            fontWeight: 600
          },
          h6: {
            fontWeight: 600
          },
          body1: {
            lineHeight: 1.7
          },
          body2: {
            lineHeight: 1.6
          },
          button: {
            textTransform: "none",
            fontWeight: 600
          }
        },
        shape: {
          borderRadius: 12
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: "none",
                fontWeight: 600,
                padding: "10px 24px"
              },
              contained: {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)"
                }
              }
            }
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                borderRadius: 10
              }
            }
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                fontWeight: 500
              }
            }
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: "none"
              }
            }
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none"
              }
            }
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                  width: "8px"
                },
                "&::-webkit-scrollbar-track": {
                  background: darkMode ? "#1e293b" : "#f1f5f9"
                },
                "&::-webkit-scrollbar-thumb": {
                  background: darkMode ? "#475569" : "#cbd5e1",
                  borderRadius: "4px",
                  "&:hover": {
                    background: darkMode ? "#64748b" : "#94a3b8"
                  }
                }
              },
              "*": {
                "&::selection": {
                  backgroundColor: darkMode ? "rgba(0, 212, 255, 0.3)" : "rgba(25, 118, 210, 0.3)"
                }
              }
            }
          }
        }
      }),
    [darkMode]
  );

  // Add theme change animation effect
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--theme-transition', 
      'background-color 0.3s ease, color 0.3s ease'
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};