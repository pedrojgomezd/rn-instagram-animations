import React, { useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Animated, { Value, timing, Easing, concat } from "react-native-reanimated";

const TextAnimated = Animated.createAnimatedComponent(Text)
const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity)

const ButtonLike = () => {
    const [ liked, setLiked ] = useState(false);
    const [ countLike, setContLike ] = useState(99);
    const animationHeart = useRef(new Value(0)).current;

    const toggleLike = () => {
            setLiked(!liked)
            setContLike(liked ? countLike-1 : countLike+1)
        };

    const likeHandle = () => {
            toggleLike();
            timing(animationHeart, {
                duration: 400,
                toValue: liked ? 0 : -360,
                easing: Easing.linear
            }).start();
        };

    const rotateHear = { rotate: concat(animationHeart, 'deg') }

    const transform = [{
            translateY: animationHeart.interpolate({
                inputRange: [-360,0],
                outputRange: [-40, 40]
            }) 
        }];
 
    const opacityIn = animationHeart.interpolate({
                inputRange: [-360,0],
                outputRange: [0,1]
            })
 
    const opacityOut = animationHeart.interpolate({
                inputRange: [-360,0],
                outputRange: [1,0]
            });

    return (
        <View style={styles.container}>
            <ButtonAnimated style={[ styles.button, { transform: [rotateHear] } ]} onPress={likeHandle}>
                <FontAwesome name='heart'  size={80} style={liked ? styles.textRed : styles.textGray} />
            </ButtonAnimated>
            <View>
                <TextAnimated style={[styles.textGray, {transform, opacity: opacityIn}]}>
                        {countLike}
                </TextAnimated>
                <TextAnimated style={[styles.textRed, {transform, opacity: opacityOut}]}>
                        {countLike}
                </TextAnimated>
            </View>
        </View>
    );
}

const themeColor = {
    gray: 'hsl(0, 0%, 50%)',
    primary: 'hsl(360, 100%, 50%)'
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button : {
        marginRight: 16,
    },
    textGray: {
        fontSize: 64,
        color: themeColor.gray,
    },
    textRed: {
        fontSize: 64,
        color: themeColor.primary
    }
});

export default ButtonLike;