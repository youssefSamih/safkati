import React from 'react';
import { View, StyleSheet, LayoutAnimation, UIManager, KeyboardAvoidingView, Platform, ImageBackground, Dimensions, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import { LinearGradient } from "expo-linear-gradient";
import ElevatedView from 'react-native-elevated-view';

import {
	Container,
	Header,
	Content,
	Thumbnail,
	Text,
	H2,
	Left,
	Body,
	Icon,
	Title,
	Button,
	Label,
	Input,
	CheckBox,
	Item,
	Form,
	Spinner
} from 'native-base';

import { Block } from '../../components';
import { theme, params } from '../../constants';
import i18n from '../../i18n/i18n';

import { connect } from 'react-redux';
import { getUserInfo, updateCompte } from '../../redux/actions';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);
const widthWindo = Dimensions.get("window").width;
class Compte extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Compte title",
		drawerLabel: 'Compte label',
		drawerIcon: ({ tintColor }) => (
			<Ionicons
				name="md-menu"
				size={32}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});

	componentWillMount() {
		const { id } = this.props.user;
		this.props.getUserInfo({ id });
	}
	componentDidMount() {
		console.log("this.props.user", this.props.user);
		const { entrepreneur } = this.props.user;
		this.setState({ ...this.props.user, entrepreneur: entrepreneur == "1" });
	}

	constructor(props) {
		super(props);
		this.state = {
			nom: '',
			username: '',
			prenom: '',
			phone: '',
			adress: '',
			email: '',
			cin: '',
			ville: '',
			entrepreneur: false,
			//isLoading: false,
			isEmailValid: true,
			isNomValid: true,
			isPrenomValid: true,
			isAdressValid: true,
			isPhoneValid: true,
			isCinValid: true,
			isEntrepreneurValid: true,
			isVilleValid: true,
			error: ''
		};
	}

	validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return re.test(email);
	}

	saveCompte() {
		const { prenom, nom, phone, email, ville, cin, adress, entrepreneur } = this.state;
		const isEmailValid = !email || this.validateEmail(email);
		const isNomValid = nom && nom.length >= 3;
		const isPrenomValid = prenom && prenom.length >= 3;
		const isAdressValid = adress && adress.length >= 3;
		const isCinValid = cin && cin.length >= 6;
		const isEntrepreneurValid = entrepreneur;
		const isPhoneValid = phone && phone.length >= 8;
		const isVilleValid = ville;

		if (isVilleValid && isEmailValid && isNomValid && isPrenomValid && isAdressValid && isPhoneValid && isCinValid && isEntrepreneurValid) {
			this.props.updateCompte({ prenom, nom, phone, email, ville, cin, adress, entrepreneur, smsar_id: this.props.user.id });
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
				isEntrepreneurValid,
				isVilleValid,
			});
		}, 1000);
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />
		}
		return (
			<ElevatedView elevation={5} style={styles.elevationStyle}>
				<Button transparent block style={styles.mb15} onPress={this.saveCompte.bind(this)}>
					<LinearGradient
						colors={['#f6c552', '#ee813c', '#bf245a']}
						style={{...styles.buttonContianer, borderRadius: 10}}
						start={[1.5, 0.6]}
					>
						<Text style={styles.StyleLogin}>{i18n.t('Save')}</Text>
					</LinearGradient>
				</Button>
			</ElevatedView>
		);
	}

	render() {
		const {
			//isLoading,
			isEmailValid,
			isNomValid,
			isPrenomValid,
			isPhoneValid,
			isAdressValid,
			isCinValid,
			isEntrepreneurValid,
			isVilleValid,
			nom,
			username,
			prenom,
			cin,
			adress,
			phone,
			email,
			ville
		} = this.state;
		const isLoading = this.props.loading;

		return (
			<Container>
				<LinearGradient
          colors={["#f6c552", "#ee813c", "#bf245a"]}
          start={[1.5, 0.6]}
          style={styles.paddHeader}
        >
					<Header transparent noRight>
						<Left>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name={ I18nManager.isRTL ? "arrow-forward" : "arrow-back" } />
							</Button>
						</Left>
						<Body style={{ marginLeft: 50 }}>
							<Title>{i18n.t('Compte title')}</Title>
						</Body>
					</Header>
				</LinearGradient>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
					<Content>
					<ImageBackground source={require('../../assets/images/backpassModif.png')} style={{ flex: 1}}>
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
										// disabled={true}
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
							<Form transparent style={{ padding: 20, }}>
								<Item fixedLabel disabled={true} style={styles.borderInputForm}>
									<Label>{i18n.t('Username')}</Label>
									<Input
										disabled
										value={username}
									/>
								</Item>
								<Item fixedLabel error={!isNomValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('Last Name *')}</Label>
									<Input
										value={nom}
										keyboardAppearance="light"
										autoFocus={true}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={nom => this.setState({ nom })}
									/>
								</Item>
								<Item fixedLabel error={!isPrenomValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('First Name *')}</Label>
									<Input
										value={prenom}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={prenom => this.setState({ prenom })}
									/>
								</Item>
								<Item fixedLabel error={!isAdressValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('Adress *')}</Label>
									<Input
										value={adress}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={adress => this.setState({ adress })}
									/>
								</Item>
								<Item fixedLabel error={!isVilleValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('Ville *')}</Label>
									<Input
										value={ville}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={ville => this.setState({ ville })}
									/>
								</Item>
								<Item fixedLabel error={!isEmailValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('Email')}</Label>
									<Input
										value={email}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={email => this.setState({ email })}
									/>
								</Item>
								<Item fixedLabel error={!isCinValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('CIN *')}</Label>
									<Input
										value={cin}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={cin => this.setState({ cin })}
									/>
								</Item>
								<Item fixedLabel error={!isPhoneValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('phone *')}</Label>
									<Input
										value={phone}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										keyboardType="phone-pad"
										onChangeText={phone => this.setState({ phone })}
									/>
								</Item>
								<Item inlineLabel error={!isEntrepreneurValid} style={{ height: 45 }} style={styles.borderInputForm}>
									<Label>{i18n.t('entrepreneur *')}</Label>
									<CheckBox
										checked={this.state.entrepreneur}
										onPress={() => this.setState({ entrepreneur: !this.state.entrepreneur })}
									/>
								</Item>
								{this.renderButton()}
								{<Block center>
									<Button transparent onPress={() => this.props.navigation.navigate('ChangePassword')}>
										<Text>
											{i18n.t('Change your password?')}
										</Text>
									</Button>
								</Block>}
							</Form>
						</ImageBackground>
					</Content>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

const styles = StyleSheet.create({

	logoImg: {
		backgroundColor: '#eee',
		marginBottom: 5
	},
	mb15: {
		margin: 20
	},
	gradientFormStyle: {
		opacity: .8,
		paddingBottom: 30,
		paddingTop: 30
	 },
	 paddHeader: {
    marginTop: Platform.OS === "android" ? -25 : -5,
    paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	borderInputForm: { borderColor: "#bf245a" },
	buttonContianer: {
		width: (widthWindo / 2) - 1 ,
		alignItems: "center",
		padding: 10,
		marginTop: 35,
		height: 50
	},
	StyleLogin: { 
		color: "#fff", 
		fontWeight: "bold", 
		fontSize: 16
	},
	elevationStyle: { backgroundColor: "transparent" },
	starRatingStyle: { backgroundColor: "#bf1c45", padding: 5, borderRadius: 50 },
	userNameStyle: { color: "#fff", fontSize: 23, fontWeight: "bold", marginBottom: 5 },
	starStyle: { color: "#fdd77d" }
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { updateCompte, getUserInfo })(Compte);