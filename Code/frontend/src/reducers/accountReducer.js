import {
    FETCH_ACCOUNTLIST_SUCCESS,
    FETCH_ACCOUNTLIST_FAILED,
    ADD_TO_ACCOUNTLIST_SUCCESS,
    ADD_TO_ACCOUNTLIST_FAILED,
    REMOVE_FROM_ACCOUNTLIST_SUCCESS,
    REMOVE_FROM_ACCOUNTLIST_FAILED,
    EDIT_ACCOUNT_SUCCESS,
    EDIT_ACCOUNT_FAILED,
    CLEAR_ACCOUNT_STATE
} from '../actions/accountActions'

const getInitialState = () => {
    if(sessionStorage.getItem("accountstate")) {
        let state = JSON.parse(sessionStorage.getItem("accountstate"));
        return state;
    } else {
        return {
            error:"",
            list:[]
        }
    }
}

const getLoginState = () => {
    let loginState = JSON.parse(sessionStorage.getItem("loginstate"));
    return loginState;
}

const saveToLoginStorage = (loginstate) => {
    sessionStorage.setItem("loginstate", JSON.stringify(loginstate));
    console.log("AccountReducer, loginstate:", JSON.stringify(loginstate));
}

const saveToStorage = (state) => {
    sessionStorage.setItem("accountstate", JSON.stringify(state));
}

const initialState = getInitialState();

const accountReducer = (state=initialState,action) => {
    console.log("AccountReducer:", action);
    let tempState = {};
    let tempLoginState = {};
    switch(action.type) {
        case FETCH_ACCOUNTLIST_SUCCESS:
            tempState = {
                list:action.list,
                error:""
            }
            saveToStorage(tempState);
            tempLoginState = getLoginState();
            tempLoginState = {
                ...state,
                stage:"accounts"
            }
            saveToLoginStorage(tempLoginState);
            return tempState;
        case FETCH_ACCOUNTLIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case ADD_TO_ACCOUNTLIST_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case ADD_TO_ACCOUNTLIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case REMOVE_FROM_ACCOUNTLIST_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case REMOVE_FROM_ACCOUNTLIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case EDIT_ACCOUNT_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case EDIT_ACCOUNT_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case CLEAR_ACCOUNT_STATE:
            tempState = {
                list:[],
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        default:
            return state;
    }
}

export default accountReducer;