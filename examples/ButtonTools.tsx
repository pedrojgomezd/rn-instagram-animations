import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet,  } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { Value, timing, Easing, concat } from 'react-native-reanimated';

interface ButtonProps {
    icon: string;
    onPress: () => void
}

const Button = ({icon, onPress}: ButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={1} style={styles.iconContainer} onPress={onPress}>
            <FontAwesome5 size={32} name={icon} style={styles.iconDefault} />
        </TouchableOpacity>
    )
}

const ButtonTools = () => {
    const [open, setOpen] = useState(false)
    const animation = useRef(new Value(0)).current;

    const toggleButton = () => {
        setOpen(!open)
        timing(animation, {
            toValue: open ? 0 : 135,
            duration: 500,
            easing: Easing.elastic(1)
        }).start()
    }

    const scale = animation.interpolate({
        inputRange: [0, 135],
        outputRange: [.2, .8]
    })

    const opacity = animation.interpolate({
        inputRange: [0, 135],
        outputRange: [0, 1]
    })

    const translateY = animation.interpolate({
        inputRange: [0, 135],
        outputRange: [ 200, -50 ]
    })

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Animated.View style={[styles.buttonFloat, { opacity, transform: [ { scale }, { translateY, translateX: translateY }] }]}>
                    <Button icon='whatsapp' onPress={()=>{}}/>
                </Animated.View>
                <Animated.View style={[styles.buttonFloat, { opacity, transform: [ { scale }, { translateY }] }]}>
                    <Button icon='whatsapp' onPress={()=>{}}/>
                </Animated.View>
                <Animated.View style={[styles.buttonFloat, { opacity, transform: [ { scale }, { translateY }] }]}>
                    <Button icon='whatsapp' onPress={()=>{}}/>
                </Animated.View>
            </View>

            <Animated.View style={{
                transform: [
                    {rotate: concat(animation, 'deg')}
                ]
            }}>
                <Button icon='plus' onPress={() => toggleButton() }/>
            </Animated.View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 100,
        color: 'white',
        backgroundColor: 'hsl(210, 90%, 50%)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconDefault: {
        color: 'white'
    },

    buttonFloat: {
        //...StyleSheet.absoluteFillObject,
        
    }

});

export default ButtonTools;