import React from 'react';
import { TextInput, View, StyleSheet, ScrollView, Text, TouchableOpacity,ActivityIndicator ,SafeAreaView } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import appUrls from '../Constants/appUrls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Overlay } from 'react-native-elements';
export default class AddNews extends React.Component {
constructor(props){
  super(props)
  this.state={
    fixType:'',
    dateString: 'Pick up Date',
    date: new Date(),
    timeString: 'Pick Time',
    time: new Date(),
    jobTitle:'',
    jobLocation:'',
    show: false
   

  }
}
showPicker = () => {
  this.setState({
      isVisible: true,
  });
}
showOverlay = () => {
  console.log('show');
 this.setState({
     show:true
 })
}
hideOverlay = () => {
  console.log('show');
 this.setState({
     show:false
 })
}
onChanged = (event, selectedDate) => {
  console.log("date" + selectedDate);

  this.setState({
      dateString: moment(selectedDate).format('DD-MM-YYYY'),
      date: selectedDate,
      show: false,

  })
};

showPickerO = () => {
  this.setState({
      isVisible: true,
  });
}
showOverlayTime = () => {
  console.log('show out');
  this.setState({
      showo: true
  })
}
onChangedTime = (event, selectedDate) => {
  console.log("dateout" + selectedDate);

  this.setState({
      timeString: moment()
      .utcOffset('+05:30')
      .format('hh:mm:ss a'),
     time: selectedDate,
      showo: false,

  })
};

makeAddJobRequest = async () => {
  console.log('booking');
  console.log(appUrls.NEWS);


  let orderDate = this.state.dateString;
  let orTitle = this.state.jobTitle;
  let orLocation = this.state.jobLocation;
  

  console.log("Request Data="+orderDate+"--"+'--'+orTitle+"="+orLocation)
  let formData = new FormData();
  formData.append("title",orTitle)
  formData.append("description",orLocation)
  formData.append('date',orderDate)
  
  this.setState({ isLoading: true });

  fetch(appUrls.NEWS, {
      method: "POST",
      body: "title=" + orTitle + "&description=" + orLocation
                    + "&date=" + orderDate,
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                })
  }).then((response) => response.json()).then(async (resJson) => {
    console.log('=========resJson===========', JSON.stringify(resJson))
      if (resJson.status) {

          this.setState({
              isLoading: false,

          });
          alert(resJson.status);
          this.props.navigation.navigate('newslist')
      } else {
          this.setState({ isLoading: false });
          alert(resJson.message);
          console.log('false');
      }

  }).catch((error) => {
      console.error(error);
      alert("Some error occure. Please try agains")
      this.setState({
          isLoading: false,

      });
    });


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
               Add News
              </Text>
              </View>
              
          </View>
        {!this.state.isLoading &&
        <ScrollView style={{ flex: 1, backgroundColor: "#DCDCDC" }}>

          {/* <View style={{flex:1}}>
    <Text style={{ fontSize: 30, paddingLeft: 20, fontWeight: "bold", marginTop: "5%" }}>Welcome!</Text>
    <Text style={{ fontSize: 15, paddingLeft: 20, color: "grey" }}>sign in to continue</Text>
</View> */}
          <View style={{ marginTop: "10%", }}>
            <View style={styles.inputStyle}>
              <Fontisto style={styles.emailIcon} name="email" size={15} color="#000"></Fontisto>
              <TextInput
                style={styles.textinput}
                onChangeText={(title) => this.setState({
                  jobTitle: title
              })}
                placeholder="Title">
              </TextInput>
            </View>
            <View style={[styles.inputStyle, { marginTop: 10 }]}>
              <Fontisto style={styles.emailIcon} name="email" size={15} color="#000"></Fontisto>
              <TextInput
                style={styles.textinput}
                onChangeText={(location) => this.setState({
                  jobLocation: location
              })}
                placeholder="Description">
              </TextInput>
            </View>
            <TouchableOpacity 
                         onPress={this.showOverlay}
                        style={{
                            flexDirection: "row",
                            borderRadius: 15,
                           flex:1,
                            marginLeft: "5%",
                            marginRight: "5%",
                            marginTop: "5%",
                            paddingHorizontal: 8,
                            backgroundColor: "#f4f2f7"
                        }}>
                             
                             <Icon style={styles.emailIcon} name="ios-today" size={25} color="#ff5c83" />
                            <Text style={styles.textStyle}>{this.state.dateString}</Text>
                        </TouchableOpacity>
                        {Platform.OS === 'ios' ? (
                    <Overlay isVisible={this.state.show}
                        onBackdropPress={this.hideOverlay} overlayStyle={styles.overlayStyle}>
                        <View style={styles.headerStyle}>
                            <TouchableOpacity onPress={this.hideOverlay}>
                                <Text style={{ paddingHorizontal: 15 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.hideOverlay}>
                                <Text style={{ paddingHorizontal: 15, color: 'green' }}>Done</Text>
                            </TouchableOpacity>

                        </View>
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChanged}
                            style={{ backgroundColor: 'green'}}
                        />
                    </Overlay>
                ) : (
                        <>

                            {this.state.show &&
                                <DateTimePicker
                                    value={this.state.date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.onChanged}
                                    style={{ backgroundColor: 'white' }}
                                />
                            }
                   </>
                )}
           
          </View>
          <View style={{ marginTop: "8%" }}>
            <TouchableOpacity style={styles.getstartbutton} onPress={() => this.makeAddJobRequest()}>
              <Text style={styles.getstartText}>Add News</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>

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
    flex: 1,

    backgroundColor: "#eeeeee"
  },
  inputStyle: {
    flexDirection: "row",
    borderRadius: 15,
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",

    paddingHorizontal: 8,
    backgroundColor: "#f4f2f7"
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

  inputStyleDesc: {
    flexDirection: "row",
    borderRadius: 15,
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
    height: '30%',

    paddingHorizontal: 8,
    backgroundColor: "#f4f2f7"
  },   textStyle: {
    fontFamily: 'Gill Sans',
    fontSize: 16,
    color:'black',
    marginVertical:30,
    marginHorizontal: 10,
},


  emailIcon: {
    margin: 20,
    marginTop: "7%",
  },
  passIcon: {
    margin: 20,
    marginTop: "7%",
  },
  textinput: {
    paddingHorizontal: 8,
    fontSize: 16,
    width: '70%',
    //color:'#ffffff',
    color: 'black',
    backgroundColor: '#f4f2f7',
  },
  passInput: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: '10%',
    width: '70%',

    color: 'black',
    backgroundColor: '#f4f2f7',
  },
  getstartbutton: {
    flex: 1,
    marginHorizontal: '10%',
    backgroundColor: 'green',
    borderRadius: 15,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 10
  },
  getstartText: {
    fontSize: 16,
    fontWeight: "500",
    color: '#ffffff',
    textAlign: 'center',
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  }

});