import * as types from '../../actions/actionTypes.js';

export default function signUpReducer(state = {
    errors: {},
    message: '',
    success: null,
    user: {
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    },
}, action) {
    switch (action.type) {

        case types.ON_USER_INFO_CHANGE: {
            const field = action.fieldName;
            const value = action.value;
            let user = action.user;
            user[field] = value;
            return {
                ...state,
                user: user
            }
        }

        case types.ON_SAVE_USER_INITIATE: {
            return {
                ...state
            }
        }

        case types.ON_SAVE_USER_SUCCESS: {
            return {
                ...state,
                success: action.success
            }
        }

        case types.ON_SAVE_USER_FAILURE: {
            return {
                ...state,
                errors: action.errors,
                message: action.message
            }
        }

        default:
            return state;
    }
}