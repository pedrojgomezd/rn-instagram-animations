import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import AnimationNavigation from './navigations/AnimationNavigation';
import SliderCamera from './SliderCamera';

const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
          name='Animation' 
          component={AnimationNavigation} 
          options={{
            title: 'Animations'
          }}
        />
        <Drawer.Screen 
          name='SliderAnimation' 
          component={SliderCamera} 
          options={{
            title: '📸 Slider animation'
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>    
  )
}