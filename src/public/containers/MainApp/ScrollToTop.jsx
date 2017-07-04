import React, {Component} from 'react';
import MainApp from './MainApp.jsx';
import {smoothScroll} from './functions.js';

// Important
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

class ScrollToTop extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            smoothScroll();
        }
    }

    render() {
        return <MainApp children={this.props.children}
                        location={this.props.location}/>
    }
}

export default ScrollToTop