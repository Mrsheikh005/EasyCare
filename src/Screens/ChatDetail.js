import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import appUrls from '../Constants/appUrls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class ChatDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        { id: 1, role:'admin',name: "Comunity", image: "https://img.icons8.com/clouds/100/000000/groups.png", count: 124.711 },
        { id: 2, role:'user',name: "Housing", image: "https://img.icons8.com/color/100/000000/real-estate.png", count: 234.722 },
        { id: 3, role:'admin',name: "Jobs", image: "https://img.icons8.com/color/100/000000/find-matching-job.png", count: 324.723 },
        { id: 4, role:'user',name: "Personal", image: "https://img.icons8.com/clouds/100/000000/employee-card.png", count: 154.573 },
        { id: 5, role:'admin',name: "For sale", image: "https://img.icons8.com/color/100/000000/land-sales.png", count: 124.678 },
      ],
      newslist: [],
      isLoading: false,
      isFetching: false,
      userTYPE: '',
      showAddressModal: false,
      cuUserId:'',
      reciver:'',
      message:'',
    };
  }

  clickEventListener = (item) => {
    //Alert.alert('Message', 'Item clicked. '+item.title);
   // this.props.navigation.navigate('newsdetail', item)
  }
  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getNewsList(); });
  }
  async componentDidMount() {
    let id = this.props.route.params.id;
    const value = await AsyncStorage.getItem('userInfo');
    const isLogin = JSON.parse(value);
    if (isLogin) {
      this.setState({

        userTYPE: isLogin.usRole,
        cuUserId:isLogin.us_id,
        reciver:id

      })
      console.log('user id reciver=', this.state.reciver);
    } else {
      console.log('Please login');
      this.props.navigation.dispatch(
        StackActions.replace('Login')
      );
    }
    if(this.state.userTYPE=='admin'){
      this.getNewsList();
    }else{
      this.getNewsList();
    }
   
    // this.getCompanyList();
  }


  //Get Locations and work types List from API's 
  makeReplyRequest = () => {
    const { userID, message } = this.state;

    const url = appUrls.STARTCHAT
    console.log('URL ', url);
    // formData.append('work_order_id', this.props.route.params.id);
    // formData.append('user_id', this.state.userID);
    // formData.append('message', this.state.message);

   // console.log('PARAm= ', this.props.route.params.id + this.state.userID + this.state.message + "FOrm" + this.state.imgsList)

    if (this.state.cuUserId != '' && this.state.message != '') {
        this.setState({ isLoading: true });

        fetch(appUrls.STARTCHAT, {
          method: 'POST',
          body: 'sender=' + this.state.cuUserId + "&receiver=" + this.state.reciver +"&message=" + this.state.message,
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
          })
        }).then((response) => response.json()).then(async (resJson) => {
            console.log('true', resJson);
            if (resJson.status) {

                this.setState({
                    isLoading: false,
                    showAddressModal: false
                });
                this.onRefresh();
                // console.log(resJson.result)

            } else {
                this.setState({ isLoading: false, showAddressModal: false });

                console.log('false' + JSON.stringify(resJson));
            }

        }).catch(err => {
            console.error("error ", err);
            alert(err)
            this.setState({
                isLoading: false,
                showAddressModal: false
            });
        })
    } else {
        // alert('Fill all fields')
    }

}
  getNewsList = () => {
    const { seed, page } = this.state;
    //let pref =this.props.route.params.prefix;
    //console.log('prefix',pref);

    const url = appUrls.CHATDETAIL
    console.log('URL ', url);

    this.setState({ isLoading: true });
    fetch(url,{
      method: 'POST',
      body: 'user_id=' + this.state.cuUserId + '&chat_id=' + this.state.reciver,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      })
    })
      .then(res => res.json()).then(resJson => {
      //  console.log('=========resJson===========', JSON.stringify(resJson))
        this.setState({

          newslist: resJson.chat,
          isLoading: false,
          isFetching: false
        });
        this.sortListById();
      }).catch(error => {
        this.setState({
          error, isLoading: false,
          isFetching: false
        })
        console.log("False" + error)
      })
  }

  _renderReplyModal() {
    return (
        <View style={styles.mainView}>
            <View style={styles.containerm}>

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Message"
                    multiline={true}
                    numberOfLines={8}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={(txt) => this.setState({
                        message: txt
                    })}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                showAddressModal: false,
                            })
                        }}
                        style={[styles.submitButton]}
                    >
                        <Text style={styles.submitButtonText}>Cancel </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => {
                            this.selectMultiImg()
                        }}
                        style={[styles.submitButton, { width: '30%' }]}
                    >
                        <Text style={styles.submitButtonText}> Attachment </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={
                            () =>
                                this.makeReplyRequest()

                        }
                    >
                        <Text style={styles.submitButtonText}> Save </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {/* <Image style={{height:50,width:50}} source={{uri:this.state.singleFile.uri}}></Image> */}
                </View>
            </View>
        </View>
    )
}
__getDescriptionStyle = (item) => {
  if(item.role == 'admin') {
    return {backgroundColor:'green', fontStyle:'italic', color:"#808080"};}
  // }else{
 
  // }
} 


