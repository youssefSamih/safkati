import React from 'react';
import { View, StyleSheet, Platform, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import { LinearGradient } from "expo-linear-gradient";

import {
	Container,
	Header,
	Content,
	ListItem,
	Thumbnail,
	Text,
	H2,
	Left,
	Body,
	Right,
	Icon,
	Title,
	Button
} from 'native-base';

import { Block, Divider } from '../components';
import { theme, params } from '../constants';
import i18n from '../i18n/i18n';

import { connect } from 'react-redux';
import { getUserInfo, signOut } from '../redux/actions';

class MonEspace extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Espace perso",
		drawerLabel: 'Espace perso',
		drawerIcon: ({ tintColor }) => (
			<Ionicons
				name="md-contact"
				size={25}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});

	componentWillMount() {
		const { id } = this.props.user;
		this.props.getUserInfo({ id });
	}

	constructor(props) {
		super(props);
		this.state = {
			starCount: 2.5
		};
	}

	render() {
		return (
			<Container>
				<LinearGradient
          colors={["#f6c552", "#ee813c", "#bf245a"]}
          start={[1.5, 0.6]}
          style={styles.paddHeader}
        >
					<Header transparent noRight>
						<Left>
							<Button transparent onPress={() => this.props.navigation.openDrawer()}>
								<Icon name="menu" />
							</Button>
						</Left>
						<Body style={{ marginLeft: 50 }}>
							<Title>{i18n.t('Espace pro title')}</Title>
						</Body>
					</Header>
				</LinearGradient>
				<Content>
				<ImageBackground source={require('../assets/images/backpassModif.png')} style={{ flex: 1}}>
					<LinearGradient
						colors={["#f6c552", "#ee813c", "#bf245a"]}
						start={[1.5, 0.6]}
						style={styles.gradientFormStyle}
					>
						<Block center transparent padding={18}>
							<Thumbnail
								large
								style={styles.logoImg}
								source={params.app.FACE} />
							<H2 style={styles.userNameStyle}>{this.props.user.nom}</H2>
							<View style={styles.starRatingStyle}>
								<StarRating
									disabled={true}
									emptyStar={'ios-star-outline'}
									fullStar={'ios-star'}
									halfStar={'ios-star-half'}
									iconSet={'Ionicons'}
									maxStars={5}
									rating={parseFloat(this.props.user.rating)}
									//selectedStar={(rating) => this.onStarRatingPress(rating)}
									fullStarColor={theme.colors.primary}
									starStyle={styles.starStyle}
								/>
							</View>
						</Block>
					</LinearGradient>
					<View source={require('../assets/images/backCompte.png')} style={{ padding: 20, }}>
						<ListItem icon onPress={() => this.props.navigation.navigate('Compte')} noBorder style={styles.listItemStyle}>
							<Left>
								<Button transparent>
									<Icon name="person" />
								</Button>
							</Left>
							<Body>
								<Text>{i18n.t('My account')}</Text>
							</Body>
							<Right>
								{Platform.OS === "ios" && <Icon active name="arrow-forward" />}
							</Right>
						</ListItem>
						<ListItem icon noBorder style={styles.listItemStyle} onPress={() => this.props.navigation.navigate('MesMessageries')}>
							<Left>
								<Button transparent>
									<Icon name="mail" />
								</Button>
							</Left>
							<Body>
								<Text>{i18n.t('My voicemail')}</Text>
							</Body>
							<Right>
								{Platform.OS === "ios" && <Icon active name="arrow-forward" />}
							</Right>
						</ListItem>
						<ListItem icon onPress={() => this.props.navigation.navigate('ClientDeclaredMenu')} noBorder style={styles.listItemStyle}>
							<Left>
								<Button transparent>
									<Icon name="bookmark" />
								</Button>
							</Left>
							<Body>
								<Text>{i18n.t('My clients declared')}</Text>
							</Body>
							<Right>
								{Platform.OS === "ios" && <Icon active name="arrow-forward" />}
							</Right>
						</ListItem>
						<ListItem icon onPress={() => this.props.navigation.navigate('MesCommissions')} noBorder style={styles.listItemStyle}>
							<Left>
								<Button transparent>
									<Icon name="notifications" />
								</Button>
							</Left>
							<Body>
								<Text>{i18n.t('My commissions')}</Text>
							</Body>
							<Right>
								{Platform.OS === "ios" && <Icon active name="arrow-forward" />}
							</Right>
						</ListItem>
						<ListItem icon onPress={() => this.props.navigation.navigate('MesParrinage')} noBorder style={styles.listItemStyle}>
							<Left>
								<Button transparent>
									<Icon name="bookmarks" />
								</Button>
							</Left>
							<Body>
								<Text>{i18n.t('My referrals')}</Text>
							</Body>
							<Right>
								{Platform.OS === "ios" && <Icon active name="arrow-forward" />}
							</Right>
						</ListItem>
					</View>
					</ImageBackground>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	logoImg: {
		backgroundColor: '#eee',
	},
	paddHeader: {
    marginTop: Platform.OS === "android" ? -25 : -5,
    paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	gradientFormStyle: {
		opacity: .8,
		paddingBottom: 30,
		paddingTop: 30
	},
	userNameStyle: { color: "#fff", fontSize: 23, fontWeight: "bold", marginBottom: 5 },
	starRatingStyle: { backgroundColor: "#bf1c45", padding: 5, borderRadius: 50 },
	starStyle: { color: "#fdd77d" },
	listItemStyle: { marginBottom: 17  }
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	clients: state.monespace.clients,
});

export default connect(mapStateToProps, { getUserInfo })(MonEspace);