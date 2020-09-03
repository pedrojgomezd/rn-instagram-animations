import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import Animated, { multiply, interpolate, Value, timing, Easing, Clock, clockRunning } from "react-native-reanimated";


const { width } = Dimensions.get('window');
const size = width - 100;
const strokeWidth = 50;
const raduis = (size - strokeWidth) / 2;
const circumference = raduis * 2  * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function App() {
  const animation = useRef(new Value(0)).current;
  
  return (
    <View style={styles.container}>
        <CircleProgess progress={0}/>
        <TextInput onChange={(e) =>animation.setValue(e.nativeEvent.text)} style={{ backgroundColor: 'white', height: 50, width: 200, padding: 10 }}/>
    </View>
  )
}

const CircleProgess = ({ progress }) => {
  const a = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 2]
  });

  const strokeDashoffset = multiply(a, raduis);
  return (
      <Svg width={size} height={size}>
        <Circle 
            stroke='white' 
            fill='none' 
            cx={size/2} 
            cy={size/2}
            r={raduis}
            {...{strokeWidth}}
        />
        <AnimatedCircle 
            stroke='#f44' 
            fill='none' 
            cx={size/2} 
            cy={size/2}
            r={raduis}
            strokeDasharray={`${circumference} ${circumference}`}
            {...{strokeWidth, strokeDashoffset}}
            />
      </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22314c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
