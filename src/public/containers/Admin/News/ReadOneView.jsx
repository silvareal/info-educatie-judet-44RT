import React, {Component} from 'react';

import ReadOne from '../../../components/Admin/News/ReadOne.jsx';
import Auth from '../../../modules/Auth.js';

class ReadOneView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: '',
            errorMessage: ''
        };
    };

    componentDidMount() {

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

    render() {
        if (this.state.news.newsTitle)
            document.title = "Article: " + this.state.news.newsTitle;
        return (
            <ReadOne
                userId={this.props.params._id}
                news={this.state.news} />
        );
    }
}

export default ReadOneView