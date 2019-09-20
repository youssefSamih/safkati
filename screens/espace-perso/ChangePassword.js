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
	Label,
	Input,
	CheckBox,
	Item,
	Form,
} from 'native-base';

import i18n from '../../i18n/i18n';
import Enconstruction from '../EnConstuction';

class ChangePassword extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		    title: i18n.t('Change password title'),
		    drawerLabel: i18n.t('Change password label'),
		    drawerIcon: ({ tintColor }) => (
		      <Ionicons
					name="md-menu"
					size={32}
					//onPress={this.props.navigation.openDrawer()}
					/>
		    ),
		  });

	/*constructor(){
		this.state = {
			actual_password,
			password,
			comfirmPassword,
			isPasswordValid,
			isComfirmValidValid,
		}
	}*/

	render(){
		return( 
			<Container>
				<Header noRight>
				  <Left>
			          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
			            <Icon name="arrow-back" />
			          </Button>
			      </Left>
				  <Body>
				    <Title>{i18n.t('Change password title')}</Title>
				  </Body>
				</Header>				
				<Content>
				 	<Enconstruction />
				</Content>
			</Container>
		);
	}
}

export default ChangePassword ;