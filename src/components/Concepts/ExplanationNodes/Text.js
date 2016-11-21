import React from 'react';
import NodeToolbar from './NodeToolbar';
import TextIcon from 'material-ui/svg-icons/editor/short-text';
import TextField from 'material-ui/TextField';
import Markdown from 'react-remarkable';


class Text extends React.Component {
    
    markImp(){
        // Get selected text
        // Add astrics on both sides
        // update data
    }

    renderText(data){
        return <p>{data}</p>
    }

    render() {

    	const { data, isEditing, index } = this.props

        return (
        	isEditing ? (
        		<div className="node">
        		    <NodeToolbar
        		        nodeIcon={<TextIcon />}
        		        index={index}
        		        removeNode={this.props.removeNode}
                        shiftNode={this.props.shiftNode}
                    />
        		    <TextField
        		        hintText="Text"
        		        multiLine={true}
        		        value={data}
        		        fullWidth
        		        onChange={(e) => this.props.updateNode(e.target.value, 'text', index)}
        		    />
        		</div>
        	) : (
        		<Markdown source={data} />
        	)
        );
    }
}

Text.propTypes = {
	data: React.PropTypes.string.isRequired,
	isEditing: React.PropTypes.bool,
	index: React.PropTypes.number,
	removeNode: React.PropTypes.func,
	updateNode: React.PropTypes.func,
    shiftNode: React.PropTypes.func
}

export default Text;
