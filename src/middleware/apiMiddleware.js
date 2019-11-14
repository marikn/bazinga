import {apiMiddleware, isRSAA} from 'redux-api-middleware';
import {isAccessTokenExpired} from "../helper";
import {refreshAccessToken} from '../actions/authActions'

export function customApiMiddleware() {
    const postponedRSAAs = [];

    return ({dispatch, getState}) => {
        const rsaaMiddleware = apiMiddleware({dispatch, getState});
        return next => action => {
            if (isRSAA(action)) {
                const state = getState(), token = (localStorage.getItem('token')) ? localStorage.getItem('token') : "";

                if (token && isAccessTokenExpired(state)) {
                    postponedRSAAs.push(action);
                    if (postponedRSAAs.length === 1) {
                        dispatch(refreshAccessToken(token)).then(() => {
                                action = postponedRSAAs.pop();
                            }
                        )
                    }
                }
                return rsaaMiddleware(next)(action);
            } else {
                return next(action);
            }
        }
    }
}