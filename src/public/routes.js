import ScrollToTop from './containers/MainApp/ScrollToTop.jsx';

import HomeView from './containers/Home/HomeView.jsx';

import LoginView from './containers/Authentication/LoginView.jsx';
import SignUpView from './containers/Authentication/SignUpView.jsx';

import ReadAllView from './containers/Collections/ReadAllView.jsx'
import CreateView from './containers/Collections/CreateView.jsx';
import ReadOneView from './containers/Collections/ReadOneView.jsx';
import DeleteView from './containers/Collections/DeleteView.jsx';
import UpdateView from './containers/Collections/UpdateView.jsx';

import ProfileView from './containers/Profile/ProfileView.jsx';

import AdminView from './containers/Admin/Main Component/AdminView.jsx';
import UsersView from './containers/Admin/Users/UsersView.jsx';
import CreateViewNews from './containers/Admin/News/CreateView.jsx';
import UpdateViewNews from './containers/Admin/News/UpdateView.jsx';
import DeleteViewNews from './containers/Admin/News/DeleteView.jsx';
import CreateViewAdminControl from './containers/Admin/Collections/CreateView.jsx';
import ReadAllViewAdminControl from './containers/Admin/Collections/ReadAllView.jsx';
import UpdateViewAdminControl from './containers/Admin/Collections/UpdateView.jsx';
import DeleteViewAdminControl from './containers/Admin/Collections/DeleteView.jsx';
import LogsView from './containers/Admin/Logs/Main Component/LogsView.jsx';
import LogsLoginView from './containers/Admin/Logs/Login/LogsLoginView.jsx';
import LogsSignupView from './containers/Admin/Logs/Signup/LogsSignupView.jsx';
import LogsNewsView from './containers/Admin/Logs/News/LogsNewsView.jsx';
import LogsNewsCreateView from './containers/Admin/Logs/News/LogsNewsCreateView.jsx';
import LogsNewsUpdateView from './containers/Admin/Logs/News/LogsNewsUpdateView.jsx';
import LogsNewsDeleteView from './containers/Admin/Logs/News/LogsNewsDeleteView.jsx';
import LogsCollectionsView from './containers/Admin/Logs/Collections/LogsCollectionsView.jsx';
import LogsCollectionsCreateView from './containers/Admin/Logs/Collections/LogsCollectionsCreateView.jsx';
import LogsCollectionsUpdateView from './containers/Admin/Logs/Collections/LogsCollectionsUpdateView.jsx';
import LogsCollectionsDeleteView from './containers/Admin/Logs/Collections/LogsCollectionsDeleteView.jsx';
import LogsProfileView from './containers/Admin/Logs/Profile/LogsProfileView.jsx';

import ReadAllViewBrowseCollections from './containers/BrowseCollections/ReadAllView.jsx';
import ReadOneViewBrowseCollections from './containers/BrowseCollections/ReadOneView.jsx';
import ReadAllViewBrowseNews from './containers/BrowseNews/ReadAllView.jsx';
import ReadOneViewBrowseNews from './containers/BrowseNews/ReadOneView.jsx';

import ReadAllViewSearch from './containers/SearchResults/ReadAllView.jsx';

import ContactView from './containers/Contact/ContactView.jsx';

import NotFoundView from './containers/Error/NotFoundView.jsx';

import Auth from './modules/Auth';

const routes = {
    component: ScrollToTop,
    childRoutes: [

        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, HomeView);
                } else {
                    callback(null, HomeView);
                }
            }
        },

        {
            path: '/login',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, HomeView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/contact',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ContactView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/signup',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, HomeView);
                } else {
                    callback(null, SignUpView);
                }
            }
        },

        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                // change the current URL to /
                replace('/');
            }
        },

        {
            path: '/collections',
            component: ReadAllViewBrowseCollections
        },

        {
            path: '/collections/:_id',
            component: ReadOneViewBrowseCollections
        },
        
        {
            path: '/news',
            component: ReadAllViewBrowseNews
        },

        {
            path:'/news/:_newsId',
            component: ReadOneViewBrowseNews
        },

        {
            path: '/admin/:_id',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, AdminView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/admin/:_id/collections',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadAllViewAdminControl);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/admin/:_id/collections/create',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, CreateViewAdminControl);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/admin/:_id/collections/update/:_collectionId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, UpdateViewAdminControl);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/admin/:_id/collections/delete/:_collectionId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, DeleteViewAdminControl);
                } else {
                    callback(null, LoginView);
                }
            }
        },


        {
            path: '/admin/:_id/news/create',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, CreateViewNews);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/news/:_newsId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadOneViewBrowseNews);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/admin/:_id/news/update/:_newsId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, UpdateViewNews);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/admin/:_id/news/delete/:_newsId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, DeleteViewNews);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/users',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, UsersView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/login',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsLoginView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/signup',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsSignupView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/collections',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsCollectionsView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/collections/create',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsCollectionsCreateView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/collections/update',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsCollectionsUpdateView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/collections/delete',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsCollectionsDeleteView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/news',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsNewsView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/news/create',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsNewsCreateView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/news/update',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsNewsUpdateView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/news/delete',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsNewsDeleteView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: 'admin/:_id/logs/profile',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, LogsProfileView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/manage',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadAllView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/manage/readOne/:_id',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadOneView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/manage/readOne/:_id/delete',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, DeleteView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/search/:_searchQuery',
            component: ReadAllViewSearch
        },

        {
            path: '/search/',
            component: ReadAllViewSearch
        },

        {
            path: '/search',
            component: ReadAllViewSearch
        },

        {
            path: '/profile/:userName',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ProfileView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path:'/manage/readOne/:_id/update',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, UpdateView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/manage/create',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, CreateView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '*',
            component: NotFoundView
        }

    ]
};

export default routes;
