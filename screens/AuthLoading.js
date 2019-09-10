import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import {setCurrentUser} from '../redux/actions';

class AuthLoading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //await AsyncStorage.setItem('currentUser', 'abc');
    const currentUser = await AsyncStorage.getItem('currentUser1');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if(currentUser) this.props.setCurrentUser({user: JSON.parse(currentUser)});
    this.props.navigation.navigate(currentUser ? 'App' : 'Auth');

  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default connect(null, {setCurrentUser})(AuthLoading);
