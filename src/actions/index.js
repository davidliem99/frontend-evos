import axios from 'axios';
import {
    USER_LOGIN_SUCCESS, 
    USER_NOT_FOUND, 
    LOGIN_SYSTEM_ERROR,
    LOGIN_LOADING, LOGOUT,
    REGISTER_LOADING,
    COOKIE_CHECKED,
    HARUS_DIISI,
    USERNAME_TIDAK_TERSEDIA,
    INSERT_CART,
    CART_ERROR,
    DELETE_CART,
    DELETE_CART_ERROR
} from './types';
export const onUserLogout=()=>{
    return{type: LOGOUT }
}
export const keepLogin =(username)=>{
    return(dispatch)=> {
        axios.get('http://localhost:2000/keeplogin',{
            params:{
                username
            }
        }).then((res)=>{
            console.log(res.data)
            if(res.data.length > 0 ){
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: username
                })
            }
        })
    }
}
export const cookieChecked =()=>{
    return{type: COOKIE_CHECKED }
}
export const onUserLogin = ({username, password}) =>{
    return(dispatch)=>{
        if(username == '' || password == ''){
            return dispatch({type : HARUS_DIISI})
        }
        dispatch({type: LOGIN_LOADING})
        axios.post('http://localhost:2000/login', {
            username,
            password
        }).then((res)=> {
            console.log(res)
            if(res.data.length>0){
                dispatch({type: USER_LOGIN_SUCCESS, payload: username})
            }else{
                dispatch({type: USER_NOT_FOUND})
            }
        }).catch((err)=>{
            console.log(err)
            dispatch({type: LOGIN_SYSTEM_ERROR})
        }) 
    }
}
export const onUserRegister = ({username,email,phone, password})=>{
    return (dispatch)=>{
        dispatch({type: REGISTER_LOADING})
        if(username ==='' || password == '' || phone == ''||email==''){
            dispatch({type: HARUS_DIISI})
        }else{
            axios.get('http://localhost:2000/usercheck',{
                params:{
                    username
                }
            }).then((res)=>{
                if(res.data.length === 0 ){
                    axios.post('http://localhost:2000/register', {
                    username, email, password, phone
                    }).then((res)=>{
                        console.log(res)
                        dispatch({type: USER_LOGIN_SUCCESS, payload: username})
                    }).catch((err)=>{
                        console.log(err);
                        dispatch({type: LOGIN_SYSTEM_ERROR})
                    })
                }else{
                    dispatch({type: USERNAME_TIDAK_TERSEDIA})
                }
            }).catch((err)=>{
                dispatch({type: LOGIN_SYSTEM_ERROR})
            })
            
        }
        
    }
}
export const addToCart = ({username, id_produk, numb, cartdate}) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.post('http://localhost:2000/insert-cart', {
            username,
            id_produk,
            qty:numb,
            date:cartdate
        }).then((res)=> {
            console.log(res)
            dispatch({type: INSERT_CART})
        }).catch((err)=>{
            console.log(err)
            dispatch({type: CART_ERROR})
        }) 
    }
}

export const deleteCart = (id) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.delete('http://localhost:2000/delete-cart/' + id).then((res)=> {
            console.log(res)
            dispatch({type: DELETE_CART})
        }).catch((err)=>{
            console.log(err)
            dispatch({type: DELETE_CART_ERROR})
        }) 
    }
}