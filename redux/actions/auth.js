import axios  from 'axios';
//import { Actions } from 'react-native-router-flux';
import { AsyncStorage, Alert } from 'react-native';
import {API_LOGIN, API_SIGNUP} from './urls';
import {
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	USER_SET_CURRENT,
	USER_CREATE,
	USER_CREATE_SUCCESS,
	USER_CREATE_FAIL,
	INITIAL_ALL_STATE
} from './types';
import strings from '../../values/strings';
const alert = strings.alert;

export const setCurrentUser = ({user}) =>{
	return {
		type: USER_SET_CURRENT ,
		payload: user
	}
};

export const signUpUser = ({ prenom, nom, phone, email, password, cin, adress, entrepreneur, cgu }) =>{
	return (dispatch) =>{
		dispatch({type: USER_CREATE});
		axios.post(API_SIGNUP,{ prenom, nom, phone, email, password, cin, adress, entrepreneur, cgu })
		.then(async (res) => {
			console.log(res.data);
	    	if(res.status == 201){
	    		await AsyncStorage.setItem('currentUser', JSON.stringify(res.data.user));
	    		createUserSuccess(dispatch, res.data.user);
	    		//Actions.main();
	    	}else{
	    		createUserFail(dispatch)
	    	}
	    })
		.catch((e) => {console.log(e);createUserFail(dispatch)});
	}
};

export const loginUser = ({email, password}) =>{

	return (dispatch) =>{
		dispatch({type: LOGIN_USER});
		console.log(`${API_LOGIN}?login=${email}&password=${password}`);
		axios.get(`${API_LOGIN}?login=${email}&password=${password}`)
	    .then(async (res) => {
		console.log(res.data);
	    	
	    	if(res.status == 200){
	    		await AsyncStorage.setItem('currentUser', JSON.stringify(res.data));
	    		loginUserSuccess(dispatch, res.data);
	    		//Actions.main();
	    	}else{
	    		loginUserFail(dispatch)
	    	}
	    })
	    .catch((e) => {console.log(e);loginUserFail(dispatch)});
		
	};	
};
export const signOut = () =>{
	return async (dispatch) =>{
		await AsyncStorage.clear();
		dispatch({
			type:INITIAL_ALL_STATE
		});
		// Actions.auth();
	}
	
}
const loginUserFail = (dispatch) =>{
	dispatch({type: LOGIN_USER_FAIL});
};
const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS, 
		payload: user 
	});

	// Actions.main();
};


const createUserSuccess = (dispatch, user) =>{
	dispatch({
		type: USER_CREATE_SUCCESS,
		payload: user 
	});
	Alert.alert(
		'Auth',
		alert.user_create,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);

}
const createUserFail = (dispatch) =>{
	dispatch({type: USER_CREATE_FAIL});
	Alert.alert(
		'Auth',
		alert.unable_user_create,
		[{text: 'OK', onPress: () => console.log('OK Pressed')}]
	);
}