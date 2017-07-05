import React, {Component} from 'react';
import ViewRow from './ViewRow.jsx';

class ViewTable extends Component {
    render() {
        let rows = this.props.collections
            .map(function (collection, i) {
                if (i % 2 === 0) {
                    return <div key={i}
                                className="collections-break-flex-mobile">
                        <ViewRow collection={this.props.collections[i]}
                                 liked={this.props.liked}
                                 onLike={this.props.onLike}
                                 onUnlike={this.props.onUnlike}
                                 onClickCollection={this.props.onClickCollection}
                        />
                        {this.props.collections[i + 1] ?
                            <ViewRow collection={this.props.collections[i + 1]}
                                     liked={this.props.liked}
                                     onLike={this.props.onLike}
                                     onUnlike={this.props.onUnlike}
                                     onClickCollection={this.props.onClickCollection}
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
            </div>
        );
    }
}

export default ViewTable;