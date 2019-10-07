import React from "react";
import {
  View,
  Image,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
	I18nManager,
  Switch,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import ElevatedView from 'react-native-elevated-view';

import GradientText from "../components/UI/gradientText";
import i18n from "../i18n/i18n";

import { Block } from "../components";
import { theme, params } from "../constants";

import { signUpUser } from "../redux/actions";

import {
  Container,
  Content,
  Footer,
  Right,
  Button,
  Text,
  H1,
  Card,
  Label,
  Input,
  CheckBox,
  Item,
  Form,
  Grid,
  Row,
  Col,
  FooterTab,
  Spinner,
  Thumbnail,
  Icon
} from "native-base";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const widthWindo = Dimensions.get("window").width;
class SignUp extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);

    this.state = {
      nom: "",
      prenom: "",
      phone: "",
      adress: "",
      email: "",
      password: "",
      cin: "",
      ville: "",
      entrepreneur: false,
      cgu: false,
      //isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      isNomValid: true,
      isPrenomValid: true,
      isAdressValid: true,
      isPhoneValid: true,
      isCinValid: true,
      isEntrepreneurValid: true,
      isCguValid: true,
      isVilleValid: true,
      error: ""
    };

    this.signUp = this.signUp.bind(this);
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }
  signUp() {
    const {
      prenom,
      nom,
      phone,
      email,
      ville,
      password,
      passwordConfirmation,
      cin,
      adress,
      entrepreneur,
      cgu
    } = this.state;
    const isEmailValid = !email || this.validateEmail(email);
    const isNomValid = nom.length >= 3;
    const isPrenomValid = prenom.length >= 3;
    const isAdressValid = adress.length >= 3;
    const isCinValid = cin.length >= 6;
    const isCguValid = cgu;
    const isEntrepreneurValid = entrepreneur;
    const isPhoneValid = phone.length >= 8;
    const isPasswordValid = password.length >= 6;
    const isVilleValid = ville;
    const isConfirmationValid = password === passwordConfirmation;

    if (
      isVilleValid &&
      isEmailValid &&
      isNomValid &&
      isPrenomValid &&
      isAdressValid &&
      isPhoneValid &&
      isPasswordValid &&
      isConfirmationValid &&
      isCinValid &&
      isCguValid &&
      isEntrepreneurValid
    ) {
      this.props.signUpUser({
        prenom,
        nom,
        phone,
        email,
        ville,
        password,
        passwordConfirmation,
        cin,
        adress,
        entrepreneur,
        cgu
      });
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
        isPasswordValid,
        isConfirmationValid,
        isPrenomValid,
        isAdressValid,
        isCinValid,
        isCguValid,
        isEntrepreneurValid,
        isVilleValid
      });
    }, 1000);
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
			<ElevatedView elevation={5} style={{ backgroundColor: '#gray', marginBottom: 50 }}>
        <Button transparent onPress={this.signUp}>
          <LinearGradient
            colors={['#f6c552', '#ee813c', '#bf245a']}
            style={{...styles.buttonContianer, borderRadius: 10}}
            start={[1.5, 0.6]}
          >
						<Text style={styles.StyleLogin}>{i18n.t("Sign Up")}</Text>
					</LinearGradient>
				</Button>
			</ElevatedView>
    );
  }

  render() {
    const {
      //isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      isNomValid,
      isPrenomValid,
      isPhoneValid,
      isAdressValid,
      isCinValid,
      isCguValid,
      isEntrepreneurValid,
      isVilleValid,
      nom,
      prenom,
      cin,
      adress,
      phone,
      email,
      password,
      passwordConfirmation,
      ville
    } = this.state;
    const isLoading = this.props.loading;
    let titledForm = null;
    if (I18nManager.isRTL) {
      titledForm = (
        <H1 style={{ color: theme.colors.primary }}>
          {i18n.t("Become partner", { appName: params.app.name })}
        </H1>
      );
    }
    titledForm = (
      <GradientText
        text1={i18n
          .t("Become partner", { appName: params.app.name })
          .toUpperCase()}
      />
    );

    return (
      <Container>
        <ImageBackground
          source={require("../assets/images/backCreateAccount.png")}
          style={{ ...styles.ImgBack, ...styles.keyAvoid }}
        >
          <KeyboardAvoidingView style={styles.keyAvoid} behavior="padding" enabled>
            <Content>
              <Block
                center
                padding={18}
                style={{ width: 37, flexDirection: "row" }}
              >
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <LinearGradient
                    colors={["#f6c552", "#ee813c", "#bf245a"]}
                    style={styles.arrowBack}
                    start={[1.5, 0.6]}
                  >
                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                  </LinearGradient>
                </TouchableOpacity>
                <View style={styles.titledFormStyle}>{titledForm}</View>
              </Block>

              <Block center>
                <Card
                  style={{ width: "90%", paddingBottom: 10 }}
									transparent
                >
									<LinearGradient
										colors={["#f6c552", "#ee813c", "#bf245a"]}
										style={{...styles.gradientFooterStyle, borderRadius: 30, opacity: .8}}
										start={[1.5, 0.6]}
									>
                  	<Form>
                      <Item
                        inlineLabel
                        error={!isNomValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("Last Name *")}</Label>
                        <Input
                          value={nom}
                          keyboardAppearance="light"
                          autoFocus={true}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={nom => this.setState({ nom })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isPrenomValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("First Name *")}</Label>
                        <Input
                          value={prenom}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={prenom => this.setState({ prenom })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isAdressValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("Adress *")}</Label>
                        <Input
                          value={adress}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={adress => this.setState({ adress })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isVilleValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("Ville *")}</Label>
                        <Input
                          value={ville}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={ville => this.setState({ ville })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isEmailValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("Email")}</Label>
                        <Input
                          value={email}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={email => this.setState({ email })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isCinValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("CIN *")}</Label>
                        <Input
                          value={cin}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={cin => this.setState({ cin })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isPhoneValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("phone *")}</Label>
                        <Input
                          value={phone}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          keyboardType="phone-pad"
                          onChangeText={phone => this.setState({ phone })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isEntrepreneurValid}
                        style={{ height: 45 }}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("entrepreneur *")}</Label>
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
                      <Item
                        inlineLabel
                        error={!isPasswordValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("Enter your password *")}</Label>
                        <Input
                          secureTextEntry
                          value={password}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={password => this.setState({ password })}
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        error={!isConfirmationValid}
                        disabled={isLoading}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("Comfirm your password *")}</Label>
                        <Input
                          secureTextEntry
                          value={passwordConfirmation}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder={""}
                          onChangeText={passwordConfirmation =>
                            this.setState({ passwordConfirmation })
                          }
													style={styles.LabelColor}
                        />
                      </Item>
                      <Item
                        inlineLabel
                        style={{ height: 45, borderBottomWidth: 0 }}
                      >
                        <Label style={styles.LabelColor}>{i18n.t("Accept CGU")}</Label>
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
                      {!isCguValid && (
                        <Text small style={{ paddingLeft: 20, color: "red" }}>
                          {i18n.t("Accept CGU")}
                        </Text>
                      )}
                  	</Form>
                  </LinearGradient>
                </Card>
                {this.renderButton()}
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
  container: {
    flex: 1
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
  gradientFooterStyle: {
    flex: 1,
    padding: 10
  },
  FooterHeigh: {
    height: 70
  },
  FooterGridCenter: {
    marginRight: 10,
    marginLeft: 30
  },
  arrowBack: {
    borderRadius: Platform.OS === "android" ? 100 : 15,
    width: Platform.OS === 'android' ? 40 : widthWindo / 12,
    justifyContent: "center",
    alignItems: "center",
    padding: Platform.OS === "android" ? 5 : 0,
    marginTop: Platform.OS === 'android' ? 30 : 40,
  },
  titledFormStyle: {
    marginTop: Platform.OS === 'android' ? 55 : 45,
    height: Platform.OS === 'android' ? 10 : 35,
		marginLeft: Platform.OS === 'android' ? 125 : -35,
		width: Platform.OS === 'android' ? widthWindo / 14 : widthWindo
	},
	LabelColor: {
		color: "#fff"
	},
	StyleLogin: { 
		color: "#fff", 
		fontWeight: "bold", 
		fontSize: 20 
	},
	buttonContianer: {
    width: (widthWindo / 2) - 1 ,
    alignItems: "center",
    padding: 10,
    marginTop: 35,
    height: 50
	},
	SwitchStyle: {
		alignItems: "flex-end",
		marginLeft: 80,
  },
  keyAvoid: { flex: 1 },
  ImgBack: { width : widthWindo }
});

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    resetForm: state.auth.resetForm
  };
};

export default connect(
  mapStateToProps,
  { signUpUser }
)(SignUp);
