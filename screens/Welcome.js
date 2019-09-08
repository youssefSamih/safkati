import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


class Welcome extends React.Component {
	   static navigationOptions = ({ navigation }) => ({
		    title: "Home",
		    drawerLabel: 'Notification',
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
			<Container style={{backgroundColor: "#87cefa"}}>
		        <Header transparent>
		          <Left />
		          <Body>
		            <Title>Header</Title>
		          </Body>
		          <Right>
		            <Button onPress={() => this.props.navigation.openDrawer()} transparent>
		              <Icon name='menu' />
		            </Button>
		          </Right>
		        </Header>
		      </Container>
		);
	}
}

export default Welcome ;