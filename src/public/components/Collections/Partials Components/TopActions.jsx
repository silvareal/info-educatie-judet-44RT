import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, TextField, IconButton} from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';

class TopActions extends Component {
    render() {
        return (
            <div className="top-actions">
                <div className="capsules"/>
                <div className="capsules">
                    <Link
                        to="/manage/create">
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Add a new collection"
                            buttonStyle={{backgroundColor: "#42ab9e"}}
                        />
                    </Link>
                </div>
                <div className="capsules" style={{justifyContent: "flex-end"}}>
                    {this.props.searchQuery.length > 100 ?
                        <TextField
                            type="text"
                            hintText="Search..."
                            value={this.props.searchQuery}
                            onChange={this.props.onQueryChange}
                            onKeyDown={this.props.handleKeyPress}
                            errorText="Search term too long"
                            inputStyle={{color: "#000000"}}
                            floatingLabelStyle={{color: "#ee6e73"}}
                            underlineFocusStyle={{borderColor: "#ee6e73"}}
                        />
                        :
                        <TextField
                            type="text"
                            hintText="Search..."
                            value={this.props.searchQuery}
                            onChange={this.props.onQueryChange}
                            onKeyDown={this.props.handleKeyPress}
                            inputStyle={{color: "#000000"}}
                            floatingLabelStyle={{color: "#ee6e73"}}
                            underlineFocusStyle={{borderColor: "#ee6e73"}}
                        />
                    }
                    <IconButton onTouchTap={this.props.onSearch}>
                        <ActionSearch/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default TopActions