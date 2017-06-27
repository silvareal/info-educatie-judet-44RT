import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './modules/Auth.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {browserHistory, Router} from 'react-router';
import routes from './routes.js';

import configureStore from './store/configureStore.js';
import {getCredentials} from './actions/userCredentialsActions.js';
import {getCollectionsHomeView} from './actions/collectionsHomeViewActions.js';
import {getAllCollections} from './actions/Collections/manageCollectionsReadAllActions.js';
import * as browseReadAllActions from './actions/BrowseCollections/browseCollectionsReadAllActions.js';
import * as getAllCollectionNames from './actions/AppBar/collectionNamesActions.js';
import * as getCollectionsAdmin from './actions/Admin/Collections/manageCollectionsReadAllActionsAdmin';
import * as browseNewsReadAllActions from './actions/BrowseNews/browseNewsReadAllActions.js';
import * as setUpdate from './actions/shouldUpdateActions.js';
import * as getNewsHomeView from './actions/newsHomeViewActions.js';

import {Provider} from 'react-redux';

let socket = io.connect();

const store = configureStore();
// Does not need the user to be authenticated
store.dispatch(getAllCollectionNames.getAllCollections());
store.dispatch(browseReadAllActions.getAllCollections());
store.dispatch(browseNewsReadAllActions.getAllNews());
store.dispatch(getCollectionsHomeView());
store.dispatch(getCredentials());
store.dispatch(getNewsHomeView.getNews());

socket.on("updateCollectionsStore", () => {
    store.dispatch(setUpdate.setShouldUpdate());
});

socket.on("updateNewsStore", () => {
    store.dispatch(setUpdate.setShouldUpdateNews())
});

if (Auth.isUserAuthenticated()) {
    store.dispatch(getCredentials());
    store.dispatch(getAllCollections());
    store.dispatch(getCollectionsAdmin.getAllCollections());
}

socket.on("getCredentials", () => {
    // Requires the user to be authenticated
    if (Auth.isUserAuthenticated()) {
        store.dispatch(getCredentials());
        store.dispatch(getAllCollections());
        store.dispatch(getCollectionsAdmin.getAllCollections());
    }
});

injectTapEventPlugin();
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory} routes={routes}/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app'));
