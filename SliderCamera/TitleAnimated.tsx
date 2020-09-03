import React from 'react';
import Animated, { interpolate } from 'react-native-reanimated';
import data from './data';
import { Text, StyleSheet, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

export const FONT_SIZE = 28;

const styles = StyleSheet.create({
    infoProductoTitleContainer: {
        //backgroundColor: 'green',
        height: FONT_SIZE,
        overflow: 'hidden',
        position:'absolute',
        top: 50,
        left: 16
    },
    infoProductTitle: {
        fontSize: FONT_SIZE,
        fontWeight: '800',
        textTransform: 'uppercase',
        lineHeight: FONT_SIZE,
        color: '#fff',
    },
})
const TitleAnimated = ({x, title, index}) => {
    const inputRange =[ (index - .5) * width, (index) * width, (index + .5) * width ];
    const opacity = interpolate(x, {
        inputRange,
        outputRange: [0, 1, 0]
    });

    return (
        <Animated.View style={[styles.infoProductoTitleContainer, { opacity }]}>
            <Text style={styles.infoProductTitle} >{title}</Text>
        </Animated.View>
    )
}

export default TitleAnimated;