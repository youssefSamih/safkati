import React from 'react';
import {View} from 'react-native';
import i18n from '../i18n/i18n';

import {Block, Divider} from '../components';
import { theme } from '../constants';
import { 
	Container, 
	Content, 
	Header,
	Footer, 
	Left, 
	Body, 
	Right, 
	Button, 
	Icon, 
	Title,
	Text,
	Form,
	Item,
	Label,
	IconNB,
	Input

} from 'native-base';

class SelectLang extends React.Component {
	render(){
		return( 
			<Container>

			<Block center middle>
				<View style={{}}>
					<Text> {i18n.t('Choose the language')} </Text>
					<Button><Text>{i18n.t('French')}</Text></Button>
					<Button><Text>{i18n.t('Arabic')}</Text></Button>
				</View>
			</Block>
			
			</Container>
		);
	}
}

export default SelectLang ;