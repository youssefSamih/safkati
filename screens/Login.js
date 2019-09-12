import React from 'react';
import {View, StyleSheet, Image, LayoutAnimation, UIManager} from 'react-native';

import { connect } from 'react-redux';
import { loginUser, signUpUser } from '../redux/actions';

import i18n from '../i18n/i18n';
import { 
	Container, 
	Content, 
	Header,
	Footer, 
	Left, 
	Body, 
	Right, 
	Button, 
	Icon, 
	Title,
	Text,
	Form,
	Item,
	Label,
	IconNB,
	Input,
	Spinner 

} from 'native-base';

import {Block, Divider} from '../components';
import { theme, params } from '../constants';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Login extends React.Component {
	// _isMounted = false;
	  constructor(props) {
	    super(props);

	    this.state = {
	      email: '',
	      password: '',
	      //isLoading: false,
	      isEmailValid: true,
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
    const { email, password } = this.state;
    const isEmailValid = this.validateEmail(email);// || this.emailInput.shake();
    const isPasswordValid = password.length >= 6 ;//|| this.passwordInput.shake();
    if(isEmailValid && isPasswordValid){
         // Simulate an API call
       this.props.loginUser({email, password}); 
    }
    console.log({ email, password });
    setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
          isEmailValid,
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
	      isEmailValid,
	      isPasswordValid,
	      email,
	      password,
	      error
	    } = this.state;
	    const isLoading = this.props.loading;

		return( 
			
			<Container style={styles.container}>
	        <Content padder bordered>
	        <Block padding={[0, theme.sizes.base * 2]}>
		       <Divider style={{borderBottomWidth: 0}} />
		        <Block middle >
			        <Block center>
			       	<Image
			       	 style={styles.logoImg}
			          source={params.app.LOGO} />
			       </Block>
		          <Form style={{paddingTop: 20}}>
		              <Label style={styles.labelText}>{i18n.t('Username')} </Label>
		            <Item rounded error={!isEmailValid} disabled={isLoading}>
		              <Input 
		              //ref={input => (this.emailInput = input)}
		              disabled={isLoading}
		              value={email}
	                  keyboardAppearance="light"
	                  autoFocus={false}
	                  autoCapitalize="none"
	                  autoCorrect={false}
	                  keyboardType="email-address"
	                  returnKeyType="next"
	                  inputStyle={{ marginLeft: 10 }}
	                  placeholder={i18n.t('email placeholder')}
	                  onChangeText={email => this.setState({ email })}
	                  
		              />
		             {isEmailValid || <IconNB name="ios-close-circle" /> } 
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
	        
	      </Container>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	logoImg:{
		height: 150,
	    width: 150,
	    backgroundColor: '#eee',
	    borderRadius: 100,
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