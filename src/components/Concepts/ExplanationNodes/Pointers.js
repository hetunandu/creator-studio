import React from 'react';
import NodeToolbar from './NodeToolbar';
import PointerIcon from 'material-ui/svg-icons/editor/format-list-numbered';
import AddPointIcon from 'material-ui/svg-icons/av/playlist-add';
import Point from './Point';

class Pointers extends React.Component {

    addPoint(){
        const newData = this.props.data.concat([{
            title: '',
            nodes: []
        }])
        this.props.updateNode(newData, 'pointers', this.props.index)
    }

    updatePoint(newData, index){
        const updatedNode = this.props.data.map((point, j) => {
            if(j !== index){
                return point
            }else{
                return Object.assign({}, point, {
                    title: newData.title,
                    nodes: newData.nodes
                })
            }
        })

        this.props.updateNode(updatedNode, 'pointers', this.props.index)
    }

    removePoint(index){
        const updatedPointer = this.props.data.filter((point, i) => {
            if(i !== index){
                return true
            }else{
                return false
            }
        })

        this.props.updateNode(updatedPointer, 'pointers', this.props.index)
    }

    render() {
        const { data, isEditing, index } = this.props
        return (
            isEditing ? (
                <div className="node">
                    <NodeToolbar
                        nodeIcon={<PointerIcon />}
                        index={index}
                        shiftNode={this.props.shiftNode}
                        removeNode={this.props.removeNode}
                    >
                        <AddPointIcon
                            className="blue-text toolbar-button"
                            onClick={() => this.addPoint(index)}
                        />
                    </NodeToolbar>
                    <ul className="unordered-list">
                        {
                            data.map((point, j) => {
                                return(
                                    <li key={j}>
                                        <Point 
                                            point={point} 
                                            index={j}
                                            isEditing={true}
                                            update={this.updatePoint.bind(this)}
                                            remove={this.removePoint.bind(this)}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>

            ) : (

                <ol>
                    {
                        this.props.data.map((point, i) => {
                            return (
                                <li key={i}>
                                    <Point
                                        point={point}
                                        index={i}
                                    />
                                </li>
                            )
                        })
                    }
                </ol>
            )
        );
    }
}

Pointers.propTypes = {
    data: React.PropTypes.array,
    isEditing: React.PropTypes.bool,
    index: React.PropTypes.number,
    removeNode: React.PropTypes.func,
    updateNode: React.PropTypes.func,
    shiftNode: React.PropTypes.func
}


export default Pointers;
