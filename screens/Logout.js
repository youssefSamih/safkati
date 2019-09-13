import React from 'react';
import {View} from 'react-native';
import {Block} from '../components';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { signOut } from '../redux/actions';
import i18n from '../i18n/i18n';

class Logout extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('logout'),
	    drawerLabel: i18n.t('logout'),
	    header: null,
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-menu"
				size={32}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });
	componentDidMount(){
		this.props.signOut();
	}

	render(){
		return( 
			<View />
		);
	}
}

export default connect(null,{signOut})(Logout);