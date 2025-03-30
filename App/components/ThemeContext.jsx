import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme preference from storage on app start
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.log('Error loading theme', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme', error);
    }
  };

  // Define theme colors
  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? 
      {
        // Dark theme colors
        primary: '#15026B',
        background: '#121212',
        card: '#1E1E1E',
        text: '#FFFFFF',
        accent: '#E06900',
      } : 
      {
        // Light theme colors
        primary: '#d9d9d9',
        background: '#FFFFFF',
        card: '#F5F5F5',
        text: '#000000',
        accent: '#E06900',
      }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);