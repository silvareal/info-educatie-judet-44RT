import {combineReducers} from 'redux';
import userReducer from './userReducer.js';
import collectionsHomeViewReducer from './collectionsHomeViewReducer.js';
import shouldUpdateCollectionsReducer from './shouldUpdateCollectionsReducer.js';
import manageCollectionsCreateReducer from './Collections/manageCollectionsCreateReducer.js';
import manageCollectionsDeleteReducer from './Collections/manageCollectionsDeleteReducer.js';
import manageCollectionsReadAllReducer from './Collections/manageCollectionsReadAllReducer.js';
import searchReducer from './AppBar/searchReducer.js'
import browseCollectionsReadAllReducer from './Browse/browseCollectionsReadAllReducer.js';
import collectionNamesReducer from './AppBar/collectionNamesReducer.js';
import manageCollectionsReadOneReducer from './Collections/manageCollectionsReadOneReducer.js';
import manageCollectionsUpdateReducer from './Collections/manageCollectionsUpdateReducer.js';
import signUpReducer from './Authentication/signUpReducer.js';
import loginReducer from './Authentication/loginReducer.js';
import profileReducer from './Profile/profileReducer.js';

const rootReducer = combineReducers({
    userReducer: userReducer,
    collectionsHomeViewReducer: collectionsHomeViewReducer,
    shouldUpdateCollectionsReducer: shouldUpdateCollectionsReducer,
    manageCollectionsCreateReducer: manageCollectionsCreateReducer,
    manageCollectionsDeleteReducer: manageCollectionsDeleteReducer,
    manageCollectionsReadAllReducer: manageCollectionsReadAllReducer,
    manageCollectionsReadOneReducer: manageCollectionsReadOneReducer,
    manageCollectionsUpdateReducer: manageCollectionsUpdateReducer,
    searchReducer: searchReducer,
    collectionNamesReducer: collectionNamesReducer,
    browseCollectionsReadAllReducer: browseCollectionsReadAllReducer,
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
    profileReducer: profileReducer
});

export default rootReducer