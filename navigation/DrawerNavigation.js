import React from 'react';
import { Dimensions, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Welcome from '../screens/Welcome';
import Projets from '../screens/Projets';
import MonEspace from '../screens/MonEspace';
import Aide from '../screens/Aide';
import Apropos from '../screens/Apropos';
import Confidentialite from '../screens/Confidentialite';
import Parrainage from '../screens/Parrainage';
import Tuto from '../screens/Tuto';
//import Aide from '../screens/Aide';

import CustomDrawerContentComponent from './CustomDrawerContentComponent';

const WIDTH = Dimensions.get('window').width ;


const DrawerConfig = {
	 initialRouteName: 'Projets',
	 contentOptions: {
	    activeTintColor: '#fff',
	    activeBackgroundColor: '#AA2D5A',
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
  MonEspace:{
    screen: MonEspace,
    path: '/mon-espace',
  },
  Parrainage:{
    screen: Parrainage,
    path: '/mon-espace',
  },
  Tuto:{
    screen: Tuto,
    path: '/mon-espace',
  },
  Projets:{
    screen: Projets,
    path: '/projets',
  },
  Confidentialite:{
    screen: Confidentialite,
    path: '/projets',
  },
  Aide:{
    screen: Aide,
    path: '/projets',
  },
  Apropos:{
    screen: Apropos,
    path: '/projets',
  }
}
, DrawerConfig);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

export {DrawerNavigation}