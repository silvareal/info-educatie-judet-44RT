import React, {Component} from 'react';
import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoNewsFound from '../Partials Components/NoNewsFound.jsx'
import {Card} from 'material-ui';

class ReadAll extends Component {
    render() {

        let modeComponent = <LoadingIndicator/>;

        if (this.props.fetchingNews === true) {
            modeComponent = <LoadingIndicator/>;
        }
        else if (this.props.fetchingNews === false && this.props.fetchedNews === true) {
            modeComponent =
                <ViewTable
                    news={this.props.news}
                    admin={this.props.admin}
                    userId={this.props.userId}/>
        }
        else if (this.props.fetchingNews === false && this.props.fetchedNews === false) {
            modeComponent = <NoNewsFound/>
        }

        return (
            <div className="parallax-collections">
                <div className="top-bar-spacing"/>
                <div className="section-title">Browse articles</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    <TopActions admin={this.props.admin}
                                userId={this.props.userId}/>
                    {modeComponent}
                </Card>
            </div>
        );
    }
}

export default ReadAll