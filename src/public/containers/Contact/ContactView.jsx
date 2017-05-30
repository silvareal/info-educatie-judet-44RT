import React, {Component} from 'react';

import Auth from '../../modules/Auth.js';
import Contact from '../../components/Contact/Contact.jsx';

class ContactView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            feedback: '',
            errors: {},
            success: '',
            guest: false
        }
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.resetScroll();
        this.getCredentials();
    }

    getCredentials = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/credentials');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //Check for guest
                xhr.response.guest ?
                    this.setState({
                        guest: xhr.response.guest
                    })
                    :
                    this.setState({
                        guest: xhr.response.guest,
                        userName: xhr.response.userName
                    })
            }
        });
        xhr.send();
    };

    onFeedbackChange = (e) => {
        this.setState({feedback: e.target.value});
    };

    onSave = () => {

        const userName = encodeURIComponent(this.state.userName);
        const feedback = encodeURIComponent(this.state.feedback);

        const formData = `userName=${userName}&feedback=${feedback}`;

        const xhr = new XMLHttpRequest();
        xhr.open("post", "/home/contact");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {},
                    success: true,
                    feedback: ''
                })
            }
            else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                this.setState({errors, success: false})
            }
        });

        xhr.send(formData);
    };

    render() {
        return <Contact errors={this.state.errors}
                        guest={this.state.guest}
                        feedback={this.state.feedback}
                        onFeedbackChange={this.onFeedbackChange}
                        onSave={this.onSave}
                        success={this.state.success}
                        />
    }
}

export default ContactView;