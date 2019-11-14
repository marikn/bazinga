import {API_URL} from '../config';

import {getJSON, RSAA} from 'redux-api-middleware';
import jwt_decode from 'jwt-decode';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export const FETCH_TOKENS_FROM_LOCAL_STORAGE_SUCCESS = 'FETCH_TOKENS_FROM_LOCAL_STORAGE_SUCCESS';
export const FETCH_TOKENS_FROM_LOCAL_STORAGE_FAILURE = 'FETCH_TOKENS_FROM_LOCAL_STORAGE_FAILURE';

function login(credentials) {
    return async (dispatch) => {
        const loginResponse = await dispatch({
            [RSAA]: {
                endpoint: `${API_URL}/login`,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({username: credentials.username, password: credentials.password}),
                types: [
                    LOGIN_REQUEST,
                    {
                        type: LOGIN_SUCCESS,
                        payload: (action, state, result) => {
                            return getJSON(result).then(json => {
                                    const {access_token, refresh_token} = json;
                                    const exp = jwt_decode(access_token).exp;

                                    return {refresh_token, exp};
                                }
                            );
                        }
                    },
                    LOGIN_FAILURE,
                ]
            }
        });

        if (!loginResponse.error && loginResponse.type === LOGIN_SUCCESS) {
            localStorage.setItem('token', loginResponse.payload.refresh_token);
            localStorage.setItem('exp', loginResponse.payload.exp);
        }

        return loginResponse;
    }
}

function logout() {
    return async (dispatch) => {
        localStorage.clear();

        await dispatch({
            [RSAA]: {
                endpoint: `${API_URL}/logout`,
                method: 'POST',
                credentials: 'include',
                types: [
                    LOGOUT_REQUEST,
                    LOGOUT_SUCCESS,
                    LOGOUT_FAILURE,
                ]
            }
        });
    };
}

function refreshAccessToken(token) {
    return async (dispatch) => {
        const refreshResp = await dispatch({
            [RSAA]: {
                endpoint: `${API_URL}/refresh`,
                method: 'POST',
                credentials: 'include',
                headers: {'X-Refresh-Token': token},
                types: [
                    TOKEN_REQUEST,
                    {
                        type: TOKEN_SUCCESS,
                        payload: (action, state, result) => {
                            const access_token = result.headers.get('X-Access-Token');
                            const refresh_token = result.headers.get('X-Refresh-Token');

                            const exp = jwt_decode(access_token).exp;

                            return {refresh_token, exp};
                        }
                    },
                    TOKEN_FAILURE
                ]
            }
        });

        if (!refreshResp.error && refreshResp.type === TOKEN_SUCCESS) {
            localStorage.setItem('token', refreshResp.payload.refresh_token);
            localStorage.setItem('exp', refreshResp.payload.exp);
        }

        return refreshResp;
    };
}

const fetchTokensFromLocalStorage = () => {
    const tokens = getTokensFromLocalStorage();
    if (tokens) {
        return {
            type: FETCH_TOKENS_FROM_LOCAL_STORAGE_SUCCESS,
            payload: tokens
        };
    }

    return {
        type: FETCH_TOKENS_FROM_LOCAL_STORAGE_FAILURE,
    }
};

const getUserInfo = () => ({
    [RSAA]: {
        endpoint: `${API_URL}/user/me`,
        method: 'GET',
        credentials: 'include',
        types: [
            USER_REQUEST,
            USER_SUCCESS,
            USER_FAILURE,
        ]
    }
});

const getTokensFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');

    return (token && exp) ? {token, exp} : null;
};

export {
    login,
    logout,
    fetchTokensFromLocalStorage,
    refreshAccessToken,
    getUserInfo
};