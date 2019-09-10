import {
	PROJECTS_FETCH,
	PROJECTS_FETCH_SUCCESS,
	DECLARE_CLIENT_START,
	DECLARE_CLIENT_SUCCESS,
	DECLARE_CLIENT_FAIL
} from '../actions/types';

INITIAL_STATE = {
	projectsList: null,
	loading: false
};

export default (state = INITIAL_STATE, action) => {

	switch(action.type){
		case DECLARE_CLIENT_START:
			return {...state, loading: true}
		case DECLARE_CLIENT_FAIL:
		case DECLARE_CLIENT_SUCCESS:
			return {...state, loading: false}
		case PROJECTS_FETCH_SUCCESS:
			return {...state, projectsList: action.payload};
		default:
      		return state;
	}

};

