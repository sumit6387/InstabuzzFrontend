import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlightBase } from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {retriveObjData} from '../../assets/Functions'
const colors = "#fc1e1e";
export default class DrawerContent extends Component {

    state = {
        name:'',
        email:'',
        Coins:0
    }

    async componentDidMount(){
        const data = await retriveObjData('userdetail')
        this.setState({
            name:data.name,
            email:data.email,
            Coins:data.tot_coins
        })
    }

    render() {
        const {name, email, Coins} = this.state
        return (
            <View style={{ flex: 1, borderWidth: 2, borderColor: '#ffe5db' }}>
                <DrawerContentScrollView {...this.props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={require('../../assets/img/logoz.png')}
                                    size={50}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{name==''?'':name}</Title>
                                    <Caption style={styles.caption}>{email==''?'':email}</Caption>
                                </View>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{Coins==''?'':Coins}</Paragraph>
                                <Caption style={styles.caption}>Coins</Caption>
                            </View>

                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="home-outline"
                                    color={colors}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { this.props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="share-outline"
                                    color={colors}
                                    size={size}
                                />
                            )}
                            label="Refferal"
                            onPress={() => { this.props.navigation.navigate('Reffer') }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="store-outline"
                                    color={colors}
                                    size={size}
                                />
                            )}
                            label="Buy Coins"
                            onPress={() => { this.props.navigation.navigate('Store') }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="cart-outline"
                                    color={colors}
                                    size={size}
                                />
                            )}
                            label="Order"
                            onPress={() => { this.props.navigation.navigate('Order') }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <MaterialIcons
                                    name="redeem"
                                    color={colors}
                                    size={size}
                                />
                            )}
                            label="Redeem"
                            onPress={() => { this.props.navigation.navigate('Redeem') }}
                        />
                        <DrawerItem
                            icon={({ size }) => (
                                <Icon
                                    name="history"
                                    color={colors}
                                    size={size}
                                />
                            )}
                            label="History"
                            onPress={() => { this.props.navigation.navigate('history') }}
                        />
                    </Drawer.Section>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ size }) => (
                            <Icon
                                name="exit-to-app"
                                color={colors}
                                size={size}
                            />
                        )}
                        label="Logout"
                        onPress={() => this.props.navigation.navigate('logout')}
                    />
                </Drawer.Section>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});