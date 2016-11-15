import React from 'react';
import ConceptCard from './ConceptCard';
import FlatButton from 'material-ui/FlatButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import Close from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router';



const ConceptView = React.createClass({ 

    componentWillReceiveProps(nextProps){
        // If the concept is being edited
        if(this.props.concept.isEditing){
            // If the concept is different
            if(this.props.concept.data.key !== nextProps.concept.data.key){
                // Save the old concept
                this.props.saveConcept(this.props.concept.data);
            }
        }
    },

    componentWillUnmount(){
        // If the concept is being edited
        if(this.props.concept.isEditing){
            this.props.saveConcept(this.props.concept.data)
        }
    },

    render(){
        const { concept } = this.props;

        return(
            <div className="conceptViewContainer grey">
                <p className="red-text">{concept.errorMessage}</p>
                {
                    concept.data.key && (
                        <div>
                            <FlatButton
                                label={concept.isEditing ? 'Save' : 'Edit'}
                                backgroundColor='#333'
                                style={{position: 'fixed', right: 140, top: 70, color: 'white'}}
                                onTouchTap={this.handleFABClick}
                                icon={concept.isEditing ? <ContentSave /> : <ContentEdit />}
                            />
                            <FlatButton
                                label="Delete"
                                backgroundColor='red'
                                style={{position: 'fixed', right: 20, top: 70, color: 'white'}}
                                onTouchTap={this.handleConceptDelete}
                                icon={<Close/>}
                            />
                            {
                                concept.isEditing ? (
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
                                        value={concept.data.name}
                                    />
                                )
                                :
                                (

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
                                        {concept.data.name}
                                    </p>
                                )

                            }
                            <div className="conceptModes">
                                <ConceptCard
                                    concept={concept}
                                    mode={0}
                                    updateConcept={this.handleConceptChange}
                                />
                                 <ConceptCard
                                    concept={concept}
                                    mode={1}
                                    updateConcept={this.handleConceptChange}
                                />
                                 <ConceptCard
                                    concept={concept}
                                    mode={2}
                                    updateConcept={this.handleConceptChange}
                                />
                            </div>
                        </div>

                    )
                }
            </div>
        )
    },
    
    handleConceptNameChange(){
        const concept_name = this.refs.concept_name.input.value;
        const updated_concept = Object.assign({}, this.props.concept.data, {
            name: concept_name
        });
        this.handleConceptChange(updated_concept)
    },

    handleConceptChange(concept){
        const updated_concept = Object.assign({}, this.props.concept.data, concept);
        this.props.updateConcept(updated_concept)
    },

    handleFABClick(){
        if(this.props.concept.isEditing){
            //Save the concept
            this.props.saveConcept(this.props.concept.data);
        }else{
            //Switch to editing mode
            this.props.editMode();
        }
    },
    
    handleConceptDelete(){
        browserHistory.push(`/chapters/${this.props.chapter_key}
            /concepts/${this.props.concept.data.key}/delete`)
    }
});


export default ConceptView
