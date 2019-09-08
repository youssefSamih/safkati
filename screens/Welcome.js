import React from 'react';
import {View, Text} from 'react-native';


class Welcome extends React.Component {
	 static navigationOptions = {
	    title: 'Home',
	  };
	render(){
		return( 
			<View>
				<Text> Welcome </Text>
			</View>
		);
	}
}

export default Welcome ;