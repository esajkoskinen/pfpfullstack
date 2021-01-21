import {loading,loadingDone,setStage,clearLoginState} from './loginActions';

export const FETCH_BUDGETLIST_SUCCESS = "FETCH_BUDGETLIST_SUCCESS";
export const FETCH_BUDGETLIST_FAILED =  "FETCH_BUDGETLIST_FAILED";
export const ADD_TO_BUDGETLIST_SUCCESS = "ADD_TO_BUDGETLIST_SUCCESS";
export const ADD_TO_BUDGETLIST_FAILED = "ADD_TO_BUDGETLIST_FAILED";
export const REMOVE_FROM_BUDGETLIST_SUCCESS = "REMOVE_FROM_BUDGETLIST_SUCCESS";
export const REMOVE_FROM_BUDGETLIST_FAILED = "REMOVE_FROM_BUDGETLIST_FAILED";
export const EDIT_BUDGET_SUCCESS = "EDIT_BUDGET_SUCCESS";
export const EDIT_BUDGET_FAILED = "EDIT_BUDGET_FAILED";
export const CLEAR_BUDGET_STATE = "CLEAR_BUDGET_STATE";

// ASYNC ACTION CREATORS


// ACTIONS

export const getBudgets = (token,query) => {
    return (dispatch) => {
        let request = {
            method:"GET",
            mode:"cors",
            headers:{"Content-type":"application/json",token:token}
        }
        let url = "/api/budgets";
        if(query) {
            url = url+"?type="+query
        }
        dispatch(setStage("Budgets"));
        dispatch(loading());
        fetch(url,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                response.json().then(data => {
                    dispatch(fetchBudgetlistSuccess(data));
                }).catch(error => {
                    dispatch(fetchBudgetlistFailed("Error parsing budget information"));
                });
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearBudgetState());
                    dispatch(fetchBudgetlistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(fetchBudgetlistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(fetchBudgetlistFailed("Server responded with an error:"+error));
        });
    }
}

export const addToBudgets = (item,token) => {
    return (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json",token:token},
            body:JSON.stringify(item)
        }
        dispatch(loading());
        fetch("/api/budgets",request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getBudgets(token));
                dispatch(addToBudgetlistSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearBudgetState());
                    dispatch(addToBudgetlistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(addToBudgetlistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(addToBudgetlistFailed("Server responded with an error:"+error));
        });
    }
}    

export const removeFromBudgets = (id,token) => {
    return (dispatch) => {
        let request = {
            method:"DELETE",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    token:token}
        }
        dispatch(loading());
        fetch("/api/budgets/"+id,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getBudgets(token));
                dispatch(removeFromBudgetlistSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearBudgetState());
                    dispatch(removeFromBudgetlistFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(removeFromBudgetlistFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(removeFromBudgetlistFailed("Server responded with an error:"+error));
        });
    }
}

export const editBudget = (item,token) => {
    return (dispatch) => {
        let request = {
            method:"PUT",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    token:token},
            body:JSON.stringify(item)
        }
        dispatch(loading());
        fetch("/api/budgets/"+item._id,request).then(response => {
            dispatch(loadingDone());
            if(response.ok) {
                dispatch(getBudgets(token));
                dispatch(editBudgetSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(clearLoginState());
                    dispatch(clearBudgetState());
                    dispatch(editBudgetFailed("Server responded with an expired session. Logging you out!"));
                } else {
                    dispatch(editBudgetFailed("Server responded with a status:"+response.statusText));
                }
            }
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(editBudgetFailed("Server responded with an error:"+error));
        });
    }
}

export const fetchBudgetlistSuccess = (list) => {
    return {
        type:FETCH_BUDGETLIST_SUCCESS,
        list:list
    }
}

export const fetchBudgetlistFailed = (error) => {
    return {
        type:FETCH_BUDGETLIST_FAILED,
        error:error
    }
}

export const addToBudgetlistSuccess = () => {
    return {
        type:ADD_TO_BUDGETLIST_SUCCESS
    }
}

export const addToBudgetlistFailed = (error) => {
    return {
        type:ADD_TO_BUDGETLIST_FAILED,
        error:error
    }
}

export const removeFromBudgetlistSuccess = () => {
    return {
        type:REMOVE_FROM_BUDGETLIST_SUCCESS
    }
}

export const removeFromBudgetlistFailed = (error) => {
    return {
        type:REMOVE_FROM_BUDGETLIST_FAILED,
        error:error
    }
}

export const editBudgetSuccess = () => {
    return {
        type:EDIT_BUDGET_SUCCESS
    }
}

export const editBudgetFailed = (error) => {
    return {
        type:EDIT_BUDGET_FAILED,
        error:error
    }
}

export const clearBudgetState = () => {
    return {
        type:CLEAR_BUDGET_STATE
    }
}

