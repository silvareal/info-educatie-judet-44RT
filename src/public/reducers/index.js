import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import collectionsHomeViewReducer from './collectionsHomeViewReducer.js';
import shouldUpdateCollectionsReducer from './shouldUpdateCollectionsReducer.js';
import manageCollectionsCreateReducer from './Collections/manageCollectionsCreateReducer.js';
import manageCollectionsCreateComponentReducer from './Collections/manageCollectionsCreateComponentReducer.js';
import manageCollectionsDeleteReducer from './Collections/manageCollectionsDeleteReducer.js';
import manageCollectionsReadAllReducer from './Collections/manageCollectionsReadAllReducer.js';
import searchReducer from './AppBar/searchReducer.js'
import browseCollectionsReadAllReducer from './Browse/browseCollectionsReadAllReducer.js';
import collectionNamesReducer from './AppBar/collectionNamesReducer.js';
import manageCollectionsReadOneReducer from './Collections/manageCollectionsReadOneReducer.js'
import manageCollectionsUpdateReducer from './Collections/manageCollectionsUpdateReducer.js';

const rootReducer = combineReducers({
    userReducer: userReducer,
    collectionsHomeViewReducer: collectionsHomeViewReducer,
    shouldUpdateCollectionsReducer: shouldUpdateCollectionsReducer,
    manageCollectionsCreateReducer: manageCollectionsCreateReducer,
    manageCollectionsCreateComponentReducer: manageCollectionsCreateComponentReducer,
    manageCollectionsDeleteReducer: manageCollectionsDeleteReducer,
    manageCollectionsReadAllReducer: manageCollectionsReadAllReducer,
    searchReducer: searchReducer,
    browseCollectionsReadAllReducer: browseCollectionsReadAllReducer,
    collectionNamesReducer: collectionNamesReducer,
    manageCollectionsReadOneReducer: manageCollectionsReadOneReducer,
    manageCollectionsUpdateReducer: manageCollectionsUpdateReducer
});

export default rootReducer