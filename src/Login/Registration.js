import React, { Component } from 'react';
import { Image, ActivityIndicator, View, Text, TextInput, ScrollView, TouchableOpacity ,StyleSheet ,Platform} from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto'

import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import { styles } from './LoginStyle';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import appUrls from '../Constants/appUrls';
export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateString: 'Select Date of Birth',
            date: new Date(),
            isLoading: false,
            regiterData: [],
            userAdress: '',
            fullName: '',
            userEmail: '',
            userPasword: '',
            userConfPasword: '',
            userDOB: '',
            userMBL:'',
            api: 'true',
            errMsg: "",
            errMsgU: "",
            errMsgE: "",
            errMsgF: "",
            errMsgCF: "",
            errMsgA: "",
            errMsgM: "",
            myROLE: '',
            policeCheck:0,
            ploiceData:['YES','NO'],
            show: false

        }
    }


    isUserNameValid = (item)=>{
      
      
        if(item.length === 0){
           
            this.setState({ errMsgU: 'You must enter a user name' });
            return false;
        }
      
        this.setState({ errMsgU: '' });
        return true;
       }
       isUserAddressValid = (item)=>{
      
      
        if(item.length === 0){
           
            this.setState({ errMsgA: 'You must enter a address' });
            return false;
        }
        else if (item.length < 3) {
            this.setState({ errMsgA: 'You must enter a 3 character' });

            return false;
        }
        this.setState({ errMsgA: '' });
        return true;
       }
       isNumberValid = (item) => {

        if (item.length === 0) {
            this.setState({ errMsgM: 'You must enter a mobile number' });

            return false;
        }
        else if (item.length < 11) {
            this.setState({ errMsgM: 'You must enter a 11 digit number' });

            return false;
        }
        this.setState({ errMsgM: '' });
        return true;
    }
    isPasswordValid = (item) => {

        if (item.length === 0) {
            this.setState({ errMsgF: 'You must enter a password' });

            return false;
        }
        else if (item.length < 6) {
            this.setState({ errMsgF: 'You must enter a 6 digit password' });

            return false;
        }
        this.setState({ errMsgF: '' });
        return true;
    }
    isPasswordConfirm = (item) => {
      
        if (item.length === 0) {
            this.setState({ errMsgCF: 'You must enter a password' });

            return false;
        }
        else if (this.state.userPasword !== item) {
            this.setState({ errMsgCF: 'password not matched' });

            return false;
        }
        this.setState({ errMsgCF: '' });
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

    showPicker = () => {
        this.setState({
            isVisible: true,
        });
    }
    showOverlay = () => {
        console.log('show');
        this.setState({
            show: true
        })
    }
    hideOverlay = () => {
        console.log('show');
        this.setState({
            show: false
        })
    }
    onChanged = (event, selectedDate) => {
        console.log("date" + selectedDate);

        this.setState({
            dateString: moment(selectedDate).format('DD-MM-YYYY'),
            date: selectedDate,
            show: false,

        }) 
    };

    makeRegisterRequest = () => {
        let usEmail = this.state.userEmail;
        let usPassword = this.state.userPasword;

        let usFullName = this.state.fullName;
        let usTypes = this.state.myROLE;
        let usAddress =this.state.userAdress;
        let usConfPass =this.state.userConfPasword;
        let usDOb=this.state.dateString;
        let usMbl =this.state.userMBL;
       let plcCheck=this.state.policeCheck;
        const url = appUrls.REGISTER;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log('URL ' + url);
        console.log('police',plcCheck)
       // console.log("params:-" + usEmail + "-" + usFullName + "-" + usPassword + "-" + usConfPass + "-" + usAddress + "-" + usMbl + "-"+usDOb)
        
        // if (this.isUserNameValid(usFullName)&& this.isEmailValid(usEmail) && this.isPasswordValid(usPassword) && this.isUserAddressValid(usAddress) && usDOb != '' && this.isPasswordConfirm(usConfPass) && this.isNumberValid(usMbl)) {
            this.setState({ isLoading: true })
            fetch(appUrls.REGISTER, {
                method: "POST",
                body: "email=" + usEmail + "&password=" + usPassword + "&address=" + usAddress
                    + "&name=" + usFullName + "&phone=" + usMbl + "&date_of_birth=" + usDOb+ "&police_check=" + plcCheck,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                })
            }).then((response) => response.json()).then(async (resJson) => {
                if (resJson.status) {


                    alert(resJson.status);
                    this.setState({ isLoading: false });
                    // await AsyncStorage.setItem('myRole', resJson.data.my_role);
                 this.props.navigation.navigate('Login');
                    // console.log('myrole=' + resJson.data.my_role);
                    try {
                        //  await AsyncStorage.setItem('myRole',resJson.data.my_role);

                    } catch (error) {
                        this.setState({ isLoading: false });
                    }
                } else {

                    this.setState({ isLoading: false });
                    alert(resJson.message);
                }
            })
        // } else {

        //     alert("Please fill all fileds properly.!");


        // }
    }





    render() {
        return (

            <View style={{ flex: 1, }}>
                <View style={{ flex: .2, flexDirection: "row", backgroundColor: "white", marginLeft: 5, marginRight: 5, borderBottomEndRadius: 20, borderBottomLeftRadius: 20 }}>

                    {/* <Ionicons name="arrow-back" size={25} color="#fff" style={styles.arroWIcon} onPress={() => this.props.navigation.goBack()}></Ionicons> */}
                    <View style={{ alignItems: "center",flex:1, justifyContent: "center",marginTop:20 }}>
            <Image source={require('../assests/logo.jpg')}></Image>
          </View>
                    {/* <Feather name="more-vertical" size={25} color="#fff" style={styles.moreIcon} onPress={() => Alert.alert('More About Login')}> </Feather> */}
                </View>
                {!this.state.isLoading &&
                <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>

                    {/* <View style={{flex:1}}>
                        <Text style={{ fontSize: 30, paddingLeft: 20, fontWeight: "bold", marginTop: "5%" }}>Welcome!</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 20, color: "grey" }}>sign in to continue</Text>
                    </View> */}
                    <View style={{ marginTop: "10%", }}>
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
                                placeholder="Email"
                                keyboardType='email-address'
                                
                                onChangeText={(txt) => {
                                    this.isEmailValid(txt);     
                                    this.setState({ userEmail: txt })
                            }}
                                >
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
                            <Fontisto style={styles.emailIcon} name="email" size={15} color="#000"></Fontisto>
                            <TextInput
                                style={styles.passInput}
                               keyboardType='default'
                                placeholder="Enter your full Name"
                                onChangeText={(txt) => {
                                    this.isUserNameValid(txt);
                                        this.setState({ fullName: txt })
                                }}
                                
                                >
                            </TextInput>
                        </View>
                        {this.state.errMsgU!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgU}</Animatable.Text>}
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
                            <Fontisto style={styles.emailIcon} name="email" size={15} color="#000"></Fontisto>
                            <TextInput
                                style={styles.passInput}
                               keyboardType='default'
                                placeholder="Address"
                                onChangeText={(txt) => {
                                    this.isUserAddressValid(txt);
                                        this.setState({ userAdress: txt })
                                }}
                                >
                            </TextInput>
                        </View>
                        {this.state.errMsgA!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgA}</Animatable.Text>}

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
                            <Fontisto style={styles.emailIcon} name="mobile-alt" size={15} color="#000"></Fontisto>
                            <TextInput
                                style={styles.passInput}
                               keyboardType='number-pad'
                                placeholder="Mobile Number"
                                onChangeText={(txt) => {
                                    this.isNumberValid(txt);
                                        this.setState({ userMBL: txt })
                                }}
                                >
                            </TextInput>
                        </View>
                        {this.state.errMsgM!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgM}</Animatable.Text>}
                        <TouchableOpacity
                            onPress={this.showOverlay}
                            style={{
                                flexDirection: "row",
                                borderRadius: 15,
                                flex: 1,
                                marginLeft: "5%",
                                marginRight: "5%",
                                marginTop: "5%",
                                paddingHorizontal: 8,
                                backgroundColor: "#f4f2f7"
                            }}>

                            <Icon style={styles.emailIcon} name="ios-today" size={25} color="#ff5c83" />
                            <Text style={styles.textStyle}>{this.state.dateString}</Text>
                        </TouchableOpacity>
                        {Platform.OS === 'ios' ? (
                            <Overlay isVisible={this.state.show}    /////if true then show
                                onBackdropPress={this.hideOverlay} >
                                <View>
                                    <TouchableOpacity onPress={this.hideOverlay}>
                                        <Text style={{ paddingHorizontal: 15 }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.hideOverlay}>
                                        <Text style={{ paddingHorizontal: 15, color: 'green' }}>Done</Text>
                                    </TouchableOpacity>

                                </View>
                                <DateTimePicker
                                    value={this.state.date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.onChanged}
                                    style={{ backgroundColor: 'white' }}
                                />
                            </Overlay>
                        ) : (
                            <>

                                {this.state.show &&
                                    <DateTimePicker
                                        value={this.state.date}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChanged}
                                        style={{ backgroundColor: 'white' }}
                                    />
                                }
                            </>
                        )}
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
                                placeholder="Password"
                                onChangeText={(txt) => {
                                    this.isPasswordValid(txt);
                                        this.setState({ userPasword: txt })
                                }}
                                >
                            </TextInput>
                        </View>
                        {this.state.errMsgF!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgF}</Animatable.Text>}
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
                                placeholder="confirm Password"
                                onChangeText={(txt) => {
                                    this.isPasswordConfirm(txt);
                                        this.setState({ userConfPasword: txt })
                                }}
                                >
                            </TextInput>
                        </View>
                        {this.state.errMsgCF!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgCF}</Animatable.Text>}

                        <View style={{ flex:1,alignSelf:'center',marginVertical:10}}>
                                <Text style={{fontSize:17}}>Are you willing to do Police Check?</Text>
                               {this.state.ploiceData.map((dataa,key)=>{
                                   return(
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        {this.state.policeCheck==key?
                                          <TouchableOpacity style={{flex:.5,flexDirection:'row',marginHorizontal:10,marginVertical:10}}>
                                          <Text style={{fontSize:15,marginRight:15}}>{dataa}</Text>
                                          <Image style ={{width:20,height:20}}source={{uri:'https://d30y9cdsu7xlg0.cloudfront.net/png/868143-200.png'}}/>
                                      </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({
                                                policeCheck:key
                                            })
                                        }}
                                        style={{flex:.5,flexDirection:'row',marginHorizontal:10,marginVertical:10}}>
                                        <Text style={{fontSize:15,marginRight:15}}>{dataa}</Text>
                                        <Image style ={{width:20,height:20}}source={{uri:'https://d30y9cdsu7xlg0.cloudfront.net/png/868142-200.png'}}/>
                                    </TouchableOpacity>
                                        }
                                  
                                    {/* <TouchableOpacity style={{flex:.5,flexDirection:'row',marginHorizontal:10}}>
                                    <Text>NO</Text>
                                        <Icon name='close-circle-outline' size={20}/>
                                    </TouchableOpacity> */}
                                    </View>
                                   )
                               })}
                              
                        </View>

                    </View>
                    <View style={{ marginTop: "8%" }}>
                        <TouchableOpacity style={styles.getstartbutton} onPress={() => this.makeRegisterRequest()}>
                            <Text style={styles.getstartText}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ marginLeft: "63%", marginTop: "4%", color: "grey",marginBottom:'5%' }}>
                                Already Register? Login
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
        )
    }
}


