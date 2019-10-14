import React from 'react';
import _ from 'lodash';
import { View, Image, StyleSheet, ImageBackground, LayoutAnimation, UIManager, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';

import {
	Container,
	Content,
	Header,
	Body,
	Left,
	Icon,
	Button,
	Text,
	Card,
	Label,
	Input,
	Item,
	Form,
	Grid,
	Row,
	Col,
	FooterTab,
	Spinner,
	Picker,
	Right,
	Footer
} from 'native-base';
import { LinearGradient } from "expo-linear-gradient";
import ElevatedView from 'react-native-elevated-view';

import GradientText from "../../components/UI/gradientText";
import { connect } from 'react-redux';
import { fetchProjects, declareClient } from '../../redux/actions';
import { Block } from '../../components';
import i18n from '../../i18n/i18n';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);
const widthWindo = Dimensions.get("window").width;
class DeclareClient extends React.Component {

	componentWillMount() {
		this.props.fetchProjects();

		//this.createDataSource(this.props)
	}

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
			selectedProject: this.props.navigation.getParam('projectId', null),
			isNomValid: true,
			isPrenomValid: true,
			isPhoneValid: true,
			isAgeValid: true,
			isEmailValid: true,
			isProjectValid: true,
			isCinValid: true,
			isAdressValid: true,
			isBudgetValid: true,
			isTypeValid: true,
			isSelectedProjet: true,
			budget: '',
			type_de_bien: 'A',
		};
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
	onNomChange(value) {
		this.setState({ nom: value });
	}
	onPhoneChange(value) {
		this.setState({ phone: value });
	}
	onAgeChange(value) {
		this.setState({ age: value });
	}
	onSexeChange(value) {
		this.setState({ sexe: value });
	}
	onEmailChange(value) {
		this.setState({ email: value });
	}
	onSelectedProject(value) {
		this.setState({ selectedProject: value });
		console.log(value);
	}
	onPressDeclare() {
		const { nom, prenom, phone, age, email, cin, sexe, selectedProject, adress, budget, type_de_bien } = this.state;
		const isEmailValid = !email || this.validateEmail(email);
		const isNomValid = nom.length >= 3;
		const isPrenomValid = prenom.length >= 3;
		const isAdressValid = adress.length >= 3;
		const isCinValid = cin.length >= 3;
		const isBudgetValid = budget;
		const isTypeValid = type_de_bien;
		const isSelectedProjet = selectedProject;
		const isPhoneValid = this.validatePhone(phone);

		//this.setState({isEmailValid,isNomValid,isPhoneValid});
		if (isEmailValid && isNomValid && isPrenomValid && isPhoneValid && isAdressValid && isCinValid && isBudgetValid && isTypeValid && isSelectedProjet) {
			this.props.declareClient({ nom, prenom, phone, age, email, cin, sexe, selectedProject, adress, budget, type_de_bien, smsar_id: this.props.user.id });
		}
		setTimeout(() => {
			LayoutAnimation.easeInEaseOut();
			this.setState({
				isEmailValid,
				isNomValid,
				isPrenomValid,
				isAdressValid,
				isCinValid,
				isBudgetValid,
				isTypeValid,
				isSelectedProjet,
				isPhoneValid,
			});
		}, 1000);

	}
	renderButton() {
		if (this.props.loading) {
			return <Spinner />
		}
		return (
			<ElevatedView elevation={5} style={{ backgroundColor: '#gray', marginBottom: 50 }}>
				<Button transparent onPress={this.onPressDeclare.bind(this)}>
					<LinearGradient
							colors={['#f6c552', '#ee813c', '#bf245a']}
							style={{...styles.buttonContianer, borderRadius: 10}}
							start={[1.5, 0.6]}
					>
						<Text style={styles.StyleLogin}>{i18n.t('Declare client')}</Text>
					</LinearGradient>
				</Button>
			</ElevatedView>
		);
	}

	render() {
		const { isEmailValid, isNomValid, isPhoneValid, isAgeValid, isProjectValid, isPrenomValid, isCinValid, isAdressValid, isBudgetValid, isTypeValid, isSelectedProjet } = this.state;
		const isLoading = this.props.loading;

		return (
			<Container>
				<ImageBackground
          source={require("../../assets/images/backCreateAccount.png")}
          style={{ ...styles.ImgBack, ...styles.keyAvoid }}
        >
					<Header transparent noRight style={styles.paddHeader}>
						<Left style={styles.keyAvoid}>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name="arrow-back" style={{ ...styles.violetColor, fontSize: 30 }} />
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
							<GradientText text1={i18n.t('Declare a client').toUpperCase()} style={styles.principalText} titleStyle={styles.titleStyle} />
						</Body>
						<Right style={styles.keyAvoid}>
							<Button transparent>
								{/* <Icon name="share" style={{ ...styles.violetColor, fontSize: 30 }} /> */}
							</Button>
						</Right>
					</Header>
					<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
						<Content>
							<Block center padding={18}>
								<Card style={styles.cardStyle} transparent bordred>
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
												onChangeText={this.onNomChange.bind(this)}
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
												onChangeText={this.onEmailChange.bind(this)}
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
												onChangeText={this.onPhoneChange.bind(this)}
												keyboardType="phone-pad"
											/>
										</Item>
										<Item inlineLabel error={!isBudgetValid} disabled={isLoading}>
											<Label style={styles.blancColor}>{i18n.t('Budget *')}</Label>
											<Input
												placeholder={''}
												value={this.state.budget}
												keyboardAppearance="light"
												autoFocus={false}
												autoCapitalize="none"
												keyboardType="numeric"
												autoCorrect={false}
												onChangeText={budget => this.setState({ budget })}
											/>
										</Item>
										<Item inlineLabel error={!isTypeValid} disabled={isLoading}>
											<Label style={styles.blancColor}>{i18n.t('type de bien *')}</Label>
											<Picker
												placeholder={''}
												mode="dialog"
												style={{ width: undefined, ...styles.blancColor }}
												selectedValue={this.state.type_de_bien}
												onValueChange={type_de_bien => this.setState({ type_de_bien })}
											>
												<Picker.Item label={i18n.t('Apartment')} value="A" />
												<Picker.Item label={i18n.t('Ground')} value="T" />
												<Picker.Item label={i18n.t('Villa')} value="V" />
											</Picker>
										</Item>
										<Item style={{ borderBottomWidth: 0 }} error={!isSelectedProjet}>
											<Label style={styles.blancColor}> {i18n.t('default project')} </Label>
											<Picker
												placeholder={''}
												mode="dialog"
												style={{ width: undefined, ...styles.blancColor }}
												selectedValue={this.state.selectedProject}
												onValueChange={this.onSelectedProject.bind(this)}
											>
												{
													this.props.projects.map((val, index) => {
														return <Picker.Item label={val.libelle} value={val.id} key={index} />;

													})
												}
											</Picker>
										</Item>
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
                        source={require("../../assets/images/bottomLogoSignup.png")}
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
};

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
	violetColor: { color: "#bf245a" },
	principalIcon: {
		marginLeft: -300,
		borderRadius: Platform.OS === 'android' ? 105 : 15,
		padding: 6,
		marginTop: Platform.OS === 'android' ? 11 : 0,
		height: 30,
		justifyContent: "center"
	},
	bodyHeaderStyle: { alignItems: "center", marginLeft: 70 },
	blancColor: { color: "#fff" },
	principalText: { 
		marginTop: Platform.OS === "android" ? -5 : -30,
		marginLeft: Platform.OS === "android" ? 5 : -50
	},
	titleStyle: { fontSize: 20 },
	keyAvoid: { flex: 1 },
	ImgBack: { width : widthWindo },
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
	gradientFormStyle: {
		opacity: .6,
		borderRadius: 20,
		paddingBottom: 30,
		paddingTop: 30
 },
 cardStyle: { width: '90%'},
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
	}
});

const mapStatoToProps = (state) => {
	const projects = _.map(state.projects.projectsList, (val, uid) => {
		const { id, libelle, description, lieu, address } = val
		return { id, libelle, description, lieu, address };
	});

	return {
		projects,
		user: state.auth.user,
		loading: state.projects.loading
	};
}

export default connect(mapStatoToProps, { fetchProjects, declareClient })(DeclareClient);