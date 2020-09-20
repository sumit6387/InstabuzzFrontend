import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import Header from '../../Components/Header'
import { Title } from 'react-native-paper';
import {
    AdMobBanner,
    AdMobRewarded,
} from 'react-native-admob'
import Spinner from 'react-native-loading-spinner-overlay';
import {
    StoreObj,
    retriveObjData,
    retrivedata,
    Storeindevice
} from '../../assets/Functions';
import {Share} from 'react-native'
const saw = require('../../assets/img/saw.png');
export default class Home extends Component {

    state = {
        loading: false
    }

    componentDidMount() {
        AdMobRewarded.setAdUnitID('ca-app-pub-7508562673230026/1417071643');
        AdMobRewarded.requestAd().catch((err) => console.log(err));
        AdMobRewarded.addEventListener('adClosed', () => {
            console.log('AdMobRewarded => adClosed');
            AdMobRewarded.requestAd().catch(error => console.warn(error));
        });
        AdMobRewarded.addEventListener('rewarded', reward => {
            this.setState({ loading: true })
            this.sendCoins(reward.amount)
        });
    }

    ShowVideoAds = async () => {
        this.setState({ loading: true })
        const adstime = await retriveObjData('timeads')
        console.log(adstime)
        var g1 = new Date();
        if (adstime != null) {
            if (g1.getDate() == adstime.date) {
                if (adstime.time < 10) {
                    this.ShowRAds()
                } else {
                    this.setState({ loading: false })
                    Alert.alert("No More Ads", "Your today's limit is over")
                }
            } else {
                this.ShowRAds()
            }
        } else {
            const sendtime = await StoreObj({ date: g1.getDate(), time: 1 }, 'timeads')
            this.ShowRAds()
        }
    }

    ShowRAds = () => {
        AdMobRewarded.showAd()
            .then(async() => {
                const adstime = await retriveObjData('timeads')
                var g1 = new Date();
                const sendtime = await StoreObj({ date: g1.getDate(), time: adstime.time + 1 }, 'timeads')
                this.setState({ loading: false })
            })
            .catch(error => {
                    Alert.alert("Oop's", "Unable To Load ads"),
                    this.setState({ loading: false })
            });
    }

    sendCoins = async (coins) => {
        const token = await retrivedata('token')
        fetch('https://instabuzz.cloudexter.in/api/coins', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coins,
            })
        }).then((responce) => responce.json())
            .then((data) => {
                this.setState({ loading: false })
                if (data) {
                    setTimeout(() => {
                        Alert.alert("Rewarded", data.msg)
                    }, 2000)
                } else {
                    this.setState({ loading: false })
                    Alert.alert("Oops", data.msg)
                }
            })
    }

    CheckScatch = async () => {
        const time = new Date()
        const dt1 = time.getHours()
        const dta = await retrivedata('scratchintime')
        if (dta) {
            if (dt1 != dta) {
                var ch2r = await Storeindevice(dt1.toString(), 'scratchintime')
                if (ch2r) {
                    this.props.navigation.navigate('spin')
                }
            } else {
                Alert.alert("Attention", "Please come after 1 hrs.")
            }
        } else {
         var ch2r = await Storeindevice(dt1.toString(), 'scratchintime')
         if (ch2r) {
                this.props.navigation.navigate('spin')
            } 
         }
    }

    SharetoFriends = async() =>{
        const alluData = await retriveObjData('userdetail')
        const link = "https://instabuzz24.blogspot.com/?m=0"
        const userRfcode = alluData.ref_code
        const msg = `Hey my best friend, I get lots of followers and like on my instagram account without any follow4follow and Yes, you can also get these by just downloading this app `+link+` and user my reffer code `+userRfcode+` and you will get 30 Coins reffer bonus.\n *Donwload Now*`
        Share.share({
            message: msg,
          })
          //If any thing goes wrong it comes here
          .catch(errorMsg => console.log(errorMsg));
    }

    componentWillUnmount() {
        AdMobRewarded.removeAllListeners();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="InstaBuzz"
                    onPress={() => this.props.navigation.toggleDrawer()}
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                />
                <View style={styles.taskcontainer}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Getting Ads...'}
                    />
                    <TouchableOpacity
                        onPress={() => this.ShowVideoAds()}
                        style={styles.TaskCard}>
                        <Image style={{ height: 110, width: '100%', resizeMode: 'center', marginTop: 5 }}
                            source={{ uri: "https://www.pinclipart.com/picdir/big/495-4950397_video-play-icon-png-euclidean-vector-clipart.png" }} />
                        <Title style={{ textAlign: 'center' }}>Watch Video</Title>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('web')}
                        style={styles.TaskCard}>
                        <Image style={{ height: 110, width: '100%', resizeMode: 'center', marginTop: 5 }}
                            source={{ uri: "https://static.thenounproject.com/png/565398-200.png" }} />
                        <Title style={{ textAlign: 'center' }}>Visit Website</Title>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.CheckScatch()}
                        style={styles.TaskCard}>
                        <Image style={{ height: 110, width: '100%', resizeMode: 'center', marginTop: 5 }}
                            source={saw} />
                        <Title style={{ textAlign: 'center' }}>Scratch{` & `}Win</Title>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TaskCard}
                        onPress={() => this.SharetoFriends()}
                    >
                        <Image style={{ height: 110, width: '100%', resizeMode: 'center', marginTop: 5 }}
                            source={require('../../assets/Icons/ref.png')} />
                        <Title style={{ textAlign: 'center' }}>Refer{` & `}Earn</Title>
                    </TouchableOpacity>
                </View>
                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-7508562673230026/6211121376"
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    taskcontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    TaskCard: {
        height: 150,
        width: '37%',
        borderWidth: 2,
        marginTop: 15,
        borderRadius: 20,
        marginLeft: 40,
    }
});