import React, { useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions } from "react-native";
import DATA from './data'
import Logos from "./Logos";
import Animated from "react-native-reanimated";
import { useValue, onScrollEvent } from "react-native-redash";

const { width } = Dimensions.get('window');
const LATA_SIZE_WIDRH = width - 200;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#de2c39',
    },
    lataContainer: {
        width,
        alignItems: 'center',
    },
    lataImage: {
        width: LATA_SIZE_WIDRH
    }

})

export default () => {
    const scrollX = useRef(null);
    const x = useValue(0);
    const onScroll = onScrollEvent({ x });

    return (
        <SafeAreaView style={styles.container}>
            <Logos {...{x}}/>
            <View >
                <Animated.ScrollView
                    ref={scrollX}
                    horizontal={true}
                    snapToInterval={width}
                    scrollEventThrottle={1}
                    decelerationRate='fast'
                    {...{onScroll}}
                >
                    {
                        DATA.map((item, index) => {
                            return (
                                <View style={styles.lataContainer} key={index.toString()}>
                                    <Image 
                                        style={styles.lataImage} 
                                        resizeMode='contain'
                                        source={item.lataImage}
                                    />
                                </View>
                            )
                        })
                    }
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    )   
}