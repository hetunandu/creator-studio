import React from 'react';
import {connect} from 'react-redux';
import {addQuestion, removeQuestion} from '../../actions';

import {FlatButton, TextField} from 'material-ui';


const QuestionsForm = React.createClass({
    render(){
        return(
          <div className="row">
          <h5 className="center">Questions</h5>
            <div className="col m6">
                <ol>
                    {
                        this.props.questions.map( (question, i) =>
                            <li key={i}>{question}</li>
                        )
                    }
                </ol>
              </div>
              <div className="col m6">
                <TextField
                    hintText="Question"
                    ref="question"
                />
                <br />
                <FlatButton
                  label="Add Question"
                  primary={true}
                  onTouchTap={this.addQuestion}
                />
              </div>
            </div>
        )
    },

    addQuestion(){
      let question = this.refs.question.input.value

      this.props.addQuestion(question)

      this.refs.question.input.value = ""

    }
})

const mapStateToProps = ({newConcept : {questions}}) => ({
  questions
})

const mapDispatchToProps = dispatch => ({
  addQuestion: (question) => {dispatch(addQuestion(question))},
  removeQuestion: (question) => {dispatch(removeQuestion(question))}
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsForm)
