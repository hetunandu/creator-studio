import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Divider from 'material-ui/Divider';
import { fetchSubjects, addSubject, fetchChapters } from '../actions';
import SubjectCard from './SubjectCard';

const SelectSubject = React.createClass({


    componentDidMount(){
        this.props.fetchSubjects();
    },

    render(){
        
        let body = this.props.subjects.isFetching ? 
            ( <p>Loading Subjects...</p> ) 
            :
            (
                <div>
                    <h4 className="center">Select a subject</h4>
                    <p className="red-text center">{this.props.subjects.errorMessage}</p>

                    <div className="row">
                        { 
                            this.props.subjects.list.map( subject => 
                                <div 
                                    className="col m3 s12" 
                                    key={subject.key} 
                                    onClick={this.handleSubjectChange.bind(this, subject.key)}
                                >
                                    <SubjectCard 
                                        subject={subject} 
                                        isSelected={this.props.activeSubjectKey === subject.key}  
                                    />
                                </div>
                            )
                        }                   
                    </div>

                   
                    <Divider />
                    { this.props.children }
                </div>


            )
        return (
            <div className="section subject">
                {body}
            </div>
        );
    },

    handleSubjectChange(key){
        browserHistory.push(`/subjects/${key}`)        

        this.props.fetchChapters(key)
    },

    handleAddSubject(){

        //   <TextField ref="new_subject" hintText="Add a subject"/>
        //   <FlatButton label="Add" primary={true} onClick={this.handleAddSubject} />
        let new_name = this.refs.new_subject.input.value.trim()
        
        this.props.addSubject({name: new_name})

        this.refs.new_subject.input.value = "";
    },  
})




const mapStateToProps = ({subjects}, {params: {subject_key}}) => ({
    subjects,
    activeSubjectKey: subject_key
})

const mapDispatchToProps = dispatch => ({
    fetchSubjects: () => dispatch(fetchSubjects()),
    addSubject: new_name => dispatch(addSubject(new_name)),
    fetchChapters: subject_key => dispatch(fetchChapters(subject_key))
})


export default connect(mapStateToProps,mapDispatchToProps)(SelectSubject)