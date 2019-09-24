import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';

import {
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	USER_UPDATE,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	INITIAL_SELECTED_CLIENT,
	PARRAINE_START,
	PARRAINE_SUCCESS,
	PARRAINE_FAIL,
	INITIAL_FORM,
	FETCH_PARRAINAGES,
	FETCH_COMMISSIONS,
	PW_CHANGE_START,
	PW_CHANGE_SUCCESS,
	PW_CHANGE_FAIL
} from './types';

import {
	API_MONESPACE, 
	API_PARRAINE, 
	API_MESPARRAINE,
	API_COMMISSIONS,
	API_UPDATE,
	API_UPDATE_PW
} from './urls';

import i18n from '../../i18n/i18n';
import strings from '../../values/strings';
const alert = strings.alert;

export const getUserInfo = ({id}) => {
	return (dispatch) =>{
		axios.get(`${API_MONESPACE}?id=${id}`)
		.then(res => getInfoSuccess(dispatch,res.data))
		.catch(error => getInfoFail(dispatch));
	};
}

export const updateCompte = (obj) => {
	console.log(obj);

	return (dispatch) => {
		dispatch({type: USER_UPDATE});
		console.log("obj" , obj);

		axios.post(API_UPDATE, obj)
		.then(async (res) =>{
			console.log(res.data);
			if(res.status == 201){
	    		await AsyncStorage.setItem('currentUser', JSON.stringify(res.data.user));
	    		updateUserSuccess(dispatch, res.data.user);
	    		
	    	}else{
	    		updateUserFail(dispatch)
	    	}
		})
		.catch((e) => {
			console.log(e);
			updateUserFail(dispatch)
		});

	}

}

export const changePassword = (obj) => {
	return (dispatch) => {
		dispatch({type:PW_CHANGE_START});
		console.log("obj" , obj);
		axios.post(API_UPDATE_PW,obj)
		.then((res) =>{
			if(res.status == 201){
				console.log(res);
				changePasswordSuccessed(dispatch,res.data);
			}else{
				changePasswordFailed(dispatch,res.data);
			}
			
		})
		.catch( 
			e => {
				console.log(e);
				changePasswordFailed(dispatch);
			} 
		);

	}

}

export const initialForm = () =>{
	return {
		type: INITIAL_FORM
	}
}

export const parraineSmsar = (obj) =>{
	console.log(API_PARRAINE);
	return (dispatch) =>{
		dispatch({type:PARRAINE_START});
		axios.post(`${API_PARRAINE}`,obj)
		.then((res) => {
			console.log(res.data);
			parraineSuccess(dispatch,res.data);
		})
		.catch((e) => {
			console.log(e);
			parraineFail(dispatch,res.data);
		});
	}
}

export const fetchParrainage = (smsar_id) =>{
	return (dispatch) =>{
		axios.get(`${API_MESPARRAINE}?id=${smsar_id}`)
		.then( (res) =>{
			dispatch({
				type: FETCH_PARRAINAGES,
				payload: res.data
			});
		})
		.catch((e) => {
			console.log(e);
		});
	}
}

export const fetchCommissions = (smsar_id) =>{
	return (dispatch) => {
		axios.get(`${API_COMMISSIONS}?id=${smsar_id}`)
		.then( (res) =>{
			dispatch({
				type: FETCH_COMMISSIONS,
				payload: res.data
			});
		})
		.catch((e) =>{
			console.log(e);
		});
	}
}

export const selectedClient = (data) =>{
	console.log("data ",data);
	return {
		type: INITIAL_SELECTED_CLIENT,
		payload: data,
	}
}

const parraineSuccess = (dispatch,data) =>{
	dispatch({
		type: PARRAINE_SUCCESS,
		payload:data,
	});
	Alert.alert(
		i18n.t('Sponsorship title'),
		data.message,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}
const parraineFail = (dispatch) =>{
	dispatch({
		type: PARRAINE_FAIL
	});
	Alert.alert(
		i18n.t('Sponsorship title'),
		"Unable to create parrainage",
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}

const getInfoSuccess = (dispatch, info)=>{
	dispatch({
		type: GET_USER_INFO_SUCCESS,
		payload: info
	});
}
const getInfoFail = (dispatch)=>{
	dispatch({
		type: GET_USER_INFO_FAIL
	});
}


const updateUserSuccess = (dispatch, user) =>{
	dispatch({
		type: USER_UPDATE_SUCCESS,
		payload: user 
	});
	Alert.alert(
		'Auth',
		alert.user_update,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}
const updateUserFail = (dispatch) =>{
	dispatch({type: USER_UPDATE_FAIL});
	Alert.alert(
		'Auth',
		alert.unable_user_update,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}

const changePasswordSuccessed = (dispatch, data) =>{
	dispatch({
		type: PW_CHANGE_SUCCESS,
		payload:data,
	});
	Alert.alert(
		i18n.t('Change password title'),
		data.message,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}
const changePasswordFailed = (dispatch, data={}) =>{
	dispatch({
		type: PW_CHANGE_FAIL
	});
	Alert.alert(
		i18n.t('Change password title'),
		data.message || 'Unable to change password',
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}