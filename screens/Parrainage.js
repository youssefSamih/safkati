import React from 'react';
import {View , ScrollView, StyleSheet, LayoutAnimation, UIManager, KeyboardAvoidingView} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { 
	Container, 
	Content,
	Header,
	Body,
	Title,
	Footer, 
	Right, 
	Left, 
	Icon, 
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
	Picker,
	Thumbnail
} from 'native-base';
import { connect } from 'react-redux';
import { parraineSmsar, initialForm } from '../redux/actions';

import i18n from '../i18n/i18n';
import Enconstruction from './EnConstuction';
import {Block} from '../components';
import { theme, params } from '../constants';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Parrainage extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('Sponsorship title'),
	    drawerLabel: i18n.t('Sponsorship label'),
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-menu"
				size={32}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });

	constructor(props){
	    super(props);
	    this.state = {
	      nom: '',
	      prenom: '',
	      adress:'',
	      phone: '',
	      age: '',
	      email:'',
	      sexe:'H',
	      cin:'',
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

	  componentDidUpdate(){
	  	if(this.props.reset){
	  		this.props.initialForm();
	    	this.setState({
		      nom: '',
		      prenom: '',
		      adress:'',
		      phone: '',
		      age: '',
		      email:'',
		      sexe:'H',
		      cin:'',
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

	  parraine(){
	  	const { prenom, nom, phone, email, cin, adress, entrepreneur, cgu } = this.state;
	    const isEmailValid = !email || this.validateEmail(email);
	    const isNomValid = nom.length >= 3 ;
	    const isPrenomValid = prenom.length >= 3 ;
	    const isAdressValid = adress.length >= 3 ;
	    const isCinValid = cin.length >= 6 ;
	    const isCguValid = cgu ;
	    const isEntrepreneurValid = entrepreneur ;
	    const isPhoneValid = phone.length >= 8 ;
	    

	    if(isEmailValid && isNomValid && isPrenomValid && isAdressValid && isPhoneValid &&  isCinValid && isCguValid && isEntrepreneurValid){
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

	  renderButton(){
	    if(this.props.loading){
	      return <Spinner />
	    }
	    return(
	      <Button rounded onPress={this.parraine.bind(this)}>
			<Text>{i18n.t('I sponsor')}</Text>
		  </Button>
	    );
	  }

	render(){
		const {isEmailValid,isNomValid,isPhoneValid,isAgeValid,isPrenomValid,isCinValid,isAdressValid,isTypeValid,isEntrepreneurValid,isCguValid} = this.state;
	    const isLoading = this.props.loading;
	    
		return( 
			<Container>
				<Header noRight>
				  <Left>
				    <Button transparent onPress={() =>  this.props.navigation.openDrawer()}>
				      <Icon name="menu" />
				    </Button>
				  </Left>
				  <Body>
				    <Title>{i18n.t('Sponsorship title')}</Title>
				  </Body>
				</Header>

			    <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
				<Content>
			       <Block center padding={18}>
			       		<Thumbnail
			       	  		large
			       	 		style={styles.logoImg}
			          		source={params.app.LOGO} />
			          	<H1 style={{color:theme.colors.primary}}>{i18n.t('Sponsorship title')}</H1>
			       </Block>
				    <Block center>
				    <Card style={{width:'90%',paddingBottom:10,borderRadius:30}} bordred>
			 
					<Form>
					<Item inlineLabel error={!isNomValid} disabled={isLoading}>
					    <Label>{i18n.t('Last Name *')}</Label>
					
						<Input
						  keyboardAppearance="light"
		                  autoFocus={true}
		                  autoCapitalize="none"
		                  autoCorrect={false}
			              placeholder={''}
			              value={this.state.nom}
			              onChangeText={nom => this.setState({ nom }) }
	                    />
					</Item>
					<Item inlineLabel error={!isPrenomValid} disabled={isLoading}>
					    <Label>{i18n.t('First Name *')}</Label>
						<Input
						  keyboardAppearance="light"
		                  autoFocus={false}
		                  autoCapitalize="none"
		                  autoCorrect={false}
			              placeholder={''} 
			              value={this.state.prenom}
			              onChangeText={ prenom => this.setState({ prenom }) }
	                    />
					</Item>
					
					<Item inlineLabel error={!isAdressValid} disabled={isLoading}>
		              <Label>{i18n.t('Adress *')}</Label>
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
		              <Label>{i18n.t('CIN *')}</Label>
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
		              <Label>{i18n.t('Email')}</Label>
		              
	                  <Input
			              placeholder={''}
			              value={this.state.email}
			              keyboardAppearance="light"
		                  autoFocus={false}
		                  autoCapitalize="none"
		                  autoCorrect={false}
		                  keyboardType="email-address"
			              onChangeText={ email => this.setState({ email }) }
		                  />
		            </Item>
		            <Item inlineLabel error={!isPhoneValid} disabled={isLoading}>
					    <Label>{i18n.t('phone *')}</Label>
					    <Input
			              placeholder={''}
			              value={this.state.phone}
			              keyboardAppearance="light"
		                  autoFocus={false}
		                  autoCapitalize="none"
		                  autoCorrect={false}
			              onChangeText={ phone => this.setState({ phone }) }
			              keyboardType="phone-pad"
			             />
					</Item>
					<Item inlineLabel error={!isEntrepreneurValid} style={{height:45}}>
		              <Label>{i18n.t('entrepreneur *')}</Label>
		              <CheckBox
		              checked={this.state.entrepreneur}
		              onPress={() => this.setState({entrepreneur: !this.state.entrepreneur})}
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
			    </KeyboardAvoidingView>

			</Container>
		);
	}
}

const styles = StyleSheet.create({
	labelStyle:{
		color:'#566270',
		fontSize:18,
		fontWeight:'bold',
	},
	textStyle:{
		color:'#566270',
		fontSize:18,
		fontWeight:'600',
		marginLeft: 5
	},
	pickerStyle:{
		marginLeft: 5
	},
	container:{
		flex: 1,
	},
	logoImg:{
	    backgroundColor: '#eee',
	    borderRadius: 100,
	},
	faceImg: {
		height: 50,
	    width: 50,
	    backgroundColor: '#eee',
	    borderRadius: 100,
	},
	footerText:{
		color:'white',
		fontSize: 18
	}
});

const mapStateToProps = (state) => ({
  	user: state.auth.user,
  	loading: state.form.loading,
  	reset: state.form.reset,
  	error: state.form.error,
});

export default connect(mapStateToProps, { parraineSmsar, initialForm })(Parrainage) ;