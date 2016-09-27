import React from 'react';
import {connect} from 'react-redux';
import {setConceptName, addExpNode, updateExpNode, removeExpNode} from '../actions'


import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import TextIcon from 'material-ui/svg-icons/editor/mode-edit';
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import PointersIcon from 'material-ui/svg-icons/editor/format-list-numbered'


const ExplanationForm  = React.createClass({

    handleConceptNameChange(event){
        this.props.setConceptName(event.target.value)
    },

    addParaField(){
        this.props.addExpNode({
            type: 'para',
            data: ''
        })
    },

    addImageField(){
        this.props.addExpNode({
            type: 'image',
            data: ''
        })
    },

    renderNodes(explanation){
        return explanation.map( (node, i) =>{ 
            switch(node.type){
                case 'para':
                    return (
                        <div  key={i}>
                            <p>({i})Para</p>
                            <TextField 
                                hintText="Add content"
                                multiLine={true}
                                value={node.data}
                                id={`${node.type}_${i}`}
                                onChange={this.handleExplanationNodeChange}
                            />
                            <IconButton 
                                tooltip="Remove"
                                onClick={ () => this.removeNode(i)}
                            >
                                <RemoveIcon className="red-text"/>
                            </IconButton>
                            <br />
                        </div>
                    )
                case 'image':
                    return (
                        <div key={i}>
                            <p>({i})Image</p>
                            <TextField 
                                hintText="Image link"
                                value={node.data}
                                id={`${node.type}_${i}`}
                                onChange={this.handleExplanationNodeChange}
                            />
                            <IconButton 
                                tooltip="Remove"
                                onClick={ () => this.removeNode(i)}
                            >
                                <RemoveIcon className="red-text"/>
                            </IconButton>
                            <br />
                        </div>
                    )
                default:
                    return <p>Unknown type</p>
            }
        })
    },

    handleExplanationNodeChange(event){
       const text = event.target.value
       const type = event.target.id.split("_")[0]
       const index = parseInt(event.target.id.split("_")[1], 10)
       this.props.updateExpNode({
           type,
           data: text
       }, index)
    },

    removeNode(index){
        this.props.removeExpNode(index)
    },

    imageUpload(event){
        console.log(event)
    },

    render(){        
        return (
            <div className="row">
                <TextField
                    floatingLabelText="Concept name"
                    value={this.props.newConcept.name}
                    onChange={this.handleConceptNameChange}
                />
                <br/>
                <div className="nodes">
                    {
                        this.renderNodes(this.props.newConcept.explanation)
                    }                  
                    <div className="btns">
                        <IconButton tooltip="Para" onClick={this.addParaField}>
                            <TextIcon />
                        </IconButton>
                        <IconButton tooltip="Image" onClick={this.addImageField}>
                            <ImageIcon />
                        </IconButton>
                        <IconButton tooltip="Pointers" onClick={this.addPointerField}>
                            <PointersIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }

})


const mapStateToProps = ({newConcept}) => ({
    newConcept
})

const mapDispatchToProps = dispatch => ({
    setConceptName: name => {dispatch(setConceptName(name))},
    addExpNode: node => {dispatch(addExpNode(node))},
    updateExpNode: (node, index) => {dispatch(updateExpNode(node, index))},
    removeExpNode: index => {dispatch(removeExpNode(index))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ExplanationForm)