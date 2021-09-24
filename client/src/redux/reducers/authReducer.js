import {
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS,
} from '../types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: "",
    userId: "",
    userName: "",
    userRole: "",
    errorMsg: "",
    successMsg: ""
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg: "",
                isLoading: true,
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return {
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: "",
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            console.log(action.payload, "action.payload")
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.userId,
                userName: action.payload.user.name,
                userRole: action.payload.user.userRole,
                errorMsg: "",
            }
        case LOGOUT_FAILURE:
        case LOGIN_FAILURE:
            localStorage.removeItem("token")
            return {
                ...state,
                ...action.payload,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                userId: null,
                userRole: action.payload.user.userRole,
                errorMsg: action.payload.data.msg,
            }
            case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errorMsg: null,
            }
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: null,
            }
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: null,
            }

        default:
            return state
    }
};

export default authReducer