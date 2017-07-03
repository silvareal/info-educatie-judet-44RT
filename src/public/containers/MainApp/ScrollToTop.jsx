import React, {Component} from 'react';
import MainApp from './MainApp.jsx';

// Important
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

// Scroll algorithm from a tutorial, modified to work with React by us
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (window.innerHeight + window.pageYOffset) return window.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function smoothScroll() {
    let startY = currentYPosition();
    let stopY = 0;
    let distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    let step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
        for (let i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

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