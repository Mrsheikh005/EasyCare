import React, { Component } from 'react';
import { Linking, Alert, View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'

import * as Animatable from 'react-native-animatable';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { styles } from './LoginStyle';
import appUrls from '../Constants/appUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usEmail: '',
            usPass: '',
            isLoading: false,
            errMsgP: "",
            errMsgE: "",
            userProfile: []
        }
    }

    isPasswordValid = (item) => {

        if (item.length === 0) {
            this.setState({ errMsgP: 'You must enter a password' });

            return false;
        }

        this.setState({ errMsgP: '' });
        return true;
    }

    isEmailValid = (item) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (item.length === 0) {
            this.setState({ errMsgE: 'You must enter an email address' });

            return false;
        }
        if (!reg.test(item)) {
            this.setState({ errMsgE: 'You must enter a valid email address' });

            return false;
        }
        this.setState({ errMsgE: '' });
        return true;
    }


    makeLoginRequest = async() => {
        let usEmail = this.state.usEmail;
        let usPassword = this.state.usPass;


        const url = appUrls.LOGIN;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log('URL ' + url);
        console.log("params:-" + usEmail + "-" + usPassword)

     
        if (this.isEmailValid(usEmail) && this.isPasswordValid(usPassword)) {
            this.setState({ isLoading: true })
            fetch(appUrls.LOGIN, {
                method: "POST",
                body: "email=" + usEmail + "&password=" + usPassword,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type

                })
            }).then((response) => response.json()).then(async (resJson) => {
                console.log('=========resJson===========', JSON.stringify(resJson))


                if (resJson.status) {


                     alert(resJson.status);

                    try {
                        var sessions = {
                            'token': resJson.token,
                            'us_id': resJson.AccountInfo.id,
                            'status': resJson.status,
                            'fullName': resJson.AccountInfo.name,
                            'usEmail': resJson.AccountInfo.email,
                            'usMobile': resJson.AccountInfo.phone,
                            'usRole':resJson.AccountInfo.role,
                            'usAddress': resJson.AccountInfo.address,
                            'userDOB': resJson.AccountInfo.date_of_birth
                        }
                        await AsyncStorage.setItem('userInfo', JSON.stringify(sessions));

                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Drawer' }],
                        });

                        this.setState({
                            isLoading: false,
                            
                        });

                    } catch (error) {
                        this.setState({
                            isLoading: false,
                            
                        });
                    }
                    // console.log('userrole=' + resJson.data.my_role);


                } else {

                    this.setState({ isLoading: false });
                    alert(resJson.message);

                    //console.log('usernamef='+ resJson.data.full_name)
                }
            }).catch(function (error) {
                throw error;
            })
        } else {

            alert("Please Enter all fileds Properly.!");


        }
    }

    render() {
        return (

            <View style={{ flex: 1 }}>

                {/* {!this.state.isLoading && */}
                    <View style={{flex:1}}>
                        <View style={{ flex: .3, flexDirection: "row", backgroundColor: "white", marginLeft: 5, marginRight: 5, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>

                            {/* <Ionicons name="arrow-back" size={25} color="#fff" style={styles.arroWIcon} onPress={() => this.props.navigation.goBack()}></Ionicons> */}
                            <View style={{ alignItems: "center",flex:1, justifyContent: "center",marginTop:40 }}>
            <Image source={require('../assests/logo.jpg')}></Image>
          </View>
                            {/* <Feather name="more-vertical" size={25} color="#fff" style={styles.moreIcon} onPress={() => Alert.alert('More About Login')}> </Feather> */}
                        </View>
                        {!this.state.isLoading &&
                        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>

                            {/* <View style={{flex:1}}>
                        <Text style={{ fontSize: 30, paddingLeft: 20, fontWeight: "bold", marginTop: "5%" }}>Welcome!</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 20, color: "grey" }}>sign in to continue</Text>
                    </View> */}
                            <View style={{ marginTop: "15%", }}>
                                <View style={{
                                    flexDirection: "row",
                                    borderRadius: 15,
                                    flex: 1,
                                    marginLeft: "5%",
                                    marginRight: "5%",
                                    paddingHorizontal: 8,
                                    backgroundColor: "#f4f2f7"
                                }}>
                                    <Fontisto style={styles.emailIcon} name="email" size={15} color="#000"></Fontisto>
                                    <TextInput
                                        style={styles.textinput}
                                        onChangeText={(txt) => {
                                               
                                            this.isEmailValid(txt);
                                                this.setState({ usEmail: txt })
                                        }}
                                        placeholder="Enter your Email">
                                    </TextInput>
                                </View>
                                {this.state.errMsgE!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgE}</Animatable.Text>}
                                <View style={{
                                    flexDirection: "row",
                                    borderRadius: 15,
                                    flex: 1,
                                    marginLeft: "5%",
                                    marginRight: "5%",
                                    marginTop: "5%",
                                    paddingHorizontal: 8,
                                    backgroundColor: "#f4f2f7"
                                }}>
                                    <EvilIcons style={styles.passIcon} name="lock" size={20} color="#000"></EvilIcons>
                                    <TextInput
                                        style={styles.passInput}
                                        secureTextEntry={true}
                                        onChangeText={(txt) => {
                                               
                                            this.isPasswordValid(txt);
                                                this.setState({ usPass: txt })
                                        }}
                                        placeholder="Password">
                                    </TextInput>
                                </View>
                                {this.state.errMsgP!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgP}</Animatable.Text>}
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                                        <Text style={{ marginLeft: "63%", marginTop: "4%", color: "grey" }}>
                                            Forgot Password?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: "8%" }}>
                                <TouchableOpacity style={styles.getstartbutton} onPress={() => this.makeLoginRequest()}>
                                    <Text style={styles.getstartText}>Login</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                    <Text style={{ marginLeft: "43%", marginTop: "4%", color: "grey",fontSize:16 }}>
                                        Register Yourself
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        }{
                            this.state.isLoading &&
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color={"green"} />
                            </View> 
                        }
                    </View>

                {/* }{
                    this.state.isLoading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={"#FFF"} />
                    </View>
                } */}
            </View>
        )
    }
}
