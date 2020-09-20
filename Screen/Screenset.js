import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../Screen/Splash';
import Login from '../Screen/Login';
import Register from '../Screen/Register';
const Stack = createStackNavigator();
export default class Screenset extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="splash" component={Splash} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="register" component={Register} />
            </Stack.Navigator>
        )
    }
}

