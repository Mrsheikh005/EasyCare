import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appUrls from '../Constants/appUrls';

export default class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "Mark Doe",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Clark Man",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Jaden Boor",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "Srick Tree",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "Erick Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "Francis Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "Matilde Doe", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "John Doe",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "Fermod Doe",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "Danny Doe",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
      ],
      Userlist:[],
      isLoading:false,
      isFetching:false,
      userTYPE:'',
      acuUserId:''
    };
  }
  async componentDidMount() {
   
    const value = await AsyncStorage.getItem('userInfo');
        const isLogin = JSON.parse(value);
        if (isLogin) {
            this.setState({
                
                userTYPE:isLogin.usRole,
                acuUserId:isLogin.us_id

            })
            console.log('user id=', this.state.userTYPE);
        } else {
            console.log('Please login');
            this.props.navigation.dispatch(
                StackActions.replace('Login')
              );
        }
        if(this.state.userTYPE=='admin'){
          this.getUserList();
        }
        else{
          this.getUserList();
        }
   
   // this.getCompanyList();
  }
  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getUserList(); });
  }
  getUserList = () => {
    const { seed, page } = this.state;
    //let pref =this.props.route.params.prefix;
    //console.log('prefix',pref);
   
    const url = appUrls.CHATUSERS
    console.log('URL ', url);
   
    this.setState({ isLoading: true });
    fetch(url,{
      method:'POST',
      body: 'admin_id=' + this.state.acuUserId,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      })
    })
      .then(res => res.json()).then(resJson => {
        console.log('=========resJson===========', JSON.stringify(resJson))
        this.setState({
         
          Userlist:resJson.users,
          isLoading: false,
          isFetching: false
        });
        // this.onRefresh();
      }).catch(error => {
        this.setState({
          error, isLoading: false,
          isFetching:false
        })
        console.log("False"+error)
      })
  }
  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={
          ()=>
          this.props.navigation.navigate('chatview',item)
      }>
        <View style={styles.row}>
          <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.mblTxt}> {item.created_at}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.role}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <SafeAreaView style={{ flex: 1 }} >
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
              Message User List
              </Text>
              </View>
              
          </View>
          {!this.state.isLoading && this.state.Userlist &&
          <View style={{flex:1}}>
        <FlatList 
          extraData={this.state}
          data={this.state.Userlist}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
          </View>
          }
          {this.state.isLoading &&
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={"#000"} />
            </View>
          }
          {this.state.userTYPE=='user' ?
          
          <TouchableOpacity
                        activeOpacity={0.7}
                         onPress={() => this.props.navigation.navigate("chatview",)}
                         style={styles.fab}>
                        <Icon name="plus"  size={30} color="#FFF" />
                     </TouchableOpacity>
          :null}
          
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:15
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
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
  fab: {
      
      
    borderColor:'rgba(0,0,0,0.2)',
   alignItems:'center',
   justifyContent:'center',
   width:60,
   position: 'absolute',                                          
   bottom: 10,                                                    
   right: 10,
  
   height:60,
  backgroundColor:'green',
   borderRadius:100,
},
});