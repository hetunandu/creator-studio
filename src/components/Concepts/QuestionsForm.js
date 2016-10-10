import React from 'react';
import {TextField} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';


const QuestionsForm = React.createClass({
    render(){
        return(
            <div>
                <h5 className="center">Questions</h5>
                <ol>
                    {
                        this.props.questions.map( (question, i) =>
                            <li key={i}>
                                <div className="remove-icon-container">
                                    <RemoveIcon
                                        className="remove-icon"
                                        onClick={() => this.removeQuestion(i)}
                                    />
                                </div>
                                <TextField
                                    hintText="Question"
                                    id={`question_${i}`}
                                    value={question}
                                    onChange={this.updateQuestion}
                                />
                            </li>
                        )
                    }
                </ol>
                <IconButton tooltip="Add Question" onTouchTap={this.addQuestion}>
                    <ContentAdd color="white" />
                </IconButton>
            </div>
        )
    },

    addQuestion(){
        const newQuestions = this.props.questions.concat([""]);
        this.props.updateQuestions(newQuestions)
    },

    updateQuestion(event){
        const index = parseInt(event.target.id.split('_')[1], 10);

        const newQuestions = this.props.questions.map((q, i) => {
            return (index !== i) ? q : event.target.value
        });

        this.props.updateQuestions(newQuestions)
    },

    removeQuestion(index){
        const newQuestions = this.props.questions.filter((q, i) => {
           return index !== i
        });

        this.props.updateQuestions(newQuestions)
    }
});


export default QuestionsForm
