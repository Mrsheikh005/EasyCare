import React from 'react';
import { Image, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/Login/LoginStack'
import LoginStack from './src/Login/LoginStack';
const Stack = createNativeStackNavigator();
class Splash extends React.Component {
  render() {
    return (
      <View>
        <Text>
          Splash Screen
        </Text>
      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isLoading: true
    }

  }




  render() {
    // if (this.state.isLoading) {
    //   return <Splash />;
    // }
    return (

      // <NavigationContainer 
      // >
      //   <Stack.Navigator initialRouteName="Maps">
      //   <Stack.Screen name="Maps" component={Maps} options={{
      //     headerShown:false
      //   }}>

      //   </Stack.Screen>

      //   <Stack.Screen name="Auth" component={Auth} options={{

      //   }}>

      //   </Stack.Screen>
      //   <Stack.Screen name="Dashboard" component={HomeScreen}>

      //   </Stack.Screen>
      //   </Stack.Navigator>
      // </NavigationContainer>

      <NavigationContainer>


        {this.state.isLogin ? (
          <DrawerNavigator />
        ) :
          <LoginStack />
        }
      </NavigationContainer>
    )
  };
}