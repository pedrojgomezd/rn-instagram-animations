import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { 
    View, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    Text,
    FlatList,
    Dimensions, 
 } from "react-native";

import TouchFinger from "../touchfinger";
import { ButtonLike } from "../examples";
import SliderCocacola from "../SliderCocacola";
import ToggleMoonAndSum from "../ToggleMoonAndSum";

const { width } = Dimensions.get('window')

const DATA = [
  {
    link: 'CocaColaSlider',
    text: 'Coca Cola Slider'
  },
  {
    link: 'TouchFigner',
    text: 'Topuch figner'
  },
  {
    link: 'ButtonLike',
    text: 'Button like'
  },
  {
    link: 'MoonAndSum',
    text: 'Moon And Sum'
  }
]

const StackAnimation = createStackNavigator();


const ButtonLink = ({item, onPress}) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text>{item.text}</Text>
        </TouchableOpacity>
    )
}

interface ScreenHomeAnimationProps {
    //navigation: object
}

const ScreenHomeAnimation = ({navigation}: ScreenHomeAnimationProps) => {
    const itemRender = (({item}) => <ButtonLink {...{item}} onPress={() => {navigation.navigate(item.link)}}/>)
    
    return (
        <View style={styles.container}>
            <FlatList 
              ItemSeparatorComponent={ () =>(
                <View style={{borderBottomWidth: .5, borderBottomColor: 'gray', width }} />
              )}
              data={DATA}
              renderItem={itemRender}
              keyExtractor={(_, index) => index.toString()}
            />
        </View>
    )
}

const ScreenTouchFinger = () => (
  <View style={styles.container}>
    <TouchFinger />
  </View>
)

const ScreenButtonLike = () => (
  <View style={styles.container}>
    <ButtonLike />
  </View>
)


const AnimationNavigation = () => {
  return (
      <StackAnimation.Navigator initialRouteName='HomeAnimation' >
        <StackAnimation.Screen 
          name="HomeAnimation" 
          component={ScreenHomeAnimation} 
          options={{
            title: 'Home Animation'
          }}
        />
        <StackAnimation.Screen 
          name="CocaColaSlider" 
          component={SliderCocacola} 
          options={{
              title: 'CocaCola Slider',
              headerShown: false
            }}
        />
        <StackAnimation.Screen 
          name="TouchFigner" 
          component={ScreenTouchFinger} 
          options={{
              title: 'Touch Figner Load'
            }}
        />
        <StackAnimation.Screen 
          name="ButtonLike" 
          component={ScreenButtonLike} 
          options={{ 
              title: 'Button Like Count'
            }}
        />
        <StackAnimation.Screen 
          name="MoonAndSum" 
          component={ToggleMoonAndSum} 
          options={{ 
              title: 'Moon and Sum Toggle',
              headerShown: false
            }}
        />
      </StackAnimation.Navigator>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgage: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
    },
    item: {
      paddingVertical: 24,
      marginHorizontal: 8
    },
  });
  

export default AnimationNavigation;