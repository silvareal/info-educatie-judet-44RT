import React, {Component} from 'react';
import {connect} from 'react-redux';
import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoNewsFound from '../Partials Components/NoNewsFound.jsx'
import {Card, Dialog, RaisedButton} from 'material-ui';
import * as readOneActionsNews from '../../../actions/BrowseNews/browseNewsReadOneActions.js';
import ReadOneView from '../../../containers/BrowseNews/ReadOneView.jsx';

let createHandler = function (dispatch) {
    let getNews = function (newsId) {
        dispatch(readOneActionsNews.getNews(newsId))
    };

    return {
        getNews
    }
};

class ReadAll extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
        this.state = {
            open: false,
            newsId: ""
        }
    }

    handleClose = () => {
        this.setState({open: false});
    };

    onClickNews = (newsId) => {
        this.handlers.getNews(newsId);
        this.setState({
            newsId: newsId,
            open: true
        })
    };

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
                    userId={this.props.userId}
                    onClickNews={this.onClickNews}
                    onLoadMoreNews={this.props.onLoadMoreNews}
                    finished={this.props.finished}
                />
        }
        else if (this.props.fetchingNews === false && this.props.fetchedNews === false) {
            modeComponent = <NoNewsFound/>
        }

        return (
            <div>
                <div className="top-bar-spacing"/>
                <div className="section-title">Browse articles</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    {this.props.admin === true ?
                        <TopActions admin={this.props.admin}
                                    userId={this.props.userId}/>
                        :
                        null
                    }
                    {modeComponent}
                    <Dialog
                        actions={<RaisedButton
                            onClick={this.handleClose}
                            label="Close me" primary={true}
                            buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                        contentStyle={{width: "90%", height: "90%", maxWidth: 'none', maxHeight: 'none'}}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                    >
                        <ReadOneView newsId={this.state.newsId}
                                     dispatch={this.props.dispatch}
                        />
                    </Dialog>
                </Card>
            </div>
        );
    }
}

export default connect()(ReadAll)