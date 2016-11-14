import React from 'react';
import NodeToolbar from './NodeToolbar';
import TextIcon from 'material-ui/svg-icons/editor/short-text';
import TextField from 'material-ui/TextField';


class Text extends React.Component {
    render() {

    	const { data, isEditing, index } = this.props

        return (
        	isEditing ? (
        		<div className="node">
        		    <NodeToolbar
        		        nodeIcon={<TextIcon />}
        		        index={index}

        		        removeNode={this.props.removeNode}
        		    />
        		    <TextField
        		        hintText="Text"
        		        multiLine={true}
        		        value={data}
        		        onChange={(e) => this.props.updateNode(e.target.value, 'text', index)}
        		    />
        		</div>
        	) : (
        		<p>{data}</p>
        	)

        );
    }
}

Text.propTypes = {
	data: React.PropTypes.string.isRequired,
	isEditing: React.PropTypes.bool,
	index: React.PropTypes.number,
	removeNode: React.PropTypes.func,
	updateNode: React.PropTypes.func
}

export default Text;
