import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import appUrls from '../Constants/appUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ConfirmJobs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1,  description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", date:"2019-03-25 09:12:00", color:"#228B22", completed:1},
        {id:2,  description:"Aenean massa. Cum sociis natoque penatibus et magnis.",     date:"2019-03-25 10:23:00", color:"#FF00FF", completed:0},
        {id:3,  description:"nascetur ridiculus mus. Donec quam felis, ultricies dnec.", date:"2019-03-25 11:45:00", color:"#4B0082", completed:1},
        {id:4,  description:"Donec pede justo, fringilla vel, aliquet nec, vulputdate.", date:"2019-03-25 09:27:00", color:"#20B2AA", completed:0},
        {id:5,  description:"Nullam dictum felis eu pede mollis pretium. Integer tirr.", date:"2019-03-25 08:13:00", color:"#000080", completed:0},
        {id:6,  description:"ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas st.", date:"2019-03-25 10:22:00", color:"#FF4500", completed:1},
        {id:7,  description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", date:"2019-03-25 13:33:00", color:"#FF0000", completed:0},
        {id:8,  description:"Maecenas nec odio et ante tincidunt tempus. Donec vitae .", date:"2019-03-25 11:56:00", color:"#EE82EE", completed:0},
        {id:9,  description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", date:"2019-03-25 15:00:00", color:"#6A5ACD", completed:0},
        {id:10, description:" Aenean imperdiet. Etiam ultricies nisi vel augues aasde.", date:"2019-03-25 12:27:00", color:"#DDA0DD", completed:0},
      ],
      joblist:[],
      isLoading:false,
      isFetching:false,
      userTYPE:'',
      usID:'',
    };
  }

  clickEventListener = (item) => {
     Alert.alert("Item selected: "+item.id)
    this.props.navigation.navigate('confirmjobsdetail',item)
  }
  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getJobsList(); });
  }
  __getCompletedIcon = (item) => {
    if(item.completed == 1) {
      return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
    } else {
      return "https://img.icons8.com/flat_round/64/000000/delete-sign.png";
    }
  }

  __getDescriptionStyle = (item) => {
    if(item.completed == 1) {
      return {textDecorationLine:"line-through", fontStyle:'italic', color:"#808080"};
    }
  } 

  async componentDidMount() {
   
     const value = await AsyncStorage.getItem('userInfo');
         const isLogin = JSON.parse(value);
         if (isLogin) {
             this.setState({
                 
                 userTYPE:isLogin.usRole,
                usID: isLogin.us_id

             })
             console.log('user id=', this.state.usID);
         } else {
             console.log('Please login');
             this.props.navigation.dispatch(
                 StackActions.replace('Login')
               );
         }
     this.getJobsList();
    // this.getCompanyList();
   }

     //Get All list of Work Orders
  getJobsList = () => {
    const { seed, page } = this.state;
    //let pref =this.props.route.params.prefix;
    //console.log('prefix',pref);
   
    const url = appUrls.ALLJOBS
    console.log('URL ', url+"id",this.state.usID);
   
    this.setState({ isLoading: true });
    fetch(url,{
      method:"POST",
      body:'id='+this.state.usID +"&job_status=" + "confirm",
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type

    })
    })
      .then(res => res.json()).then(resJson => {
        console.log('=========resJson===========', JSON.stringify(resJson))

        this.setState({
         
          joblist:resJson.confirm_jobs,
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
              Confirm Jobs 
              </Text>
              </View>
              
          </View>
          {!this.state.isLoading && this.state.joblist &&
        <View style={{flex:1}}>
        <FlatList 
          style={styles.tasks}
          columnWrapperStyle={styles.listContainer}
          data={this.state.joblist}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={[styles.card,]} onPress={() =>
             {this.clickEventListener(item)}}>
            {/* <View style={styles.cardImgWrapper}>
                  <Image
                    source={require('../assests/images.jpg')}
                    resizeMode="cover"
                    style={styles.cardImg}
                  />
                </View> */}
                <View style={styles.cardInfo}>
                  <Text style={[styles.description, this.__getDescriptionStyle(item)]}>{item.id} </Text>
                  <Text style={styles.cardTitle}>{item.job_name}</Text>
                 
                  <Text style={styles.cardDetails}>
                  {item.location}
                  </Text>
                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.date}>
                  Updated at: {item.date} {item.timings}
                  </Text>
                  {/* <Image style={styles.image} source={{uri: this.__getCompletedIcon(item)}}/> */}
                  </View>
                  </View>

          
            </TouchableOpacity>
          )}}/>
         {/* {this.state.userTYPE=='admin' ? <TouchableOpacity
                        activeOpacity={0.7}
                         onPress={() => this.props.navigation.navigate("AddJob",)}
                         style={styles.fab}>
                        <Icon name="plus"  size={30} color="#FFF" />
                     </TouchableOpacity>:null} */}
                     </View>
                    }
                     { this.state.isLoading &&
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={"#000"} />
  </View>
    }
      </SafeAreaView>
    );
    
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
   // marginTop:20,
    backgroundColor:"#eeeeee"
  },
  tasks:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
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
  image:{
    width:25,
    height:25,
  },
  header:{
    padding:13,
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
    flexDirection:'row',
    flexWrap: 'wrap',
    borderLeftWidth:6,
  },

  description:{
    fontSize:18,
    flex:1,
    color:"#008080",
    fontWeight:'bold',
  },
  date:{
    fontSize:14,
    flex:1,
    color:"#696969",
    marginTop:5
  },
  
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
}); 