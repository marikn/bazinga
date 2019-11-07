import jwt from "jwt-decode";

export const getAuthenticationApiHeader = state => {
    const access_token = state.auth.accessToken;
    const refresh_token = state.auth.refreshToken;

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (state.auth.isAuthenticated) {
        if (access_token) {
            Object.assign(headers, {'Authorization': `Bearer ${access_token}`});
            if (((jwt(access_token).exp - (Date.now() / 1000 | 0)) < 10) && refresh_token && ((jwt(refresh_token).exp - (Date.now() / 1000 | 0)) > 10)) {
                Object.assign(headers, {'X-Refresh-Token': `${refresh_token}`});
            } else if (refresh_token && ((jwt(refresh_token).exp - (Date.now() / 1000 | 0)) < 10)) {
                return {};
            }

            return headers;
        }
    }

    return headers;
};