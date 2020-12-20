import {
    FETCH_BUDGETLIST_SUCCESS,
    FETCH_BUDGETLIST_FAILED,
    ADD_TO_BUDGETLIST_SUCCESS,
    ADD_TO_BUDGETLIST_FAILED,
    REMOVE_FROM_BUDGETLIST_SUCCESS,
    REMOVE_FROM_BUDGETLIST_FAILED,
    EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_FAILED,
    CLEAR_BUDGET_STATE
} from '../actions/budgetActions'

const getInitialState = () => {
    if(sessionStorage.getItem("budgetstate")) {
        let state = JSON.parse(sessionStorage.getItem("budgetstate"));
        return state;
    } else {
        return {
            error:"",
            list:[]
        }
    }
}

const saveToStorage = (state) => {
    sessionStorage.setItem("budgetstate", JSON.stringify(state));
}

const initialState = getInitialState();

const budgetReducer = (state=initialState,action) => {
    console.log("BudgetReducer:", action);
    let tempState = {};
    switch(action.type) {
        case FETCH_BUDGETLIST_SUCCESS:
            tempState = {
                list:action.list,
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case FETCH_BUDGETLIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case ADD_TO_BUDGETLIST_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case ADD_TO_BUDGETLIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case REMOVE_FROM_BUDGETLIST_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case REMOVE_FROM_BUDGETLIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case EDIT_BUDGET_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            saveToStorage(tempState);
            return tempState;
        case EDIT_BUDGET_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        case CLEAR_BUDGET_STATE:
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

export default budgetReducer;