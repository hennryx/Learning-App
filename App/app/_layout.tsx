import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { ThemeProvider, useTheme } from '../components/ThemeContext'; // Import the ThemeContext

// Create the DrawerLayout component to use the theme
function DrawerLayout() {
  const currentPath = usePathname();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  console.log(colors.primary);
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <>
              {currentPath !== "/" && (
                <TouchableOpacity
                  onPress={navigation.toggleDrawer}
                  className="ml-4"
                >
                  <Ionicons name="menu" size={35} color={colors.accent} />
                </TouchableOpacity>
              )}
            </>
          ),
          headerTitle: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('index')}
            >
              <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', paddingLeft: 16 }}>
                E-Learning
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={toggleTheme}
              className="mr-4"
            >
              <Ionicons 
                name={isDarkMode ? "sunny" : "moon"} 
                size={24} 
                color={colors.text} 
              />
            </TouchableOpacity>
          ),
          sceneContainerStyle: {
            backgroundColor: colors.background,
          },
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'E-Learning',
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="(screens)/lesson/[moduleId]/[lessonId]"
          options={{
            title: 'E-Learning',
            drawerLabel: 'Lesson',
          }}
        />
      </Drawer>
    </View>
  );
}

// Wrap the DrawerLayout with ThemeProvider
export default function Layout() {
  return (
    <ThemeProvider>
      <DrawerLayout />
    </ThemeProvider>
  );
}