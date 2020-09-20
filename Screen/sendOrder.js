import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { Divider, Headline, TextInput, Title, Button } from 'react-native-paper';
import Scrheader from '../Components/Scrheader';
import { retrivedata } from '../assets/Functions';
import Spinner from 'react-native-loading-spinner-overlay';

export default class sendOrder extends Component {
    state = {
        data: this.props.route.params,
        link: '',
        loading: false
    }

    SendOrder = async () => {
        this.setState({loading:true})
        const { link, data } = this.state
        const gettoken = await retrivedata('token')
        const setall = 'Bearer ' + gettoken
        console.log(setall)
        fetch('https://instabuzz.cloudexter.in/api/order', {
            method: 'post',
            headers: {
                'Authorization': setall,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: link,
                orcoins: data.coins,
                act: data.action,
                quantity: data.quantity
            })
        }).then(response => response.json())
            .then((data) => {
                if (data.status) {
                    this.setState({loading:false})
                    Alert.alert("Status", data.msg, [
                        {
                            text: "Ok",
                            onPress: () => this.props.navigation.goBack()
                        }
                    ])
                } else {
                    this.setState({loading:false})
                    Alert.alert("Something Went Wrong", data.msg, [
                        {
                            text: "Ok",
                            onPress: () => this.props.navigation.goBack()
                        }
                    ])
                }
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Sending Order...'}
                />
                <Scrheader
                    title="InstaBuzz" 
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                    onPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.planview}>
                    <View style={styles.topView}>
                        <Title>Quanity</Title>
                        <Text style={styles.datasty}>{this.state.data.quantity}</Text>
                    </View>
                    <View style={styles.topView}>
                        <Title>Coins</Title>
                        <Text style={styles.datasty}>{this.state.data.coins}</Text>
                    </View>
                    <View style={styles.topView}>
                        <Title>Action</Title>
                        <Text style={styles.datasty}>{this.state.data.action}</Text>
                    </View>
                </View>
                <Divider style={{ borderWidth: 1, marginHorizontal: 20, borderColor: 'grey' }} />
                <View style={styles.bottom}>
                    <Headline>
                        Please enter the URL
                    </Headline>
                    <TextInput
                        label="Your Url"
                        mode="outlined"
                        value={this.state.link}
                        onChangeText={(text) => this.setState({ link: text })}
                    />
                    <Button
                        color="#fc1e1e"
                        style={{
                            height: 50,
                            paddingVertical: 5,
                            marginVertical: 5
                        }} icon="link"
                        mode="contained"
                        onPress={() => this.SendOrder()}>
                        Send Order
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    planview: {
        height: 100,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    topView: {
        flex: 1,
        alignItems: 'center',
    },
    datasty: {
        fontSize: 20,
        fontFamily: 'Arial'
    },
    bottom: {
        margin: 5,
        padding: 10
    }
});
