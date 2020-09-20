import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Alert } from 'react-native'
import Header from '../../Components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { Card, TextInput, Button } from 'react-native-paper'
import { Picker } from '@react-native-community/picker';
import { retrivedata } from '../../assets/Functions'
import Spinner from 'react-native-loading-spinner-overlay';

export default class Store extends Component {

    state = {
        amt: null,
        transid: '',
        place: 'Paytm',
        loading:false
    }

    SendBuyCoins = async () => {
        this.setState({loading:true})
        const token = await retrivedata('token')
        const { amt, transid, place } = this.state
        const coins = Math.floor(amt * 10)
        this.setState({loading:false})
        fetch('https://instabuzz.cloudexter.in/api/buy', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transid: transid,
                coin: coins,
                price: amt,
                place: place
            })
        }).then((responce) => responce.json())
          .then((data) => {
                if(data.status) {
                    this.setState({loading:false})
                    Alert.alert("Wohoo!", data.msg, [
                        {
                            text: "Ok",
                            onPress: () => this.setState({
                                amt: '',
                                transid: '',
                            })
                        }
                    ])
                }else{
                    this.setState({loading:false})
                    Alert.alert("Sorry!", data.msg, [
                        {
                            text: "Ok",
                            onPress: () => this.setState({
                                amt: '',
                                transid: '',
                            })
                        }
                    ])
                }
            })
    }

    render() {
        const coinsis = Math.floor(this.state.amt * 10)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title="InstaBuzz"
                    onPress={() => this.props.navigation.toggleDrawer()}
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                />
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                />
                <ScrollView style={styles.qrcontainer}>
                    <Image style={{ height: 600, width: '100%', resizeMode: 'cover' }}
                        source={require('../../assets/QR/qr.jpeg')} />
                    <Card style={{ margin: 10, padding: 20 }} elevation={10}>
                        <View style={{ flexWrap: 'wrap', padding: 5 }}>
                            <Text>{coinsis} Coins</Text>
                        </View>
                        <TextInput
                            style={{ marginVertical: 5 }}
                            label="Transfer Id"
                            placeholder="Transfer Id"
                            value={this.state.transid}
                            onChangeText={text => this.setState({ transid: text })}
                        />
                        <TextInput
                            style={{ marginVertical: 5 }}
                            label="Amount"
                            placeholder="Amount You Send"
                            keyboardType="number-pad"
                            value={this.state.amt}
                            onChangeText={e => this.setState({ amt: e})}
                        />
                        <View style={{
                            borderWidth: 2,
                            borderColor: '#fc1e1e'
                        }}>
                            <Picker
                                selectedValue={this.state.place}
                                style={{
                                    height: 50,
                                    width: '100%',
                                    marginVertical: 5,
                                }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ place: itemValue })}
                            >
                                <Picker.Item label="Paytm" value="Paytm" />
                                <Picker.Item label="Google Pay" value="Gpay" />
                                <Picker.Item label="Phone Pe" value="Phonepe" />
                            </Picker>
                        </View>
                        <Button
                            color="#fc1e1e"
                            mode="contained"
                            style={{ paddingVertical: 10, marginVertical: 5 }}
                            onPress={() => this.SendBuyCoins()}>
                            Send
                        </Button>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    qrcontainer: {
        //flex: 1,
        //borderWidth: 2
    }
});