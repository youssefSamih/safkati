import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import AuthLoading from '../screens/AuthLoading';

const DrawerConfig = {
	DrawerWidth: WIDTH * 0.83,
}
const WIDTH = Dimensions.get('window').width

const DrawerNavigation = createDrawerNavigator(
{
	Home:{
		screen: Welcome
	}
}
,DrawerConfig);

export default createAppContainer(DrawerNavigation);