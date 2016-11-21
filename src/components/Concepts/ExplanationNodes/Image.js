import React from 'react';
import NodeToolbar from './NodeToolbar';
import TextField from 'material-ui/TextField';
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo';


class Image extends React.Component {
    render() {
    	const {data, isEditing, index} = this.props

        return (
        	isEditing ? (
        		<div className="node">
        		    <NodeToolbar
        		        nodeIcon={<ImageIcon />}
        		        index={index}
                        shiftNode={this.props.shiftNode}
        		        removeNode={this.props.removeNode}
        		    />
        		    <img
        		        src={data}
        		        className="explanation-img responsive-img"
        		        role="presentation"
        		    />
        		    <TextField
        		        hintText="Image link"
        		        value={data}
        		        fullWidth
        		        onChange={(e) => this.props.updateNode(e.target.value, 'image', index)}
        		    />
        		</div>
        	) : (
        		<img
        			src={data}
        			className="explanation-img responsive-img"
        			role="presentation"
        		/>
        	)
        )
        	
    }
}

Image.propTypes = {
	data: React.PropTypes.string.isRequired,
	isEditing: React.PropTypes.bool,
	index: React.PropTypes.number,
	removeNode: React.PropTypes.func,
	updateNode: React.PropTypes.func
}

export default Image;
