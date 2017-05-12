class Auth {

    static getToken() {
        return localStorage.getItem('token');
    };

    //Mistake while dev : thinking that setting the userId in localStorage is safe :P
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    };

    static deauthenticateUser() {
        localStorage.removeItem('token');
    };

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    };

}

export default Auth;
