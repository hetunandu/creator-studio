import React from 'react';
import ConceptCard from './ConceptCard';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const ConceptView = React.createClass({
    
    getInitialState(){
        return {
            index: 0,
            editing: false
        }
    },
    
    componentDidUpdate(){
    },
    
    render(){
        const editMode = this.state.editing;

        return(
            <div className="conceptViewContainer grey">
                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    style={{position: 'fixed', right: 20, top: 80}}
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
                                fontWeight: '400'
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

                <ConceptCard
                    concept={this.props.concept}
                    mode={this.state.index}
                    editing={this.state.editing}

                    updateConcept={this.handleConceptChange}
                />

                <div
                    style={{
                        backgroundColor: 'white',
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        width: '50%'
                    }}
                >
                    <BottomNavigation selectedIndex={this.state.index}>
                        <BottomNavigationItem
                            label="Explanation"
                            icon={ <FontIcon className="material-icons">lightbulb_outline</FontIcon>}
                            onTouchTap={() => this.handleModeChange(0)}
                        />
                        <BottomNavigationItem
                            label="References and Tips"
                            icon={<FontIcon className="material-icons">info_outline</FontIcon>}
                            onTouchTap={() => this.handleModeChange(1)}
                        />
                        <BottomNavigationItem
                            label="Questions"
                            icon={<FontIcon className="material-icons">help_outline</FontIcon>}
                            onTouchTap={() => this.handleModeChange(2)}
                        />
                    </BottomNavigation>
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

    handleModeChange(index){
        this.setState({index})
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
    }
});


export default ConceptView
