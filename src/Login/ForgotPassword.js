import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appUrls from '../Constants/appUrls';
export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPasword: '',
        isLoading: false,
        errMsgP: "",
        errMsgE: "",
        userProfile: [],
        errMsgF: "",
        errMsgE: "",
    }
}


makeRegisterRequest = () => {
  let usEmail = this.state.userEmail;
  let usPassword = this.state.userPasword;

 
 
  const url = appUrls.FORGETPASSWORD;
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log('URL ' + url);
  
  //console.log("params:-" + usEmail + "-" + usFullName + "-" + usPassword + "-" + usConfPass + "-" + usAddress + "-" + usMbl + "-"+usDOb)
  
  // if (this.isUserNameValid(usFullName)&& this.isEmailValid(usEmail) && this.isPasswordValid(usPassword) && this.isUserAddressValid(usAddress) && usDOb != '' && this.isPasswordConfirm(usConfPass) && this.isNumberValid(usMbl)) {
      this.setState({ isLoading: true })
      fetch(url, {
          method: "POST",
          body: "email=" + usEmail + "&password=" + usPassword ,
          headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
          })
      }).then((response) => response.json()).then(async (resJson) => {
          if (resJson.status) {


              alert(resJson.status);
              this.setState({ isLoading: false });
              alert('success')
              // await AsyncStorage.setItem('myRole', resJson.data.my_role);
          //  this.props.navigation.navigate('Login');
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
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
          style={{flex:.4}}
          onPress={()=>{this.props.navigation.goBack()}}>
          <Ionicons name={"arrow-back-circle"} color="white" size={30}
            //  style={{marginRight:290,}}
          ></Ionicons>
          </TouchableOpacity>
              <View >
              <Text style={styles.headerTitle}>
              Change Password
              </Text>
              </View>
              
          </View>
          {!this.state.isLoading &&
        <View style={styles.Footer}>
          <Text style={{fontSize: 30, fontWeight: '900', textAlign: 'center'}}>
          Change Password
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              marginTop: 20,
              color: 'gray',
            }}>
            Enter Your Email Address for recovery your account
          </Text>
          <TextInput
            placeholder={'Enter Your Email'}
            onChangeText={(txt) => {
              this.isEmailValid(txt);     
              this.setState({ userEmail: txt })
      }}
            style={{
              backgroundColor: '#f5f5f5',
              marginTop: 40,
              borderRadius: 10,
              padding: 15,
            }}></TextInput>
             {this.state.errMsgE!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgE}</Animatable.Text>}
              <TextInput
            placeholder={'Enter New Password'}
            onChangeText={(txt) => {
              this.isPasswordValid(txt);
                  this.setState({ userPasword: txt })
          }}
            style={{
              backgroundColor: '#f5f5f5',
              marginTop: 40,
              borderRadius: 10,
              padding: 15,
            }}></TextInput>
             {this.state.errMsgF!='' &&
                                <Animatable.Text animation="bounceInLeft" style={styles.error}>
                                    {this.state.errMsgF}</Animatable.Text>}
          {/* <TouchableOpacity>
            <Text
              style={{
                fontSize: 17,
                textAlign: 'center',
                color: '#03dbfc',
                marginTop: 35,
              }}>
              Try another ways
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={()=>
        this.makeRegisterRequest()  
        }
            style={{
              backgroundColor: '#188c4e',
              marginTop: 40,
              borderRadius: 15,
            }}>
            <Text
              style={{
                padding: 20,
                textAlign: 'center',
                fontSize: 15,
                color: 'white',
                fontWeight: '900',
              }}>
              Reset password
            </Text>
          </TouchableOpacity>
        </View>
         }{
          this.state.isLoading &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={"green"} />
          </View>
      }
      </SafeAreaView>
    );
  }
}
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#188c4e',
  },
  header:{
    padding:14,
    //flex:.1,
    // alignItems: 'center',
    backgroundColor: "green",
    flexDirection:'row'
  },
  headerTitle:{
    fontSize:18,
    color:"#FFFFFF",
    flex:1 ,
   // padding:10
    // marginTop:10,
  },
  Footer: {
    flex: 2,
    backgroundColor: '#fff',
    height: '60%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: '10%',
  },
  text: {
    color: 'white',
    fontSize: 60,
    fontWeight: '900',
  },
});
