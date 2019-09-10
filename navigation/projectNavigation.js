import React from 'react';
import { Image,Dimensions } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DeclareClient from '../screens/project/DeclareClient';
import ProjectList from '../screens/project/ProjectList';
import ProjectDetail from '../screens/project/ProjectDetail';

import { theme } from '../constants';
const WIDTH = Dimensions.get('window').width;

const projectNavigation = createStackNavigator(
  { 
    ProjectList,
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


export default createAppContainer(projectNavigation);




