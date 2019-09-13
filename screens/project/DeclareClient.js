import React from 'react';
import _ from 'lodash';
import {View , ScrollView, StyleSheet, Image,LayoutAnimation, UIManager} from 'react-native';

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
	Picker
} from 'native-base';

import { connect } from 'react-redux';
import { fetchProjects ,declareClient} from '../../redux/actions';
import strings from "../../values/strings";
import {Block} from '../../components';
import { theme, params } from '../../constants';
import i18n from '../../i18n/i18n';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class DeclareClient extends React.Component {

	componentWillMount(){
		this.props.fetchProjects();

		//this.createDataSource(this.props)
	}

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
	      selectedProject: this.props.navigation.getParam('projectId',null),
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
	      budget:'',
	      type_de_bien:'A',
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
		const {nom,prenom, phone, age, email, cin, sexe, selectedProject,adress, budget,type_de_bien} = this.state ;
    	const isEmailValid = !email || this.validateEmail(email) ;
    	const isNomValid = nom.length >= 3 ;
    	const isPrenomValid = prenom.length >= 3 ;
    	const isAdressValid = adress.length >= 3 ;
    	const isCinValid = cin.length >= 3 ;
    	const isBudgetValid = budget ;
    	const isTypeValid = type_de_bien;
    	const isSelectedProjet = selectedProject;
    	const isPhoneValid =  this.validatePhone(phone) ;

    	//this.setState({isEmailValid,isNomValid,isPhoneValid});
    	if(isEmailValid && isNomValid && isPrenomValid && isPhoneValid && isAdressValid && isCinValid && isBudgetValid && isTypeValid && isSelectedProjet){
			this.props.declareClient({nom,prenom, phone, age, email, cin, sexe, selectedProject,adress, budget,type_de_bien, smsar_id: this.props.user.id});
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
	renderButton(){
	    if(this.props.loading){
	      return <Spinner />
	    }
	    return(
	      <Button rounded onPress={ this.onPressDeclare.bind(this)}>
			<Text>{i18n.t('Declare client')}</Text>
		  </Button>
	    );
	  }

	render(){
		const {isEmailValid,isNomValid,isPhoneValid,isAgeValid,isProjectValid,isPrenomValid,isCinValid,isAdressValid,isBudgetValid,isTypeValid, isSelectedProjet} = this.state;
	    const isLoading = this.props.loading;
		
		return (
			<Container>
				<Content>
				<Block center>
		       		<Image
		       	 		style={styles.logoImg}
		          		source={params.app.LOGO} />
		          	<H1 style={{color:'#AA2D5A'}}>{i18n.t('Declare a client')}</H1>
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
		              onChangeText={ this.onNomChange.bind(this) }
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
		              onChangeText={ this.onEmailChange.bind(this) }
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
		              onChangeText={ this.onPhoneChange.bind(this) }
		              keyboardType="phone-pad"
		             />
				</Item>

				<Item inlineLabel error={!isBudgetValid} disabled={isLoading}>
				    <Label>{i18n.t('Budget *')}</Label>
				    <Input
		              placeholder={''}
		              value={this.state.budget}
		              keyboardAppearance="light"
	                  autoFocus={false}
	                  autoCapitalize="none"
	                  keyboardType="numeric"
	                  autoCorrect={false}
		              onChangeText={budget => this.setState({ budget }) }
		             />
				</Item>
				{/*<Item inlineLabel error={!isAgeValid} disabled={isLoading}>
				    <Label>{i18n.t('Age *')}</Label>
				    <Input
		              placeholder={''}
		              value={this.state.age}
		              keyboardAppearance="light"
	                  autoFocus={false}
	                  autoCapitalize="none"
	                  autoCorrect={false}
	                  keyboardType="numeric"
		              maxLength={3}
		              onChangeText={ this.onAgeChange.bind(this) }
		             />
				</Item>*/}
				<Item inlineLabel error={!isTypeValid} disabled={isLoading}>
				    <Label>{i18n.t('type de bien *')}</Label>
		            <Picker 
		             placeholder={''}
		             mode="dropdown"
					 style={{ width: undefined }}
					 selectedValue={this.state.type_de_bien}
					 onValueChange={ type_de_bien => this.setState({type_de_bien}) }
					 >
					 
					 <Picker.Item label={i18n.t('Apartment')} value="A" />
					 <Picker.Item label={i18n.t('Ground')} value="T" />
					 <Picker.Item label={i18n.t('Villa')} value="V" />
				  	</Picker>
				</Item>
				{/*<Item >
					<Label>{i18n.t('Sexe *')}</Label>
		            <Picker 
		             placeholder={''}
		             mode="dropdown"
					 style={{ width: undefined }}
					 selectedValue={this.state.sexe}
					 onValueChange={this.onSexeChange.bind(this)}
					 >
					 
					 <Picker.Item label={strings.gender_m} value="H" />
					 <Picker.Item label={strings.gender_f} value="F" />
				  	</Picker>
				</Item>*/}
	            <Item style={{borderBottomWidth:0}} error={!isSelectedProjet}>
	            	<Label> {i18n.t('default project')} </Label>
					 <Picker 
					 placeholder={''}
					 mode="dropdown"
					 style={{ width: undefined }}
					 selectedValue={this.state.selectedProject}
					 onValueChange={this.onSelectedProject.bind(this)}
					 >
					 {
					 	this.props.projects.map( (val,index) =>{
					 		return <Picker.Item label={val.libelle} value={val.id} key={index} />;
					 		 
					 	})
					 }
					 	
					 </Picker>
	            </Item>

				</Form>
				
			
			</Card>
				<View style={{height:10}}></View>
				{this.renderButton()}
				<View style={{height:10}}></View>
				
			</Block>
			</Content>
			</Container>

		);
	}
};

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
		height: 150,
	    width: 150,
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