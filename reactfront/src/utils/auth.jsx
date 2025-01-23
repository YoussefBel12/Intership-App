export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Check if token exists in local storage
};

export const getToken = () => {
    return localStorage.getItem('token');
};