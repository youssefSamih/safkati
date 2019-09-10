import React from 'react';
import {View, AsyncStorage, I18nManager} from 'react-native';
import i18n from '../i18n/i18n';

import {Block} from '../components';
import { theme } from '../constants';
import { 
	Container, 
	Content, 
	Left, 
	Body, 
	Right, 
	Button, 
	Text
} from 'native-base';
	

class SelectLang extends React.Component {
	//this fuction select the language you want to use for the application
	constructor(props){
		super(props);
		// this.selectLangue = this.selectLangue.bind(this);

	} 

	selectLangue = async (lang) => {
		console.log(lang);
		await AsyncStorage.setItem('selectedLang', lang);
		i18n.locale = lang ;
		if(lang == 'ar'){
			I18nManager.forceRTL(true);
		}else{
			I18nManager.forceRTL(false);
		}
		console.log('fin');
		this.props.navigation.navigate('Login');

	}

	render(){
		return( 
			<Container>

			<Block center middle>
				<View style={{}}>
					<Text> {i18n.t('Choose the language')} </Text>
					<Button onPress={this.selectLangue.bind(this,'fr')}><Text>{i18n.t('French')}</Text></Button>
					<Button onPress={this.selectLangue.bind(this,'ar')}><Text>{i18n.t('Arabic')}</Text></Button>
				</View>
			</Block>
			
			</Container>
		);
	}
}

export default SelectLang ;