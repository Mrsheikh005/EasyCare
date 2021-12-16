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
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class Splash extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={styles.header}>
          <TouchableOpacity
            style={{ flex: .4 }}
            onPress={() => { this.props.navigation.goBack() }}>
            <Ionicons name={"arrow-back-circle"} color="white" size={30}
            //  style={{marginRight:290,}}
            ></Ionicons>
          </TouchableOpacity>
          <View >
            <Text style={styles.headerTitle}>
              Splash
            </Text>
          </View>

        </View> */}
        <View style={{ flexDirection: 'column' }}>
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <Image source={require('../assests/logo.jpg')}></Image>
          </View>


          <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('Register')}
          style={styles.btnStyle}>
            <Text style={{color:'white',fontSize:18}}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=> this.props.navigation.navigate('Login')}
          style={styles.btnStylelogin}>
            <Text style={{color:'white',fontSize:18}}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStylelogin}>
            <Text style={{color:'white',fontSize:18}}>
              Visit ECG
            </Text>
          </TouchableOpacity>


        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    padding: 13,
    //flex:.1,
    // alignItems: 'center',
    backgroundColor: "green",
    flexDirection: 'row'
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    flex: 1,
    // padding:10
    // marginTop:10,
  },
  btnStyle:{
    backgroundColor: 'green',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'10%',
    marginHorizontal:'18%',
    padding:15,
    borderRadius:10
  },
  btnStylelogin:{
    backgroundColor: 'green',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'8%',
    marginHorizontal:'18%',
    padding:15,
    borderRadius:10
  }
})