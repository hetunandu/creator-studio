import React from 'react';
import NodeToolbar from './NodeToolbar';
import TextField from 'material-ui/TextField';
import TitleIcon from 'material-ui/svg-icons/editor/title';


class Title extends React.Component {
    render() {
    	const { data, isEditing, index } = this.props;
    
        return (
    		isEditing ? (
    			<div className="node">
    			    <NodeToolbar
    			        nodeIcon={<TitleIcon />}
    			        index={index}
                        shiftNode={this.props.shiftNode}
    			        removeNode={this.props.removeNode}
    			    />
    			    <TextField
    			        hintText="Type here..."
    			        value={data}
    			        fullWidth
    			        style={{fontSize: 25, fontWeight: 300}}
    			        onChange={(e) => this.props.updateNode(e.target.value, 'title', index)}
    			    />
    			</div>
        	) : (
				<span className="concept-title">{data}</span>
        	)
        );
    }


    updateTitle(event){
    	this.props.updateNode(event.target.data, 'title', this.props.index)
    }
}


Title.propTypes = {
	data: React.PropTypes.string.isRequired,
	index: React.PropTypes.number,
	isEditing: React.PropTypes.bool,
	removeNode: React.PropTypes.func,
	updateNode: React.PropTypes.func,
    shiftNode: React.PropTypes.func
}

export default Title;
