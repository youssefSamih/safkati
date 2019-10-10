import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
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

class Confidentialite extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('Confidentiality title'),
	    drawerLabel: i18n.t('Confidentiality title'),
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-help-circle"
				size={25}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });
	
	render(){
		return( 
			<Container>
				<LinearGradient
					colors={["#f6c552", "#ee813c", "#bf245a"]}
					start={[1.5, 0.6]}
					style={styles.paddHeader}
				>
					<Header transparent noRight>
						<Left>
							<Button transparent onPress={() =>  this.props.navigation.openDrawer()}>
								<Icon name="menu" />
							</Button>
						</Left>
						<Body>
							<Title>{i18n.t('Confidentiality title')}</Title>
						</Body>
					</Header>				
				</LinearGradient>
				<Content>
				 	<Enconstruction />
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	paddHeader: {
		marginTop: Platform.OS === "android" ? -25 : -5, 
		paddingBottom: Platform.OS === "android" ? 0 : 10 
	}
})

export default Confidentialite ;