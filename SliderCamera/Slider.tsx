import React from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import { Image, StyleSheet, Dimensions, Text, View } from 'react-native';
import TitleAnimated from './TitleAnimated';

const { width } = Dimensions.get('window');

export const SIZE_IMAGE = width * .8;
export const SIZE_SLIDE = width;

const styles = StyleSheet.create({
    imageContainer: {
        width,
        height: SIZE_SLIDE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: SIZE_IMAGE,
        height: SIZE_IMAGE
    },
    infoProductDescription: {
        //fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 24,
        textTransform: 'uppercase',
        color: 'rgba(0,10,30,.55)',
        paddingHorizontal: 18
    },
});

const Sliders = ({x, index, item}) => {
    const inputRange =[ (index - .5) * width, (index) * width, (index + .5) * width ];

    const scale = interpolate(x, {
        inputRange,
        outputRange: [0.5,1,0.5]
    })
    const opacity = interpolate(x, {
        inputRange,
        outputRange: [0.8,1,0.8]
    })
    const translateY = interpolate(x, {
        inputRange,
        outputRange: [-200,0,-200]
    })

    return (
        <>

        <Animated.View key={item.id} style={[styles.imageContainer, {
            transform: [{scale}, {translateY}],
            opacity
        }]}>
            <Image source={item.img} style={styles.image} />
        </Animated.View>
        <TitleAnimated {...{x, index}} {...item} />
        <View style={{ width, padding: 18, }}>
            <Animated.Text style={[styles.infoProductDescription, { transform: [{scale}] }]}>
                {item.description}
            </Animated.Text>
        </View>
        </>
    )
}

export default Sliders;