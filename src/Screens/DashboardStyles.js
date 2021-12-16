
import {StyleSheet} from 'react-native';

export const styleshome = StyleSheet.create({
    header:{
      backgroundColor: "#ca4232",
      flex:.4
    },
    headerContent:{
      padding:30,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: "#ffffff",
      marginBottom:10,
    },
    icon:{
      /*width: 40,
      height: 40,*/
      paddingLeft: 10,
      marginRight: 10
      
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
      backgroundColor:'#01a699',
       borderRadius:100,
    },
    title:{
      fontSize:18,
      color:"#000000",
      marginLeft:4
    },
    name: {
        fontSize: 20,
        color: "#FFFFFF",
        fontWeight: 'bold',
        textAlign: "center",        
        width: '100%',
    },

    designation: {
        fontSize: 17,
        color: "#FFFFFF",
        fontWeight: '600',
        textAlign: "center",
        width: '100%'
    },
    department: {
        fontSize: 17,
        color: "#FFFFFF",
        fontWeight: '600',
        textAlign: "center",
        width: '100%'
    },
    profileDetail: {
        alignSelf: 'center',
        marginTop: -20,
        alignItems: 'center',
        flexDirection: 'row',        
        backgroundColor: "#ffffff"
    },
    btn:{
      marginLeft: 'auto',
      width: 40,
      height: 40,
      paddingTop: 10,
      fontSize: 18,
      fontWeight: "bold",
      marginRight: 15,
    },
    body: {
      backgroundColor :"#E6E6FA",
      flex:1
    },
    box: {
      padding:5,
      marginBottom:2,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      shadowColor: 'black',
      shadowOpacity: .2,
      shadowOffset: {
        height:1,
        width:-2
      },
      elevation:2
    },
    username:{
      color: "#20B2AA",
      fontSize:22,
      alignSelf:'center',
      marginLeft:10
    },
    changePass:{
      width:'50%',
      padding:5,
      marginRight:'10%',
      justifyContent:'center',
      alignItems:'center',
    },
    logOut:{
      width:'30%',
      padding:5,
      marginLeft:'15%',
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'flex-end'
    },
     containerm:{
      justifyContent: 'center',  
  alignItems: 'center',   
  backgroundColor : "#FFF",   
  height: 300 ,  
  width: '80%',  
  borderRadius:10,  
  borderWidth: 1,  
  borderColor: '#fff',    
  marginTop: 80,  
  marginLeft: 40,  
    },
    input: {
      margin: 15,
      height: 50,
      borderColor: '#7a42f4',
      borderWidth: 1,width:'80%',borderRadius:10,padding:13
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,borderRadius:10
   },
   submitButtonText:{
      color: 'white'
   },
   container:{
    //backgroundColor:'#DCDCDC',
    flex:.6
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  notificationBox: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius:10,
  },
  
  icon:{
    width:45,
    height:45,
  },
  description:{
    fontSize:18,
    color: "#3498db",
    marginLeft:10,
  },
  MainCategoryStyling:{
    marginLeft: 5,
    height: 100,
  flex:.5,
  margin:10
},
CategoriesIcons:{
    flex:1,
    flexDirection:'row',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    width: '100%'
},
IconStyling:{
    margin: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
},
ListIcons:{
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#097ce0',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#097ce0'
},
IconNames:{
    textAlign: 'center',
    marginLeft: 10,
    color: 'black'
},
IconNumber:{
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
},
  });