import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appUrls from '../Constants/appUrls';
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png" },
        { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar2.png" },
        { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
        { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
      ],
      isLoading: false,
      jobsData: [],
      userTYPE:'',
      usID:'',
      jobid:''
    };
  }

 async componentDidMount() {
    let id = this.props.route.params.id;
    console.log('prefix', id);
    this.makeDetailRequest(id);
    const value = await AsyncStorage.getItem('userInfo');
    const isLogin = JSON.parse(value);
    if (isLogin) {
        this.setState({
            
            userTYPE:isLogin.usRole,
            usID:isLogin.us_id,
            jobid:id

        })
        console.log('user id=', this.state.usID);
    } else {
        console.log('Please login');
        this.props.navigation.dispatch(
            StackActions.replace('Login')
          );
    }
  }

  applyJob=()=>{
   
    const url = appUrls.APPLYJOB;
    console.log('URL company', url);
    let userID=this.state.usID;
    let jobID =this.state.jobid
  console.log('id',userID,"idjob",jobID)
    
    this.setState({ isLoading: true });
    fetch(url, {
      method: 'POST',
      body: 'job_id=' + jobID  + "&user_id=" + userID,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      })
    })
      .then(res => res.json()).then(resJson => {
        console.log('=========resJson===========', JSON.stringify(resJson))
        if (resJson.status) {
          // alert(resJson.result);

          this.setState({
            isLoading: false,
            
          });
          // this.onRefresh();
          alert('Applied succesfully')
          this.props.navigation.navigate('decision')
        } else {
          alert(resJson.status)
          this.setState({
            isLoading:false
          });
        }
      }).catch(error => {
        this.setState({
          isLoading:false
        });
        console.log(error)
      })
  }
  makeDetailRequest = (item) => {
    console.log('jobid', item)
    const url = appUrls.JOBDETAILS;
    console.log('URL company', url);
    this.setState({ isLoading: true });
    fetch(url, {
      method: 'POST',
      body: 'job_id=' + item,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      })
    })
      .then(res => res.json()).then(resJson => {
        console.log('=========resJson===========', JSON.stringify(resJson))
        if (resJson.status) {
          // alert(resJson.result);

          this.setState({
            isLoading: false,
            jobsData: resJson.news_detail
          });
          // this.onRefresh();
        } else {
          alert(resJson.status)
          this.setState({
            isLoading:false
          });
        }
      }).catch(error => {
        this.setState({
          isLoading:false
        });
        console.log(error)
      })
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
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
               Open Job Details
              </Text>
            </View>

          </View>
          {!this.state.isLoading && this.state.jobsData &&
          <View style={{ flex: 1 }}>
          
            <View style={styles.postContent}>
              {/* <Text style={styles.postTitle}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </Text> */}

              <Text style={styles.postDescription}>
               {this.state.jobsData.job_name}
              </Text>

              {/* <Text style={styles.tags}>
                Lorem, ipsum, dolor, sit, amet, consectetuer, adipiscing, elit. 
              </Text> */}
           <Text style={styles.date}>
                {this.state.jobsData.location}
              </Text>
              <Text style={styles.date}>
              {this.state.jobsData.timings}  {this.state.jobsData.date}
              </Text>

              {this.state.userTYPE=='admin'?
            //    <View style={{ flex: 1, flexDirection: 'row',marginTop:10,alignSelf:'center' }}>
             
            //  </View>
            null:
                 
                <TouchableOpacity
                onPress={()=>{
                  this.applyJob()
                }}
                style={styles.shareButtonaccept}>
                <Text style={styles.shareButtonText}>apply</Text>
              </TouchableOpacity>
              
              }
             

            </View>

          {/* {this.state.userTYPE=='admin'?
          <View style={{ flex: .3 }}>
          {this.state.data.map((item) => {
            return (
              <View style={styles.box}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.boxContent}>
                  <Text style={styles.title}>Title</Text>
                  <Text style={styles.description}>Lorem ipsum dolor sit amet, elit consectetur</Text>
                  <View style={styles.buttons}>
                    <Text style={styles.date}>
                      2017-11-27 13:03:01
                    </Text>

                  </View>
                </View>
              </View>

            )
          })}
        </View>
          
          :null} */}
          
         
  
          </View>
  }{
    this.state.isLoading &&
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={"green"} />
  </View>
  }


          
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    padding: 20,
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "#ca4232",
    flexDirection: 'row'
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    flex: .6
    // marginTop:10,
  },
  name: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  postDescription: {
    fontSize: 16,
    // marginTop:4,
  },
  tags: {
    color: '#ca4232',


  },
  date: {
    color: '#ca4232',
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#ca4232",
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flex: .5,
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "#ca4232",
  },
  shareButtonaccept: {
    marginTop: 10,
    height: 45,
    flex: .5,
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "green",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  boxContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "#151515",
  },
  description: {
    fontSize: 15,
    color: "#646464",
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: "#eee",
  },
  //   profile: {
  //     backgroundColor: "#1E90FF",
  //   },
  message: {
    backgroundColor: "#228B22",
  },
});
