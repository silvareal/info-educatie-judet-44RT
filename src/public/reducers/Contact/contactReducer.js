import * as types from '../../actions/actionTypes.js';

export default function contactReducer(state = {feedback: '', success: null, errors: {}}, action) {
    switch (action.type) {
        case types.ON_FEEDBACK_CHANGE:
            return {
                ...state,
                feedback: action.feedback
            };

        case types.ON_SAVE_FEEDBACK_INITIATE:
            return state;

        case types.ON_SAVE_FEEDBACK_SUCCESS:
            return {
                ...state,
                success: action.success,
                errors: {}
            };

        case types.ON_SAVE_FEEDBACK_FAILURE:
            return {
                ...state,
                errors: action.errors,
                success: false
            };

        default:
            return state;
    }
}