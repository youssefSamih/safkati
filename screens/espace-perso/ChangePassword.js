import React from 'react';
import {View, StyleSheet, LayoutAnimation, UIManager, KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { 
	Container, 
	Header, 
	Content, 
	Left, 
	Body, 
	Right, 
	Button,
	Icon, 
	Title,
	Text,
	Label,
	Input,
	CheckBox,
	Item,
	Form,
	Thumbnail,
	H2,
	Separator,
	Spinner
} from 'native-base';

import i18n from '../../i18n/i18n';
import Enconstruction from '../EnConstuction';
import {Block} from '../../components';
import { theme, params } from '../../constants';
import { connect } from 'react-redux';
import {changePassword, initialForm} from '../../redux/actions';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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

	constructor(props){
		super(props);
		 this.state = {
			actualPassword:'',
			password:'',
			comfirmPassword:'',
			isPasswordValid: true,
			isComfirmValid: true,
		}
	}
	componentDidUpdate(){
		if(this.props.reset){
	  		this.props.initialForm();
	    	this.setState({
			    actualPassword:'',
				password:'',
				comfirmPassword:'',
				isPasswordValid: true,
				isComfirmValid: true,
		    });
		}
	}

	changePassword(){
		const {
			actualPassword,
			password,
			comfirmPassword,
		} = this.state ; 

		const isPasswordValid = password.length >= 6 ;
	    const isComfirmValid =
	      password === comfirmPassword ;
		if(isPasswordValid && isComfirmValid){
			this.props.changePassword({actualPassword, password, smsar_id: this.props.user.id});
		}
		setTimeout(() => {
	      LayoutAnimation.easeInEaseOut();
	      this.setState({
	        isPasswordValid,
	        isComfirmValid,
	      });
	    }, 1000);

	}
	renderButton(){
	    if(this.props.loading){
	      return <Spinner size="large" />
	    }
	    return(
	      <Button block  style={styles.mb15} onPress={this.changePassword.bind(this)} >
	       <Text>{i18n.t('Save')}</Text>
	    </Button>
	    );
	}

	render(){
		const {
			actualPassword,
			password,
			comfirmPassword,
			isPasswordValid,
			isComfirmValid,
		} = this.state ;
		isLoading = this.props.loading;
		return( 
			<Container>
				<Header noRight>
				  <Left>
			          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
			            <Icon name="arrow-back" />
			          </Button>
			      </Left>
				  <Body>
				    <Title>{i18n.t('Change password title')}</Title>
				  </Body>
				</Header>
			    <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
				<Content>
				<Block center padding={18}>
			       	<Thumbnail
			       	  large
			       	  style={styles.logoImg}
			          source={params.app.FACE} />
				      <H2>{i18n.t('Change password title')}</H2>
			       </Block>
			       <Separator bordered />
			       <Form>
				 	<Item floatingLabel disabled={isLoading} >
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
		            <Item  floatingLabel error={!isPasswordValid} disabled={isLoading} >
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
		            <Item  floatingLabel error={!isComfirmValid} disabled={isLoading} >
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
		            <View style={{paddingTop: 24}} />
		            {this.renderButton()}
		            </Form>
				</Content>
		            </KeyboardAvoidingView>
			</Container>
		);
	}
}

const styles = StyleSheet.create({

	logoImg:{
	    backgroundColor: '#eee',
	}

});

const mapStateToProps = (state) => ({
  	user: state.auth.user,
  	loading: state.form.loading,
  	reset: state.form.reset,
  	error: state.form.error,
});

export default connect(mapStateToProps, {changePassword, initialForm})(ChangePassword) ;