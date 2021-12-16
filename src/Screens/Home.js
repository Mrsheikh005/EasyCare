import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { styleshome } from '../Screens/DashboardStyles'
import {DrawerActions } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper'
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, description: "Pening", count: "34" },
        { id: 2, description: "OPEN", count: "4" },
        { id: 3, description: "Closed", count: "3" },
        { id: 4, description: "Completed", count: 24 },

      ],
      userTYPE: ''
    };
  }



  async componentDidMount() {

    const value = await AsyncStorage.getItem('userInfo');
    const isLogin = JSON.parse(value);
    if (isLogin) {
      this.setState({

        userTYPE: isLogin.usRole,


      })
      console.log('user id=', this.state.userPref);
    } else {
      console.log('Please login');
      this.props.navigation.dispatch(
        StackActions.replace('splash')
      );
    }

  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1,marginTop: 45 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flex: .3 }}
            onPress={()=>{this.props.navigation.dispatch(DrawerActions.openDrawer())}}
          >
            <Ionicons name={"reorder-three-sharp"} color="white" size={25}
            //  style={{marginRight:290,}}
            ></Ionicons>
          </TouchableOpacity>
          <View style={{ flex: .6 }}>
            <Text style={styles.headerTitle}>
              Home
            </Text>
          </View>
          {/* <View style={{flex:.2,
               width: 40,
               height: 60,
               aspectRatio: 1 * 1.8,}}>
              <Image  source={require('../assests/fab.jpeg')}
              resizeMode="cover"
              style={{width:'100%',height:'100%'}}>
              
              </Image>
              </View> */}

        </View>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor="#FF6347">
            <View style={styles.slide}>
              <Image
                source={require('../assests/img_one.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assests/img_two.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assests/img_three.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('decision')}
            style={styles.categoryBtn}>
            <View style={styles.categoryIcon}>
              <Ionicons name="ios-paper-plane-outline" size={20} color={'green'} />

            </View>
            <Text style={styles.categoryBtnTxt}>Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('chat')}
            style={styles.categoryBtn}>
            <View style={styles.categoryIcon}>
              <Ionicons name="ios-chatbox-ellipses-outline" size={20} color={'green'} />
            </View>
            <Text style={styles.categoryBtnTxt}>Chat</Text>
          </TouchableOpacity>
          {this.state.userTYPE == 'admin' ?

            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('newslist') }}
              style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <Ionicons name="ios-newspaper-outline" size={20} color={'green'} />
              </View>
              <Text style={styles.categoryBtnTxt}>Post Update</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('newslist') }}
              style={styles.categoryBtn}>
              <View style={styles.categoryIcon}>
                <Ionicons name="ios-newspaper-outline" size={20} color={'green'} />
              </View>
              <Text style={styles.categoryBtnTxt}>News</Text>
            </TouchableOpacity>
          }

              
          
        </View>
        <View style={styles.categoryContainer}>
        {this.state.userTYPE == 'admin' ?
                <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('users')}
                            style={styles.categoryBtn}>
                            <View style={styles.categoryIcon}>
                              <Ionicons name="md-people-sharp" size={20} color={'green'} />
                            </View>
                            <Text style={styles.categoryBtnTxt}>Volunteers</Text>
                          </TouchableOpacity>

                :null}

        </View>
        {/* {this.state.userTYPE == 'admin' ?



          <TouchableOpacity style={styles.categoryBtn}>
            <View style={styles.categoryIcon}>
              <Ionicons name="git-pull-request-outline" size={20} color={'green'} />
            </View>
            <Text style={styles.categoryBtnTxt}>Request</Text>
          </TouchableOpacity>


          : null} */}


      </SafeAreaView>
      // </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  header: {
    padding: 14,
    //flex:.1,
    // alignItems: 'center',
    backgroundColor: "green",
    flexDirection: 'row'
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    flex: 1,
    // padding:10
    // marginTop:10,
  },
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  row1: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  container: {
    justifyContent: 'center',
    //  flex:1,
    width: wp('18%'),
    height: hp('15%'),
    padding: 10,
    marginHorizontal: 50,
    marginVertical: 30,
    // paddingTop:25,
    // paddingBottom:25,
    // paddingLeft:5,
    // paddingRight:5,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#0040ff',
    shadowOpacity: .3,
    shadowRadius: 20,
    shadowOffset: {
      width: 0, height: 10
    },
    alignItems: 'center',
    backgroundColor: '#f3f3f3',


    borderColor: '#0040ff'
  },

  icon1: {
    padding: 5,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#523f98',
  },


  icontxt: {

    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1.5,
    borderBottomColor: 'green',
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '25%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#bbffb9' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'green',
  },
});
