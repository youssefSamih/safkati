import React from "react";
import {
  View,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  ScrollView,
  Image,
  I18nManager
} from "react-native";
import ElevatedView from 'react-native-elevated-view';

import { connect } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser, signUpUser } from "../redux/actions";

import i18n from "../i18n/i18n";
import {
  Content,
  Button,
  Text,
  Form,
  Item,
  Label,
  IconNB,
  Input,
  Spinner,
  Thumbnail,
  H1,
} from "native-base";

import { Block } from "../components";
import { theme, params } from "../constants";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const widthWindo = Dimensions.get("window").width;
class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  // _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      //isLoading: false,
      isUsernameValid: true,
      isPasswordValid: true,
      error: ""
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }
  //check the email and password are valid and the call the function loginUser
  // the function call an rest api to see the credentials are correct
  login() {
    const { username, password } = this.state;
    const isUsernameValid = username.length >= 6; // || this.emailInput.shake();
    //const isEmailValid = this.validateEmail(email);// || this.emailInput.shake();
    const isPasswordValid = password.length >= 6; //|| this.passwordInput.shake();
    if (isUsernameValid && isPasswordValid) {
      // Simulate an API call
      this.props.loginUser({ username, password });
    }

    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isUsernameValid,
        isPasswordValid
      });
    }, 1000);
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <ElevatedView elevation={5} style={{ backgroundColor: '#gray' }}>
        <Button transparent onPress={this.login.bind(this)}>
          <LinearGradient
            colors={['#f6c552', '#ee813c', '#bf245a']}
            style={styles.buttonContianer}
            start={[1.5, 0.6]}
          >
              <Text style={styles.StyleLogin} >{i18n.t("Log in")}</Text>
          </LinearGradient>
        </Button>
      </ElevatedView>
    );
  }

  render() {
    const { isUsernameValid, isPasswordValid, username, password } = this.state;
    const isLoading = this.props.loading;

    return (
      <ImageBackground
        source={require("../assets/images/connexion.jpg")}
        style={styles.backgroundImage}
      >
      <LinearGradient
        colors={['#f6c552', '#ee813c', '#bf245a']}
        style={{width: "100%", opacity: 0.6, flex: 1}}
        start={[1, 0.1]}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
            <Content contentContainerStyle={styles.contentContainer}>
              <View style={styles.viewTopImages}>
                <Image
                  style={styles.imageSafkati}
                  source={require("../assets/images/logoLog.png")}
                  resizeMode="contain"
                />
                <Block center padding={18}>
                  <ElevatedView
                    elevation={5}
                    style={styles.stayElevated}
                  >                 
                    <Thumbnail
                      large
                      style={styles.logoImg}
                      source={params.app.LOGO}
                    />
                  </ElevatedView>
                </Block>
              </View>

              <Block padding={[0, theme.sizes.base * 2]} style={styles.blockForm}>
                <Block middle>
                  <Form>
                    <Item regular error={!isUsernameValid} disabled={isLoading} style={styles.input}>
                      <Input
                        //ref={input => (this.emailInput = input)}
                        disabled={isLoading}
                        value={username}
                        keyboardAppearance="light"
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        //keyboardType="email-address"
                        returnKeyType="next"
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={i18n.t("Username")}
                        onChangeText={username => this.setState({ username })}
                        placeholderTextColor = "#fff"
                      />
                      {isUsernameValid || <IconNB name="ios-close-circle" />}
                    </Item>
                    <Item regular error={!isPasswordValid} disabled={isLoading} style={styles.input}>
                      <Input
                        //ref={input => (this.passwordInput = input)}
                        disabled={isLoading}
                        value={password}
                        keyboardAppearance="light"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType={"done"}
                        blurOnSubmit={true}
                        placeholder={i18n.t("Password")}
                        onChangeText={password => this.setState({ password })}
                        onSubmitEditing={() => this.login()}
                        placeholderTextColor = "#fff"
                        style={{ textAlign: I18nManager.isRTL ? "right" : "left" }}
                      />
                      {isPasswordValid || <IconNB name="ios-close-circle" />}
                    </Item>
                  </Form>
                  {this.renderError()}

                  {this.renderButton()}
                </Block>
                <Block center>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("Forgot")}
                    style={styles.buttonForgot}
                  >
                    <Text style={styles.forgotPassText}>{i18n.t("Forgot your password?")}</Text>
                  </Button>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("SignUp")}
                    style={{ marginTop: 80 }}
                  >
                    <Text style={{ color: "#fff" }}>{i18n.t("Create an account")}</Text>
                  </Button>
                </Block>
              </Block>
            </Content>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: widthWindo,
    flex: 1
  },
  container: {
    flex: 1
  },
  logoImg: {
    backgroundColor: "#eee"
  },
  header: {
    backgroundColor: "#AA2D5A"
  },
  labelText: {
    fontSize: 18,
    padding: 10
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  scrollStyle: { 
    marginTop: 20
  },
  blockForm: { 
    width: "100%" 
  },
  contentContainer: { 
    alignItems: "center" 
  },
  viewTopImages: { 
    justifyContent: 'space-between', 
    marginTop: 10, 
    width: "40%"  
  },
  imageSafkati: { 
    width: "100%" 
  },
  keyBoardAvoidFlex: { 
    flex: 1 
  },
  stayElevated: {
    width: -102,
    height: 85,
    margin: 10,
    backgroundColor: '#000000b5',
    borderRadius: 100,
  },
  input: {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "#F6C552",
    paddingLeft: 20,
    marginBottom: 5,
  },
  forgotPassText: {
    color: "#F6C552",
  },
  buttonForgot: { 
    marginTop: 50,
    marginBottom: 10,
    justifyContent: "center"
  },
  buttonContianer: {
    width: (widthWindo / 1.2) - 1 ,
    alignItems: "center",
    padding: 10,
    marginTop: 35,
    height: 50
  },
  StyleLogin: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 20 
  }
});
//export default Login ;
const mapStateToProps = state => {
  return {
    error: state.auth.error,
    user: state.auth.user,
    loading: state.auth.loading,
    resetForm: state.auth.resetForm
  };
};
export default connect(
  mapStateToProps,
  { loginUser, signUpUser }
)(Login);
