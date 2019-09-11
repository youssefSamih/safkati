import React from 'react';
import {View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProjectList from './project/ProjectList';
import ProjectNavigation from "../navigation/projectNavigation";

class Projets extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: "Projets",
	    drawerLabel: 'Projets',
	    header: null
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-menu"
				size={32}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });
	render(){
		return( 
			 <ProjectNavigation />
		);
	}
}

export default Projets ;
