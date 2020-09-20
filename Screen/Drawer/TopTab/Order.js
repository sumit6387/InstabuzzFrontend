import React, { Component } from 'react'
import Header from '../../../Components/Header'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Followers from '../TopTab/Followers'
import Likes from '../TopTab/Likes'

const Tab = createMaterialTopTabNavigator();
export default class Order extends Component {
    render() {
        return (
            <>
            <Header title="InstaBuzz"
                onPress={() => this.props.navigation.toggleDrawer()}
                goNotiFy={() => this.props.navigation.navigate('Notify')}
            />
            <Tab.Navigator tabBarOptions=
            {{style: { backgroundColor: '#fc1e1e',},
                labelStyle:{color:'#fff'},
                indicatorStyle :{backgroundColor:'#ffe5db'}
            }}>
                <Tab.Screen options={{title:'Buy Followers'}} name="followers" component={Followers} />
                <Tab.Screen options={{title:'Buy Likes'}} name="likes" component={Likes} />
            </Tab.Navigator>
            </>
        )
    }
}
