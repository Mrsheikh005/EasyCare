import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Profile from './profile';
import JobsList from './JobsList'
import AddJob from './AddJob';
import JobDetail from './JobDetail';
import UserList from './UserList';
import ChatList from './ChatList';
import ChatDetail from './ChatDetail';
import AssignJobsUser from './AssignJobsUser';
import NewsList from './ListNews';
import AddNews from './AddNews';
import AppliedJobs from './AppliedJobs';
import ConfirmJobs from './ConfirmJobs';
import NewsDetail from './NewsDetail';
import ApplyJobDetail from './ApplyJobDetail';
import DecisionScreen from './DecisionScreen';
import ConfirmJobDetail from './ConfirmJobDetail.js';
import FinishedJobsList from './FinishedJobsList';
import FinishJobDetail from './FinishJobDetail';
import VolunteerProfile from './VolunteerProfile';
import EditProfile from './EditProfile';
import WeatherUpdate from './WeatherUpdate';


const Stack = createNativeStackNavigator();



const HomeScreens =({navigation})=>{
    return(
        <Stack.Navigator
       
        >
         
           {/* <Stack.Screen name="Splash" component={Splash} /> */}
           <Stack.Screen name="Home" component={Home}options={{
               headerShown:false          
            }} />
          
           <Stack.Screen name="Profile" component={Profile} options={{
               headerShown:false          
            }}/>
            <Stack.Screen name="Jobs" component={JobsList} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="AddJob" component={AddJob} options={{
               headerShown:false          
            }}/>
            <Stack.Screen name="JobDetail" component={JobDetail} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="users" component={UserList} options={{
               headerShown:false          
            }}/>
              <Stack.Screen name="chat" component={ChatList} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="chatview" component={ChatDetail} options={{
               headerShown:false          
            }}/>
            <Stack.Screen name="assignjobsuser" component={AssignJobsUser} options={{
               headerShown:false          
            }}/>
              <Stack.Screen name="newslist" component={NewsList} options={{
               headerShown:false          
            }}/>
            <Stack.Screen name="addnews" component={AddNews} options={{
               headerShown:false          
            }}/>
            <Stack.Screen name="newsdetail" component={NewsDetail} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="appliedjobs" component={AppliedJobs} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="appliedjobsdetail" component={ApplyJobDetail} options={{
               headerShown:false          
            }}/>
            <Stack.Screen name="confirmjobs" component={ConfirmJobs} options={{
               headerShown:false          
            }}/>
                <Stack.Screen name="decision" component={DecisionScreen} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="confirmjobsdetail" component={ConfirmJobDetail} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="finishjobs" component={FinishedJobsList} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="finishjobsdetail" component={FinishJobDetail} options={{
               headerShown:false          
            }}/>
            <Stack.Screen name="vprofile" component={VolunteerProfile} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="editprofile" component={EditProfile} options={{
               headerShown:false          
            }}/>
             <Stack.Screen name="weather" component={WeatherUpdate} options={{
               headerShown:false          
            }}/>
          </Stack.Navigator>
    )
}

export default HomeScreens;