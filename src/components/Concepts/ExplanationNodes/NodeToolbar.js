import React from 'react';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward';
import AddPointIcon from 'material-ui/svg-icons/av/playlist-add';

const NodeToolbar = React.createClass({
    render(){
        const iconStyles = {
            cursor: 'pointer',
            marginLeft: 10
        };
        return (
            <div style={{backgroundColor: '#afafaf', paddingTop: 5, paddingLeft: 5}}>
                {this.props.nodeIcon}
                <UpArrow
                    className="orange-text"
                    style={iconStyles}
                    onClick={() => this.props.shiftNodeAbove(this.props)}
                />
                

                <RemoveIcon
                    className="red-text right"
                    style={iconStyles}

                    onClick={() => this.props.removeNode(this.props.index)}
                />

                {
                    this.props.pointer &&
                    <AddPointIcon
                        className="blue-text right"
                        style={iconStyles}

                        onClick={() => this.props.handleAddPoint(this.props.index)}
                    />

                }

            </div>
        )
    }
});

export default NodeToolbar;
