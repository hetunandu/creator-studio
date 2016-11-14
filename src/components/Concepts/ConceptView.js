import React from 'react';
import ConceptCard from './ConceptCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import Close from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router';



const ConceptView = React.createClass({
    
    getInitialState(){
        return {
            editing: false
        }
    },
    
    render(){
        const editMode = this.state.editing;

        return(
            <div className="conceptViewContainer grey">
                <FloatingActionButton
                    mini={true}
                    backgroundColor='red'
                    style={{position: 'fixed', right: 20, top: 70}}
                    onTouchTap={this.handleConceptDelete}
                >
                    <Close />
                </FloatingActionButton>
                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    style={{position: 'fixed', right: 80, top: 70}}
                    onTouchTap={this.handleFABClick}
                >
                    {editMode ? <ContentSave /> : <ContentEdit />}
                </FloatingActionButton>
                {
                    editMode ? (
                        <TextField
                            hintText="Concept Name"
                            style={{
                                display: 'block',
                                margin: '0 auto'
                            }}
                            inputStyle={{
                                fontSize: 25,
                                color: 'white',
                                fontWeight: '400',
                                fullwidth: 'true'
                            }}
                            ref="concept_name"
                            onChange={this.handleConceptNameChange}
                            value={this.props.concept.name}
                        />
                    )
                        :
                        <p
                            className="center"
                            style={{
                                margin: 0,
                                marginBottom: 10,
                                fontSize: 25,
                                color: 'white',
                                fontWeight: '400'
                            }}
                        >
                            {this.props.concept.name}
                        </p>

                }
                <div className="conceptModes">
                    <ConceptCard
                        concept={this.props.concept}
                        mode={0}
                        editing={this.state.editing}

                        updateConcept={this.handleConceptChange}
                    />
                     <ConceptCard
                        concept={this.props.concept}
                        mode={1}
                        editing={this.state.editing}

                        updateConcept={this.handleConceptChange}
                    />
                     <ConceptCard
                        concept={this.props.concept}
                        mode={2}
                        editing={this.state.editing}

                        updateConcept={this.handleConceptChange}
                    />
                </div>
            </div>
        )
    },
    
    handleConceptNameChange(){
        const concept_name = this.refs.concept_name.input.value;
        const updated_concept = Object.assign({}, this.props.concept, {
            name: concept_name
        });
        this.handleConceptChange(updated_concept)
    },

    handleConceptChange(concept){
        const updated_concept = Object.assign({}, this.props.concept, concept);
        this.props.updateConcept(updated_concept)
    },

    handleFABClick(){
        if(this.state.editing){
            //Save the concept
            this.props.saveConcept(this.props.concept);
            
            this.setState({
                editing: false
            })
        }else{
            //Switch to editing mode
            this.setState({
                editing: true
            })
        }
    },
    
    handleConceptDelete(){
        browserHistory.push(`/chapters/${this.props.chapter_key}/concepts/${this.props.concept.key}/delete`)
    }
});


export default ConceptView
