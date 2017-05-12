import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, RaisedButton} from 'material-ui';

import PictureRow from './PictureRow.jsx';

class ReadOne extends Component {
    render() {
        let pictures = this.props.collection.picturesArray;

        let rows;

        if (pictures) {
             rows = Object.keys(pictures).map((key) => {
                return (
                    <PictureRow
                        key={key}
                        pictureName={pictures[key].pictureName}
                        pictureLink={pictures[key].pictureLink}
                        pictureDescription={pictures[key].pictureDescription}
                    />
                )
            });
        }


        return (
            <div>
                <Card className="container">
                    <Link
                        to="/manage">
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Back"
                        />
                    </Link>
                    <div>Collection name: {this.props.collection.collectionName}</div>
                    <div>Collection description: {this.props.collection.collectionDescription}</div>
                    {rows}
                </Card>
            </div>
        );
    }
}

export default ReadOne