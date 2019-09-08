import React from 'react';
import { Dimensions, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

import CustomDrawerContentComponent from './CustomDrawerContentComponent';

const WIDTH = Dimensions.get('window').width ;


const DrawerConfig = {
	 initialRouteName: 'Home',
	 contentOptions: {
	    activeTintColor: '#548ff7',
	    activeBackgroundColor: 'transparent',
	    labelStyle: {
	      fontSize: 15,
	      marginLeft: 0,
	    },
	 },
  contentComponent: props => CustomDrawerContentComponent(props),
  drawerWidth: WIDTH * 0.83,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
}

const DrawerNavigation = createDrawerNavigator(
{
  Home:{
    screen: Welcome,
    path: '/welcome',
  },
  Login:{
    screen: Login,
    path: '/login',
  }/*,
  SignUp:{
    screen: SignUp
  }*/
}
, DrawerConfig);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

export {DrawerNavigation}