renderChatList=({item,indse})=>{
  //console.log("uindex",item.created_at)
  return(
    <TouchableOpacity style={[styles.card,this.__getDescriptionStyle(item)]} onPress={() => { this.clickEventListener(item) }}>
                    
    <Image style={styles.image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg1iX9Ua5U0P0SOKLaeQL-W9j6_p4NOepxMeBnnSBgKbj0a5b8VTPWsRFaEs6IdwCcxw&usqp=CAU" }} />
    <View style={styles.cardContent}>
      <Text style={styles.name}>{item.user_name}</Text>
      <Text style={styles.msg}>{item.message}</Text>
      <Text style={styles.count}>{item.date}</Text>

      <TouchableOpacity style={styles.followButton} onPress={() => this.clickEventListener(item)}>
        <Text style={styles.followButtonText}> {item.role} </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
  )
}

// Function to sort ArrayList by asc order
sortListById(){
  //Sort ArrayList by ascending order
  this.state.newslist.sort(function(obj1, obj2) {
   // Ascending: first id less than the previous
   return obj1.id - obj2.id;
 });

 this.setState(previousState => (
   { newslist: previousState.newslist }
 ))
}
  render() {
   // console.log('chat data',this.state.newslist)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flex: .4 }}
            onPress={() => { this.props.navigation.goBack() }}>
            <Ionicons name={"arrow-back-circle"} color="white" size={30}
            //  style={{marginRight:290,}}
            ></Ionicons>
          </TouchableOpacity>
          <View >
            <Text style={styles.headerTitle}>
            Messages
            </Text>
          </View>

        </View>

        {!this.state.isLoading && this.state.newslist &&
          <View style={{ flex: 1 }}>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.newslist}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={this.renderChatList} />
         
          
          <TouchableOpacity
                        activeOpacity={0.7}
                         onPress={() =>  this.setState({ showAddressModal: true })}
                         style={styles.fab}>
                        <Icon name="plus"  size={30} color="#FFF" />
                     </TouchableOpacity>
         

                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.showAddressModal}
                        >
                            {this._renderReplyModal()}
                        </Modal>
          </View>
        }
        {this.state.isLoading &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={"#000"} />
          </View>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ebf0f7"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7"
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  fab: {


    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,

    height: 60,
    backgroundColor: 'green',
    borderRadius: 100,
  },

  name: {
    fontSize: 18,
    flex: .5,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
  },
  msg: {
    fontSize: 15,
    flex: .5,
    alignSelf: 'center',
    color: "#3399ff",
    width:'30%'
    
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#6666ff"
  },
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
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#000",
    fontSize: 12,
  },
  containerm:{
    justifyContent: 'center',  
alignItems: 'center',   
backgroundColor : "#FFF",   
height: 300 ,  
width: '95%',  
borderRadius:10,  
borderWidth: 1,  
borderColor: '#fff',    
// marginTop: 80,  
// marginLeft: 40,  
  },
  mainView:{
   flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#00000099'
  },
  input: {
    margin: 5,
    height: 150,
    borderColor: '#7a42f4',
    borderWidth: 1,width:'90%',borderRadius:10,padding:13, textAlign:'center'
 },
 submitButton: {
    backgroundColor: '#7a42f4',
    padding: 16,
    margin: 5,
    marginVertical:10,
    flex:.3,
    //height: 40,
    borderRadius:10
 },
 submitButtonText:{
    color: 'white',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
 },
 
});