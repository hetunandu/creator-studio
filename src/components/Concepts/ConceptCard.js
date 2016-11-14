import React from 'react';
import ExplanationView from './ExplanationView';
import ExplanationForm from './ExplanationForm';
import ReferenceView from './ReferenceView';
import ReferenceForm from './ReferenceForm';
import QuestionsForm from './QuestionsForm';
import QuestionsView from './QuestionsView';
import Paper from 'material-ui/Paper';


const ConceptCard = React.createClass({
    render(){
        const {concept} = this.props;
        let classes;
        let body;

        switch(this.props.mode){
            case 1:
                classes = "concept-card references";
                if(concept.isEditing){
                    body = (
                        <ReferenceForm
                            references={concept.data.references}
                            tips={concept.data.tips}

                            updateReferences={this.updateReferences}
                            updateTips={this.updateTips}
                        />
                    );
                }else{
                    body =  <ReferenceView references={concept.data.references} tips={concept.data.tips}/>;
                }
                break;
            case 2:
                classes = "concept-card questions";
                if(concept.isEditing){
                    body= (
                      <QuestionsForm
                          questions={concept.data.questions}
                          updateQuestions={this.updateQuestions}
                      />
                    );
                }else{
                    body = <QuestionsView questions={concept.data.questions} />;
                }
                break;
            default:
                classes =  "concept-card explanation";
                if(concept.isEditing){
                    body = (
                        <ExplanationForm 
                            explanation={concept.data.explanation} 
                            updateExplanation={this.updateExplanation}
                        />
                    );
                }else{
                    body = <ExplanationView explanation={concept.data.explanation}/>;
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
        const new_concept = Object.assign({}, this.props.concept.data, {
            explanation
        });
        this.props.updateConcept(new_concept)
    },

    updateReferences(references){
        const new_concept = Object.assign({}, this.props.concept.data, {
            references
        });
        this.props.updateConcept(new_concept)
    },

    updateTips(tips){
        const new_concept = Object.assign({}, this.props.concept.data, {
            tips
        });
        this.props.updateConcept(new_concept)
    },
    
    updateQuestions(questions){
        const new_concept = Object.assign({}, this.props.concept.data, {
            questions
        })
        this.props.updateConcept(new_concept)
    }
});

export default ConceptCard