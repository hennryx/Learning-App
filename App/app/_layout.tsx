import { Drawer } from 'expo-router/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {

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
                        <TouchableOpacity
                            onPress={navigation.toggleDrawer}
                            className="ml-4"
                        >
                            <Ionicons name="menu" size={24} color="#E06900" />
                        </TouchableOpacity>
                    ),
                    headerTitle: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('index')}
                        >
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
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
        </View>
    );
}