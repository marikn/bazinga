import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_SUCCESS,
    FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_FAILURE,
} from '../actions/authActions'

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
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
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
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
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
            });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false
            });
        case FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            });
        case FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                refreshToken: null
            });
        default:
            return state
    }
}