import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { TextInput, Title, Headline, Card, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Register extends Component {

    state = {
        name: '',
        email: '',
        mobnum: '',
        password: '',
        loading: false
    }

    RegisterUser = () => {
        this.setState({ loading: true })
        const { name, email, mobnum, password } = this.state
        if(name == "" && email == "" && mobnum == "" && password == ""){
            this.setState({loading:false})
            Alert.alert("Attention","All Fields is required")
        }else{
            fetch('https://instabuzz.cloudexter.in/api/register',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile: mobnum,
                    pass: password
                })
            }).then((responce) => responce.json())
            .then((res) => {
                this.setState({ loading: false })
                if (res.state) {
                    Alert.alert("Status",res.msg, [
                        {
                            text: "Now Login",
                            onPress: () => this.props.navigation.navigate('login')
                        }
                    ], { cancelable: false })
                } else {
                    Alert.alert("Status",res.msg, [
                        {
                            text: 'Ok',
                            onPress: () => this.setState({
                                name: '',
                                email: '',
                                mobile: '',
                                pass: ''
                            })
                        }
                    ], { cancelable: false })
                }
            })
        }
        
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Fetching Your Data...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles.header}>
                    <Headline style={{ textAlign: 'center' }}>
                        Instabuzz
                    </Headline>
                </View>
                <Animatable.View animation="bounceIn" duration={2000} style={styles.footer}>
                    <Card style={styles.action} elevation={12}>
                        <View style={{ marginVertical: 5 }}>
                            <Title>Name</Title>
                            <TextInput
                                label="Name"
                                value={this.state.name}
                                onChangeText={(e) => this.setState({ name: e })}
                            />
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Title>Email</Title>
                            <TextInput
                                label="Email"
                                value={this.state.email}
                                onChangeText={(e) => this.setState({ email: e })}
                            />
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Title>Mobile No.</Title>
                            <TextInput
                                label="Mobile Number"
                                keyboardType="number-pad"
                                value={this.state.mobnum}
                                onChangeText={(e) => this.setState({ mobnum: e })}
                            />
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Title>Password</Title>
                            <TextInput
                                label="Password"
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(e) => this.setState({ password: e })}
                            />
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Button mode="contained"
                                color="#fc1e1e"
                                style={{
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} onPress={() => this.RegisterUser()}>
                                Register
                            </Button>
                            <Button mode="outlined"
                                color="#fc1e1e"
                                style={{
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 5
                                }} onPress={() => this.props.navigation.navigate('login')}>
                                Login
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
        height: 50,
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
    spinnerTextStyle: {
        color: 'black'
    }
});
