import React from 'react';
import { Dimensions } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Projets from '../screens/Projets';
import DeclareClient from '../screens/project/DeclareClient';
import ProjectDetail from '../screens/project/ProjectDetail';

import { theme } from '../constants';
const WIDTH = Dimensions.get('window').width;

const projectNavigation = createStackNavigator(
  { 
    Projets,
    DeclareClient,
    ProjectDetail
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


export default createAppContainer(projectNavigation);




