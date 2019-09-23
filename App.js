import React from 'react';
import { StyleSheet, Text, View,I18nManager,AsyncStorage } from 'react-native';
import RNRestart from "react-native-restart";

import { Provider } from 'react-redux';
import store from './redux/store';

import { AppLoading } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Navigation from './navigation';
import NavigationService from './navigation/NavigationService';

import { Block } from './components';
import i18n from './i18n/i18n';

import getTheme from './native-base-theme/components';
import variables from './native-base-theme/variables/variables';
import { StyleProvider } from 'native-base';

console.disableYellowBox = true;

const images = [
'../assets/logo.png',
'../assets/user-hp.png'
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }
  componentDidMount() {
    AsyncStorage.getItem("selectedLang")
      .then(language => {
        if (language === "ar") {
          I18nManager.forceRTL(true);
          if (!I18nManager.isRTL) {
            RNRestart.Restart();
          }
        } else {
          I18nManager.forceRTL(false);
          if (I18nManager.isRTL) {
            RNRestart.Restart();
          }
        }
        //console.log("AsyncStorage",language )
        if(language) i18n.locale = language;
      });
}

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Provider store={store}>
      <StyleProvider style={getTheme(variables)}>
        <Block white>
          <Navigation 
            ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Block>
      </StyleProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
});