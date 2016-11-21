import React from 'react';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward';

const NodeToolbar = React.createClass({
    render(){
        return (
            <div className="toolbar">
                {this.props.nodeIcon}
                <div className="right">
                    {
                        this.props.shiftNode ? (
                            this.props.index > 0 ? (
                                <UpArrow
                                    className="orange-text toolbar-button"
                                    onClick={() => this.props.shiftNode(this.props.index)}
                                />
                            ) : ('')
                        ) : ('')
                    }
                    <RemoveIcon
                        className="red-text toolbar-button"
                        onClick={() => this.props.removeNode(this.props.index)}
                    />
                </div>
                { this.props.children }                
            </div>
        )
    }
});

NodeToolbar.propTypes = {
  nodeIcon: React.PropTypes.element.isRequired,
  index: React.PropTypes.number.isRequired,
  removeNode: React.PropTypes.func,
  shiftNode: React.PropTypes.func
}

export default NodeToolbar
