import {
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	INITIAL_ALL_STATE,
	INITIAL_SELECTED_CLIENT
} from '../actions/types';

const INITIAL_STATE = {
	clients:[],
	selectedClient:null,
	loading:false,
};

export default (state=INITIAL_STATE, action) =>{
	//console.log(action);
	switch(action.type){
		case GET_USER_INFO:
			return {...state, loading: true};
		case GET_USER_INFO_SUCCESS:
			return {...state, ...INITIAL_STATE,clients: action.payload.clients};
		case GET_USER_INFO_FAIL:
			return {...state, loading: false};
		case INITIAL_SELECTED_CLIENT:
			return {...state, selectedClient: action.payload};
		case INITIAL_ALL_STATE:
			return INITIAL_STATE;
		default:
			return state;
	}
};