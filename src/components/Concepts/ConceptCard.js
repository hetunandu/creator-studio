import React from 'react';
import ExplanationView from './ExplanationView';
import ExplanationForm from './ExplanationForm';
import ReferenceView from './ReferenceView';
import ReferenceForm from './ReferenceForm';
import Paper from 'material-ui/Paper';


const ConceptCard = React.createClass({
    render(){
        const concept = this.props.concept;
        let classes;
        let body;

        switch(this.props.mode){
            case 1:
                classes = "concept-card references";
                if(this.props.editing){
                    body = (
                        <ReferenceForm
                            references={concept.references}
                            tips={concept.tips}

                            updateReferences={this.updateReferences}
                            updateTips={this.updateTips}
                        />
                    );
                }else{
                    body =  <ReferenceView references={concept.references} tips={concept.tips}/>;
                }
                break;
            case 2:
                classes = "concept-card questions";
                body = <p>Questions</p>;
                break;
            default:
                classes =  "concept-card explanation";
                if(this.props.editing){
                    body = (
                        <ExplanationForm 
                            explanation={concept.explanation} 
                            updateExplanation={this.updateExplanation}
                        />
                    );
                }else{
                    body = <ExplanationView explanation={concept.explanation}/>;
                }
                break;
        }

        return(
            <Paper
                zDepth={2}
                className={classes}
            >
                {body}

            </Paper>
        )
    },
    
    updateExplanation(explanation){
        const new_concept = Object.assign({}, this.props.concept, {
            explanation
        });
        this.props.updateConcept(new_concept)
    },

    updateReferences(references){
        const new_concept = Object.assign({}, this.props.concept, {
            references
        });
        this.props.updateConcept(new_concept)
    },

    updateTips(tips){
        const new_concept = Object.assign({}, this.props.concept, {
            tips
        });
        this.props.updateConcept(new_concept)
    }
});

export default ConceptCard