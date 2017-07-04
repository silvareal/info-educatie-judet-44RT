import React, {Component} from 'react';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import {smoothScroll} from './functions.js';

class ScrollButton extends Component {
    render() {
        return <HardwareKeyboardArrowUp
            className="scroll"
            onClick={() => smoothScroll()}
        />
    }
}

export default ScrollButton