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
import {setShouldUpdate} from './actions/shouldUpdateActions.js';
import {getAllCollections} from './actions/Collections/manageCollectionsReadAllActions.js';
import * as browseReadAllActions from './actions/Browse/browseCollectionsReadAllActions.js';
import * as getAllCollectionNames from './actions/AppBar/collectionNamesActions.js';

import {Provider} from 'react-redux';

let socket = io.connect();

const store = configureStore();
// Does not need the user to be authenticated
store.dispatch(getAllCollectionNames.getAllCollections());
store.dispatch(browseReadAllActions.getAllCollections());
store.dispatch(getCollectionsHomeView());
store.dispatch(getCredentials());
socket.on("updateCollectionsStore", () => {
    store.dispatch(setShouldUpdate());
});

socket.on("getCredentials", () => {
    // Requires the user to be authenticated
    if (Auth.isUserAuthenticated()){
        store.dispatch(getCredentials());
        store.dispatch(getAllCollections());
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
