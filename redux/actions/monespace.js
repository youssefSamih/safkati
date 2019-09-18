import axios from 'axios';
import { Alert } from 'react-native';

import {
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	INITIAL_SELECTED_CLIENT,
	PARRAINE_START,
	PARRAINE_SUCCESS,
	PARRAINE_FAIL,
	INITIAL_FORM,
	FETCH_PARRAINAGES,
	FETCH_COMMISSIONS
} from './types';

import {
	API_MONESPACE, 
	API_PARRAINE, 
	API_MESPARRAINE,
	API_COMMISSIONS
} from './urls';

import i18n from '../../i18n/i18n';

export const getUserInfo = ({id}) => {
	return (dispatch) =>{
		axios.get(`${API_MONESPACE}?id=${id}`)
		.then(res => getInfoSuccess(dispatch,res.data))
		.catch(error => getInfoFail(dispatch));
	};
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

