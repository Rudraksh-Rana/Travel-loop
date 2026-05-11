'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
