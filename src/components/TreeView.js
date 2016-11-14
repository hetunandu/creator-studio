import React from 'react';

class TreeView extends React.Component {

    render() {

        return (
        	<div className="row tree-view">
        		{ this.props.children }
        	</div>
        );
    }
}

export default TreeView;
