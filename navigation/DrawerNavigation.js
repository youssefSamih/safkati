import React from 'react';
import { Dimensions, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';

import Welcome from '../screens/Welcome';
import Projets from '../screens/Projets';
import MonEspace from '../screens/MonEspace';
import Aide from '../screens/Aide';
import Apropos from '../screens/Apropos';
import Confidentialite from '../screens/Confidentialite';
import Parrainage from '../screens/Parrainage';
import Tuto from '../screens/Tuto';
import Logout from '../screens/Logout';

//import Aide from '../screens/Aide';

import DeclareClient from '../screens/project/DeclareClient';
import ProjectDetail from '../screens/project/ProjectDetail';

import i18n from '../i18n/i18n';
import { theme } from '../constants';
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
  //drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
}

const projectNavigation = createStackNavigator(
  { 
    Projets,
    DeclareClient,
    ProjectDetail
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


const DrawerNavigation = createDrawerNavigator(
{
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
  //Router: { screen: Router }
  Projets:{
    screen: projectNavigation,
    path: '/projets',
    navigationOptions:{
      drawerLabel: i18n.t('Projets title'),
      drawerIcon: ({ tintColor }) => (
        <Ionicons
        name="md-menu"
        size={32}
        //onPress={this.props.navigation.openDrawer()}
        />
      ),
    },
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
  },
  Logout:{
    screen: Logout,
    path: '/logout',
  },
}
, DrawerConfig);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

export {DrawerNavigation}