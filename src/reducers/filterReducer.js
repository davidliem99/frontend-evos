import { SELECT_PRODUK } from '../actions/types'
const INITIAL_STATE = { id : 0 , namaproduk : '' , image : '' , kategori : ''}

export default (state = INITIAL_STATE , action) => {
    switch(action.type){
        case SELECT_PRODUK :
            return action.payload;
        default :
            return state;
    }
}