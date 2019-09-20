import React from 'react';
import {View, Image, StyleSheet , LayoutAnimation, UIManager} from 'react-native';
import i18n from '../i18n/i18n';

import {Block} from '../components';
import { theme, params } from '../constants';

import { signUpUser } from '../redux/actions';
import {connect} from 'react-redux';

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
	Thumbnail
} from 'native-base';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


class SignUp extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    
	  });
	constructor(props) {
	    super(props);

	    this.state = {
	      nom: '',
	      prenom: '',
	      phone: '',
	      adress: '',
	      email: '',
	      password: '',
	      cin:'',
	      ville:'',
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
	      error: '' 
	    };

	    this.signUp = this.signUp.bind(this);
	}
	validateEmail(email) {
	    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	    return re.test(email);
	}
  	signUp() {

  		const { prenom, nom, phone, email, ville, password, passwordConfirmation, cin, adress, entrepreneur, cgu } = this.state;
	    const isEmailValid = !email || this.validateEmail(email);
	    const isNomValid = nom.length >= 3 ;
	    const isPrenomValid = prenom.length >= 3 ;
	    const isAdressValid = adress.length >= 3 ;
	    const isCinValid = cin.length >= 6 ;
	    const isCguValid = cgu ;
	    const isEntrepreneurValid = entrepreneur ;
	    const isPhoneValid = phone.length >= 8 ;
	    const isPasswordValid = password.length >= 6 ;
	    const isVilleValid = ville;
	    const isConfirmationValid =
	      password === passwordConfirmation ;

	    if(isVilleValid && isEmailValid && isNomValid && isPrenomValid && isAdressValid && isPhoneValid && isPasswordValid && isConfirmationValid && isCinValid && isCguValid && isEntrepreneurValid){
	      	this.props.signUpUser({ prenom, nom, phone, email, ville, password, passwordConfirmation, cin, adress, entrepreneur, cgu });
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
			isVilleValid,
	      });
	    }, 1000);
  	}
	renderButton(){
	    if(this.props.loading){
	      return <Spinner size="large" />
	    }
	    return(
	      <Button rounded onPress={this.signUp}>
	       <Text>{i18n.t('Sign Up')}</Text>
	    </Button>
	    );
	}

	render(){
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
	      entrepreneur,
	      cgu,
	      phone,
	      email,
	      password,
	      passwordConfirmation,
	      ville
	    } = this.state;
	    const isLoading = this.props.loading;

		return( 
			<Container>
				<Content>
				<Block center padding={18}>
		       		<Thumbnail
		       	  		large
		       	 		style={styles.logoImg}
		          		source={params.app.LOGO} />
		          	<H1 style={{color:theme.colors.primary}}>{i18n.t('Become partner',{ appName: params.app.name })}</H1>
		       </Block>
					
			       <Block center>
			       <Card style={{width:'90%',paddingBottom:10,borderRadius:30}} bordred>
						 <Form>
				            <Item inlineLabel error={!isNomValid} disabled={isLoading}>
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
				            <Item inlineLabel error={!isPrenomValid} disabled={isLoading}>
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
				            <Item inlineLabel error={!isAdressValid} disabled={isLoading}>
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
				            <Item inlineLabel error={!isVilleValid} disabled={isLoading}>
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
				            <Item inlineLabel error={!isEmailValid} disabled={isLoading}>
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
				            <Item inlineLabel error={!isCinValid} disabled={isLoading}>
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
				            <Item inlineLabel error={!isPhoneValid} disabled={isLoading}>
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
				            <Item inlineLabel error={!isEntrepreneurValid} style={{height:45}}>
				              <Label>{i18n.t('entrepreneur *')}</Label>
				              <CheckBox
				              checked={this.state.entrepreneur}
				              onPress={() => this.setState({entrepreneur: !this.state.entrepreneur})}
				            />
				            </Item>
				            <Item inlineLabel  error={!isPasswordValid} disabled={isLoading} >
				              <Label>{i18n.t('Enter your password *')}</Label>
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
				            <Item inlineLabel  error={!isConfirmationValid} disabled={isLoading}>
				              <Label>{i18n.t('Comfirm your password *')}</Label>
				              <Input secureTextEntry 
				              value={passwordConfirmation}
			                  keyboardAppearance="light"
			                  autoFocus={false}
			                  autoCapitalize="none"
			                  autoCorrect={false}
			                  returnKeyType="next"
			                  placeholder={''}
			                  onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
			                  />
				            </Item>
				            <Item inlineLabel  style={{height:45,borderBottomWidth:0}} >
				              <Label>{i18n.t('Accept CGU')}</Label>
				              <CheckBox
					              checked={this.state.cgu}
					              onPress={() => this.setState({cgu: !this.state.cgu})}
					            />
				            </Item>
					            {!isCguValid && <Text small style={{paddingLeft: 20,color:'red'}}>{i18n.t('Accept CGU')}</Text>}
				          </Form>
					</Card>
					<View style={{height:10}}></View>
					{this.renderButton()}
					<View style={{height:10}}></View>
					</Block>
				</Content>
				<Footer style={{padding:3}}>
				<FooterTab>
				<Grid>
		          <Col size={1}>
		          	<Right>
			          <Image
			          	style={styles.faceImg}
				        source={params.app.LOGO} />
			        </Right>
			       </Col>
		          <Col size={3}>
		            <Row>
		            <Text style={styles.footerText}>{i18n.t('Caller')}</Text>
		            </Row>
		            <Row>
		            <Text style={styles.footerText}>{i18n.t('Caller Contact')}</Text>
		            </Row>
		          </Col>
		        </Grid>
		        </FooterTab>
				</Footer>
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
	faceImg: {
		height: 50,
	    width: 50,
	    backgroundColor: '#eee',
	    borderRadius: 100,
	},
	footerText:{
		color:'white',
		fontSize: 12
	}
});

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    resetForm: state.auth.resetForm
  };
};

export default connect(mapStateToProps, {signUpUser})(SignUp) ;