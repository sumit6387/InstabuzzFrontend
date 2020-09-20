import React, { Component } from 'react'
import { Text, View,StyleSheet, Alert } from 'react-native'
import { WebView } from 'react-native-webview';
import Scrheader from '../Components/Scrheader';
import { retrivedata } from '../assets/Functions';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Visitweb extends Component {

    state={
        webdata: this.props.route.params,
        timer:null,
        counter:this.props.route.params.ttime,
        loading:false,
        token:''
    }

   async componentDidMount() {
        const token = await retrivedata('token')
        this.setState({
            token
        })
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
      }

    tick =() => {
        var {counter,webdata,token} = this.state
        if (counter === 0) {
            clearInterval(this.state.timer)
            this.setState({ loading: true })
            fetch('https://instabuzz.cloudexter.in/api/coins', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coins:webdata.tot_coins,
                })
            }).then((responce) => responce.json())
                .then((data) => {
                    this.setState({ loading: false })
                    if (data) {
                        Alert.alert("Rewarded", webdata.tot_coins+" "+data.msg)
                    } else {
                        this.setState({ loading: false })
                        Alert.alert("Oops", data.msg)
                    }
                    this.props.navigation.navigate('web')
                })
        }
        else {
            this.setState({
                counter: this.state.counter - 1
            });

        }
    }
    
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        const {weblink} = this.state.webdata
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <Scrheader title="InstaBuzz"
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                    onPress={() => this.props.navigation.goBack()} />
                    <Spinner
                    visible={this.state.loading}
                    textContent={'Loading...'}
                    />
                <View style={styles.times}>
                    <Text style={{
                        textAlign:'right',
                        fontSize:20,
                        color:'#fff'
                        }}>{this.state.counter} Sec</Text>
                </View>
               <WebView source={{ uri: weblink }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    times:{
        backgroundColor:"#fff",
        height:50,
        paddingHorizontal:20,
        justifyContent:'center',
        backgroundColor:'#fc1e1e'
    }
});