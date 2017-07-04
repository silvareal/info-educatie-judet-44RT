import React, {Component} from 'react';
import PropTypes from 'prop-types'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {smoothScroll} from './functions.js';

class ScrollButton extends Component {
    render() {
        return <div>
                <ContentAdd className="add"
                            onClick={() => this.context.router.push("/manage/create")}
                />
            <HardwareKeyboardArrowUp
                className="scroll"
                onClick={() => smoothScroll()}
            />

        </div>
    }
}

ScrollButton.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ScrollButton