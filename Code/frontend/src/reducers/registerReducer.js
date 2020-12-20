import {
    LOADING,
    LOADING_DONE,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from '../actions/registerActions';

/* login state
    isLogged:boolean,
    token:string,
    loading:boolean,
    error:string
*/

const getInitialState = () => {
    if(sessionStorage.getItem("registerstate")) {
        let state = JSON.parse(sessionStorage.getItem("registerstate"));
        return state;
    } else {
        return {
            loading:false,
            error:""
        }
    }
}

const saveToStorage = (state) => {
    sessionStorage.setItem("registerstate",JSON.stringify(state));
}

const initialState = getInitialState();

const registerReducer = (state = initialState, action) => {
    console.log("registerReducer:",action);
    let tempState = {};
    switch(action.type) {
        case LOADING:
            return {
                loading:true,
                error:""
            }
        case LOADING_DONE:
            return {
                loading:false,
                error:""
            }
        case REGISTER_SUCCESS:
            tempState = {
                loading:false,
                error:"Register Success"
            }
            saveToStorage(tempState);
            return tempState;
        case REGISTER_FAILED:
            tempState = {
                loading:false,
                error:action.error
            }
            saveToStorage(tempState);
            return tempState;
        default:
            return state;
    }
}

export default registerReducer;