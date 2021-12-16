import React from 'react';
import { Image } from 'react-native';
import { View, Text, ActivityIndicator, StyleSheet, FlatList,TouchableOpacity ,SafeAreaView} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class WeatherUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            list: [],
            detail: []

        }
        this.makeWeatherRequest = this.makeWeatherRequest.bind(this);
    }

    async componentDidMount() {
        this.makeWeatherRequest()
        //  console.log(this.state.detail.name)
    }

    makeWeatherRequest = () => {

        const url = 'https://api.openweathermap.org/data/2.5/forecast?q=Lahore,pk&appid=22e50cc9100a5502bf98aa878bd3a6e2&units=metric';
        console.log('URL company', url);
        this.setState({ isLoading: true });
        fetch(url)
            .then(res => res.json()).then(resJson => {
                //  console.log('=========resJson===========', JSON.stringify(resJson))

              //  alert(resJson.list[0].main.temp);

                this.setState({
                    isLoading: false,

                    list: resJson.list,
                    detail: resJson.city

                });
                // console.log(this.state.weather)
                // this.onRefresh();
                // } else {
                //  // alert(resJson.message)
                //   this.setState({
                //     isLoading:false
                //   });
                // }
            }).catch(error => {
                this.setState({
                    isLoading: false
                });
                console.log(error)
            })
    }

    renderElement = ({ item }) => {
        
        return (
            <View style={styles.containerForecast}>
                <View style={styles.currentContainer}>
                                <Text style={styles.temperatureNumber}>{Math.floor(item.main.temp)}º</Text>
                                <View style={styles.conditionCurrentTemperature}>
                                    {/* <Icon
                                        name="wi-day-sunny"
                                        size={40}
                                        color="white"
                                    />
                                  //  <Text style={styles.conditionCurrentText}>{current.condition.text.toLowerCase()}</Text> */}
                                </View>
                            </View>
                <View style={styles.iconForecast}>
                   <Image style={{height:40,width:40}} source={{
                       uri:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                   }}></Image>
                </View>
                <View style={styles.tempreatureForecast}>
                    <Text>{item.main.temp_min}º ~ {item.main.temp_max}º</Text>
                </View>
                <View style={styles.dayForecast}>
                    <Text>{item.dt_txt}</Text>
                </View>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                {!this.state.isLoading &&

                    <View style={styles.container}>
                       <View style={styles.header}>
          <TouchableOpacity 
          style={{flex:.4}}
          onPress={()=>{this.props.navigation.goBack()}}>
          <Ionicons name={"arrow-back-circle"} color="black" size={30}
            //  style={{marginRight:290,}}
          ></Ionicons>
          </TouchableOpacity>
              <View >
              <Text style={styles.headerTitle}>
             Weather Update
              </Text>
              </View>
              
          </View>
                            <View style={styles.placeName}>
                                <IconFA
                                    name="map-marker"
                                    size={22}
                                    color="white"
                                />
                                <Text style={styles.placeText}>{this.state.detail.name}-{this.state.detail.country}</Text>
                            </View>
                            {/* <View style={styles.currentContainer}>
                                <Text style={styles.temperatureNumber}>{current.temp_c}º</Text>
                                <View style={styles.conditionCurrentTemperature}>
                                    <Icon
                                        name="wi-day-sunny"
                                        size={40}
                                        color="white"
                                    />
                                    <Text style={styles.conditionCurrentText}>{current.condition.text.toLowerCase()}</Text>
                                </View>
                            </View> */}
                        
                        <View style={{ flexDirection: 'column' }}>
                            <FlatList
                                style={styles.listForecast}
                                horizontal
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.list.slice(0,8)}
                                renderItem={this.renderElement}
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                            />
                        </View>
                    </View>

                }{
                    this.state.isLoading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={"green"} />
                    </View>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       // flex: 1,
        backgroundColor: 'green',
       // paddingTop: 80,
        paddingBottom: 90,
        justifyContent: 'space-between'
    },
    header:{
        padding:13,
        //flex:.1,
        // alignItems: 'center',
        backgroundColor: "white",
        flexDirection:'row'
      },
      headerTitle:{
        fontSize:18,
        color:"#000",
        flex:1 ,
       // padding:10
        // marginTop:10,
      },
    placeName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 80,
    },
    placeText: {
        marginLeft: 5,
        fontSize: 20,
        fontWeight:'bold',
        color: 'white'
    },
    temperatureNumber: {
        fontSize: 30,
        color: 'white',
        fontWeight: '400'
    },
    currentContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    conditionCurrentTemperature: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    conditionCurrentText: {
        color: 'white',
        fontSize: 15
    },
    listForecast: {
        paddingLeft: 40,
    },
    containerForecast: {
        padding: 20,
        borderRadius: 8,
        
        justifyContent: 'center',
        backgroundColor: 'rgba(208, 212, 222, 0.5)'
    },
    iconForecast: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tempreatureForecast: {
        justifyContent: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center'
    },
    dayForecast: {
        paddingTop: 10,
        alignItems: 'center'
    },
    separator: {
        marginLeft: 20,
    }
})