import { 
    GET_USER_ID_SUCCESS
 } from '../actions/types';
 
 const INITIAL_STATE = { id: 0};
 
 export default (state = INITIAL_STATE, action) => {
     switch(action.type) {
         case GET_USER_ID_SUCCESS :
             return action.payload;
         default :
             return state;
     }
 }