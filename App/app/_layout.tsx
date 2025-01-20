import { Drawer } from 'expo-router/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';

export default function Layout() {

    const currentPath = usePathname()

    return (
        <View style={{ flex: 1, backgroundColor: '#15026B' }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#15026B',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerTintColor: '#fff',
                    headerLeft: () => (
                        <>
                            {currentPath !== "/" && (
                                <TouchableOpacity
                                    onPress={navigation.toggleDrawer}
                                    className="ml-4"
                                >
                                    <Ionicons name="menu" size={35} color="#E06900" />
                                </TouchableOpacity>
                            )}
                        </>
                    ),
                    headerTitle: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('index')}
                        >
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingLeft: 16 }}>
                                E-Learning
                            </Text>
                        </TouchableOpacity>
                    ),
                    sceneContainerStyle: {
                        backgroundColor: '#15026B',
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