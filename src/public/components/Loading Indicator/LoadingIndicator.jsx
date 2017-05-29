import React, {Component} from 'react';
import Spinner from 'react-spinkit'

class LoadingIndicator extends Component {

    render() {
        return (
            <div className="loading-style">
                <Spinner name="wave" color="#42ab9e"/>
            </div>
        )
    }

}

export default LoadingIndicator