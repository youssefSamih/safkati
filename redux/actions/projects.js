import axios from 'axios';
import { Alert } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import NavigationService from '../../navigation/NavigationService';

import {
	PROJECTS_FETCH,
	PROJECTS_FETCH_SUCCESS,
	DECLARE_CLIENT_START,
	DECLARE_CLIENT_SUCCESS,
	DECLARE_CLIENT_FAIL,
	GET_PROJET_INFO,
	GET_PROJET_INFO_SUCCESS,
	GET_PROJET_INFO_FAIL,
	INITIAL_PROJET_INFO
} from './types';
import {
	API_PROJECTS,
	API_DECLARE_CLIENT,
	API_PROJECT_INFO
} from './urls';

import i18n from '../../i18n/i18n';

export const declareClient = ({nom,prenom, phone, age, email, cin, sexe, selectedProject,adress, budget,type_de_bien,smsar_id}) => {

	return (dispatch) =>{
		console.log({nom,prenom, phone, age, email, cin, sexe, selectedProject,adress, budget,type_de_bien,smsar_id});
		dispatch({type: DECLARE_CLIENT_START});
		axios.post(API_DECLARE_CLIENT,{nom,prenom, phone, age, email, cin, sexe, selectedProject,adress, budget,type_de_bien,smsar_id})
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
		console.log(API_PROJECTS);
		axios.get(API_PROJECTS)
		.then(res => successFetch(res.data, dispatch))
		.catch(error => console.log("FAITCHED DATA FAILD",error));
	}
};
// initial the current projet
export const initialCurrentProjet = (data) =>{
	return{
		type: INITIAL_PROJET_INFO,
		payload: data
	}
}
// get the information of the selected project
export const infoProject = ({id}) =>{
	return (dispatch) => {
		dispatch({type: GET_PROJET_INFO})
		axios.get(`${API_PROJECT_INFO}?id=${id}`)
		.then(res => {
			console.log(res.data);
			dispatch({type:GET_PROJET_INFO_SUCCESS, payload:res.data});
		})
		.catch(error =>{ 
			console.log(error);
			dispatch({type:GET_PROJET_INFO_FAIL});
		});
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
		i18n.t('declared_title'),
		i18n.t('declared_successfully'),
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
	NavigationService.goBack();
	// Actions.pop();
}

const failedDeclared = (dispatch) => {
	dispatch({
		type: DECLARE_CLIENT_FAIL
	});
	Alert.alert(
		i18n.t('declared_title'),
		i18n.t('declared_fail'),
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}