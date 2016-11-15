import React from 'react';
import NodeToolbar from './NodeToolbar';
import TextField from 'material-ui/TextField';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote';


class Quote extends React.Component {
    render() {

    	const { data, isEditing, index } = this.props

        return (
        	isEditing ? (
        		<div className="node">
        		    <NodeToolbar
        		        nodeIcon={<QuoteIcon />}
        		        index={index}

        		        removeNode={this.props.removeNode}
        		    />
        		    <TextField
        		        hintText="Type here..."
        		        value={data}
        		        fullWidth
        		        onChange={(e) => this.props.updateNode(e.target.value, 'quote', index)}
        		    />
        		</div>
        	) : (
        		<blockquote style={{borderLeft: '5px solid #F53031'}}>
        			{data}
				</blockquote>
        	)
	    )
    }
}


Quote.propTypes = {
	data: React.PropTypes.string.isRequired,
	isEditing: React.PropTypes.bool,
	index: React.PropTypes.number,
	removeNode: React.PropTypes.func,
	updateNode: React.PropTypes.func
}

export default Quote;
