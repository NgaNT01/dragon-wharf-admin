export function setAuthToken(token) {
    if (token === null) {
        localStorage.removeItem('access_token');
    } else {
        localStorage.setItem('access_token', token);
    }
}

export const getToken = () => {
    return localStorage.getItem('access_token') || "";
};

export const clearToken = () => {
    return localStorage.removeItem('access_token');
};