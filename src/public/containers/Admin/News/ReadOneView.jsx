import React, {Component} from 'react';

import ReadOne from '../../../components/Admin/News/Main Components/ReadOne.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';

class ReadOneView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: '',
            errorMessage: '',
            isAdmin: false
        };
    };

    adminAuth = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/adminAuthentication');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    isAdmin: true
                })
            }
            else this.setState({isAdmin: false})
        });
        xhr.send();
    };

    getCollection = () => {
        //The next few lines will define the HTTP body message
        const newsId = encodeURIComponent(this.props.params._newsId);

        const formData = `newsId=${newsId}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/readOne');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200){

                //Retrieve the data for a single collection
                this.setState({
                    errorMessage: '',
                    news: xhr.response.news
                })
            }
            else {
                this.setState({
                    errorMessage: xhr.response.message
                });
            }
        });

        //Send data for db interrogation
        xhr.send(formData);
    };

    componentDidMount() {
        this.adminAuth();
        this.getCollection();
    };

    render() {
        if (this.state.news.newsTitle)
            document.title = "Article: " + this.state.news.newsTitle;
        if (this.state.isAdmin === true)
        {
            return (
                <ReadOne
                    userId={this.props.params._id}
                    news={this.state.news} />
            );
        }
        else return <NotAuthorizedPage/>
    }
}

export default ReadOneView