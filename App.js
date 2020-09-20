import React, { Component } from 'react'
import PushNotification from "react-native-push-notification";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Screenset from './Screen/Screenset';
import Sidebar from './Screen/Drawer/Sidebar';
import Website from './Screen/Website';
import Notification from './Screen/Notification';
import Spin from './Screen/Spin';
import sendOrder from './Screen/sendOrder';
import Visitweb from './Screen/Visitweb';

export default class App extends Component {

  componentDidMount(){
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:");
      },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
        // process the action
      },   
      popInitialNotification: true,
      requestPermissions: true,
    });
    this.ShowPushNotification();
  }

  ShowPushNotification = () =>{
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      smallIcon:"",
      message: "Come Back and Grab Some Coins, Hurry Up!", // (required)
      date: new Date(Date.now() + (60*60) * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      repeatType:'time',
      repeatTime:6*1000*(60*60)
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="screen" component={Screenset} />
          <Stack.Screen name="drawer" component={Sidebar} />
          <Stack.Screen name="web"    component={Website} />
          <Stack.Screen name="Notify" component={Notification} />
          <Stack.Screen name="spin"   component={Spin} />
          <Stack.Screen name="sendOrder"   component={sendOrder} />
          <Stack.Screen name="visitweb"   component={Visitweb} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
