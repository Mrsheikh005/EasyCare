import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Profile extends React.Component {
      constructor(props){
        super(props);
        this.state={
          userName:'',
          userAddress:'',
          userPhone:'',
          userEmail:'',
        userDob:'',
        usID:''
        }
      }
  async componentDidMount(){
    const value = await AsyncStorage.getItem('userInfo');
    const isLogin = JSON.parse(value);
    if (isLogin) {
        this.setState({
            
            userName:isLogin.fullName,
            userAddress:isLogin.usAddress,
            userPhone:isLogin.usMobile,
            userEmail:isLogin.usEmail,
            usDob:isLogin.userDOB,
            usID:isLogin.us_id
        })
        console.log('user id=', this.state.userName);
    } else {
        console.log('Please login');
        this.props.navigation.dispatch(
            StackActions.replace('Login')
          );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <TouchableOpacity 
          
          onPress={()=>{this.props.navigation.goBack()}}>
          <Ionicons name={"arrow-back-circle"} color="white" size={30}
             style={{marginRight:290,}}
          ></Ionicons>
          </TouchableOpacity>
          {/* <Text style={styles.text}>Profile</Text> */}
        </View>
        <View style={styles.Footer}>
          <Image
            source={require('../assests/person.png')}
            style={{
              marginTop: -95,
              alignItems: 'center',
              justifyContent: 'center',
              width: 145,
              height: 145,
              alignSelf: 'center',
              borderRadius: 200,
              marginRight: 20,
            }}></Image>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('editprofile',{id:this.state.usID,name:this.state.userName,dob:this.state.usDob,number:this.state.userPhone,location:this.state.userAddress})}
            style={{
              marginLeft: 190,
              marginTop: -46,
              borderRadius: 50,
              width: 40,
              height: 40,
              padding: 5,
               backgroundColor: "#ca4232",

            }}>
            <MaterialIcons
              name={'edit'}
              color="white"
              size={30}></MaterialIcons>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginRight: 15,
              marginTop: 25,

            }}>
           {this.state.userName}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontWeight: '400',
              marginTop: 3,
              fontSize: 16,
              textAlign: 'center',
              marginRight: 20,
            }}>
           {this.state.userEmail}
          </Text>
          <ScrollView  showsVerticalScrollIndicator={false}
          style={{marginBottom:18}}>
            <View
              style={{
                backgroundColor: 'white',
                borderColor: '#f5f5f5',
                borderWidth: 3,
                width: '90%',
                marginTop: 15,
                height: 80,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View style={{paddingLeft: 10}}>
                <FontAwesome5
                  name={'phone'}
                  color="#188c4e"
                  size={18}
                  style={{
                    marginTop: 27,
                    marginLeft: 10,
                    borderColor: '#f5f5f5',
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 50,
                    backgroundColor: '#f5f5f5',
                  }}></FontAwesome5>
              </View>
              <View style={{marginLeft: 15, marginTop: 20}}>
                <Text style={{marginTop: 5}}>Phone</Text>
                <Text style={{textAlign: 'center', fontWeight: '900'}}>
                {this.state.userPhone}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                marginTop: 18,
                borderColor: '#f5f5f5',
                borderWidth: 3,
                width: '90%',
                height: 80,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View style={{paddingLeft: 10}}>
                <Fontisto
                  name={'email'}
                  color="#188c4e"
                  size={20}
                  style={{
                    marginTop: 27,
                    marginLeft: 10,
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 50,
                    backgroundColor: '#f5f5f5',
                    borderColor: '#f5f5f5',
                  }}></Fontisto>
              </View>
              <View style={{marginLeft: 15, marginTop: 20}}>
                <Text style={{}}>Date of Birth</Text>
                <Text style={{textAlign: 'center', fontWeight: '900'}}>
                {this.state.usDob}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                marginTop: 18,
                borderColor: '#f5f5f5',
                borderWidth: 3,
                width:"90%",
                height:"20%",
                paddingBottom:"3%",
                paddingRight:"4%",
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View style={{paddingLeft: 10}}>
                <EvilIcons
                  name={'location'}
                  color="#188c4e"
                  size={20}
                  style={{
                    marginTop: 27,
                    marginLeft: 10,
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 50,
                    backgroundColor: '#f5f5f5',
                    borderColor: '#f5f5f5',
                  }}></EvilIcons>
              </View>
              <View style={{marginLeft: 15, marginTop: 15,width:"95%",height:"100%"}}>
                <Text style={{}}>Location</Text>
                <Text style={{width:"95%", fontWeight: '900',marginBottom:"10%"}}>
                 {this.state.userAddress}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                marginTop: 18,
                borderColor: '#f5f5f5',
                borderWidth: 3,
                width: '90%',
                height: 80,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <View style={{paddingLeft: 10}}>
                <MaterialIcons
                  name={'sports-soccer'}
                  color="#188c4e"
                  size={20}
                  style={{
                    marginTop: 21,
                    marginLeft: 10,
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 50,
                    backgroundColor: '#f5f5f5',
                    borderColor: '#f5f5f5',
                  }}></MaterialIcons>
              </View>
              <View style={{marginLeft: 15, marginTop: 20}}>
                <Text style={{}}>Sports</Text>
                <Text style={{width: 100, fontWeight: '900'}}>
                  Cricket,football
                </Text>
              </View>
            </View>

          </ScrollView>
          <TouchableOpacity
          onPress={()=>{
            AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            
      
            this.props.navigation.replace('Login')
          }}
            style={{
              flexDirection: 'row',
              height: 50,
              borderColor: 'green',
              borderWidth: 2,
              borderRadius: 10,
              width: '90%',
              backgroundColor: "#ca4232",
            }}>
            <MaterialIcons
              name={'logout'}
              color="white"
              size={25}
              style={{margin: 10}}></MaterialIcons>
            <Text
              style={{
                marginLeft: 20,
                textAlign: 'center',
                marginTop: 12,
                fontSize: 18,
                color: 'white',
                fontWeight: '900',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    
  },
  Header: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Footer: {
    flex: 4,
    backgroundColor: '#fff',
    height: '60%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding:"1%",
    paddingVertical: 20,
    paddingLeft: 20,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
    marginLeft: 10,
    marginBottom: 75,
  },
});
