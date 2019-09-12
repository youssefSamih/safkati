import axios from 'axios';
import { Alert } from 'react-native';
//import { Actions } from 'react-native-router-flux';

import {
	PROJECTS_FETCH,
	PROJECTS_FETCH_SUCCESS,
	DECLARE_CLIENT_START,
	DECLARE_CLIENT_SUCCESS,
	DECLARE_CLIENT_FAIL
} from './types';
import {
	API_PROJECTS,
	API_DECLARE_CLIENT,
	API_PROJECT_INFO
} from './urls';
import strings from '../../values/strings';
const alert = strings.alert;

export const declareClient = ({nom,prenom, phone, age, email, sexe, selectedProject,address, budget,type_de_bien,smsar_id}) => {

	return (dispatch) =>{
		console.log({nom,prenom, phone, age, email, sexe, selectedProject,address, budget,type_de_bien,smsar_id});
		dispatch({type: DECLARE_CLIENT_START});
		axios.post(API_DECLARE_CLIENT,{nom,prenom, phone, age, email, sexe, selectedProject,address, budget,type_de_bien,smsar_id})
		.then(res => {
			console.log(res);
			if(res.status === 201){
				successDeclared(dispatch);
			}else{
				failedDeclared(dispatch);
			}
			
		}).catch(error =>{console.log(error);failedDeclared(dispatch);} );
		
	}

}


// get the listing of the project
export const fetchProjects = () =>{
	return (dispatch) =>{
		//console.log(API_PROJECTS);
		axios.get(API_PROJECTS)
		.then(res => successFetch(res.data, dispatch))
		.catch(error => console.log("FAITCHED DATA FAILD",error));
	}
};

// get the information of the selected project
export const infoProject = ({id}) =>{
	return (dispatch) => {
		axios.get(`${API_PROJECT_INFO}?id=${id}`)
		.then(res => console.log(res.data))
		.catch(error => console.log(error));
	}
};


const successFetch = (data, dispatch) => {

	dispatch({
		type: PROJECTS_FETCH_SUCCESS,
		payload: data
	});
};

const successDeclared = (dispatch) =>{
	dispatch({
		type: DECLARE_CLIENT_SUCCESS
	});
	Alert.alert(
		alert.declared_title,
		alert.declared_successfully,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
	// Actions.pop();
}

const failedDeclared = (dispatch) => {
	dispatch({
		type: DECLARE_CLIENT_FAIL
	});
	Alert.alert(
		alert.declared_title,
		alert.declared_fail,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}