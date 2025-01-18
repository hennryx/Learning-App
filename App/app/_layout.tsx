import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { CustomDrawerContent } from '../components/CustomDrawerContent';

export default function Layout() {
    const colorScheme = useColorScheme();

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
                },
                headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
            }}
        >
            <Drawer.Screen
                name="index"
                options={{
                    title: 'E-Learning',
                    drawerLabel: 'Home',
                }}
            />
            <Drawer.Screen
                name="module/[id]"
                options={{
                    title: 'E-Learning',
                    drawerLabel: 'Module',
                }}
            />
            <Drawer.Screen
                name="lesson/[moduleId]/[lessonId]"
                options={{
                    title: 'E-Learning',
                    drawerLabel: 'Lesson',
                }}
            />
        </Drawer>
    );
}