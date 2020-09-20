import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import Scrheader from '../Components/Scrheader';
import { List, Avatar, Card, Title, Button } from 'react-native-paper';
import { retrivedata,retriveObjData,StoreObj } from '../assets/Functions';
import {
    AdMobBanner,
} from 'react-native-admob'

export default class Website extends Component {

    state = {
        allweb: []
    }
    async componentDidMount() {
        const token = await retrivedata('token')
        fetch('https://instabuzz.cloudexter.in/api/web', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((responce) => responce.json())
            .then((data) => {
                this.setState({ allweb: data })
            })
    }

    VerifyAttenqr = async(idw,wad) => {
        const name = "akaka"+String(idw)
        const dateTime = await retriveObjData(name)
        var g1 = new Date();
        if(dateTime){
            if(dateTime.id == idw){
                if(g1.getDate() != dateTime.dates){
                    const sendtime = await StoreObj({ dates: g1.getDate(), id: idw }, name)
                    if (sendtime) {
                        this.props.navigation.navigate('visitweb',{
                            weblink:wad.weblink,
                            tot_coins:wad.coins,
                            ttime:wad.time
                        })
                    }
                }else{
                    Alert.alert("Please Attention","Your daily website visit is completed")
                }
            }else{
                console.log("Dta")
                const sendtime = await StoreObj({ dates: g1.getDate(), id: idw }, name)
                if (sendtime) {
                    this.props.navigation.navigate('visitweb',{
                        weblink:wad.weblink,
                        tot_coins:wad.coins,
                        ttime:wad.time
                    })
                }
            }
        }else{
            const sendtime = await StoreObj({ dates: g1.getDate(), id: idw }, name)
            if (sendtime) {
                this.props.navigation.navigate('visitweb',{
                    weblink:wad.weblink,
                    tot_coins:wad.coins,
                    ttime:wad.time
                })
            }
        }
    }

    render() {
        const { allweb } = this.state
        if (allweb.length > 0) {
           var renderWeb = allweb.map((item) => {
                return (
                    <Card
                    onPress={()=>this.VerifyAttenqr(item.id, item)}
                     key={item.id} style={{ margin: 5, }} elevation={5}>
                        <List.Item
                            title="Site Visiting"
                            description={`Visit the Website for `+item.time+` Seconds`}
                            left={() => <Avatar.Image size={50} source={require('../assets/Icons/arrow.png')} />}
                            right={() => <Title>{item.coins} Coins</Title>}
                        />
                    </Card>
                )
            })
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Scrheader title="InstaBuzz"
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                    onPress={() => this.props.navigation.goBack()} />
                <ScrollView style={{ flex: 1 }}>
                    {renderWeb}
                </ScrollView>
                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-7508562673230026/6211121376"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                />
            </SafeAreaView>
        )
    }
}

