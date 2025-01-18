import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { modules } from '../data/modules';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';

function getRandomPosition() {
    return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    };
}

export default function Home() {
    const setSelectedModule = useStore((state) => state.setSelectedModule);

    const images = [
        {
            id: 1,
            source: require('../assets/homeAssets/atom.png'),
            style: {
                position: "absolute",
                height: 48.1,
                width: 50,
                bottom: "10px",
                left: "70px",
            }
        },
        {
            id: 2,
            source: require('../assets/homeAssets/blue-plannet.png'),
            style: {
                position: "absolute",
                height: 80,
                width: 80,
                bottom: "50%",
                right: "20px",
            }
        },
        {
            id: 4,
            source: require('../assets/homeAssets/purple-plannet.png'),
            style: {
                position: "absolute",
                height: 70,
                width: 70,
                bottom: "100px",
                left: "20px",
            }
        },
        {
            id: 5,
            source: require('../assets/homeAssets/red-double-ring-plannet.png'),
            style: {
                position: "absolute",
                height: 60,
                width: 60,
                top: "100px",
                left: "60px",
            }
        },
        {
            id: 6,
            source: require('../assets/homeAssets/red-plannet.png'),
            style: {
                position: "absolute",
                height: 90,
                width: 90,
                bottom: "20px",
                right: "90px",
            }
        },
        {
            id: 7,
            source: require('../assets/homeAssets/shooting-star.png'),
            style: {
                position: "absolute",
                height: 48.1,
                width: 50,
                ...getRandomPosition(),
            },
        },
        {
            id: 8,
            source: require('../assets/homeAssets/shooting-star.png'),
            style: {
                position: "absolute",
                height: 48.1,
                width: 50,
                ...getRandomPosition(),
            },
        },
        {
            id: 9,
            source: require('../assets/homeAssets/space-boy.png'),
            style: {
                position: "absolute",
                height: 160,
                width: 160,
                inset: 0,
                transform: "translate(60%, 70%)"
            }
        },
        {
            id: 10,
            source: require('../assets/homeAssets/space-ship.png'),
            style: {
                position: "absolute",
                height: 48.1,
                width: 50,
                bottom: "90px",
                right: "66px",
                rotate: "40deg"
            }
        },
        {
            id: 11,
            source: require('../assets/homeAssets/star-bright.png'),
            style: {
                position: "absolute",
                height: 20,
                width: 20,
                top: "10px",
                left: "20px",
            }
        },
        {
            id: 12,
            source: require('../assets/homeAssets/star-deem.png'),
            style: {
                position: "absolute",
                height: 20,
                width: 20,
                top: "20px",
                left: "40px",
            }
        },
        {
            id: 13,
            source: require('../assets/homeAssets/sun.png'),
            style: {
                position: "absolute",
                height: 90,
                width: 90,
                top: "-20px",
                right: "20px",
                zIndex: "10"
            }
        },
        {
            id: 15,
            source: require('../assets/homeAssets/ufo.png'),
            style: {
                position: "absolute",
                height: 80,
                width: 80,
                top: "10px",
                left: "60px",
                rotate: "315deg"
            }
        },
        {
            id: 16,
            source: require('../assets/homeAssets/yellow-ring-plannet.png'),
            style: {
                position: "absolute",
                height: 100,
                width: 100,
                top: "50px",
                right: "100px",
            }
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#15026B' }}>
            <View style={{ flex: 1, padding: 5, backgroundColor: '#15026B', height: "100%" }}>
                <View style={{ height: "60%", position: "relative" }}>
                    {images.map((img) => (
                        <Image
                            key={img.id}
                            source={img.source}
                            style={img.style}
                        />
                    ))}
                </View>
                <View style={{ height: "40%", backgroundColor: "#280BA7", borderTopRightRadius: "2rem", borderTopLeftRadius: "2rem", position: "relative" }}>
                    <Image
                        source={require('../assets/homeAssets/rocks.png')}
                        style={{
                            height: 90,
                            width: 80,
                            position: "absolute",
                            top: "-40px",
                            right: "0"
                        }}
                    />

                    <Text style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold", margin: "auto", textAlign: "justify", lineHeight: "1.6" }}>Introduction to<br />Science 101</Text>

                    <Link
                        key='science101'
                        href={`/module/science101`}
                        asChild
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#E06900",
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                borderRadius: 8,
                                margin: "auto"
                            }}
                            onPress={() => setSelectedModule("science101")}
                        >
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                                Get Started
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}
