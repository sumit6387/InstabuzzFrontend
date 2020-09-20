import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, Alert,Linking } from 'react-native'
import Header from '../../Components/Header'
import { Card, Title, Paragraph, TextInput, Button, List, Avatar } from 'react-native-paper';
import { retrivedata } from '../../assets/Functions';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Redeem extends Component {

    state = {
        redeemCode: '',
        loading: false
    }

    RedeemCoins = async () => {
        this.setState({loading:true})
        const { redeemCode } = this.state
        const token = await retrivedata('token')
        fetch('https://instabuzz.cloudexter.in/api/applycode', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: redeemCode
            })
        }).then((responce) => responce.json())
            .then((data) => {
                this.setState({loading:false})
                if(data.status){
                    Alert.alert('Congrtulation',data.msg,[
                        {
                            text:"Ok",
                            onPress:()=>this.setState({redeemCode:''})
                        }
                    ])
                }else{
                    Alert.alert('Sorry', data.msg,[
                        {
                            text:"Ok",
                            onPress:()=>this.setState({redeemCode:''})
                        }
                    ])
                }
            })
    }

    SubscribeNow = () =>{
        Linking.openURL('https://www.youtube.com/channel/UC-BXW7C3NzEcIUAl2BW8zgQ');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title="InstaBuzz"
                    onPress={() => this.props.navigation.toggleDrawer()}
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                />
                <Spinner
                    visible={this.state.loading}
                    textContent={'Sending Data...'}
                />
                <Card elevation={10} style={styles.carding}>
                    <Title>Enter the Redeem Code</Title>
                    <View style={styles.refcode}>
                        <TextInput
                            selectionColor="#ffe5db"
                            placeholder="Enter the Redeem Code"
                            label="Redeem Code"
                            underlineColor="#ffe5db"
                            style={{ marginRight: 5, width: '80%' }}
                            value={this.state.redeemCode}
                            onChangeText={(text) => this.setState({ redeemCode: text })}
                        />
                        <Button
                            mode="contained"
                            color="#fc1e1e"
                            style={{ justifyContent: 'center' }}
                            onPress={() => this.RedeemCoins()}
                        >
                            Submit
                        </Button>
                    </View>
                    <View style={styles.giftbox}>
                        <Title style={{ textAlign: 'center' }}>Redeem Code and Get Bonus Coins</Title>
                        <Paragraph style={{ margin: 15 }}>
                            Follow Us on Our Social handles and there we post with the redeem code,
                            If you are first to get redeem code then you can win bonus coins from 100 to 1000 Coins.
                            You Will get redeem code daily.
                        </Paragraph>
                    </View>
                    <View style={styles.Social}>
                        <Title>Subscribe our Social handles</Title>
                        <View style={styles.channel}>
                            <Avatar.Image source={require('../../assets/img/aditya.jpeg')} />
                            <Title>Aditya's Cabin</Title>
                            <Button 
                            onPress={()=>this.SubscribeNow()}
                            mode="contained" color="#fc1e1e" style={{ justifyContent: 'center' }} 
                            >
                                Subcribe
                            </Button>
                        </View>
                    </View>
                </Card>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    giftbox: {
        justifyContent: 'center'
    },
    carding: {
        marginTop: 10
    },
    inputcode: {
        margin: 10,
    },
    refcode: {
        //flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 5
    },
    Social: {
        margin: 10,
        padding: 5
    },
    channel: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});