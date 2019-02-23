import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import selectid from './selectid'
export default combineReducers({
  id_user:()=>1,
  auth: AuthReducer,
  getId : selectid
});

