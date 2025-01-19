import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'
import SpaceBackground from '@/components/SpaceBackground'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const Quiz = () => {
    return (
        <View style={styles.container}>
            <SpaceBackground />

            <Image
                source={require('@/assets/homeAssets/atom.png')}
                style={{
                    position: "absolute",
                    height: screenWidth * 0.15,
                    width: screenWidth * 0.15,
                    objectFit: "contain",
                    top: "10%",
                    left: "25%",
                }}
            />

            <View style={styles.circleContainer}>

                <Image
                    source={require('@/assets/homeAssets/hidding-boy.png')}
                    style={{
                        position: "absolute",
                        height: screenHeight * 0.25,
                        width: screenHeight * 0.2,
                        objectFit: "contain",
                        top: "0%",
                        left: "-5%",
                    }}
                />
                <Text style={styles.titleText}>Quiz Time!</Text>
            </View>

            <TouchableOpacity
                key='science101'
                style={styles.button}
            >
                <Text style={{
                    color: "#fff",
                    fontSize: screenWidth * 0.05,
                    fontWeight: "bold",
                    textAlign: "center"
                }}>
                    Start
                </Text>

            </TouchableOpacity>

            <Image
                source={require('@/assets/homeAssets/space-boy.png')}
                style={{
                    position: "absolute",
                    height: screenWidth * 0.5,
                    width: screenWidth * 0.5,
                    bottom: "12%",
                    right: "0%",
                    transform: "scaleX(-1)",
                    rotate: '-30deg'
                }}
            />

            <Image
                source={require('@/assets/homeAssets/red-double-ring-plannet.png')}
                style={{
                    position: "absolute",
                    height: screenWidth * 0.2,
                    width: screenWidth * 0.2,
                    objectFit: "contain",
                    bottom: "5%",
                    right: "25%",
                }}
            />

            <Image
                source={require('@/assets/homeAssets/yellow-ring-plannet.png')}
                style={{
                    position: "absolute",
                    height: screenWidth * 0.3,
                    width: screenWidth * 0.3,
                    objectFit: "contain",
                    bottom: "0",
                    left: "10%",
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#15026B",
        position: "relative",
        gap: 20
    },
    titleText: {
        color: "#fff",
        fontSize: screenWidth * 0.07,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: '20%',
        marginLeft: '10%',
        textShadow: '2px 2px 5px black'
    },
    circleContainer: {
        position: "relative",
        borderRadius: "50%",
        height: screenHeight / 3,
        width: screenHeight / 3,
        backgroundColor: "#280BA7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#E06900",
        paddingVertical: screenHeight * 0.015,
        paddingHorizontal: screenWidth * 0.12,
        borderRadius: screenWidth * 0.02,
        boxShadow: '0 8px 10px rgba(0, 0, 0, 0.25)'
    }
})

export default Quiz