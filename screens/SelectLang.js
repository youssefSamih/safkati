import React from 'react';
import {View, AsyncStorage, I18nManager, ImageBackground, StyleSheet, Dimensions, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import i18n from '../i18n/i18n';
import {Block} from '../components';
import ButtonWithBackground from '../components/UI/ButtonWithBackground';
import HeadingText from '../components/UI/HeadingText';
	
const widthWindo = Dimensions.get('window').width;
class SelectLang extends React.Component {
	//this fuction select the language you want to use for the application
	constructor(props){
		super(props);
		// this.selectLangue = this.selectLangue.bind(this);

	}

	static navigationOptions = {
		header: null,
	}

	selectLangue = async (lang) => {
		
		await AsyncStorage.setItem('selectedLang', lang);
		i18n.locale = lang ;
		if(lang == 'ar'){
			I18nManager.forceRTL(true);
		}else{
			I18nManager.forceRTL(false);
		}
		this.props.navigation.navigate('Login');

	}

	render(){
		return(
			<ImageBackground source={require('../assets/images/connexion.jpg')} style={styles.backgroundImage}>
				<LinearGradient
						colors={['#f6c552', '#ee813c', '#bf245a']}
						style={styles.LinearBack}
						start={[6, 0.1]}
				>
					<Block style={{ marginBottom: 80 }} center bottom middle animated>
						<Image 
							source={require('../assets/images/logoLang.png')}
							style={styles.logo}
							resizeMode="contain"
						/>
						<HeadingText style={{ color: "#fff" }}>{i18n.t('Choose the language')}</HeadingText>
					</Block>
					<Block center top middle animated>
						<View>
							<ButtonWithBackground
                                    Backcolors={['#f6c552', '#ee813c', '#bf245a']}
                                    buttonStyle={styles.buttonContianer}
                                    start={[1.5, 0.6]}
                                    onPress={this.selectLangue.bind(this,'fr')}
                            >
								<HeadingText style={styles.textCenter}>{i18n.t('French')}</HeadingText>
							</ButtonWithBackground>
							<ButtonWithBackground
                                    Backcolors={['#f6c552', '#ee813c', '#bf245a']}
                                    buttonStyle={styles.buttonContianer}
                                    start={[1.5, 0.6]}
                                    onPress={this.selectLangue.bind(this,'ar')}
                            >
								<HeadingText style={styles.textCenter}>{i18n.t('Arabic')}</HeadingText>
							</ButtonWithBackground>
						</View>
					</Block>
				</LinearGradient>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	backgroundImage: {
        width: "100%",
        flex: 1,
	},
	LinearBack: {
		width: "100%", 
		opacity: 0.6, 
		flex: 1,
	},
	textCenter: {
        fontWeight: "bold",
		color: "#fff",
	},
	buttonContianer: {
        width: widthWindo / 2 ,
        alignItems: "center",
	},
	logo: {
        width: widthWindo / 2,
        height: 100
	}
})

export default SelectLang ;