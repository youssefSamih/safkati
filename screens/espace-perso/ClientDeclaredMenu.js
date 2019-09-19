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
	ListItem,
} from 'native-base';

import i18n from '../../i18n/i18n';
import Enconstruction from '../EnConstuction';

class ClientDeclaredMenu extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('My clients declared'),
	    drawerLabel: i18n.t('My clients declared'),
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
			          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
			            <Icon name="arrow-back" />
			          </Button>
			      </Left>
				  <Body>
				    <Title>{i18n.t('My clients declared')}</Title>
				  </Body>
				</Header>				
				<Content>
				 	<ListItem onPress={() =>  this.props.navigation.navigate('ClientsDeclare')}>
		                <Left>
		                  <Text>
		                    {i18n.t('Declared customers')}
		                  </Text>
		                </Left>
		                <Right>
		                  <Icon name="arrow-forward" />
		                </Right>
		            </ListItem>
		            <ListItem onPress={() =>  this.props.navigation.navigate('ClientsDeclare',{status_client: 0})}>
		                <Left>
		                  <Text>
		                    {i18n.t('Customers to be confirmed')}
		                  </Text>
		                </Left>
		                <Right>
		                  <Icon name="arrow-forward" />
		                </Right>
		            </ListItem>
		            <ListItem  onPress={() =>  this.props.navigation.navigate('ClientsDeclare',{status_client: 1})}>
		                <Left>
		                  <Text>
		                    {i18n.t('Verified customers')}
		                  </Text>
		                </Left>
		                <Right>
		                  <Icon name="arrow-forward" />
		                </Right>
		            </ListItem>
		            <ListItem  onPress={() =>  this.props.navigation.navigate('ClientsDeclare',{status_client: 9})}>
		                <Left>
		                  <Text>
		                    {i18n.t('Canceled customers')}
		                  </Text>
		                </Left>
		                <Right>
		                  <Icon name="arrow-forward" />
		                </Right>
		            </ListItem>
				</Content>
			</Container>
		);
	}
}

export default ClientDeclaredMenu ;