const styles=StyleSheet.create({
    pagerView: {
      height:"10%",
           backgroundColor:"grey",
           color:"grey",
           width:"60%"
    },
    facebookText:{
      fontSize:16,
        fontWeight:"500",
        color:'#ffffff',
        textAlign:'center',
    },
    facebookbutton:{
      width:"71%",
      marginLeft:"5%",
      backgroundColor:'#3464d1',
      borderRadius:15,
      marginTop:"4%",
       marginVertical:10,
       paddingVertical:12,
    },
    textStyle: {
      fontFamily: 'Gill Sans',
      fontSize: 16,
      color:'black',
      marginVertical:30,
      marginHorizontal: 10,
  },
  error:{
    color:'red',
    marginHorizontal:30
  },
    emailIcon:{
      margin:20,
      marginTop:"7%",
    },
    passIcon:{
      margin:20,
      marginTop:"7%",
    },
    textinput:{  
      paddingHorizontal:8,
      fontSize:16,
      //color:'#ffffff',
      color:'black',
      backgroundColor:'#f4f2f7',
      },
      passInput:{
        fontSize:16,
        color:'#ffffff',
       
        
        color:'black',
        backgroundColor:'#f4f2f7', 
      },
      getstartbutton:{
        width:"75%",
        marginLeft:"10%",
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'green',
        borderRadius:15,
        marginVertical:10,
        paddingVertical:17,
        
        },
        getstartText:{
        fontSize:16,
        fontWeight:"500",
        color:'#ffffff',
        textAlign:'center',
        },
    arroWIcon:{
      marginTop:45,
      borderRadius:19, 
     //  borderWidth:1, 
       width:"12%", 
       textAlign:"center",
       margin:15,
       //paddingTop:5, 
      // backgroundColor:"#f4f2f7",
       marginLeft:5,
     //  borderColor:"#ffffff" 
    },
    moreIcon:{
      marginTop:45,
     
      borderRadius:15,
      //borderWidth:2, 
      //width:"2%", 
      textAlign:"center",
      //margin:15,
      //padding:"2%",
     // marginLeft:"20%",
      paddingTop:6,
      paddingLeft:125,
      color:"#fff",
       borderColor:"#fff", 
      // backgroundColor:"#f4f2f7",
    }
  })
