import React from 'react';
import {View, Text, WebView, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
const { width, height } = Dimensions.get('window');

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
	constructor(props){
		super(props);
		state = {
	      isReady: false,
	      status: null,
	      quality: null,
	      error: null,
	      isPlaying: true
	    }

	}
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
				 <WebView
			        style={{ width, height: 300 }}
			        javaScriptEnabled={true}
			        source={{uri: 'https://www.youtube.com/embed/mSwtx7wFDPY?rel=0&autoplay=0&showinfo=0&controls=0'}}
				/>
				<Text style={{padding:10}}>
				Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
				</Text>
				</Content>
			</Container>
		);
	}
}

export default Tuto ;