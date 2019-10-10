import React from 'react';
import { View, Platform, StyleSheet, LayoutAnimation, UIManager, KeyboardAvoidingView, ImageBackground, Image, Dimensions, Switch } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from '@expo/vector-icons';
import {
	Container,
	Content,
	Header,
	Body,
	Grid,
	Right,
	Left,
	Icon,
	Button,
	Text,
	Col,
	Card,
	Label,
	Input,
	Item,
	Form,
	Spinner,
	Footer,
	FooterTab,
	Row
} from 'native-base';
import ElevatedView from 'react-native-elevated-view';
import { connect } from 'react-redux';

import { parraineSmsar, initialForm } from '../redux/actions';
import i18n from '../i18n/i18n';
import { Block } from '../components';
import GradientText from "../components/UI/gradientText";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);
const widthWindo = Dimensions.get("window").width;
class Parrainage extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: i18n.t('Sponsorship title'),
		drawerLabel: i18n.t('Sponsorship label'),
		drawerIcon: () => (
			<Ionicons
				name="md-person-add"
				size={25}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});

	constructor(props) {
		super(props);
		this.state = {
			nom: '',
			prenom: '',
			adress: '',
			phone: '',
			age: '',
			email: '',
			sexe: 'H',
			cin: '',
			cgu: false,
			entrepreneur: false,
			isNomValid: true,
			isPrenomValid: true,
			isPhoneValid: true,
			isAgeValid: true,
			isEmailValid: true,
			isCinValid: true,
			isAdressValid: true,
			isTypeValid: true,
			isEntrepreneurValid: true,
			isCguValid: true,
		};
	}

	componentDidUpdate() {
		if (this.props.reset) {
			this.props.initialForm();
			this.setState({
				nom: '',
				prenom: '',
				adress: '',
				phone: '',
				age: '',
				email: '',
				sexe: 'H',
				cin: '',
				cgu: false,
				entrepreneur: false,
				isNomValid: true,
				isPrenomValid: true,
				isPhoneValid: true,
				isAgeValid: true,
				isEmailValid: true,
				isCinValid: true,
				isAdressValid: true,
				isTypeValid: true,
				isEntrepreneurValid: true,
				isCguValid: true,
			});
		}
	}

	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	validatePhone(phone) {
		var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var re = /^(\+?\(?[0-9]{3}\)?)?([0-9]{1,2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
		//(+?\(?[0-9]{3}\)?)?
		return re.test(phone);
	}

	parraine() {
		const { prenom, nom, phone, email, cin, adress, entrepreneur, cgu } = this.state;
		const isEmailValid = !email || this.validateEmail(email);
		const isNomValid = nom.length >= 3;
		const isPrenomValid = prenom.length >= 3;
		const isAdressValid = adress.length >= 3;
		const isCinValid = cin.length >= 6;
		const isCguValid = cgu;
		const isEntrepreneurValid = entrepreneur;
		const isPhoneValid = phone.length >= 8;


		if (isEmailValid && isNomValid && isPrenomValid && isAdressValid && isPhoneValid && isCinValid && isCguValid && isEntrepreneurValid) {
			this.props.parraineSmsar({ prenom, nom, phone, email, cin, adress, entrepreneur, cgu, smsar_id: this.props.user.id });
		}
		//this.setState({ isLoading: true });
		// Simulate an API call
		setTimeout(() => {
			LayoutAnimation.easeInEaseOut();
			this.setState({
				//isLoading: false,
				isNomValid,
				isPhoneValid,
				isEmailValid,
				isPrenomValid,
				isAdressValid,
				isCinValid,
				isCguValid,
				isEntrepreneurValid,
			});
		}, 1000);
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner />
		}
		return (
			<ElevatedView elevation={5} style={{ backgroundColor: '#gray', marginBottom: 50 }}>
				<Button transparent onPress={this.parraine.bind(this)}>
					<LinearGradient
						colors={['#f6c552', '#ee813c', '#bf245a']}
						style={{ ...styles.buttonContianer, borderRadius: 10 }}
						start={[1.5, 0.6]}
					>
						<Text style={styles.StyleLogin}>{i18n.t('I sponsor')}</Text>
					</LinearGradient>
				</Button>
			</ElevatedView>
		);
	}

	render() {
		const { isEmailValid, isNomValid, isPhoneValid, isPrenomValid, isCinValid, isAdressValid, isEntrepreneurValid, isCguValid } = this.state;
		const isLoading = this.props.loading;

		return (
			<Container>
				<ImageBackground source={require('../assets/images/backParainage.png')} style={{ flex: 1 }}>
					<Header transparent noRight style={styles.paddHeader}>
						<Left style={styles.leftRightHeaderStyle}>
							<Button transparent onPress={() => this.props.navigation.openDrawer()}>
								<Icon name="menu" style={{ ...styles.violetColor, fontSize: 30 }} />
							</Button>
						</Left>
						<Body style={styles.bodyHeaderStyle}>
							<LinearGradient
								colors={["#f6c552", "#ee813c", "#bf245a"]}
								start={[1.5, 0.6]}
								style={styles.principalIcon}
							>
								<Icon name="md-contacts" style={{ ...styles.blancColor, fontSize: 20 }} />
							</LinearGradient>
							<GradientText text1={i18n.t('Sponsorship title').toUpperCase()} style={styles.principalText} titleStyle={styles.titleStyle} />
						</Body>
						<Right style={styles.leftRightHeaderStyle}>
							<Button transparent>
								<Icon name="share" style={{ ...styles.violetColor, fontSize: 30 }} />
							</Button>
						</Right>
					</Header>

					<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
						<Content>
							<Block center padding={18}>
								<Card style={{ width: '90%' }} transparent bordred>
									<LinearGradient
										colors={["#f6c552", "#ee813c", "#bf245a"]}
										start={[1.5, 0.6]}
										style={styles.gradientFormStyle}
									>
										<Form>
											<Item inlineLabel error={!isNomValid} disabled={isLoading}>
												<Label style={styles.blancColor}>{i18n.t('Last Name *')}</Label>
												<Input
													keyboardAppearance="light"
													autoFocus={true}
													autoCapitalize="none"
													autoCorrect={false}
													placeholder={''}
													value={this.state.nom}
													onChangeText={nom => this.setState({ nom })}
													style={styles.blancColor}
												/>
											</Item>
											<Item inlineLabel error={!isPrenomValid} disabled={isLoading}>
												<Label style={styles.blancColor}>{i18n.t('First Name *')}</Label>
												<Input
													keyboardAppearance="light"
													autoFocus={false}
													autoCapitalize="none"
													autoCorrect={false}
													placeholder={''}
													value={this.state.prenom}
													onChangeText={prenom => this.setState({ prenom })}
													style={styles.blancColor}
												/>
											</Item>

											<Item inlineLabel error={!isAdressValid} disabled={isLoading}>
												<Label style={styles.blancColor}>{i18n.t('Adress *')}</Label>
												<Input
													value={this.state.adress}
													keyboardAppearance="light"
													autoFocus={false}
													autoCapitalize="none"
													autoCorrect={false}
													placeholder={''}
													onChangeText={adress => this.setState({ adress })}
													style={styles.blancColor}
												/>
											</Item>
											<Item inlineLabel error={!isCinValid} disabled={isLoading}>
												<Label style={styles.blancColor}>{i18n.t('CIN *')}</Label>
												<Input
													value={this.state.cin}
													keyboardAppearance="light"
													autoFocus={false}
													autoCapitalize="none"
													autoCorrect={false}
													placeholder={''}
													onChangeText={cin => this.setState({ cin })}
													style={styles.blancColor}
												/>
											</Item>
											<Item inlineLabel error={!isEmailValid} disabled={isLoading}>
												<Label style={styles.blancColor}>{i18n.t('Email')}</Label>

												<Input
													placeholder={''}
													value={this.state.email}
													keyboardAppearance="light"
													autoFocus={false}
													autoCapitalize="none"
													autoCorrect={false}
													keyboardType="email-address"
													onChangeText={email => this.setState({ email })}
													style={styles.blancColor}
												/>
											</Item>
											<Item inlineLabel error={!isPhoneValid} disabled={isLoading}>
												<Label style={styles.blancColor}>{i18n.t('phone *')}</Label>
												<Input
													placeholder={''}
													value={this.state.phone}
													keyboardAppearance="light"
													autoFocus={false}
													autoCapitalize="none"
													autoCorrect={false}
													onChangeText={phone => this.setState({ phone })}
													style={styles.blancColor}
													keyboardType="phone-pad"
												/>
											</Item>
											<Item inlineLabel error={!isEntrepreneurValid} style={{ height: 45 }}>
												<Label style={styles.blancColor}>{i18n.t('entrepreneur *')}</Label>
												<Switch
													value={this.state.entrepreneur}
													onValueChange={() =>
														this.setState({
															entrepreneur: !this.state.entrepreneur
														})
													}
													thumbColor="#fff"
													trackColor={{ true: "#ee6c7e" }}
													style={styles.SwitchStyle}
												/>
											</Item>
											<Item inlineLabel style={{ height: 45, borderBottomWidth: 0 }} >
												<Label style={styles.blancColor}>{i18n.t('Accept CGU')}</Label>
												<Switch
													value={this.state.cgu}
													onValueChange={() =>
														this.setState({ cgu: !this.state.cgu })
													}
													thumbColor="#fff"
													trackColor={{ true: "#ee6c7e" }}
													style={styles.SwitchStyle}
												/>
											</Item>
											{!isCguValid && <Text small style={{ paddingLeft: 20, color: 'red' }}>{i18n.t('Accept CGU')}</Text>}
										</Form>
									</LinearGradient>
								</Card>
								<View style={{ height: 10 }}></View>
								{this.renderButton()}
								<View style={{ height: 10 }}></View>
							</Block>
						</Content>
					</KeyboardAvoidingView>
					<Footer style={styles.FooterHeigh}>
						<FooterTab>
							<LinearGradient
								colors={["#f6c552", "#ee813c", "#bf245a"]}
								style={styles.gradientFooterStyle}
								start={[1.5, 0.6]}
							>
								<Grid style={styles.FooterGridCenter}>
									<Col size={1}>
										<Right>
											<Image
												style={styles.faceImg}
												source={require("../assets/images/bottomLogoSignup.png")}
											/>
										</Right>
									</Col>
									<Col size={3}>
										<Row>
											<Text style={styles.footerText}>{i18n.t("Caller")}</Text>
										</Row>
										<Row>
											<Text style={styles.footerText}>
												{i18n.t("Caller Contact")}
											</Text>
										</Row>
									</Col>
								</Grid>
							</LinearGradient>
						</FooterTab>
					</Footer>
				</ImageBackground>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	labelStyle: {
		color: '#566270',
		fontSize: 18,
		fontWeight: 'bold',
	},
	textStyle: {
		color: '#566270',
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 5
	},
	pickerStyle: {
		marginLeft: 5
	},
	container: {
		flex: 1,
	},
	logoImg: {
		backgroundColor: '#eee',
		borderRadius: 100,
	},
	faceImg: {
		height: 50,
		width: 50,
		backgroundColor: '#eee',
		borderRadius: 100,
	},
	footerText: {
		color: 'white',
		fontSize: 18
	},
	paddHeader: {
		marginTop: Platform.OS === "android" ? -25 : -5,
		paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	blancColor: { color: "#fff" },
	violetColor: { color: "#bf245a" },
	principalIcon: {
		marginLeft: -300,
		borderRadius: Platform.OS === 'android' ? 105 : 15,
		padding: 6,
		marginTop: Platform.OS === 'android' ? 11 : 0,
		height: 30,
		justifyContent: "center"
	},
	principalText: {
		marginTop: Platform.OS === "android" ? -5 : -30,
		marginLeft: Platform.OS === "android" ? 5 : -100
	},
	titleStyle: { fontSize: 20 },
	bodyHeaderStyle: { alignItems: "center", marginLeft: 140 },
	leftRightHeaderStyle: { flex: 1 },
	gradientFormStyle: {
		opacity: .6,
		borderRadius: 20,
		paddingBottom: 30,
		paddingTop: 30
	},
	FooterHeigh: {
		height: 70
	},
	gradientFooterStyle: {
		flex: 1,
		padding: 10
	},
	FooterGridCenter: {
		marginRight: 10,
		marginLeft: 30
	},
	faceImg: {
		height: 60,
		width: 60,
		marginTop: Platform.OS === "android" ? -5 : -10
	},
	footerText: {
		color: "white",
		fontSize: 12
	},
	buttonContianer: {
		width: (widthWindo / 2) - 1,
		alignItems: "center",
		padding: 10,
		marginTop: 35,
		height: 50
	},
	StyleLogin: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 20
	},
	SwitchStyle: {
		alignItems: "flex-end",
		marginLeft: 80,
	},
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.form.loading,
	reset: state.form.reset,
	error: state.form.error,
});

export default connect(mapStateToProps, { parraineSmsar, initialForm })(Parrainage);