import {clearAccountState} from './accountActions';
import {clearBudgetState} from './budgetActions';

export const LOADING = "LOADING"
export const LOADING_DONE = "LOADING_DONE"
export const STAGE_SET = "STAGE_SET"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE"

// ASYNC ACTION CREATORS
export const login = (user) => {
    return (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
        }
        dispatch(loading());
        fetch("/login",request).then(response => {
            if(response.ok) {
                response.json().then(data => {
                    dispatch(loginSuccess(data.token));
                }).catch(error => {
                    dispatch(loginFailed("Failed to parse JSON. Error:"+error));
                })
            } else {
                dispatch(loginFailed("Server responded with a status:"+response.status));
            }
        }).catch(error => {
            dispatch(loginFailed("Server responded with an error. Reason:"+error));
        });
    }
}

export const logout = (token) => {
    return (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json",token:token}
        }
        dispatch(loading());
        fetch("/logout",request).then(response => {
            if(response.ok) {
                dispatch(logoutSuccess());
                dispatch(clearAccountState());
                dispatch(clearBudgetState());
            } else {
                dispatch(logoutFailed("Server responded with a conflict. Logging you out!"));
                dispatch(clearAccountState());
                dispatch(clearBudgetState());
            }
        }).catch(error => {
            dispatch(logoutFailed("Server responded with an error:"+error+". Logging out!"));
            dispatch(clearAccountState());
            dispatch(clearBudgetState());
        });
    }
}

// ACTIONS

export const loading = () => {
    return {
        type:LOADING
    }
}

export const loadingDone = () => {
    return {
        type:LOADING_DONE
    }
}

export const setStage = (stage) => {
    console.log("LoginActions, setStage: ", stage);
    return {
        type:STAGE_SET,
        stage:stage
    }
}

export const loginSuccess = (token) => {
    return {
        type:LOGIN_SUCCESS,
        token:token
    }
}

export const loginFailed = (error) => {
    return {
        type:LOGIN_FAILED,
        error:error
    }
}

export const logoutSuccess = () => {
    return {
        type:LOGOUT_SUCCESS,
    }
}

export const logoutFailed = (error) => {
    return {
        type:LOGOUT_FAILED,
        error:error
    }
}
export const clearLoginState = () => {
    return {
        type:CLEAR_LOGIN_STATE
    }
}
