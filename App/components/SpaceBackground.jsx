import React from 'react';
import { Image, Dimensions } from 'react-native';

function getRandomPosition() {
    return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
    };
}

const SpaceBackground = () => {
    // Default configurations
    const screenWidth = Dimensions.get('window').width;
    const NUM_STARS = 10;
    const starSize = { star: screenWidth * 0.05, spaceship: screenWidth * 0.12 };
    const planetSize = screenWidth * 0.2; 

    const generateStars = (type, count, size) =>
        Array(count).fill().map((_, index) => ({
            id: `${type}-${index}`,
            source:
                type === 'shooting-star'
                    ? require('../assets/homeAssets/shooting-star.png')
                    : type === 'star-bright'
                        ? require('../assets/homeAssets/star-bright.png')
                        : require('../assets/homeAssets/star-deem.png'),
            style: {
                position: "absolute",
                height: size,
                width: size,
                ...getRandomPosition(),
            },
        }));

    const starTypes = ['shooting-star', 'star-bright', 'star-deem'];
    const dynamicStars = starTypes.flatMap((type) =>
        generateStars(type, NUM_STARS, type === 'shooting-star' ? starSize.spaceship : starSize.star)
    );

    return (
        <>
            <Image
                key={"sun-1"}
                source={require('../assets/homeAssets/sun.png')}
                style={{
                    position: "absolute",
                    height: planetSize,
                    width: planetSize,
                    top: "-5%",
                    right: "5%",
                }}
            />
            {dynamicStars.map((star) => (
                <Image
                    key={star.id}
                    source={star.source}
                    style={star.style}
                />
            ))}
        </>
    );
};

export default SpaceBackground;