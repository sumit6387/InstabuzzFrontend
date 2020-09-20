import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { TextInput, Title, Headline, Card, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { Storeindevice, StoreObj } from '../assets/Functions';

export default class Login extends Component {
    state = {
        takepass: false,
        mobile: '',
        password: '',
        loading: false
    }

    LoginUser = () => {
        this.setState({ loading: true })
        const { mobile, password } = this.state
        if(mobile =="" && password == ""){
            this.setState({loading:false, takepass:false})
            Alert.alert("Attention","All Fields is required")
        }else{
            fetch('https://instabuzz.cloudexter.in/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile,
                pass: password
            })
        }).then((responce) => responce.json())
            .then(async(data) => {
                if (data.status) {
                    Storeindevice(data.token, 'token')
                    var c = await StoreObj({ mobile: mobile, pass: password }, 'loginDetails')
                    if (c) {
                        fetch('https://instabuzz.cloudexter.in/api/user',{
                            method:'GET',
                            headers:{
                                'Authorization': 'Bearer '+data.token,
                                'Content-Type': 'application/json'
                            }
                        }).then((responce)=>responce.json())
                        .then((data)=>{
                            var data = StoreObj(data, 'userdetail')
                            if(data){
                                this.setState({ loading: false })
                                this.props.navigation.navigate('drawer')
                            }else{
                                Alert.alert("Something went wrong")
                            }
                        })
                    }
                } else {
                    this.setState({ loading: false })
                    Alert.alert(data.err)
                }
            })
        }
        
    }

    golog = () => {
        if (!this.state.takepass) {
            return (
                <View style={{ marginVertical: 5 }}>
                    <Title>Mobile No.</Title>
                    <TextInput
                        label="Mobile Number"
                        keyboardType="number-pad"
                        value={this.state.mobile}
                        onChangeText={e => this.setState({ mobile: e })}
                    />
                    <Button mode="contained"
                        color="#fc1e1e"
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5
                        }} onPress={() => this.setState({ takepass: true })}>
                        <FontAwesome name="arrow-right" size={25} />
                    </Button>
                </View>
            )
        } else {
            return (
                <Animatable.View
                    animation="bounceInRight"
                    duration={2000}
                    style={{ marginVertical: 5 }}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading...'}
                    />
                    <Title>Password</Title>
                    <TextInput
                        label="Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                    />
                    <Button mode="contained"
                        color="#fc1e1e"
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5
                        }} onPress={() => this.LoginUser()}>
                        Login
                    </Button>
                </Animatable.View>
            )
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Headline style={{ textAlign: 'center' }}>
                        Instabuzz
                    </Headline>
                    <Title>Please Login Here</Title>
                </View>
                <Animatable.View animation="bounceIn" duration={2000} style={styles.footer}>
                    <Card style={styles.action} elevation={12}>
                        <View style={{ marginVertical: 5 }}>
                            {this.golog()}
                            <Button mode="outlined"
                                color="#fc1e1e"
                                style={{
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 5
                                }} onPress={() => this.props.navigation.navigate('register')}>
                                Register
                            </Button>
                        </View>
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe5db',
        //justifyContent: 'center'
    },
    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        padding: 10,
        position: 'relative'
        //borderWidth: 2,
    },
    action: {
        padding: 20
    },
    button_container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});
