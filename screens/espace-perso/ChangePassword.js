import React from 'react';
import { View, StyleSheet, LayoutAnimation, UIManager, KeyboardAvoidingView, Platform, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import ElevatedView from 'react-native-elevated-view';

import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Button,
	Icon,
	Title,
	Text,
	Label,
	Input,
	Item,
	Form,
	Thumbnail,
	H2,
	Spinner
} from 'native-base';

import i18n from '../../i18n/i18n';
import { Block } from '../../components';
import { params } from '../../constants';
import { connect } from 'react-redux';
import { changePassword, initialForm } from '../../redux/actions';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);

const widthWindo = Dimensions.get("window").width;
class ChangePassword extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: i18n.t('Change password title'),
		drawerLabel: i18n.t('Change password label'),
		drawerIcon: ({ tintColor }) => (
			<Ionicons
				name="md-menu"
				size={32}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});

	constructor(props) {
		super(props);
		this.state = {
			actualPassword: '',
			password: '',
			comfirmPassword: '',
			isPasswordValid: true,
			isComfirmValid: true,
		}
	}
	componentDidUpdate() {
		if (this.props.reset) {
			this.props.initialForm();
			this.setState({
				actualPassword: '',
				password: '',
				comfirmPassword: '',
				isPasswordValid: true,
				isComfirmValid: true,
			});
		}
	}

	changePassword() {
		const {
			actualPassword,
			password,
			comfirmPassword,
		} = this.state;

		const isPasswordValid = password.length >= 6;
		const isComfirmValid =
			password === comfirmPassword;
		if (isPasswordValid && isComfirmValid) {
			this.props.changePassword({ actualPassword, password, smsar_id: this.props.user.id });
		}
		setTimeout(() => {
			LayoutAnimation.easeInEaseOut();
			this.setState({
				isPasswordValid,
				isComfirmValid,
			});
		}, 1000);

	}
	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />
		}
		return (
			<ElevatedView transparent elevation={5} style={styles.elevationStyle}>
				<Button block style={styles.mb15} transparent onPress={this.changePassword.bind(this)} >
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
			actualPassword,
			password,
			comfirmPassword,
			isPasswordValid,
			isComfirmValid,
		} = this.state;
		isLoading = this.props.loading;
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
								<Icon name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Title>{i18n.t('Change password title')}</Title>
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
									<H2 style={styles.userNameStyle}>{i18n.t('Change password title')}</H2>
								</Block>
							</LinearGradient>
							<Form transparent style={{  padding: 20, paddingTop: 35, }}>
								<Item floatingLabel disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('Current Password *')}</Label>
									<Input secureTextEntry
										value={actualPassword}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={actualPassword => this.setState({ actualPassword })}
									/>
								</Item>
								<Item floatingLabel error={!isPasswordValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('New Password *')}</Label>
									<Input secureTextEntry
										value={password}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={password => this.setState({ password })}
									/>
								</Item>
								<Item floatingLabel error={!isComfirmValid} disabled={isLoading} style={styles.borderInputForm}>
									<Label>{i18n.t('Confirm new password *')}</Label>
									<Input secureTextEntry
										value={comfirmPassword}
										keyboardAppearance="light"
										autoFocus={false}
										autoCapitalize="none"
										autoCorrect={false}
										returnKeyType="next"
										placeholder={''}
										onChangeText={comfirmPassword => this.setState({ comfirmPassword })}
									/>
								</Item>
								<View style={{ paddingTop: 24 }} />
								{this.renderButton()}
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
	borderInputForm: { borderColor: "#bf245a" },
	userNameStyle: { color: "#fff", fontSize: 23, fontWeight: "bold", marginBottom: 5, width: widthWindo / 2.5, textAlign: "center" },
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
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.form.loading,
	reset: state.form.reset,
	error: state.form.error,
});

export default connect(mapStateToProps, { changePassword, initialForm })(ChangePassword);