import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {

    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
   
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem,
    
} from '@react-navigation/drawer';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {  StackActions } from '@react-navigation/native';
export default class DrawerContent extends React.Component {
    constructor(props) {
        console.log('constructor drawer')
        super(props);
        this.state = {
            usName: 'nasir@mgcc.ae',
            fullName: 'Nasir Khan',
            percentage: '00',
            usImg: 'https://lh3.google.com/u/0/ogw/ADGmqu_-UD3HB4IDTupOL7NLYI29IKhil9JTurO_a3jy=s83-c-mo',
            isLoading: false,
            myStatus: '',
            currentRole: '',
            myMenu: [],
        }


    }

   
    render() {
        let { usImg, usName, fullName ,isLoading,myMenu} = this.state;
        
        return (
            
            <View style={{ flex: 1 }}>
                {/* {this.state.usName !=null} */}

                <DrawerContentScrollView {...this.props}>
                    <View style={styles.drawerContent}>

                        <View style={styles.userInfoSection}>

                            {/* <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={

                                        { uri: usImg }
                                    }
                                    size={50}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{fullName}</Title>

                                    <Caption style={styles.caption}>{usName}</Caption>
                                </View>
                            </View> */}

                            <View style={styles.row}>
                                {/* <View style={styles.section}>
                                  
                                    <Paragraph style={[styles.paragraph, styles.caption]}>Change password</Paragraph>

                                </View> */}
                                <View
                                    
                                    style={[styles.section]}>
                                   
                                   </View>
                            </View>
                        </View>
                         {/* {isLoading && myMenu!='' ?
                        <Drawer.Section style={styles.drawerSection}>
                            {myMenu.result.map((item, index) => {
                                 
                           return   <DrawerItem
                              icon={({ color, size }) => (
                                  <FontAwesome
                                      name="dashboard"
                                      color={color}
                                      size={size}
                                  />
                              )}
                              label={item.name}
                              onPress={() => {
                                  console.log('item value',item.name)
                                this.props.navigation.navigate('WorkOrders',item) }}
                          /> 
                             })}
                         

                        </Drawer.Section>
                        : */}
                        <Drawer.Section>
                            <DrawerItem
                           icon={({ color, size }) => (
                               <MaterialIcons
                                   name="schedule"
                                   color={color}
                                   size={size}
                               />
                           )}
                           label="Change Password"
                           onPress={() => { this.props.navigation.navigate('ForgetPassword') }}
                       />
                        <DrawerItem
                           icon={({ color, size }) => (
                               <MaterialIcons
                                   name="schedule"
                                   color={color}
                                   size={size}
                               />
                           )}
                           label="Home"
                           onPress={() => { this.props.navigation.navigate('Home',) }}
                       />
                       <DrawerItem
                           icon={({ color, size }) => (
                               <MaterialIcons
                                   name="bar-chart"
                                   color={color}
                                   size={size}
                               />
                           )}
                           label="Weather"
                           onPress={() => { this.props.navigation.navigate('weather') }}
                       />
                       {/* <DrawerItem
                           icon={({ color, size }) => (
                               <MaterialIcons
                                   name="account-circle"
                                   color={color}
                                   size={size}
                               />
                           )}
                           label="Login"
                           onPress={() => { this.props.navigation.navigate('Login') }}
                       />
                     <DrawerItem
                           icon={({ color, size }) => (
                               <MaterialIcons
                                   name="account-circle"
                                   color={color}
                                   size={size}
                               />
                           )}
                           label="Forget Password"
                           onPress={() => { this.props.navigation.navigate('ForgetPassword') }}
                       /> */}
                        <DrawerItem
                           icon={({ color, size }) => (
                               <MaterialIcons
                                   name="account-circle"
                                   color={color}
                                   size={size}
                               />
                           )}
                           label="Profile"
                           onPress={() => { this.props.navigation.navigate('Profile') }}
                       />
                       {/* <DrawerItem
                       icon={({ color, size }) => (
                           <MaterialIcons
                               name="account-circle"
                               color={color}
                               size={size}
                           />
                       )}
                       label="Task Assign"
                       onPress={() => { this.props.navigation.navigate('TasksAssign') }}
                   /> */}
                        </Drawer.Section>
                        {/* } */}
                        {/* <Drawer.Section title="Preferences">
                                <TouchableRipple onPress={() => {toggleTheme()}}>
                                    <View style={styles.preference}>
                                        <Text>Dark Theme</Text>
                                        <View pointerEvents="none">
                                            <Switch value={paperTheme.dark}/>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </Drawer.Section> */}
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialIcons
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => {
                            AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
                           // alert('You have been logged out.')
                            //  this.props.navigation.replace('RootStackScreen', {screen:'Login'})
                            // this.props.navigation.replace({
                            //     index: 0,
                            //     routes: [{name: 'Login'}],
                            //   })
                            this.props.navigation.dispatch(
                                StackActions.replace('Login')
                            );
                        }}
                    />
                </Drawer.Section>

            </View>
        );

    }
 

    
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#000'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 12,
    },
    bottomDrawerSection: {
        marginBottom: 10,
        borderTopColor: '#FFF',
        borderTopWidth: 1,

        backgroundColor: '#FFF'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
