import React from 'react';
import { Image,Dimensions } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import AuthLoading from '../screens/AuthLoading';
/*import Explore from '../screens/Explore';
import Browse from '../screens/Browse';
import Product from '../screens/Product';
import Settings from '../screens/Settings';*/

import { theme } from '../constants';

const AppStack = createStackNavigator(
  { 
   Welcome,
  }
);

const AuthStack = createStackNavigator(
  { 
    Login,
    SignUp,
    Forgot
  }
);
const DrawerConfig = {
  DrawerWidth: WIDTH * 0.83,
}
const WIDTH = Dimensions.get('window').width

const DrawerNavigation = createDrawerNavigator(
{
  Home:{
    screen: Welcome
  },
  Login:{
    screen: Login
  },
  SignUp:{
    screen: SignUp
  }
}
,DrawerConfig);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: DrawerNavigation,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

/*const screens = createStackNavigator({
  Login,
  Welcome,
  SignUp,
  Forgot
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    //headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  }
});*/



