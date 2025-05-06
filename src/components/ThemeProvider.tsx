
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set light mode as default
    document.documentElement.classList.add("light-mode");
  }, []);

  const toggleTheme = () => {
    // Light mode is always on, so this is a no-op now
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// ThemeToggle is now removed as we no longer need to toggle between light and dark modes
