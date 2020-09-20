import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import Header from '../../Components/Header'
import { Card, Title, Paragraph, TextInput, Button, List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {retriveObjData}from '../../assets/Functions';
import Spinner from 'react-native-loading-spinner-overlay';
import {Share} from 'react-native'

export default class Refferals extends Component {

    state = {
        refCode : '',
        ref_by : null,
        givenCode:'',
        loading:false,
        token:''
    }

   async componentDidMount(){
       
        const refferals = await retriveObjData('userdetail')
        this.setState({
            refCode:refferals.ref_code,
            ref_by:refferals.ref_by,
            token:refferals.api_token
        })        
    }

    checkRefferCode = () =>{
        this.setState({loading:true})
        const {givenCode,token} = this.state
        fetch('https://instabuzz.cloudexter.in/api/check',{
            method:'post',
            headers:{
                'Authorization':'Bearer '+token,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                Refcode:givenCode
            })
        }).then((responce)=>responce.json())
        .then((data)=>{
            if(data.status){
                this.setState({loading:false, ref_by:null})
                Alert.alert('Wohooo!', data.msg,[
                    {
                        text:'OK',
                        onPress:()=>this.setState({givenCode:''})
                    }
                ])
                
            }else{
                this.setState({loading:false})
                Alert.alert('Sorry!', data.msg,[
                    {
                        text:'OK',
                        onPress:()=>this.setState({givenCode:''})
                    }
                ])
            }
        })
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

    render() {
        const {refCode, ref_by, givenCode} = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title="InstaBuzz"
                    onPress={() => this.props.navigation.toggleDrawer()}
                    goNotiFy={() => this.props.navigation.navigate('Notify')}
                />
                <Spinner
                    visible={this.state.loading}
                    textContent={'Sending Data...'}
                />
                <Card elevation={10} style={styles.carding}>
                    <View style={styles.giftbox}>
                        <Image style={{ height: 200, width: '100%', resizeMode: 'center' }} source={require('../../assets/Icons/gift.png')} />
                        <Title style={{ textAlign: 'center' }}>Reffer You Friends and Get 50 Coins</Title>
                        <Paragraph style={{ margin: 15 }}>
                            If your friends user you Reffer code after installing the app then he will get 30 Coins
                            and when his 100 coins target is completed then you will get 50 coins.
                        </Paragraph>
                        <ScrollView style={styles.inputcode}>
                            {ref_by==null?<View style={styles.refcode}>
                                <TextInput
                                    placeholder="Enter the Reffer Code"
                                    label="Reffer Code"
                                    underlineColor="#ffe5db"
                                    style={{ width: '75%', marginRight: 5 }}
                                    value={givenCode}
                                    onChangeText={(text)=>this.setState({givenCode:text})}
                                />
                                <Button 
                                mode="contained" 
                                color="#fc1e1e" 
                                style={{ justifyContent: 'center' }} 
                                onPress={() => this.checkRefferCode()}>
                                    Submit
                                </Button>
                            </View>:<View style={styles.inputcode}>
                                <Text style={{color:'green', fontSize:20,textAlign:'center'}}>
                                    Reffer Code Used
                                </Text></View>}
                        </ScrollView>
                    </View>
                    <Title style={{textAlign:'center'}}>{refCode}</Title>
                    <Text style={{textAlign:'center'}}>Above is your refer code</Text>
                </Card>
                <Card 
                onPress={()=>this.SharetoFriends()}
                elevation={10} 
                style={{marginVertical:5}}>
                    <List.Item
                        title='Refer and Earn'
                        description="Click here and share the link with you friends and them to use you reffer code"
                        right={() => <MaterialIcons size={25} 
                        name="keyboard-arrow-right" 
                        style={{flexWrap:'wrap',alignContent:'center'}} />}
                    />
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    giftbox: {
        justifyContent: 'center'
    },
    carding: {
        height: '70%',
        marginTop: 10
    },
    inputcode: {
        margin: 10,
    },
    refcode: {
        flexDirection: 'row',
    }
});