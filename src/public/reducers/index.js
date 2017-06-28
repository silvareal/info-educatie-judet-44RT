import {combineReducers} from 'redux';
import userReducer from './userReducer.js';
import collectionsHomeViewReducer from './collectionsHomeViewReducer.js';
import newsHomeViewReducer from './newsHomeViewReducer.js';
import shouldUpdateCollectionsReducer from './shouldUpdateCollectionsReducer.js';
import manageCollectionsCreateReducer from './Collections/manageCollectionsCreateReducer.js';
import manageCollectionsDeleteReducer from './Collections/manageCollectionsDeleteReducer.js';
import manageCollectionsReadAllReducer from './Collections/manageCollectionsReadAllReducer.js';
import searchReducer from './AppBar/searchReducer.js'
import browseCollectionsReadAllReducer from './BrowseCollections/browseCollectionsReadAllReducer.js';
import collectionNamesReducer from './AppBar/collectionNamesReducer.js';
import manageCollectionsReadOneReducer from './Collections/manageCollectionsReadOneReducer.js';
import manageCollectionsUpdateReducer from './Collections/manageCollectionsUpdateReducer.js';
import signUpReducer from './Authentication/signUpReducer.js';
import loginReducer from './Authentication/loginReducer.js';
import profileReducer from './Profile/profileReducer.js';
import contactReducer from './Contact/contactReducer.js';
import browseCollectionsReadOneReducer from './BrowseCollections/browseCollectionsReadOneReducer.js';
import manageCollectionsCreateReducerAdmin from './Admin/Collections/manageCollectionsCreateReducerAdmin.js';
import manageCollectionsDeleteReducerAdmin from './Admin/Collections/manageCollectionsDeleteReducerAdmin.js';
import manageCollectionsReadAllReducerAdmin from './Admin/Collections/manageCollectionsReadAllReducerAdmin.js';
import manageCollectionsUpdateReducerAdmin from './Admin/Collections/manageCollectionsUpdateReducerAdmin.js';
import browseNewsReadAllReducer from './BrowseNews/browseNewsReadAllReducer.js';
import browseNewsReadOneReducer from './BrowseNews/browseNewsReadOneReducer.js';
import manageNewsCreateReducerAdmin from './Admin/News/manageNewsCreateReducerAdmin.js';
import manageNewsDeleteReducerAdmin from './Admin/News/manageNewsDeleteReducerAdmin.js';
import manageNewsUpdateReducerAdmin from './Admin/News/manageNewsUpdateReducerAdmin.js';
import manageUsersReducerAdmin from './Admin/Users/manageUsersReducerAdmin.js';
import logsCreateCollectionsReducer from './Admin/Logs/Collections/logsCreateCollectionsReducer.js';
import logsDeleteCollectionsReducer from './Admin/Logs/Collections/logsDeleteCollectionsReducer.js';
import logsUpdateCollectionsReducer from './Admin/Logs/Collections/logsUpdateCollectionsReducer.js';
import logsLoginReducer from './Admin/Logs/Login/logsLoginReducer.js';
import logsSignUpReducer from './Admin/Logs/Signup/logsSignUpReducer.js';
import logsProfileReducer from './Admin/Logs/Profile/logsProfileReducer.js';

const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
    userReducer: userReducer,
    profileReducer: profileReducer,
    searchReducer: searchReducer,
    collectionNamesReducer: collectionNamesReducer,
    shouldUpdateCollectionsReducer: shouldUpdateCollectionsReducer,
    collectionsHomeViewReducer: collectionsHomeViewReducer,
    newsHomeViewReducer: newsHomeViewReducer,
    manageCollectionsCreateReducer: manageCollectionsCreateReducer,
    manageCollectionsDeleteReducer: manageCollectionsDeleteReducer,
    manageCollectionsReadAllReducer: manageCollectionsReadAllReducer,
    manageCollectionsReadOneReducer: manageCollectionsReadOneReducer,
    manageCollectionsUpdateReducer: manageCollectionsUpdateReducer,
    browseCollectionsReadAllReducer: browseCollectionsReadAllReducer,
    browseCollectionsReadOneReducer: browseCollectionsReadOneReducer,
    contactReducer: contactReducer,
    manageCollectionsCreateReducerAdmin: manageCollectionsCreateReducerAdmin,
    manageCollectionsDeleteReducerAdmin: manageCollectionsDeleteReducerAdmin,
    manageCollectionsReadAllReducerAdmin: manageCollectionsReadAllReducerAdmin,
    manageCollectionsUpdateReducerAdmin: manageCollectionsUpdateReducerAdmin,
    browseNewsReadAllReducer: browseNewsReadAllReducer,
    browseNewsReadOneReducer: browseNewsReadOneReducer,
    manageNewsCreateReducerAdmin: manageNewsCreateReducerAdmin,
    manageNewsDeleteReducerAdmin: manageNewsDeleteReducerAdmin,
    manageNewsUpdateReducerAdmin: manageNewsUpdateReducerAdmin,
    manageUsersReducerAdmin: manageUsersReducerAdmin,
    logsCreateCollectionsReducer: logsCreateCollectionsReducer,
    logsDeleteCollectionsReducer: logsDeleteCollectionsReducer,
    logsUpdateCollectionsReducer: logsUpdateCollectionsReducer,
    logsLoginReducer: logsLoginReducer,
    logsSignUpReducer: logsSignUpReducer,
    logsProfileReducer: logsProfileReducer
});

export default rootReducer