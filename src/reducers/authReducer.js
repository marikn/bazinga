import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILURE,

    FETCH_TOKENS_FROM_LOCAL_STORAGE_SUCCESS,
    FETCH_TOKENS_FROM_LOCAL_STORAGE_FAILURE,

    TOKEN_REQUEST,
    TOKEN_SUCCESS,
    TOKEN_FAILURE
} from '../actions/authActions'

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    token: null,
    exp: null,
    me: null,
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                token: action.payload.refresh_token,
                exp: action.payload.exp
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: true
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, initialState);
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false
            });
        case FETCH_TOKENS_FROM_LOCAL_STORAGE_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                token: action.payload.token,
                exp: action.payload.exp
            });
        case FETCH_TOKENS_FROM_LOCAL_STORAGE_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                exp: null
            });
        case USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                me: action.payload
            });
        case USER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case TOKEN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case TOKEN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isFetching: false,
                token: action.payload.refresh_token,
                exp: action.payload.exp
            });
        case TOKEN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isFetching: false,
                token: null
            });
        default:
            return state
    }
}