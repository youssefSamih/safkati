import React from 'react';
import {View, Text} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

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

class Apropos extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		    title: i18n.t('About title'),
		    drawerLabel: i18n.t('About label'),
		    drawerIcon: ({ tintColor }) => (
		      <Entypo
					name="info-with-circle"
					size={23}
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
				    <Title>{i18n.t('About title')}</Title>
				  </Body>
				</Header>				
				<Content>
				 	<Enconstruction />
				</Content>
			</Container>
		);
	}
}

export default Apropos ;