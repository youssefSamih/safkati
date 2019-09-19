import React from 'react';
import { Dimensions } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MonEspace from '../screens/MonEspace';
import ClientDeclaredMenu from '../screens/espace-perso/ClientDeclaredMenu';
import ClientsDeclare from '../screens/espace-perso/ClientsDeclare';
import MesCommissions from '../screens/espace-perso/MesCommissions';
import MesParrinage from '../screens/espace-perso/MesParrinage';
import MesMessageries from '../screens/espace-perso/MesMessageries';
import Client from '../screens/espace-perso/Client';

import { theme } from '../constants';
const WIDTH = Dimensions.get('window').width;

const espacePersoNavigation = createStackNavigator(
  { 
    MonEspace,
    MesCommissions,
    MesParrinage,
    MesMessageries,
    ClientsDeclare,
    ClientDeclaredMenu,
    Client
  }, {
  defaultNavigationOptions: {
    header:null,
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
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


export default createAppContainer(espacePersoNavigation);




