import MainApp from './containers/MainApp.jsx';

import HomeView from './containers/HomeView.jsx';

import LoginView from './containers/LoginView.jsx';
import SignUpView from './containers/SignUpView.jsx';

import ReadAllView from './containers/ReadAllView.jsx'
import CreateView from './containers/CreateView.jsx';
import ReadOneView from './containers/ReadOneView.jsx';
import DeleteView from './containers/DeleteView.jsx';
import UpdateView from './containers/UpdateView.jsx';

import ProfileView from './containers/ProfileView.jsx';

import AdminView from './containers/Admin/AdminView.jsx';
import UsersView from './containers/Admin/Users/UsersView.jsx';
import CreateViewNews from './containers/Admin/News/CreateView.jsx';
import ReadAllViewNews from './containers/Admin/News/ReadAllView.jsx';
import ReadOneViewNews from './containers/Admin/News/ReadOneView.jsx';
import UpdateViewNews from './containers/Admin/News/UpdateView.jsx';
import DeleteViewNews from './containers/Admin/News/DeleteView.jsx';
import CreateViewAdminControl from './containers/Admin/Collections/CreateView.jsx';
import ReadAllViewAdminControl from './containers/Admin/Collections/ReadAllView.jsx';
import ReadOneViewAdminControl from './containers/Admin/Collections/ReadOneView.jsx';
import UpdateViewAdminControl from './containers/Admin/Collections/UpdateView.jsx';
import DeleteViewAdminControl from './containers/Admin/Collections/DeleteView.jsx';
import LogsView from './containers/Admin/Logs/LogsView.jsx';
import LogsLoginView from './containers/Admin/Logs/LogsLoginView.jsx';
import LogsSignupView from './containers/Admin/Logs/LogsSignupView.jsx';
import LogsNewsView from './containers/Admin/Logs/LogsNewsView.jsx';
import LogsNewsCreateView from './containers/Admin/Logs/LogsNewsCreateView.jsx';
import LogsNewsUpdateView from './containers/Admin/Logs/LogsNewsUpdateView.jsx';
import LogsNewsDeleteView from './containers/Admin/Logs/LogsNewsDeleteView.jsx';
import LogsCollectionsView from './containers/Admin/Logs/LogsCollectionsView.jsx';
import LogsCollectionsCreateView from './containers/Admin/Logs/LogsCollectionsCreateView.jsx';
import LogsCollectionsUpdateView from './containers/Admin/Logs/LogsCollectionsUpdateView.jsx';
import LogsCollectionsDeleteView from './containers/Admin/Logs/LogsCollectionsDeleteView.jsx';
import LogsProfileView from './containers/Admin/Logs/LogsProfileView.jsx';

import NotFoundPage from './containers/NotFoundPage.jsx';

import Auth from './modules/Auth';

const routes = {
    component: MainApp,
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
            path: '/admin/:_id/collections/readOne/:_collectionId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadOneViewAdminControl);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/collections/:_id',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadOneView);
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
            path: '/admin/:_id/news',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadAllViewNews);
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
            path: '/admin/:_id/news/readOne/:_newsId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadOneViewNews);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/news/:_newsId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ReadOneViewNews);
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
            component: NotFoundPage
        }

    ]
};

export default routes;
