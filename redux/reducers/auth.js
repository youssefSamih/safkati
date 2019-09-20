import { 
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  USER_SET_CURRENT,
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  token: null,
  error: '',
  loading: false,
  resetForm: false
};

export default (state = INITIAL_STATE, action) =>{
  //console.log(action);
  switch(action.type){
    case USER_SET_CURRENT: 
      return {...state, user: action.payload};
    case USER_CREATE:
    case USER_UPDATE:
    case LOGIN_USER:
      return { ...state, loading: true,error: ''};
    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, user: action.payload};
    case LOGIN_USER_FAIL:
      return {...state, error:'Authentication Failed', loading:false};
    case USER_UPDATE_SUCCESS:
    case USER_CREATE_SUCCESS:
      return {...state, ...INITIAL_STATE,user: action.payload};
    case USER_CREATE_FAIL:
      return {...state, ...INITIAL_STATE, loading:false};
    case USER_UPDATE_FAIL:
      return {...state, loading:false}
    default:
      return state;
  }
}