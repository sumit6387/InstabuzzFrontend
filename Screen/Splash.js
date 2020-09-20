import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground, Alert } from 'react-native'
const image = require('../assets/img/bg.jpg');
const logo = require('../assets/img/logo.png');
import Spinner from 'react-native-loading-spinner-overlay';
import { Image } from 'react-native-animatable';
import {retrivedata, StoreObj} from '../assets/Functions';

export default class Splash extends Component {
    state={
        spinner:false
    }
    async componentDidMount(){
        this.setState({spinner:true})
        const che = await retrivedata('token');
        if(che === undefined){
            this.setState({spinner:false})
            this.props.navigation.navigate('login')
        }else{
            var token = "Bearer "+che;
            fetch('https://instabuzz.cloudexter.in/api/user',{
                method:'GET',
                headers:{
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }).then((responce)=>responce.json())
            .then((data)=>{
                var data = StoreObj(data, 'userdetail')
                if(data){
                    this.setState({spinner:false})
                    this.props.navigation.navigate('drawer')
                }else{
                    Alert.alert("Something went wrong")
                }
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.img}>
                    <View style={styles.overlay}>
                        <View style={styles.content}>
                            <Image source={logo} resizeMode="center"
                                style={{ width: 200, height: 150 }} />
                            <Text style={styles.name}>Instabuzz</Text>
                        </View>
                        <Spinner
                            style={styles.fotter}
                            visible={this.state.spinner}
                            textContent={'Fetching Your Data...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    img: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(252, 159, 168,0.5)',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    name: {
        fontSize: 30,
        fontFamily: 'Arial',
        color: '#fff'
    },
    fotter: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 50,
        borderWidth:2,
        borderColor:'#fff'
    },
    spinnerTextStyle:{
        color:'#fff'
    }
});