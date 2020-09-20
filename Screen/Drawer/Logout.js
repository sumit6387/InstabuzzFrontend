import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage';

export default class Logout extends Component {
   async componentDidMount(){
        await AsyncStorage.removeItem('token',()=>{
            this.props.navigation.navigate('login');
        });
    }
    render() {
        return (
            null
        )
    }
}
