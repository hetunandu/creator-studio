import React from 'react';
import NodeToolbar from './NodeToolbar';
import TextField from 'material-ui/TextField';
import PointerIcon from 'material-ui/svg-icons/editor/format-list-numbered';
import AddPointIcon from 'material-ui/svg-icons/av/playlist-add';



class Pointers extends React.Component {

    handleAddPoint(){
        const newData = this.props.data.concat([{
            title: '',
            nodes: []
        }])
        this.props.updateNode(newData, 'pointers', this.props.index)
    }

    updatePointer(newData, index){
        const updatedNode = this.props.data.map((point, j) => {
            if(j !== index){
                return point
            }else{
                return Object.assign({}, point, {
                    title: newData
                })
            }
        })

        this.props.updateNode(updatedNode, 'pointers', this.props.index)
    }

    render() {
        const { data, isEditing, index } = this.props
        return (
            isEditing ? (
                <div className="node">
                    <NodeToolbar
                        nodeIcon={<PointerIcon />}
                        index={index}
                        removeNode={this.props.removeNode}
                    >
                        <AddPointIcon
                            className="blue-text toolbar-button"
                            onClick={() => this.handleAddPoint(index)}
                        />
                    </NodeToolbar>
                    <ol>
                        {
                            data.map((point, j) => {
                                return(
                                    <li key={j}>
                                        <TextField
                                            fullWidth
                                            hintText="Pointer title..."
                                            value={point.title}
                                            onChange={(e) => this.updatePointer(e.target.value, j)}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ol>

                </div>

            ) : (

                <ol>
                    {
                        this.props.data.map((point, i) => {
                            return (
                                <li key={i}>
                                    <h6>{point.title}</h6>
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
    updateNode: React.PropTypes.func
}


export default Pointers;
