import {
    LOADING,
    LOADING_DONE,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    CLEAR_LOGIN_STATE
} from '../actions/loginActions';

/* login state
    isLogged:boolean,
    token:string,
    loading:boolean,
    error:string
*/

const getInitialState = () => {
    if(sessionStorage.getItem("loginstate")) {
        let state = JSON.parse(sessionStorage.getItem("loginstate"));
        return state;
    } else {
        return {
            isLogged:false,
            token:"",
            loading:false,
            stage:"",
            error:""
        }
    }
}

const saveToStorage = (state) => {
    sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
    console.log("loginReducer:",action);
    let tempState = {};
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                loading:true,
                error:""
            }
        case LOADING_DONE:
            return {
                ...state,
                loading:false,
                error:""
            }
        case LOGIN_SUCCESS:
            tempState = {
                isLogged:true,
                token:action.token,
                loading:false,
                stage:"",
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case LOGIN_FAILED:
            tempState = {
                ...state,
                loading:false,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case LOGOUT_SUCCESS:
            tempState = {
                isLogged:false,
                token:"",
                loading:false,
                stage:"",
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case LOGOUT_FAILED:
            tempState = {
                isLogged:false,
                token:"",
                loading:false,
                stage:"",
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case CLEAR_LOGIN_STATE:
            tempState = {
                isLogged:false,
                token:"",
                loading:false,
                stage:"",
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        default:
            return state;
    }
}

export default loginReducer;