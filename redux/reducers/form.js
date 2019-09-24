import {
	PARRAINE_START,
	PARRAINE_SUCCESS,
	PARRAINE_FAIL,
	INITIAL_FORM,
	PW_CHANGE_START,
	PW_CHANGE_SUCCESS,
	PW_CHANGE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	loading:false,
	reset:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case PW_CHANGE_START:
		case PARRAINE_START :
			return {...state,loading:true}
		case PW_CHANGE_SUCCESS:
		case PARRAINE_SUCCESS :
			return {...INITIAL_STATE,reset: true}
		case PW_CHANGE_FAIL:
		case PARRAINE_FAIL :
			return {...INITIAL_STATE}
		case INITIAL_FORM:
			return {...INITIAL_STATE}
		default:
			return state;
	}
}