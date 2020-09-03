import React, { useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import data from './data'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { interpolate } from 'react-native-reanimated';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash';
import Sliders, { SIZE_SLIDE, SIZE_IMAGE } from './Slider';
import TitleAnimated, { FONT_SIZE } from './TitleAnimated';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        height: height - 30
    },
    infoContainer: {
        flex: 1,
    },    
    buttonContainer: {
        width: SIZE_SLIDE,
        paddingHorizontal: 16,
        bottom: 30,
        position: 'absolute',
    },
    button: {
        backgroundColor: 'rgba(0,20,140, 0.9)',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    }
})

const SliderCamera = () => {
    const scroll = useRef(null);
    const x = useValue(0);
    const onScroll = onScrollEvent({ x })
    const backgroundColor = interpolateColor(x, {
        inputRange: data.map((_,index) => index * width),
        outputRange: data.map(({color}) => color)
    })
    return (
        <View style={styles.container}>
            <View style={styles.slide}>
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    height: SIZE_SLIDE,
                    backgroundColor
                }} />
                <Animated.ScrollView
                    ref={scroll}
                    horizontal
                    snapToInterval={width}
                    decelerationRate='fast'
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    {...{onScroll}} 
                >
                    { data.map((item, index) => (
                        <View>
                            <Sliders {...{item, index, x}} key={index.toString()} />
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
            <View style={styles.buttonContainer}> 
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>🛍 Buy now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default SliderCamera;