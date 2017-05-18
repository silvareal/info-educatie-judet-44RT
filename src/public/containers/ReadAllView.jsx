import React, {Component} from 'react';

import ReadAll from '../components/ReadAll.jsx';
import Auth from '../modules/Auth.js';

class ReadAllView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            collections: [],
            loadAfter: 0,
            finished: false
        };
    };

    fetchAllCollections = () => {
        //errorMessage name might confuse, it is also used to tell when to show a loading component
        //all comparisons can be found in ViewTable.jsx
        this.setState({
            errorMessage: 'Fetching'
        });

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

    componentDidMount() {
        this.fetchAllCollections(this.state.collectionsToRender);

        //the load more event listener
            window.addEventListener('scroll', (e) => {
                if (this.state.finished === false && document.title === "Manage collections")
                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200) {
                    this.loadMore();
                }
            });
    };

    loadAndAppendCollections = (loadAfter) => {

        const loadAfterParam = encodeURIComponent(loadAfter);

        const formData = `loadAfter=${loadAfterParam}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crud/loadMore');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //Do this to not mutate state
                let newCollections = this.state.collections;

                Object.keys(xhr.response.collections).map((key) => {
                    newCollections.push(xhr.response.collections[key]);
                });

                this.setState({collections: newCollections});
            }
            else {
                this.setState({finished: true});
            }
        });

        if (this.state.finished === false)
        xhr.send(formData);
    };

    loadMore = () => {
            this.loadAndAppendCollections(this.state.loadAfter + 5);
            this.setState({loadAfter: this.state.loadAfter + 5});
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