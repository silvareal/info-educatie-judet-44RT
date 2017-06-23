import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import collectionsHomeViewReducer from './collectionsHomeViewReducer.js';
import shouldUpdateCollectionsReducer from './shouldUpdateCollectionsReducer.js';
import manageCollectionsCreateReducer from './manageCollectionsCreateReducer.js';
import manageCollectionsCreateComponentReducer from './manageCollectionsCreateComponentReducer.js';

const rootReducer = combineReducers({
    userReducer: userReducer,
    collectionsHomeViewReducer: collectionsHomeViewReducer,
    shouldUpdateCollectionsReducer: shouldUpdateCollectionsReducer,
    manageCollectionsCreateReducer: manageCollectionsCreateReducer,
    manageCollectionsCreateComponentReducer: manageCollectionsCreateComponentReducer

});

export default rootReducer