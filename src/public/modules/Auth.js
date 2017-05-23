class Auth {

    static getToken() {
        return localStorage.getItem('token');
    };

    static authenticateUser(token) {
        localStorage.setItem('token', token);
    };

    static deauthenticateUser() {
        localStorage.removeItem('token');
        location.reload();
    };

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    };

}

export default Auth;
