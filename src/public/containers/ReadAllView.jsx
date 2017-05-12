import React, {Component} from 'react';

import ReadAll from '../components/ReadAll.jsx';
import Auth from '../modules/Auth.js';

class ReadAllView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            collections: []
        };
    };

    componentDidMount() {

        //errorMessage name might confuse, it is also used to tell when to show a loading component
        //all comparisons can be found in ViewTable.jsx
        this.setState({
            errorMessage: 'Fetching'
        });

        //The next few lines will define the HTTP body message

        //AJAX for checking identity and retrieving all collections that belong to the user with the _id specified
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/crud/readAll');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //The user is who he says he is
                //We store our results for further safe data management in state
                this.setState({
                    errorMessage: 'Fetched collections',
                    collections: xhr.response.collections
                });
            }
            else if (xhr.status === 404) {
                //No collections found and we set the corresponding error message
                this.setState({
                    errorMessage: xhr.response.message
                });
            }
            else {
                ////Database error to be handled only by an admin
                this.setState({
                    errorMessage: 'Please contact an administrator'
                })
            }
        });

        //Send the identity check only when the page loads
        //Any further modifications to localStorage are futile for attackers, we don't use that data for DB selection
        xhr.send();

    };

    render() {
        document.title = "Manage collections";
        return (
            <div>
                <ReadAll
                    collections={this.state.collections}
                    errorMessage={this.state.errorMessage}
                />
            </div>
        );
    }
}

export default ReadAllView