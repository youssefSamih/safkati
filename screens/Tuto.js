import React from 'react';
import { Text, WebView, Dimensions, ImageBackground, StyleSheet, Platform, View, PixelRatio, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Button,
	Icon,
	Title,
} from 'native-base';

import i18n from '../i18n/i18n';

const scale = Dimensions.get("window").width / 200;
const actuatedNormalize = (size) => {
  let newSize = size * scale
  if (Platform.OS === 'ios') {
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
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
	constructor(props) {
		super(props);
		state = {
			isReady: false,
			status: null,
			quality: null,
			error: null,
			isPlaying: true
		}

	}
	render() {
		return (
			<Container>
				<ImageBackground source={require('../assets/images/connexion.jpg')} style={{ flex: 1 }}>
					<LinearGradient
						colors={['#f6c552', '#ee813c', '#bf245a']}
						style={{ width: "100%", opacity: 0.6, flex: 1 }}
						start={[1, 0.1]}
					>
						<ImageBackground source={require('../assets/images/backTuto.png')} style={{ flex: 1 }}>
							<Header transparent noRight style={styles.paddHeader}>
								<Left>
									<Button transparent onPress={() => this.props.navigation.openDrawer()}>
										<Icon name="menu" />
									</Button>
								</Left>
								<Body>
									<Title>{i18n.t('How it works title')}</Title>
								</Body>
								<Button transparent>
									{/* <Icon name="share" /> */}
								</Button>
							</Header>
							<View style={styles.tutoVideoStyle}>
								<WebView
									style={{ flex: 1 }}
									javaScriptEnabled={true}
									useWebKit={Platform.OS === 'ios'}
									source={{ uri: 'https://www.youtube.com/embed/mSwtx7wFDPY?rel=0&autoplay=0&showinfo=0&controls=0' }}
								/>
							</View>
							<Content style={{ marginTop: Platform.OS === "ios" ? "45%" : "30%" }} >
								<Text style={styles.textStyle}>
									Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
								</Text>
							</Content>
						</ImageBackground>
					</LinearGradient>
				</ImageBackground>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	paddHeader: {
		marginTop: Platform.OS === "android" ? -25 : -5,
		paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	tutoVideoStyle: {
		height: Platform.OS === "android" ? Dimensions.get("window").height > 600 ? "30%" : 150 : Dimensions.get("window").height > 600 ? "29%" : 150 , 
		width: "88%",
		transform: [
      { translateX: I18nManager.isRTL ? actuatedNormalize(-11) : ( Platform.OS === "android" ? actuatedNormalize(13) : actuatedNormalize(11)) },
      { translateY: ( Platform.OS === "android" ? actuatedNormalize(60) : actuatedNormalize(75) ) }
    ]
	},
	textStyle: { 
		padding: 10,
		color: "#fff" 
	}
})

export default Tuto;