import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './modules/Auth.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {browserHistory, Router} from 'react-router';
import routes from './routes.js';

import configureStore from './store/configureStore.js';
import * as userActions from './actions/userCredentialsActions.js';

import {getAllCollections} from './actions/Collections/manageCollectionsReadAllActions.js';
import * as browseReadAllActions from './actions/BrowseCollections/browseCollectionsReadAllActions.js';

import * as browseNewsReadAllActions from './actions/BrowseNews/browseNewsReadAllActions.js';
import * as setUpdate from './actions/shouldUpdateActions.js';

// HomeView
import * as getNewsHomeView from './actions/newsHomeViewActions.js';
import * as getCollectionsHomeView from './actions/collectionsHomeViewActions.js'

// For search and not only
import * as getAllCollectionNames from './actions/AppBar/collectionNamesActions.js';

import {Provider} from 'react-redux';


let socket = io.connect();

const store = configureStore();
// Does not need the user to be authenticated
store.dispatch(getAllCollectionNames.getAllCollections());
store.dispatch(browseReadAllActions.getAllCollections());
store.dispatch(browseNewsReadAllActions.getAllNews());
store.dispatch(getCollectionsHomeView.getCollectionsHomeView());
store.dispatch(userActions.getCredentials());
store.dispatch(getNewsHomeView.getNews());

socket.on("updateCollectionsStore", () => {
    store.dispatch(setUpdate.setShouldUpdate());
});

socket.on("updateNewsStore", () => {
    store.dispatch(setUpdate.setShouldUpdateNews())
});

if (Auth.isUserAuthenticated()) {
    store.dispatch(userActions.getCredentials());
    store.dispatch(getAllCollections());
}

socket.on("getCredentials", () => {
    // Requires the user to be authenticated
    if (Auth.isUserAuthenticated()) {
        store.dispatch(userActions.getCredentials());
        store.dispatch(getAllCollections());
    }
});

socket.on("onLike", (data) => {
    store.dispatch(userActions.onLikeSuccess());
    store.dispatch(userActions.onLikeAllUsers(data.likedId))
});

socket.on("onUnlike", (data) => {
    store.dispatch(userActions.onUnlikeSuccess());
    store.dispatch(userActions.onUnlikeAllUsers(data.likedId))
});

injectTapEventPlugin();
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory} routes={routes}/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app'));