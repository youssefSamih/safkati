import {
	PARRAINE_START,
	PARRAINE_SUCCESS,
	PARRAINE_FAIL,
	INITIAL_FORM
} from '../actions/types';

const INITIAL_STATE = {
	loading:false,
	reset:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case PARRAINE_START :
			return {...state,loading:true}
		case PARRAINE_SUCCESS :
			return {...INITIAL_STATE,reset: true}
		case PARRAINE_FAIL :
			return {...INITIAL_STATE}
		case INITIAL_FORM:
			return {...INITIAL_STATE}
		default:
			return state;
	}
}