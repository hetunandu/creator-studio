import React from 'react';
import TextField from 'material-ui/TextField';
import NodeToolbar from './NodeToolbar';
import TextIcon from 'material-ui/svg-icons/editor/short-text';
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo';
import Text from './Text';
import Image from './Image';

class Point extends React.Component {

	removePointNode(index){
        const newPoint = Object.assign({}, this.props.point, {
            nodes: this.props.point.nodes.filter((node, i) => {
                if(i !== index){
                    return true
                }else{
                    return false
                }
            })
        })
        this.props.update(newPoint, this.props.index)
	}

	addPointNode(type){
		const newPoint = Object.assign({}, this.props.point, {
            nodes: this.props.point.nodes.concat([{
                type,
                data: ""
            }])
        })
        this.props.update(newPoint, this.props.index)
	}

    updatePointNode(value, type, index){
        const newPoint = Object.assign({}, this.props.point, {
            nodes: this.props.point.nodes.map( (node, i) => {
                if(i !== index){
                    return node
                }else{
                    return {
                        type,
                        data: value
                    }
                }
            })
        })

        this.props.update(newPoint, this.props.index)
    }

    updateTitle(newTitle){
        const newPoint = Object.assign({}, this.props.point, {
            title: newTitle
        })

        this.props.update(newPoint, this.props.index)
    }

    render() {
        return (
        	<div className="point">
                { 
                    this.props.isEditing ? (
                        <div>
                            <NodeToolbar
                                nodeIcon={
                                    <span className="point-index">{this.props.index + 1}</span>
                                }
                                index={this.props.index}
                                removeNode={this.props.remove}
                            >
                                <TextIcon
                                    className="blue-text text-darken-4 toolbar-button"
                                    onClick={() => this.addPointNode('text')}
                                />
                                <ImageIcon 
                                    className="blue-text text-darken-4 toolbar-button"
                                    onClick={() => this.addPointNode('image')}
                                />
                            </NodeToolbar>
                            <TextField
                                fullWidth
                                hintText="Pointer title..."
                                value={this.props.point.title}
                                onChange={(e) => this.updateTitle(e.target.value)}
                            />
                            {
                                this.props.point.nodes.map( (node, i) => {
                                    if(node.type === "text"){
                                        return (
                                            <Text 
                                                key={`${i}-point${this.props.index}`}
                                                data={node.data}
                                                index={i}
                                                isEditing={true}
                                                updateNode={this.updatePointNode.bind(this)}
                                                removeNode={this.removePointNode.bind(this)}
                                            />
                                        )
                                    }else if(node.type === "image"){
                                        return (
                                            <Image
                                                key={`${i}-point${this.props.index}`}
                                                data={node.data}
                                                index={i}
                                                isEditing={true}
                                                updateNode={this.updatePointNode.bind(this)}
                                                removeNode={this.removePointNode.bind(this)}
                                            />
                                        )
                                    }else{
                                        return "unknown type"
                                    }
                                })
                            }
                        </div>
                    ) : (
                        <div>
                            <span className="point-title">{this.props.point.title}</span>
                            {
                                this.props.point.nodes.map((node, i) => {
                                    if(node.type === "text"){
                                        return (
                                            <Text 
                                                key={`${i}-point${this.props.index}`}
                                                data={node.data}
                                                index={i}
                                            />
                                        )
                                    }else if(node.type === "image"){
                                        return (
                                            <Image
                                                key={`${i}-point${this.props.index}`}
                                                data={node.data}
                                                index={i}
                                            />
                                        )
                                    }else{
                                        return "unknown type"
                                    }
                                })
                            }
                        </div>
                    )

                }
                
            </div>
        );
    }
}

export default Point;
