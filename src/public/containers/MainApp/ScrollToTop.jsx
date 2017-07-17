import React, {Component} from 'react';
import MainApp from './MainApp.jsx';
import {smoothScroll} from './functions.js';

// Important
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

class ScrollToTop extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.location !== nextProps.location) {
            if ((nextProps.location.pathname !== '/collections' || this.props.location.pathname !== '/collections')) {
                smoothScroll();
            }
        }
    }

    render() {
        return <MainApp children={this.props.children}
                        location={this.props.location}/>
    }
}

export default ScrollToTop