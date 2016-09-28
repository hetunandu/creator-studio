import React from 'react';

import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {changeStep, saveConcept} from '../actions';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ExplanationForm from './ExplanationForm';
import NewConceptPreview from './NewConceptPreview'

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';


const NewConcept = React.createClass({

    handleNext() {
        if(this.props.newConcept.stepIndex < 2){
            this.props.changeStep(this.props.newConcept.stepIndex + 1)
        }else{
            // Save the concept
            this.props.saveConcept({
                name: this.props.newConcept.name,
                chapter_key: this.props.chapter_key,
                explanation: this.props.newConcept.explanation,
                references: this.props.references,
                tips: this.props.newConcept.tips
            })

        }
    },

    handlePrev () {
        if (this.props.newConcept.stepIndex > 0) {
            this.props.changeStep(this.props.newConcept.stepIndex - 1)
        }
    },
    
    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <ExplanationForm />
                )
            case 1:
                return (
                    <h4 className="center">Other details</h4>
                )
            case 2:
                return (
                    <div className="row">
                        <h4 className="center">Questions</h4>
                    </div>
                )
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    },

    render(){

        const {stepIndex} = this.props.newConcept;

        return(
            <div>
                <p className="red-text">{this.props.newConcept.errorMessage}</p>
                <div style={{width: '90%', margin: 'auto'}}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Make an Explanation</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>References and Tips</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Questions</StepLabel>
                        </Step>
                    </Stepper>
                    <div className="row">
                        <div className="col m4">
                            <NewConceptPreview  />
                        </div>
                        <div className="col m8">
                            <div style={{float: 'right'}}>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={stepIndex === 2 ? 'Save' : 'Next'}
                                    primary={true}
                                    onTouchTap={this.handleNext}
                                />
                            </div>
                            <div>{this.getStepContent(stepIndex)}</div>                            
                        </div>
                    </div>
                </div>
            </div>
            
        )
    },

    handleClose()  {
        browserHistory.push(`/chapters/${this.props.chapter_key}/`)
    }
})


const mapStateToProps = ({concepts, newConcept}, {params: {chapter_key}}) => ({
    concepts,
    newConcept,
    chapter_key
})


const mapDispatchToProps = dispatch => ({
    changeStep: (stepIndex) => {dispatch(changeStep(stepIndex))},
    saveConcept: (newConcept) => {dispatch(saveConcept(newConcept))}
})

export default connect(mapStateToProps, mapDispatchToProps)(NewConcept)