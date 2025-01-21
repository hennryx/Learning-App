import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import SpaceBackground from '@/components/SpaceBackground';
import { StatusBar } from 'expo-status-bar';
import { getComputedScreenHeight } from '@/hooks/useFunction';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Home() {
    const setSelectedModule = useStore((state) => state.setSelectedModule);

    const planetSize = screenWidth * 0.2;
    const spaceshipSize = screenWidth * 0.12;
    const spaceBoySize = screenWidth * 0.4;

    const router = useRouter()
    getComputedScreenHeight();

    const images = [
        {
            id: 1,
            source: require('@/assets/homeAssets/atom.png'),
            style: {
                position: "absolute",
                height: spaceshipSize,
                width: spaceshipSize,
                bottom: "5%",
                left: "15%",
            }
        },
        {
            id: 2,
            source: require('@/assets/homeAssets/blue-plannet.png'),
            style: {
                position: "absolute",
                height: planetSize,
                width: planetSize,
                bottom: "50%",
                right: "5%",
            }
        },
        {
            id: 3,
            source: require('@/assets/homeAssets/purple-plannet.png'),
            style: {
                position: "absolute",
                height: planetSize,
                width: planetSize,
                bottom: "30%",
                left: "3%",
            }
        },
        {
            id: 4,
            source: require('@/assets/homeAssets/red-double-ring-plannet.png'),
            style: {
                position: "absolute",
                height: planetSize,
                width: planetSize,
                top: "20%",
                left: "10%",
            }
        },
        {
            id: 5,
            source: require('@/assets/homeAssets/red-plannet.png'),
            style: {
                position: "absolute",
                height: planetSize,
                width: planetSize,
                bottom: "5%",
                right: "20%",
            }
        },
        {
            id: 6,
            source: require('@/assets/homeAssets/space-boy.png'),
            style: {
                position: "absolute",
                height: spaceBoySize,
                width: spaceBoySize,
                top: "50%",
                left: "50%",
                transform: [{ translateX: -spaceBoySize / 2 }, { translateY: -spaceBoySize / 2 }]
            }
        },
        {
            id: 7,
            source: require('@/assets/homeAssets/space-ship.png'),
            style: {
                position: "absolute",
                height: spaceshipSize,
                width: spaceshipSize,
                bottom: "20%",
                right: "15%",
                transform: [{ rotate: '40deg' }]
            }
        },
        {
            id: 9,
            source: require('@/assets/homeAssets/ufo.png'),
            style: {
                position: "absolute",
                height: planetSize * 0.8,
                width: planetSize * 0.8,
                top: "3%",
                left: "15%",
                transform: [{ rotate: '315deg' }]
            }
        },
        {
            id: 10,
            source: require('@/assets/homeAssets/yellow-ring-plannet.png'),
            style: {
                position: "absolute",
                height: planetSize,
                width: planetSize,
                top: "10%",
                right: "25%",
            }
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#15026B' }}>
            <View style={{ flex: 1, padding: screenWidth * 0.01, backgroundColor: '#15026B', height: "100%" }}>
                <View style={{ height: "60%", position: "relative" }}>
                    <SpaceBackground />
                    {images.map((img) => (
                        <Image
                            key={img.id}
                            source={img.source}
                            style={img.style}
                        />
                    ))}
                </View>
                <View style={{
                    height: "40%",
                    backgroundColor: "#280BA7",
                    borderTopRightRadius: screenWidth * 0.08,
                    borderTopLeftRadius: screenWidth * 0.08,
                    position: "relative"
                }}>
                    <Image
                        source={require('@/assets/homeAssets/rocks.png')}
                        style={{
                            height: screenHeight * 0.12,
                            width: screenWidth * 0.22,
                            position: "absolute",
                            top: screenHeight * -0.05,
                            right: 0
                        }}
                    />

                    <Text style={{
                        color: "#fff",
                        fontSize: screenWidth * 0.08,
                        fontWeight: "bold",
                        margin: "auto",
                        textAlign: "justify",
                        lineHeight: screenWidth * 0.1
                    }}>
                        Introduction to{'\n'}Science{'\n'}<Text style={{color: "#fff", fontSize: screenWidth * 0.05}}>Quarter 1 – Module 1</Text>
                    </Text>
                    <TouchableOpacity
                        key='science101'
                        style={{
                            backgroundColor: "#E06900",
                            paddingVertical: screenHeight * 0.015,
                            paddingHorizontal: screenWidth * 0.05,
                            borderRadius: screenWidth * 0.02,
                            margin: "auto"
                        }}
                        onPress={() => {
                            setSelectedModule("science101")
                            router.push(`/(screens)/lesson/science101/1`)
                        }}
                    >
                        <Text style={{
                            color: "#fff",
                            fontSize: screenWidth * 0.04,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style='dark' />
        </SafeAreaView>
    );
}