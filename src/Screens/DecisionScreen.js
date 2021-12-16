import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class DecisionScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flex: .4 }}
            onPress={() => { this.props.navigation.goBack() }}>
            <Ionicons name={"arrow-back-circle"} color="white" size={30}
            ></Ionicons>
          </TouchableOpacity>
          <View >
            <Text style={styles.headerTitle}>
              Jobs Section
            </Text>
          </View>

        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
            <Image source={require('../assests/logo.jpg')}></Image>
          </View>


          <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('Jobs')}
          style={styles.btnStylelogin}>
            <Text style={{color:'white',fontSize:20,padding:10}}>
             Open Jobs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=> this.props.navigation.navigate('appliedjobs')}
          style={styles.btnStylelogin}>
            <Text style={{color:'white',fontSize:20,padding:10}}>
             Applied Jobs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('confirmjobs')}
          style={styles.btnStylelogin}>
            <Text style={{color:'white',fontSize:20,padding:10}}>
             Confirm Jobs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('finishjobs')}
          style={styles.btnStylelogin}>
            <Text style={{color:'white',fontSize:20,padding:10}}>
             Finished Jobs
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
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
    fontSize: 20,
    color: "#FFFFFF",
    flex: 1,
    alignItems: 'center',
    alignContent:'center'
    
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
    padding:10,
    borderRadius:10
  }
})