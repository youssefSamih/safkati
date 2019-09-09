import React from 'react';
import {View} from 'react-native';
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