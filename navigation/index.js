import React from 'react';
import { Dimensions } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {DrawerNavigation} from './DrawerNavigation';

import SelectLang from '../screens/SelectLang';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import AuthLoading from '../screens/AuthLoading';


import { theme } from '../constants';
const WIDTH = Dimensions.get('window').width;


const AuthStack = createStackNavigator(
  { 
    SelectLang,
    Login,
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
}
);


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




