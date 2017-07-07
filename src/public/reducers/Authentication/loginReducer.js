import * as types from '../../actions/actionTypes.js'

export default function loginReducer(state = {
    errors: {},
    message: '',
    success: null,
    user: {
        email: '',
        password: ''
    }
}, action) {
    switch (action.type) {

        case types.ON_USER_INFO_CHANGE_LOGIN: {
            const field = action.fieldName;
            const value = action.value;
            let user = action.user;
            user[field] = value;
            return {
                ...state,
                user: {
                    email: user.email,
                    password: user.password
                }
            }
        }

        case types.ON_LOGIN_INITIATE:
            return state;

        case types.ON_LOGIN_SUCCESS:
            return {
                ...state,
                success: action.success
            };

        case types.ON_LOGIN_FAILURE:
            return {
                ...state,
                errors: action.errors,
                message: action.message,
                success: false
            };

        default:
            return state;
    }
}