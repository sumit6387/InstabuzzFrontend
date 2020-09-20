import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import Drawer Screen
import Home from './Home';
import Redeem from './Redeem';
import Refferals from './Refferals';
import Store from './Store';
import Order from './TopTab/Order';
import DrawerContent from './DrawerContent';
import History from './History';
import Logout from './Logout';

const Drawer = createDrawerNavigator();

export default class Sidebar extends React.Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName="Home" 
                drawerContent={props => <DrawerContent {...this.props}/>}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Reffer" component={Refferals} />
                <Drawer.Screen name="Store" component={Store} />
                <Drawer.Screen name="Order" component={Order} />
                <Drawer.Screen name="Redeem" component={Redeem} /> 
                <Drawer.Screen name="history" component={History} /> 
                <Drawer.Screen name="logout" component={Logout} /> 
            </Drawer.Navigator>
        );
    }
}
