import { combineReducers } from 'redux';

import AuthReducer from './auth';
import ProjectsReducer from './projects';
import FormReducer from './form';
import MonespaceReducer from './monespace';
import currentProjectReducer from './currentProject';

export default combineReducers({
  auth: AuthReducer,
  projects: ProjectsReducer,
  monespace: MonespaceReducer,
  currentProject: currentProjectReducer,
  form: FormReducer,
});

