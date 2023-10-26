import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import ListScreen from '../screens/ListScreen';
import PlayerScreen from '../screens/PlayerScreen';
import MusicContext from '../context/context';

//Create stack navigator using reactnavigation
//screens add List and Player
const StackNav = () => {
    const {appTheme} = useContext(MusicContext)
    const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='list'
        screenOptions={{
            headerStyle:{backgroundColor:appTheme},
            headerTintColor:'white'
        }}
        >
          <Stack.Screen 
          name='list'
          component={ListScreen}
          options={{
            title:'Majasociet music app'
          }}

          />
          <Stack.Screen 
          name='player'
          component={PlayerScreen}
          options={{
            title:'Player'
          }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNav