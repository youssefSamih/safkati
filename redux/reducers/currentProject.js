import {
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	INITIAL_PROJET_INFO
} from '../actions/types';

const INITIAL_STATE = {
	project:null,
	gallery:null,
	loading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) =>{
	switch(action.type){
		case INITIAL_PROJET_INFO:
			return {...INITIAL_STATE, project:action.payload};
		case GET_USER_INFO:
			return{...state, loading:true,error:''};
		case GET_USER_INFO_SUCCESS:
			return{...INITIAL_STATE, project:action.payload,gallery:action.payload.gallery};
		case GET_USER_INFO_FAIL:
			return{...state, loading:false};
		default:
			return state;
	}
}