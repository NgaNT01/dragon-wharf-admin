export function setAuthToken(token) {
    if (token === null) {
        localStorage.removeItem('access-token');
    } else {
        localStorage.setItem('access-token', token);
    }
}

export const getToken = () => {
    return localStorage.getItem('access-token') || "";
};

export const clearToken = () => {
    return localStorage.removeItem('access-token');
};