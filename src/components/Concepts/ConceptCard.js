import React from 'react';
import ExplanationView from './ExplanationView';
import ReferenceView from './ReferenceView';
import Paper from 'material-ui/Paper';


const ConceptCard = React.createClass({
    render(){
        const concept = this.props.concept;
        let classes;
        let body;

        switch(this.props.mode){
            case 1:
                classes = "concept-card references";
                body =  <ReferenceView references={concept.references} tips={concept.tips}/>;
                break;
            case 2:
                classes = "concept-card questions";
                body = <p>Questions</p>;
                break;
            default:
                classes =  "concept-card explanation";
                body = <ExplanationView explanation={concept.explanation}/>;
                break;
        }

        return(
            <Paper
                zDepth={2}
                className={classes}
            >
                {
                    concept.name === null || concept.name === '' ?(
                        <span className="concept-name grey-text">Select a concept from the list or add new</span>
                    ):
                        (
                            <span className="concept-name">{concept.name}</span>
                        )
                }
                {body}

            </Paper>
        )
    }
});

export default ConceptCard