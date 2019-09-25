import React from 'react';
import {View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
	Container, 
	Header, 
	Content, 
	Left, 
	Body, 
	Right, 
	Button,
	Icon, 
	Title,
} from 'native-base';

import i18n from '../i18n/i18n';
import Enconstruction from './EnConstuction';

class Tuto extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('How it works title'),
	    drawerLabel: i18n.t('How it works label'),
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-help-buoy"
				size={25}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });
	render(){
		return( 
			<Container>
				<Header noRight>
				  <Left>
				    <Button transparent onPress={() =>  this.props.navigation.openDrawer()}>
				      <Icon name="menu" />
				    </Button>
				  </Left>
				  <Body>
				    <Title>{i18n.t('How it works title')}</Title>
				  </Body>
				</Header>				
				<Content>
				 	<Enconstruction />
				</Content>
			</Container>
		);
	}
}

export default Tuto ;