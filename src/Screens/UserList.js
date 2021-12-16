import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appUrls from '../Constants/appUrls';

export default class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
        {id:1,  name: "Mark Doe",   position:"CEO",               image:"https://bootdey.com/img/Content/avatar/avatar7.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."},
        {id:2,  name: "John Doe",   position:"CTO",               image:"https://bootdey.com/img/Content/avatar/avatar1.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."},
        {id:3,  name: "Clark Man",  position:"Creative designer", image:"https://bootdey.com/img/Content/avatar/avatar6.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
        {id:4,  name: "Jaden Boor", position:"Front-end dev",     image:"https://bootdey.com/img/Content/avatar/avatar5.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
        {id:5,  name: "Srick Tree", position:"Backend-end dev",   image:"https://bootdey.com/img/Content/avatar/avatar4.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
        {id:6,  name: "John Doe",   position:"Creative designer", image:"https://bootdey.com/img/Content/avatar/avatar3.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
        {id:7,  name: "John Doe",   position:"Manager",           image:"https://bootdey.com/img/Content/avatar/avatar2.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
        {id:8,  name: "John Doe",   position:"IOS dev",           image:"https://bootdey.com/img/Content/avatar/avatar1.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
        {id:9,  name: "John Doe",   position:"Web dev",           image:"https://bootdey.com/img/Content/avatar/avatar4.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
        {id:10, name: "John Doe",   position:"Analyst",           image:"https://bootdey.com/img/Content/avatar/avatar7.png", about:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."} ,
      ],
      userlist:[],
      isLoading:false,
      isFetching:false,
      userTYPE:''
    };
  }

  clickEventListener = (item) => {
    this.props.navigation.navigate('vprofile',item)
    this.setState({userSelected: item}, () =>{
      this.setModalVisible(true);
    });
  }
  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getuserList(); });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
   componentDidMount() {
   
    // const value = await AsyncStorage.getItem('userInfo');
    //     const isLogin = JSON.parse(value);
    //     if (isLogin) {
    //         this.setState({
                
    //             userTYPE:isLogin.usRole,
             

    //         })
    //         console.log('user id=', this.state.usRole);
    //     } else {
    //         console.log('Please login');
    //         this.props.navigation.dispatch(
    //             StackActions.replace('Login')
    //           );
    //     }
    this.getuserList();
   // this.getCompanyList();
  }

     //Get All list of Work Orders
     getuserList = () => {
      const { seed, page } = this.state;
      //let pref =this.props.route.params.prefix;
      //console.log('prefix',pref);
     
      const url = appUrls.USERS
      console.log('URL ', url);
     
      this.setState({ isLoading: true });
      fetch(url)
        .then(res => res.json()).then(resJson => {
          //console.log('=========resJson===========', JSON.stringify(resJson))
          this.setState({
           
            userList:resJson.users,
            isLoading: false,
            isFetching: false
          });
        }).catch(error => {
          this.setState({
            error, isLoading: false,
            isFetching:false
          })
          console.log("False"+error)
        })
    }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
           <View style={styles.headers}>
          <TouchableOpacity 
          style={{flex:.4}}
          onPress={()=>{this.props.navigation.goBack()}}>
          <Ionicons name={"arrow-back-circle"} color="white" size={30}
            //  style={{marginRight:290,}}
          ></Ionicons>
          </TouchableOpacity>
              <View >
              <Text style={styles.headerTitle}>
               Volunteers List
              </Text>
              </View>
              
          </View>
          {!this.state.isLoading && this.state.userlist &&
        <View style={{flex:1}}>
        <FlatList 
          style={styles.userList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.userList}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              <Image style={styles.image} source={{uri: "https://bootdey.com/img/Content/avatar/avatar7.png"}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                {/* <Text style={styles.position}>{item.position}</Text> */}
                <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                  <Text style={styles.followButtonText}>Volunteer</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}/>
</View>
 }
 { this.state.isLoading &&
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<ActivityIndicator size="large" color={"#000"} />
</View>
}
        {/* <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                    <Image style={styles.image} source={{uri: this.state.userSelected.image}}/>
                    <Text style={styles.name}>{this.state.userSelected.name}</Text>
                    <Text style={styles.position}>{this.state.userSelected.position}</Text>
                    <Text style={styles.about}>{this.state.userSelected.about}</Text>
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity onPress={() => {this.setModalVisible(false) }} style={styles.btnClose}>
                  <Text style={styles.txtClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}
     
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    //:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  userList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
  },



  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row'
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },

  followButton: {
    marginTop:10,
    height:40,
    width:130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  },
  headers:{
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
});