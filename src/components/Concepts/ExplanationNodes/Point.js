import React from 'react';
import TextField from 'material-ui/TextField';
import NodeToolbar from './NodeToolbar';
import TextIcon from 'material-ui/svg-icons/editor/short-text';
import SubPointerIcon from 'material-ui/svg-icons/editor/format-list-bulleted';
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo';
import AddPointIcon from 'material-ui/svg-icons/av/playlist-add';
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

    removeSubPoint(pointIndex, subPointIndex){
        const newPoint = Object.assign({}, this.props.point, {
            nodes: this.props.point.nodes.map((node, i) => {
                if(i !== pointIndex){
                    return node
                }else{
                    const newSubNode = Object.assign({}, node, {
                        data: node.data.filter((subPoint, j) => {
                                if(j !== subPointIndex){
                                    return true
                                }else{
                                    return false
                                }
                            })
                    })
                    
                    return newSubNode
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

    addSubPointNode(){
        const newPoint = Object.assign({}, this.props.point, {
            nodes: this.props.point.nodes.concat([{
                type: 'subPoint',
                data: [""]
            }])
        })

        this.props.update(newPoint, this.props.index)
    }

    addSubPoint(index){
        const newPoint = Object.assign({}, this.props.point, {
            nodes: this.props.point.nodes.map( (node, i) => {
                if(i !== index) {
                    return node
                }else{
                    const newSub = Object.assign({}, node, {
                        data: node.data.concat([""])
                    })
                    return newSub
                }
            })
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

    updateSubPoint(index, value, type, subPointIndex){
        const newPoint = Object.assign({}, this.props.point, {
            nodes: this.props.point.nodes.map((node, i) => {
                if(i !== index){
                    return node
                }else{
                    const newSub = Object.assign({}, node, {
                        data: node.data.map((subPoint, j) => {
                            if(j !== subPointIndex){
                                return subPoint
                            }else{
                                return value
                            }
                        })
                    })
                    return newSub
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
                                <SubPointerIcon
                                    className="blue-text text-darken-4 toolbar-button"
                                    onClick={() => this.addSubPointNode()}
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
                                    }else if(node.type === "subPoint"){
                                        return (
                                            <div key={`${i}-point${this.props.index}`}>
                                                <NodeToolbar
                                                    nodeIcon={<SubPointerIcon/>}
                                                    index={i}
                                                    removeNode={this.removePointNode.bind(this)}
                                                >
                                                    <AddPointIcon
                                                        className="blue-text toolbar-button"
                                                        onClick={() => this.addSubPoint(i)}
                                                    />
                                                </NodeToolbar>
                                                {
                                                    node.data.map( (subPoint, j) => {
                                                        return (
                                                            <Text
                                                                key={`${j}-subPoint-${i}`}
                                                                data={subPoint}
                                                                index={j}
                                                                isEditing={true}
                                                                updateNode={this.updateSubPoint.bind(this, i)}
                                                                removeNode={() => this.removeSubPoint(i, j)}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
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
                                    }else if(node.type === "subPoint"){
                                        return (
                                            <ol key={`subPoint-${i}`} type="a">
                                            {
                                                node.data.map((subPoint, j) => {
                                                    return (
                                                        <li key={`${j}-subPoint-${i}`}>
                                                            <Text
                                                                data={subPoint}
                                                                index={j}
                                                            />
                                                        </li>
                                                    )
                                                })
                                            }
                                            </ol>
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
