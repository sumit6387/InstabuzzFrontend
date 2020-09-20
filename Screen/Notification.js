import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { Divider, List, Title } from 'react-native-paper';
import Scrheader from '../Components/Scrheader';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { retriveObjData } from '../assets/Functions';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Notification extends Component {

    state = {
        username: '',
        initialData: [],
        page: 1,
        token: '',
        loading:false
    }

    async componentDidMount() {
        this.setState({loading:true})
        const userdata = await retriveObjData('userdetail')
        this.setState({ username: userdata.name, token: userdata.api_token })
        this.LoadData()
        this.markSeen()
        //this.setState({loading:false})
    }

    markSeen = ()=>{
        const { token } = this.state
        fetch('https://instabuzz.cloudexter.in/api/seen', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((datac) => {
                if(datac){
                    console.log("Done")
                }
            })
    }

    LoadData = () => {
        const { token } = this.state
        if (token != '') {
            fetch('https://instabuzz.cloudexter.in/api/notification?page=' + this.state.page, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((datac) => {
                    if(datac){
                        this.setState({loading:false})
                        this.setState({ initialData: this.state.initialData.concat(datac.data)})
                    } 
                })
        }
    }

    handleLoadMore = () =>{
        this.setState({page:this.state.page+1},this.LoadData())
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ paddingVertical: 10 }}>
                <List.Item
                    title={this.state.username}
                    description={item.msg}
                    left={() => <FontAwesome name="user-o" size={40}
                    style={{margin: 5, alignItems: 'center' }} />}
                />
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <Divider style={{ borderWidth: 1, borderColor: 'grey', marginHorizontal: 20 }} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Scrheader
                    title="InstaBuzz"
                    onPress={() => this.props.navigation.goBack()} />
                <View style={styles.NotifyContainer}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Latest News...'}
                    />

                    <FlatList
                        data={this.state.initialData}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        onEndReached={this.handleLoadMore}
                        keyExtractor={(item,index)=>index.toString()} 
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    NotifyContainer: {
        flex: 1,
    },
    MsgContainer: {
        borderWidth: 2,
        paddingHorizontal: 20
    }
});
