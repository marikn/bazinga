export const isAccessTokenExpired = state => {
    if (state.auth.exp) {
        return (state.auth.exp - (Date.now() / 1000 | 0) < 10);
    }

    return true
};