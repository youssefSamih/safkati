import axios from 'axios';

import {
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
} from './types';

import {API_MONESPACE} from './urls';

export const getUserInfo = ({id}) => {
	return (dispatch) =>{
		axios.get(`${API_MONESPACE}?id=${id}`)
		.then(res => getInfoSuccess(dispatch,res.data))
		.catch(error => getInfoFail(dispatch));
	};
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