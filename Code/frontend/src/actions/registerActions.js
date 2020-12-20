//import {getList,clearShoppingState} from './shoppingActions';

export const LOADING = "LOADING"
export const LOADING_DONE = "LOADING_DONE"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILED = "REGISTER_FAILED"

// ASYNC ACTION CREATORS
export const register = (user) => {
    return (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
        }
        dispatch(loading());
        fetch("/register",request).then(response => {
            if(response.ok){
                dispatch(registerSuccess());
            } else {
                if(response.status === 409) {
                    dispatch(registerFailed("User email is already in use"));
                } else {
                    dispatch(registerFailed("Server responsed with status:"+response.status));
                }
            }
        }).catch(error => {
            dispatch(registerFailed("Server responded with an error:"+error));
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

export const registerSuccess = () => {
    return {
        type:REGISTER_SUCCESS
    }
}

export const registerFailed = (error) => {
    return {
        type:REGISTER_FAILED,
        error:error
    }
}
