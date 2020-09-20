import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, Dimensions } from 'react-native'
import Scrheader from '../Components/Scrheader'
import ScratchCard from "react-native-scratch-card";
import { Card, Headline } from 'react-native-paper';
import { retrivedata } from '../assets/Functions';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    AdMobInterstitial,
} from 'react-native-admob'
const windowHeight = Dimensions.get('screen').height;
export default class Spin extends Component {
    state = { color: "red", num: 0, status: 0, loading: true };

    componentDidMount() {
        var arr = [1, 2, 3, 4, 5, 6, 7, 10, "Better Luck Next Time"];
        var num = this.random(1, 10)
        this.setState({ num: arr[Math.floor(num) - 1] })
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.setAdUnitID('ca-app-pub-7508562673230026/4776704486');
        AdMobInterstitial.requestAd().catch(error => console.warn(error));
        AdMobInterstitial.addEventListener('adLoaded', () =>
            AdMobInterstitial.showAd().catch(error => console.warn(error))
        );
    }
    componentWillUnmount() {
        AdMobInterstitial.removeAllListeners();
    }

    random = (mn, mx) => {
        this.setState({ loading: false })
        return Math.random() * (mx - mn) + mn;
    }

    addCoinToUser = async () => {
        this.setState({ loading: true })
        const { num } = this.state
        const token = await retrivedata('token')
        if (num != "Better Luck Next Time") {
            fetch('https://instabuzz.cloudexter.in/api/coins', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coins: num,
                })
            }).then((responce) => responce.json())
                .then((data) => {
                    this.setState({ loading: false })
                    if (data) {
                        Alert.alert("Rewarded", num + " " + data.msg)
                    } else {
                        this.setState({ loading: false })
                        Alert.alert("Oops", data.msg)
                    }
                })
        } else {
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Scrheader title="InstaBuzz"
                    onPress={() => this.props.navigation.goBack()}
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                />
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                />
                <Headline style={{ textAlign: 'center' }}>Scratch{` & `}Win</Headline>
                <Card elevation={10} style={styles.container}>
                    <ScratchCard
                        brushSize={125}
                        getPercent={percent => {
                            this.setState({ status: percent });
                        }}
                        onEnd={() => {
                            this.addCoinToUser()
                        }}
                        maxPercent={20}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: '100%',
                            height: windowHeight - 400,
                        }}
                        color={"#fc1e1e"}
                    >
                        <Text
                            style={{
                                fontSize: 80,
                                borderWidth: 2,
                                textAlign: 'center',
                                justifyContent: "center",
                                alignItems: "center",
                            }}>{this.state.num}</Text>
                    </ScratchCard>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: windowHeight - 400,
        margin: 20,
    },
    rewardnum: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 20,
    }
});