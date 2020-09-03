import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import DATA from './data';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    logoContainer: {
        height: 124,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: width/2,
        height: 100,
        overflow: 'hidden',
    },
    logoTextContainer: {
    },
    logoText: {
        color: 'white',
        fontSize: 14
    },
})

const Logos = ({x}) => {
    
    return (
        <>
        <View style={styles.logoContainer}>
        {
            DATA.map((item, index) => {
                const scale = interpolate(x, {
                    inputRange: [ (index - 1) * width, (index) * width, (index + 1) * width],
                    outputRange: [0, 1, 0],
                })
                
            
                return (
                        <Animated.View style={[{position: 'absolute', opacity: scale, transform: [{ scale }] }]} key={index.toString()}>
                            <Image 
                                style={styles.logoImage}
                                resizeMode='contain'
                                source={require('./../assets/cocacola/logos/Coca-Cola-White-Logo.png')}
                                />
                            <View style={styles.logoTextContainer}>
                                <Text style={styles.logoText}>{item.type}</Text>
                            </View>
                        </Animated.View>
                )
            })
        }
        </View>
        </>
    )
}

export default Logos;