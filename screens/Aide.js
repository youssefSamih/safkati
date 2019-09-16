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

import Enconstruction from './EnConstuction';
import i18n from '../i18n/i18n';

class Aide extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		    title: i18n.t('Aide title'),
		    drawerLabel: i18n.t('Aide label'),
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
			<Container>
				<Header noRight>
				  <Left>
				    <Button transparent onPress={() =>  this.props.navigation.openDrawer()}>
				      <Icon name="menu" />
				    </Button>
				  </Left>
				  <Body>
				    <Title>{i18n.t('Aide title')}</Title>
				  </Body>
				</Header>				
				<Content>
				 	<Enconstruction />
				</Content>
			</Container>
		);
	}
}

export default Aide ;