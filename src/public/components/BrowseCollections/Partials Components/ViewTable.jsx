import React, {Component} from 'react';
import ViewRow from './ViewRow.jsx';
import {RaisedButton} from 'material-ui';

class ViewTable extends Component {
    render() {
        let rows = this.props.collections
            .map(function (collection, i) {
                if (i % 2 === 0) {
                    return <div key={i}
                                className="collections-break-flex-mobile">
                        <ViewRow guest={this.props.guest}
                                 collection={this.props.collections[i]}
                                 liked={this.props.liked}
                                 onLike={this.props.onLike}
                                 onUnlike={this.props.onUnlike}
                                 onClickCollection={this.props.onClickCollection}
                                 context={this.props.context}
                                 admin={this.props.admin}
                                 userId={this.props.userId}
                        />
                        {this.props.collections[i + 1] ?
                            <ViewRow guest={this.props.guest}
                                     collection={this.props.collections[i + 1]}
                                     liked={this.props.liked}
                                     onLike={this.props.onLike}
                                     onUnlike={this.props.onUnlike}
                                     onClickCollection={this.props.onClickCollection}
                                     context={this.props.context}
                                     admin={this.props.admin}
                                     userId={this.props.userId}
                            />
                            :
                            null
                        }

                    </div>;
                }
                else return null;
            }.bind(this));

        return (
            <div className="view-table">
                <div>
                    {rows}
                </div>
                <RaisedButton label={this.props.finished === true ? "No more collections :(" : "Load more collections ..."}
                              disabled={this.props.finished}
                              onTouchTap={this.props.onLoadMoreCollections}
                              primary={true}
                              fullWidth={true}
                              labelStyle={{color: "#ffffff"}}
                              buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                />
            </div>
        );
    }
}

export default ViewTable;