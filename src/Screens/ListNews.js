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
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import appUrls from '../Constants/appUrls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Overlay } from 'react-native-elements';
export default class NewsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        { id: 1, name: "Comunity", image: "https://img.icons8.com/clouds/100/000000/groups.png", count: 124.711 },
        { id: 2, name: "Housing", image: "https://img.icons8.com/color/100/000000/real-estate.png", count: 234.722 },
        { id: 3, name: "Jobs", image: "https://img.icons8.com/color/100/000000/find-matching-job.png", count: 324.723 },
        { id: 4, name: "Personal", image: "https://img.icons8.com/clouds/100/000000/employee-card.png", count: 154.573 },
        { id: 5, name: "For sale", image: "https://img.icons8.com/color/100/000000/land-sales.png", count: 124.678 },
      ],
      newslist: [],
      isLoading: false,
      isFetching: false,
      userTYPE: ''
    };
  }

  clickEventListener = (item) => {
    //Alert.alert('Message', 'Item clicked. '+item.title);
    this.props.navigation.navigate('newsdetail', item)
  }
  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getNewsList(); });
  }
  async componentDidMount() {

    const value = await AsyncStorage.getItem('userInfo');
    const isLogin = JSON.parse(value);
    if (isLogin) {
      this.setState({

        userTYPE: isLogin.usRole,


      })
      console.log('user id=', this.state.usRole);
    } else {
      console.log('Please login');
      this.props.navigation.dispatch(
        StackActions.replace('Login')
      );
    }
    this.getNewsList();
    // this.getCompanyList();
  }
  getNewsList = () => {
    const { seed, page } = this.state;
    //let pref =this.props.route.params.prefix;
    //console.log('prefix',pref);

    const url = appUrls.NEWSLIST
    console.log('URL ', url);

    this.setState({ isLoading: true });
    fetch(url)
      .then(res => res.json()).then(resJson => {

        this.setState({

          newslist: resJson.all_news,
          isLoading: false,
          isFetching: false
        });
      }).catch(error => {
        this.setState({
          error, isLoading: false,
          isFetching: false
        })
        console.log("False" + error)
      })
  }
  render() {
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
              News
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
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={() => { this.clickEventListener(item) }}>
                    <Image style={styles.image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg1iX9Ua5U0P0SOKLaeQL-W9j6_p4NOepxMeBnnSBgKbj0a5b8VTPWsRFaEs6IdwCcxw&usqp=CAU" }} />
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.title}</Text>
                      <Text style={styles.count}>{item.date}</Text>

                      <TouchableOpacity style={styles.followButton} onPress={() => this.clickEventListener(item)}>
                        <Text style={styles.followButtonText}>News</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
              }} />
            {this.state.userTYPE == 'admin' ? <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate("addnews",)}
              style={styles.fab}>
              <Icon name="plus" size={30} color="#FFF" />
            </TouchableOpacity> : null}
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
    flex: 1,
    alignSelf: 'center',
    color: "#3399ff",
    fontWeight: 'bold'
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
});