import * as types from '../actions/actionTypes.js';

export default function manageCollectionsCreateComponentReducer(state = {}, action) {
    switch (action.type) {
        case types.ON_CREATE_COMPONENT_INITIATE:
            return {
                stepIndex: 0
            };

        case types.ON_SLIDE_INDEX_CHANGE:
            return {
                stepIndex: action.stepIndex
            };

        default:
            return state;
    }
}