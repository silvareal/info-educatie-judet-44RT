import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, RaisedButton} from 'material-ui';

import PictureRow from '../Partials Components/PictureRow.jsx';

class ReadOne extends Component {
    render() {
        let newsPictures = this.props.news.picturesArray;

        let rows;

        if (newsPictures) {
            rows = Object.keys(newsPictures).map((key) => {
                return (
                    <PictureRow
                        key={key}
                        newsPictureLink={newsPictures[key].newsPictureLink}
                    />
                )
            });
        }


        return (
            <div>
                <Card className="container">
                    <Link
                        to={`/admin/${this.props.userId}/news`}>
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Back"
                        />
                    </Link>
                    <div>Title: {this.props.news.newsTitle}</div>
                    <img src={this.props.news.newsCoverLink} alt=""/>
                    <div>Description {this.props.news.newsDescription}</div>
                    {rows}
                </Card>
            </div>
        );
    }
}

export default ReadOne