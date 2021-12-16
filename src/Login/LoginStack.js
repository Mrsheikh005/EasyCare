import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '.';
import HomeScreens from '../Screens/HomeStack';
import ForgetPassword from './ForgotPassword';
import DrawerContent from '../Drawer/DrawerContent'
import Registration from './Registration';
import Splash from './Splash';

const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNavigator = ({navigation})=>{
    return(
      <Drawer.Navigator drawerContent={props => <DrawerContent{...props} />}>
       <Drawer.Screen name="HomeScreens" component={HomeScreens} options={{headerShown:false}}></Drawer.Screen>
        {/* <Drawer.Screen name="OrderHistory" component={OrderHistory}></Drawer.Screen> */}
   
      </Drawer.Navigator>
    )
  }
const LoginStack = ({navigation})=>(
    <RootStack.Navigator >
        <RootStack.Screen name="Drawer" component={DrawerNavigator} options={{
             headerShown: false
         }}
          />

        <RootStack.Screen name="Login" component={Login} 
         options={{ headerShown: false }}></RootStack.Screen>
          <RootStack.Screen name="ForgetPassword" component={ForgetPassword} 

          options={{headerShown:false}}
        ></RootStack.Screen>
         <RootStack.Screen name="Register" component={Registration} 
         options={{ headerShown: false }}></RootStack.Screen>
          <RootStack.Screen name="splash" component={Splash} 
         options={{ headerShown: false }}></RootStack.Screen>
       
    </RootStack.Navigator>
);

export default LoginStack;