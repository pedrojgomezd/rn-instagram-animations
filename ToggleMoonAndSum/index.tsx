import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Animated, { Value, eq, interpolate, cond, useCode, set, Clock, block, onChange, call, Easing, } from "react-native-reanimated";
import { BaseButton, TapGestureHandler, State } from "react-native-gesture-handler";
import { useValue, onGestureEvent, withTransition, timing } from "react-native-redash";

const WIDTH_TOGGLE = 150;
const HIGHT_TOGGLE = 75;
const PADDING_TOGGLE = 6
const SIZE_TOGGLE_ICON = HIGHT_TOGGLE - (PADDING_TOGGLE * 2);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',//'#2f2f41',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toggleContainer: {
        width: WIDTH_TOGGLE,
        height: HIGHT_TOGGLE,
        backgroundColor: 'rgb(0, 190, 255)',
        borderRadius: WIDTH_TOGGLE/2,
        justifyContent: 'center',
        padding: PADDING_TOGGLE,
    },
    toggleItem: {
        width: SIZE_TOGGLE_ICON,
        height: SIZE_TOGGLE_ICON,
        backgroundColor: 'yellow',
        borderRadius: SIZE_TOGGLE_ICON / 2
    }
})

const ToggleMoonAndSum = () => {
    const [toggleState, setToggleState] = useState(0)

    const state = useValue(State.UNDETERMINED);
    const should = useValue(0);
    const animate = useValue(0);
    const clock = new Clock();

    const action = () => {
        //alert('FIN')
    }

    const gestureEvent = onGestureEvent({ state })

    useCode(() => 
        block([
            cond(eq(state, State.BEGAN), set(should,  eq(animate, 0)) ),
            //onChange(state, cond(eq(state, State.END), call([], action) )),
            cond(eq(should, 1), set(animate, timing({
                clock,
                to: 0,
                from: 1,
                duration: 200,
                easing: Easing.linear
            }))),
            cond(eq(should, 0), set(animate, timing({
                clock,
                to: 1,
                from: 0,
                duration: 200,
                easing: Easing.linear
            })))
        ])
    ,[]
    )


    const translateX = interpolate(animate, {
        inputRange: [0, 1],
        outputRange: [0, WIDTH_TOGGLE - SIZE_TOGGLE_ICON - PADDING_TOGGLE * 2]
    })

    return (
        <View style={styles.container}>
            <TapGestureHandler {...gestureEvent}>
                <Animated.View style={[styles.toggleContainer]}>
                    <Animated.View style={[styles.toggleItem, {
                        transform: [ { translateX } ]
                    }]} />
                </Animated.View>    
            </TapGestureHandler>
            
            <Text>{toggleState}</Text>
        </View>
    )
}

export default ToggleMoonAndSum;