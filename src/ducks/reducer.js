import axios from 'axios';

const initialState = {
    user: {}
}

const LOGIN_USER = 'LOGIN_USER';
const GET_USER = 'GET_USER';
const LOGOUT_USER = 'LOGOUT_USER';


export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function getUser(){
    const user = axios.get('/auth/user')
    return {
        type: GET_USER,
        payload: user
    }
}
export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}



export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload}
        case GET_USER + "_PENDING":
            return state
        case GET_USER + "_FULFILLED":
            return {...state, user: action.payload.data}
        case GET_USER + "_REJECTED":
            return initialState
        case LOGOUT_USER:
            return {...state, ...action.payload}
        default:
            return state
    }
}