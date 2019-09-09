import React from 'react';
import {View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


class Projets extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: "Projets",
	    drawerLabel: 'Projets',
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
				<Text> Projets </Text>
			</View>
		);
	}
}

export default Projets ;