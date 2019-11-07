import {RSAA} from 'redux-api-middleware';
import {API_URL} from '../config';

import {getAuthenticationApiHeader} from '../helpers';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_SUCCESS = 'FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_SUCCESS';
export const FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_FAILURE = 'FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        accessToken: user.access_token,
        refreshToken: user.refresh_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function login(credentials) {
    let config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: credentials.username, password: credentials.password}),
    };

    return dispatch => {
        dispatch(requestLogin());
        return fetch(`${API_URL}/login`, config)
            .then(response =>
                response.json()
                    .then(user => ({user, response}))
            ).then(({user, response}) => {
                if (!response.ok) {
                    dispatch(loginError(user.message));
                    return Promise.reject(user)
                } else {
                    localStorage.setItem('access_token', user.access_token);
                    localStorage.setItem('refresh_token', user.refresh_token);

                    dispatch(receiveLogin(user));
                }
            }).catch(err => console.log("Error: ", err))
    }
}

export function logout() {
    return async dispatch => {
        localStorage.clear();

        await dispatch({
            [RSAA]: {
                endpoint: `${API_URL}/logout`,
                method: 'POST',
                headers: getAuthenticationApiHeader,
                types: [
                    LOGOUT_REQUEST,
                    LOGOUT_SUCCESS,
                    LOGOUT_FAILURE,
                ]
            }
        });
    };
}

export function fetchTokensFromLocalStorage() {
    const tokens = getTokensFromLocalStorage();
    if (tokens) {
        return {
            type: FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_SUCCESS,
            payload: tokens
        };
    }

    return {
        type: FETCH_REFRESH_TOKEN_FROM_LOCAL_STORAGE_FAILURE,
    }
}

const getTokensFromLocalStorage = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    return (accessToken && refreshToken) ? {accessToken, refreshToken} : null;
};