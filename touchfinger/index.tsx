import React from "react";
import { onGestureEvent, withTransition } from "react-native-redash";
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Value, eq, interpolate, cond } from "react-native-reanimated";
import Button from "./Button";

const TouchFinger = () => {
    
    const state = new Value(State.UNDETERMINED);
    
    const gestureHandler = onGestureEvent({ state })
    const isActive = eq(state, State.BEGAN);
    const duration = cond(isActive, 1000, 200)
    const progress = withTransition(isActive, { duration })
    
    const scale = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 1.2]
    });

    return (
        <TapGestureHandler {...gestureHandler}>
            <Animated.View style={{
                transform: [ { scale } ]
            }}>
                <Button {...{progress}} />
            </Animated.View>
        </TapGestureHandler>
    )
}

export default TouchFinger;