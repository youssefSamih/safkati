import React from 'react';
import {View, Text} from 'react-native';
import i18n from '../i18n/i18n';


class Login extends React.Component {
	render(){
		return( 
			<View>
				<Text> {i18n.t('greeting')} </Text>
			</View>
		);
	}
}

export default Login ;