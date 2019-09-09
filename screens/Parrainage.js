import React from 'react';
import {View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Enconstruction from './EnConstuction';

class Parrainage extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: "Parrainage",
	    drawerLabel: 'Parrainage',
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
			<View>
				<Enconstruction />
			</View>
		);
	}
}

export default Parrainage ;