import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Divider, Headline, Title } from 'react-native-paper'
const {height, width} = Dimensions.get('screen')
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {retriveObjData} from '../../../assets/Functions';

export default class Followers extends Component {
    state = {
        act:'Followers',
        coins:0
    }

    async componentDidMount(){
        const alludata = await retriveObjData('userdetail')
        this.setState({coins:alludata.tot_coins})
    }

    render() {
        const {coins} = this.state
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View elevation={6} style={styles.Earned}>
                    <Headline>Total Coins you have</Headline>
                    <Title>{coins} Coins</Title>
                    <Text>Your account must be public</Text>
                </View>
                <Divider />
                <View style={styles.bodyplan}>
                    <Text style={{fontSize:15, color:'grey'}}>Select our plan</Text>
                    <Divider/>
                    <TouchableOpacity 
                    onPress = {()=>this.props.navigation.navigate('sendOrder',{
                        quantity:25,
                        action:this.state.act,
                        coins:100
                    })} 
                    style={styles.cardplan}>
                        <AntDesign name="user" size={30}/>
                        <Text style={{fontSize:20}}>25-100</Text>
                        <Title>100 Coins</Title>
                        <MaterialIcons name="keyboard-arrow-right" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress = {()=>this.props.navigation.navigate('sendOrder',{
                        quantity:100,
                        action:this.state.act,
                        coins:400
                    })}
                    style={styles.cardplan}>
                        <AntDesign name="user" size={30}/>
                        <Text style={{fontSize:20}}>100-150</Text>
                        <Title>400 Coins</Title>
                        <MaterialIcons name="keyboard-arrow-right" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress = {()=>this.props.navigation.navigate('sendOrder',{
                        quantity:200,
                        action:this.state.act,
                        coins:800
                    })}
                    style={styles.cardplan}>
                        <AntDesign name="user" size={30}/>
                        <Text style={{fontSize:20}}>200-1000</Text>
                        <Title>800 Coins</Title>
                        <MaterialIcons name="keyboard-arrow-right" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress = {()=>this.props.navigation.navigate('sendOrder',{
                        quantity:600,
                        action:this.state.act,
                        coins:1800
                    })}
                    style={styles.cardplan}>
                        <AntDesign name="user" size={30}/>
                        <Text style={{fontSize:20}}>600-2000</Text>
                        <Title>1800 Coins</Title>
                        <MaterialIcons name="keyboard-arrow-right" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress = {()=>this.props.navigation.navigate('sendOrder',{
                        quantity:1000,
                        action:this.state.act,
                        coins:3400
                    })}
                    style={styles.cardplan}>
                        <AntDesign name="user" size={30}/>
                        <Text style={{fontSize:20}}>1000-2500</Text>
                        <Title>3400 Coins</Title>
                        <MaterialIcons name="keyboard-arrow-right" size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Earned:{
        height:height-6.5*100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffe5db'
    },
    bodyplan:{
        flex:1,
        marginTop:5,
        paddingHorizontal:10
    },
    cardplan:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        padding:5,
        marginVertical:5,
        elevation:5,
        backgroundColor:'#ffe5db',
        paddingVertical:10
    }
});