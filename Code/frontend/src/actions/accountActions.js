import {loading,loadingDone,setStage,clearLoginState} from './loginActions';

export const FETCH_ACCOUNTLIST_SUCCESS = "FETCH_ACCOUNTLIST_SUCCESS";
export const FETCH_ACCOUNTLIST_FAILED =  "FETCH_ACCOUNTLIST_FAILED";
export const ADD_TO_ACCOUNTLIST_SUCCESS = "ADD_TO_ACCOUNTLIST_SUCCESS";
export const ADD_TO_ACCOUNTLIST_FAILED = "ADD_TO_ACCOUNTLIST_FAILED";
export const REMOVE_FROM_ACCOUNTLIST_SUCCESS = "REMOVE_FROM_ACCOUNTLIST_SUCCESS";
export const REMOVE_FROM_ACCOUNTLIST_FAILED = "REMOVE_FROM_ACCOUNTLIST_FAILED";
export const EDIT_ACCOUNT_SUCCESS = "EDIT_ACCOUNT_SUCCESS";
export const EDIT_ACCOUNT_FAILED = "EDIT_ACCOUNT_FAILED";
export const CLEAR_ACCOUNT_STATE = "CLEAR_ACCOUNT_STATE";

// ASYNC ACTION CREATORS


// ACTIONS

export const getAccounts = (token,query) => {
    return (dispatch) => {
        let request = {
            method:"GET",
            mode:"cors",
            headers:{"Content-type":"application/json",token:token}
        }
        let url = "/api/accounts";
        if(query) {
            url = url+"?name="+query
        }
        dispatch(setStage("Accounts"));
        dispatch(loading());
        fetch(url,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                response.json().then(data => {
                    dispatch(fetchAccountlistSuccess(data));
                }).catch(error => {
                    dispatch(fetchAccountlistFailed("Error parsing account information"));
                });
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearAccountState());
                    dispatch(fetchAccountlistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(fetchAccountlistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(fetchAccountlistFailed("Server responded with an error:"+error));
        });
    }
}

export const addToAccounts = (item,token) => {
    return (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json",token:token},
            body:JSON.stringify(item)
        }
        dispatch(loading());
        fetch("/api/accounts",request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getAccounts(token));
                dispatch(addToAccountlistSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearAccountState());
                    dispatch(addToAccountlistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(addToAccountlistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(addToAccountlistFailed("Server responded with an error:"+error));
        });
    }
}    

export const removeFromAccounts = (id,token) => {
    return (dispatch) => {
        let request = {
            method:"DELETE",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    token:token}
        }
        dispatch(loading());
        fetch("/api/account/"+id,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getAccounts(token));
                dispatch(removeFromAccountlistSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearAccountState());
                    dispatch(removeFromAccountlistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(removeFromAccountlistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(removeFromAccountlistFailed("Server responded with an error:"+error));
        });
    }
}

export const editAccount = (item,token) => {
    return (dispatch) => {
        let request = {
            method:"PUT",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    token:token},
            body:JSON.stringify(item)
        }
        dispatch(loading());
        fetch("/api/account/"+item.id,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getAccounts(token));
                dispatch(editAccountSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearAccountState());
                    dispatch(editAccountFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(editAccountFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(editAccountFailed("Server responded with an error:"+error));
        });
    }
}

export const fetchAccountlistSuccess = (list) => {
    return {
        type:FETCH_ACCOUNTLIST_SUCCESS,
        list:list
    }
}

export const fetchAccountlistFailed = (error) => {
    return {
        type:FETCH_ACCOUNTLIST_FAILED,
        error:error
    }
}

export const addToAccountlistSuccess = () => {
    return {
        type:ADD_TO_ACCOUNTLIST_SUCCESS
    }
}

export const addToAccountlistFailed = (error) => {
    return {
        type:ADD_TO_ACCOUNTLIST_FAILED,
        error:error
    }
}

export const removeFromAccountlistSuccess = () => {
    return {
        type:REMOVE_FROM_ACCOUNTLIST_SUCCESS
    }
}

export const removeFromAccountlistFailed = (error) => {
    return {
        type:REMOVE_FROM_ACCOUNTLIST_FAILED,
        error:error
    }
}

export const editAccountSuccess = () => {
    return {
        type:EDIT_ACCOUNT_SUCCESS
    }
}

export const editAccountFailed = (error) => {
    return {
        type:EDIT_ACCOUNT_FAILED,
        error:error
    }
}

export const clearAccountState = () => {
    return {
        type:CLEAR_ACCOUNT_STATE
    }
}
