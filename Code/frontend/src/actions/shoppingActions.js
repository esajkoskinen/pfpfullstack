import {loading,loadingDone,clearLoginState} from './loginActions';

export const FETCH_SHOPPINGLIST_SUCCESS = "FETCH_SHOPPINGLIST_SUCCESS";
export const FETCH_SHOPPINGLIST_FAILED =  "FETCH_SHOPPINGLIST_FAILED";
export const ADD_TO_SHOPPINGLIST_SUCCESS = "ADD_TO_SHOPPINGLIST_SUCCESS";
export const ADD_TO_SHOPPINGLIST_FAILED = "ADD_TO_SHOPPINGLIST_FAILED";
export const REMOVE_FROM_SHOPPINGLIST_SUCCESS = "REMOVE_FROM_SHOPPINGLIST_SUCCESS";
export const REMOVE_FROM_SHOPPINGLIST_FAILED = "REMOVE_FROM_SHOPPINGLIST_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";
export const CLEAR_SHOPPING_STATE = "CLEAR_SHOPPING_STATE";

// ASYNC ACTION CREATORS


// ACTIONS

export const getList = (token,query) => {
    return (dispatch) => {
        let request = {
            method:"GET",
            mode:"cors",
            headers:{"Content-type":"application/json",token:token}
        }
        let url = "/api/shopping";
        if(query) {
            url = url+"?type="+query
        }
        dispatch(loading());
        fetch(url,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                response.json().then(data => {
                    dispatch(fetchShoppinglistSuccess(data));
                }).catch(error => {
                    dispatch(fetchShoppinglistFailed("Error parsing shopping information"));
                });
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearShoppingState());
                    dispatch(fetchShoppinglistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(fetchShoppinglistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(fetchShoppinglistFailed("Server responded with an error:"+error));
        });
    }
}

export const addToList = (item,token) => {
    return (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json",token:token},
            body:JSON.stringify(item)
        }
        dispatch(loading());
        fetch("/api/shopping",request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getList(token));
                dispatch(addToShoppinglistSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearShoppingState());
                    dispatch(addToShoppinglistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(addToShoppinglistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(addToShoppinglistFailed("Server responded with an error:"+error));
        });
    }
}    

export const removeFromList = (id,token) => {
    return (dispatch) => {
        let request = {
            method:"DELETE",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    token:token}
        }
        dispatch(loading());
        fetch("/api/shopping/"+id,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getList(token));
                dispatch(removeFromShoppinglistSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearShoppingState());
                    dispatch(removeFromShoppinglistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(removeFromShoppinglistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(removeFromShoppinglistFailed("Server responded with an error:"+error));
        });
    }
}

export const editItem = (item,token) => {
    return (dispatch) => {
        let request = {
            method:"PUT",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    token:token},
            body:JSON.stringify(item)
        }
        dispatch(loading());
        fetch("/api/shopping/"+item._id,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getList(token));
                dispatch(editItemSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearShoppingState());
                    dispatch(editItemFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(editItemFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(editItemFailed("Server responded with an error:"+error));
        });
    }
}

export const fetchShoppinglistSuccess = (list) => {
    return {
        type:FETCH_SHOPPINGLIST_SUCCESS,
        list:list
    }
}

export const fetchShoppinglistFailed = (error) => {
    return {
        type:FETCH_SHOPPINGLIST_FAILED,
        error:error
    }
}

export const addToShoppinglistSuccess = () => {
    return {
        type:ADD_TO_SHOPPINGLIST_SUCCESS
    }
}

export const addToShoppinglistFailed = (error) => {
    return {
        type:ADD_TO_SHOPPINGLIST_FAILED,
        error:error
    }
}

export const removeFromShoppinglistSuccess = () => {
    return {
        type:REMOVE_FROM_SHOPPINGLIST_SUCCESS
    }
}

export const removeFromShoppinglistFailed = (error) => {
    return {
        type:REMOVE_FROM_SHOPPINGLIST_FAILED,
        error:error
    }
}

export const editItemSuccess = () => {
    return {
        type:EDIT_ITEM_SUCCESS
    }
}

export const editItemFailed = (error) => {
    return {
        type:EDIT_ITEM_FAILED,
        error:error
    }
}

export const clearShoppingState = () => {
    return {
        type:CLEAR_SHOPPING_STATE
    }
}

