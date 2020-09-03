import React, { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, { interpolate, multiply, useCode, cond, eq, call } from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";
import { MaterialIcons as Icon } from "@expo/vector-icons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const { width } = Dimensions.get('window');

const SIZE = width - 300;
const STROKE_WIDTH = SIZE * .03;
const radius = SIZE / 2;
const circumference = radius * 2  * Math.PI;
const SIZE_ICON = (SIZE - STROKE_WIDTH) / 1.5;

const styles = StyleSheet.create({
    icon: {
        top: (SIZE - SIZE_ICON) / 2,
        left: (SIZE - SIZE_ICON) / 2,
    }
})

interface ButtonProps {
    progress: Animated.Node<number>
}

const Button = ({ progress }: ButtonProps) => {
    const [ checked, setCheked ] = useState(false);

    const a = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [Math.PI * 2, 0]
      });
      
    const strokeDashoffset = multiply(a, radius);

    const height = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, SIZE_ICON]
    })

    useCode(
        () => 
            cond(
                eq(progress, 1), 
                call([], () => setCheked(!checked))
            ), 
            [progress]
        )

    return (
        <View>
            <Svg width={SIZE} height={SIZE}>
                <Circle 
                    stroke='white' 
                    fill='rgba(0, 0, 0, .1)' 
                    cx={SIZE/2} 
                    cy={SIZE/2}
                    r={radius}
                />
                <AnimatedCircle 
                    stroke='#ff6600' 
                    fill='none' 
                    cx={SIZE/2} 
                    cy={SIZE/2}
                    r={radius-10}
                    strokeWidth={STROKE_WIDTH}
                    strokeDasharray={`${circumference} ${circumference}`}
                    {...{strokeDashoffset}}
                />
            </Svg>
            <View style={{
                ...StyleSheet.absoluteFillObject,
            }}>
                <Icon 
                    name={checked ? 'check' : 'fingerprint'} 
                    size={SIZE_ICON}
                    style={styles.icon}
                    color={checked ? '#ff6600' : 'gray'}

                />
            </View>
            <Animated.View style={[{
                ...StyleSheet.absoluteFillObject,
            }, { height, opacity: checked ? 0 : 1 }]}>
                <Icon 
                    name="fingerprint" 
                    size={SIZE_ICON} 
                    color='#ff6600'
                    style={styles.icon}
                />
            </Animated.View>
        </View>
    )
}

export default Button;