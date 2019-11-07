export const userService = {
    login,
    logout,
    getAll
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(`http://127.0.0.1:9090/v1/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.access_token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
    let user = JSON.parse(localStorage.getItem('user'));
    let authHeader = (user && user.access_token) ? {'Authorization': 'Bearer ' + user.access_token} : {};

    const requestOptions = {
        method: 'GET',
        headers: authHeader
    };

    return fetch(`http://127.0.0.1:9090/v1/user`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}