import React from 'react';
import _ from 'lodash';
import {View , Text, Picker, ScrollView} from 'react-native';

import { Input, Button, Icon, Spinner } from 'native-base';

import { connect } from 'react-redux';
import { fetchProjects ,declareClient} from '../../redux/actions';
import strings from "../../values/strings";

class DeclareClient extends React.Component {

	componentWillMount(){
		this.props.fetchProjects();

		//this.createDataSource(this.props)
	}

	constructor(props){
	    super(props);
	    this.state = {
	      nom: '',
	      phone: '',
	      age: '',
	      email:'',
	      sexe:'H',
	      selectedProject: props.selectedProject,
	      isNomValid: true,
	      isPhoneValid: true,
	      isAgeValid: true,
	      isEmailValid: true,
	      isProjectValid: true,
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
	onNomChange(value){
		this.setState({nom:value});
	}
	onPhoneChange(value){
		this.setState({phone:value});
	}
	onAgeChange(value){
		this.setState({age:value});
	}
	onSexeChange(value){
		this.setState({sexe:value});
	}
	onEmailChange(value){
		this.setState({email:value});
	}
	onSelectedProject(value){
		this.setState({selectedProject:value});
		console.log(value);
	}
	onPressDeclare(){
		const {nom, phone, age, email, sexe, selectedProject} = this.state ;
    	const isEmailValid = this.validateEmail(email) || this.emailInput.shake();
    	const isNomValid = nom.length >= 3 || this.nomInput.shake();
    	const isPhoneValid =  this.validatePhone(phone) || this.phoneInput.shake();

    	this.setState({isEmailValid,isNomValid,isPhoneValid});
    	if(isEmailValid && isNomValid && isPhoneValid){
			this.props.declareClient({nom, phone, age, email, sexe, selectedProject, smsar_id: this.props.user.id});

    	}
	}
	renderButton(){
	    if(this.props.loading){
	      return <Spinner size="large" />
	    }
	    return(
	      <Button onPress={ this.onPressDeclare.bind(this)}>
			Declare
		  </Button>
	    );
	  }

	render(){
		//console.log('nnnn', this.props.user);
		const {isEmailValid,isNomValid,isPhoneValid,isAgeValid,isProjectValid} = this.state;
		return (
		 <ScrollView style={{backgroundColor: 'white'}} keyboardShouldPersistTaps="handled">
			<View>
		
				
					<Input
		              label={strings.nom}
		              placeholder={strings.nom_placeholder} 
		              value={this.state.nom}
		              labelStyle={styles.labelStyle}
		              onChangeText={ this.onNomChange.bind(this) }
		              containerStyle={{marginTop: 16}}
		              ref={input => (this.nomInput = input)}
		              errorMessage={
	                    isNomValid ? null : strings.nom_not_valid
	                  }
                    />
				
				
					<Input
		              label={strings.phone}
		              placeholder={strings.phone_placeholder}
		              labelStyle={styles.labelStyle}
		              value={this.state.phone}
		              onChangeText={ this.onPhoneChange.bind(this) }
		              keyboardType="phone-pad"
		              ref={input => (this.phoneInput = input)}
		              errorMessage={
	                    isPhoneValid ? null : strings.phone_not_valid
	                  }/>
				
					<Input
		              label={strings.email}
		              placeholder={strings.email_placeholder}
		              labelStyle={styles.labelStyle}
		              value={this.state.email}
		              keyboardAppearance="light"
	                  autoFocus={false}
	                  autoCapitalize="none"
	                  autoCorrect={false}
	                  keyboardType="email-address"
	                  returnKeyType="next"
		              onChangeText={ this.onEmailChange.bind(this) }
		              ref={input => (this.emailInput = input)}
		              errorMessage={
	                    isEmailValid ? null : strings.email_not_valid
	                  }
	                  />
					<Input
		              label={strings.age}
		              placeholder={strings.age_placeholder}
		              labelStyle={styles.labelStyle}
		              value={this.state.age}
		              keyboardType="numeric"
		              maxLength={3}
		              onChangeText={ this.onAgeChange.bind(this) }
		              ref={input => (this.ageInput = input)}
		              errorMessage={
	                    isAgeValid ? null : strings.age_not_valid
	                  }
	                  />
				
				
					<Text style={styles.textStyle}> {strings.sexe} </Text>
		              <Picker 
					 style={styles.pickerStyle}
					 selectedValue={this.state.sexe}
					 onValueChange={this.onSexeChange.bind(this)}
					 >
					 
					 <Picker.Item label={strings.gender_m} value="H" />
					 <Picker.Item label={strings.gender_f} value="F" />
				  </Picker>
				
				
					<Text style={styles.textStyle}> {strings.project} </Text>
					 <Picker 
					 style={styles.pickerStyle}
					 selectedValue={this.state.selectedProject}
					 onValueChange={this.onSelectedProject.bind(this)}
					 >
					 {
					 	this.props.projects.map( (val,index) =>{
					 		return <Picker.Item label={val.libelle} value={val.id} key={index} />;
					 		 
					 	})
					 }
					 	
					 </Picker>
				
				
				{/*this.renderButton()*/}
				
				
                 <Button
                  //buttonStyle={styles.loginButton}
                  containerStyle={{ marginTop: 32, flex: 0 }}
                  activeOpacity={0.8}
                  title={"Declare"}
                  onPress={this.onPressDeclare.bind(this)}
                  //titleStyle={styles.loginTextButton}
                  loading={this.props.loading}
                  disabled={this.props.loading}
                />
                
			
			</View>
			</ScrollView>


		);
	}
};

const styles = {
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
	}
};

const mapStatoToProps = (state) => {
	const projects = _.map(state.projects.projectsList, (val, uid) => {
		const {id,libelle,description,lieu,address} = val
		return  {id,libelle,description,lieu,address} ; 
	});

	return {
		projects,
		user: state.auth.user,
		loading: state.projects.loading
	};
}

export default connect(mapStatoToProps, {fetchProjects,declareClient})(DeclareClient);