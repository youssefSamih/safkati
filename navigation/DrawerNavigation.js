import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';


import Apropos from '../screens/Apropos';
import Confidentialite from '../screens/Confidentialite';
import Parrainage from '../screens/Parrainage';
import Tuto from '../screens/Tuto';
import Logout from '../screens/Logout';

//import Aide from '../screens/Aide';
import projectNavigation from './projectNavigation';
import espacePersoNavigation from './espacePersoNavigation';

import i18n from '../i18n/i18n';
import CustomDrawerContentComponent from './CustomDrawerContentComponent';

const WIDTH = Dimensions.get('window').width ;


const DrawerConfig = {
	 initialRouteName: 'Projets',
	 contentOptions: {
	    activeTintColor: '#AA2D5A',
	    activeBackgroundColor: '#fff',
	    labelStyle: {
	      fontSize: 15,
	      marginLeft: 0,
	    },
	 },
  contentComponent: props => CustomDrawerContentComponent(props),
  drawerWidth: WIDTH * 0.83,
  //drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
}

const DrawerNavigation = createDrawerNavigator(
{
  MonEspace:{
    screen: espacePersoNavigation,
    path: '/mon-espace',
    navigationOptions:{
      drawerLabel: i18n.t("Espace pro title"),
      drawerIcon: () => (
        <Ionicons
        name="md-contact"
        size={25}
        //onPress={this.props.navigation.openDrawer()}
        />
      ),
    },
  },
  Parrainage:{
    screen: Parrainage,
    path: '/parrainage',
  },
  Tuto:{
    screen: Tuto,
    path: '/tuto',
  },
  //Router: { screen: Router }
  Projets:{
    screen: projectNavigation,
    path: '/projets',
    navigationOptions:{
      drawerLabel: i18n.t('Projets title'),
      drawerIcon: () => (
        <Ionicons
        name="md-albums"
        size={25}
        //onPress={this.props.navigation.openDrawer()}
        />
      ),
    },
  },
  Confidentialite:{
    screen: Confidentialite,
    path: '/confidentialite',
  },
  Apropos:{
    screen: Apropos,
    path: '/apropos',
  },
  Logout:{
    screen: Logout,
    path: '/logout',
  },
}
, DrawerConfig);

export {DrawerNavigation}