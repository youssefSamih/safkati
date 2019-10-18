import React from 'react';
import { Text, WebView, Dimensions, ImageBackground, StyleSheet, Platform, View, PixelRatio, I18nManager, Image } from 'react-native';
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
						<Content contentContainerStyle={styles.contentStyles}>
							<View style={styles.contentInfo}>
								<Image
									source={require('../assets/images/backTuto.png')}
									style={styles.imgInfoStyles}
								/>
							</View>
							<View style={styles.tutoVideoStyle}>
								<WebView
									style={styles.webViewStyle}
									javaScriptEnabled={true}
									useWebKit={Platform.OS === 'ios'}
									source={{ uri: 'https://www.youtube.com/embed/mSwtx7wFDPY?rel=0&autoplay=0&showinfo=0&controls=0' }}
								/>
							</View>
							<View style={styles.textContainerStyle} >
								<Text style={styles.textStyle}>
									Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
								</Text>
							</View>
						</Content>
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
	contentStyles: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: "25%" },
	tutoVideoStyle: {width: "88%", height: 200, borderWidth: 4, borderColor: '#f3ba73', padding: 5, marginTop: -6},
	textStyle: { 
		padding: 20,
		color: "#fff" 
	},
	imgInfoStyles: {width: 40, height: 40, borderRadius: 50},
	contentInfo: { position: "relative", zIndex: 100 },
	webViewStyle: { flex: 1 },
	textContainerStyle: { flex: 1, marginLeft: "3%" }
})

export default Tuto;