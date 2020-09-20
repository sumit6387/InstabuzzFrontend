import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-paper';
import {retrivedata,} from '../assets/Functions'

export default class Header extends Component {

    state = {
        total:0
    }

   async componentDidMount(){
        const token = await retrivedata('token')
        fetch('https://instabuzz.cloudexter.in/api/numnoti',{
            method:'get',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-Type': 'application/json'
            }
        }).then(responce=>responce.json())
        .then((data)=>{
            this.setState({total:data.Num})
        })
    }

    render() {
        const {total} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.child}>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <MaterialIcons name="menu" size={35} color="#fff"/>
                    </TouchableOpacity>
                    <View style={styles.logo}>
                        <Text style={{fontFamily:'Pacifico', color:'#fff', alignItems:'center', fontSize:25}}>{` `}{this.props.title}</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={this.props.goNotiFy}
                    style={{ paddingHorizontal:10}}>
                        {total==0?<Badge style={{backgroundColor:'#fc1e1e'}}></Badge>:<Badge style={{zIndex:1, backgroundColor:'#ffe5db'}}>{total}</Badge>}
                        <MaterialIcons name="notifications"
                        style={{top:-13, position:'relative'}}
                         size={35} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fc1e1e',
        height:70,
        elevation:5
    },
    child:{
        flex:1,  
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:10
    },
    logo:{
        flexDirection:'row',
        //justifyContent:'space-evenly'
        margin:5
    }
});