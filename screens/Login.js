import React from 'react';
import {View, StyleSheet, LayoutAnimation, UIManager,I18nManager,AsyncStorage, KeyboardAvoidingView} from 'react-native';

import { connect } from 'react-redux';
import { loginUser, signUpUser } from '../redux/actions';

import i18n from '../i18n/i18n';
import { 
	Container, 
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
	H1 

} from 'native-base';

import {Block} from '../components';
import { theme, params } from '../constants';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Login extends React.Component {
	 
    static navigationOptions = {
    	header: null,
	  };
	// _isMounted = false;
	  constructor(props) {
	    super(props);

	    this.state = {
	      username: '',
	      password: '',
	      //isLoading: false,
	      isUsernameValid: true,
	      isPasswordValid: true,
	      error: '' 
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
    const isUsernameValid = username.length >= 6;// || this.emailInput.shake();
    //const isEmailValid = this.validateEmail(email);// || this.emailInput.shake();
    const isPasswordValid = password.length >= 6 ;//|| this.passwordInput.shake();
    if(isUsernameValid && isPasswordValid){
         // Simulate an API call
       this.props.loginUser({username, password}); 
    }

    setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
          isUsernameValid,
          isPasswordValid,
        });
      }, 1000);
    
  }

	  renderError(){
	    if(this.props.error){
	      return (
	        <View style={{backgroundColor: 'white'}}>
	          <Text style={styles.errorTextStyle}>
	          {this.props.error}
	          </Text>
	        </View>
	        );
	    }
	  }
	  renderButton(){
	    if(this.props.loading){
	      return <Spinner size="large" />
	    }
	    return(
	      <Button rounded onPress={this.login.bind(this)}>
           <Text>{i18n.t('Log in')}</Text>
        </Button>
	    );
	  }

	render(){
		const {
	      isUsernameValid,
	      isPasswordValid,
	      username,
	      password
	    } = this.state;
	    const isLoading = this.props.loading;

		return( 
			
			<Container style={styles.container}>
			    <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
	        <Content>
	        <Block center padding={18}>
	       		<Thumbnail
	       	  		large
	       	 		style={styles.logoImg}
	          		source={params.app.LOGO} />
	          		<H1 style={{color:theme.colors.primary}}>{i18n.t('sign in')}</H1>
	       </Block>

	        <Block padding={[0, theme.sizes.base * 2]}>
		        <Block middle >
		          <Form >
		              <Label style={styles.labelText}>{i18n.t('Username')} </Label>
		            <Item rounded error={!isUsernameValid} disabled={isLoading}>
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
	                  placeholder={i18n.t('username placeholder')}
	                  onChangeText={username => this.setState({ username })}
	                  
		              />
		             {isUsernameValid || <IconNB name="ios-close-circle" /> } 
		            </Item>
		              <Label style={styles.labelText}>{i18n.t('Password')}</Label>
		            <Item rounded error={!isPasswordValid} disabled={isLoading}>
		              <Input  
		              //ref={input => (this.passwordInput = input)}
		              disabled={isLoading}
		              value={password}
	                  keyboardAppearance="light"
	                  autoCapitalize="none"
	                  autoCorrect={false}
	                  secureTextEntry={true}
	                  returnKeyType={'done'}
	                  blurOnSubmit={true}
	                  placeholder={i18n.t('password placeholder')}
	                  onChangeText={password => this.setState({ password })}
	                  onSubmitEditing={() => this.login() }
	                  />
		             {isPasswordValid || <IconNB name="ios-close-circle" /> } 
		            </Item>
		          </Form>
		          {this.renderError()}
		          <Button transparent  onPress={() => this.props.navigation.navigate('Forgot')}>
		              <Text>
		                {i18n.t('Forgot your password?')}
		              </Text>
		           </Button>
		         </Block>
		         <Block center>
		         	{this.renderButton()}
			        
			        <Button transparent  onPress={() => this.props.navigation.navigate('SignUp')}>
			           <Text>{i18n.t('Create an account')}</Text>
			        </Button>
		         </Block>
	         </Block>
	        </Content>
			</KeyboardAvoidingView>
	      </Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	logoImg:{
	    backgroundColor: '#eee',
	},
	header: {
		backgroundColor: "#AA2D5A"
	},
	labelText:{
		fontSize: 18,
		padding: 10,
	},
	errorTextStyle:{
	    fontSize: 20,
	    alignSelf: 'center',
	    color: 'red'
	}
});
//export default Login ;
const mapStateToProps = (state) =>{
  return {
    error: state.auth.error,
    user: state.auth.user,
    loading: state.auth.loading,
    resetForm: state.auth.resetForm
  };
};
export default connect(mapStateToProps, 
{loginUser, signUpUser})(Login);