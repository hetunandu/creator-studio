import React from 'react';
import {connect} from 'react-redux';


import { fetchSubjects, addSubject, setActiveSubject, fetchChapters } from '../actions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectSubject = React.createClass({


    componentDidMount(){
        this.props.fetchSubjects();
    },

    render(){

        const activeSubject = this.props.subjects.active
        
        let body = this.props.subjects.isFetching ? 
            ( <p>Loading Subjects...</p> ) 
            :
            (
                <div>
                    <h3>Select a subject</h3>
                    <SelectField 
                        value={activeSubject.key} 
                        onChange={this.handleSubjectChange}
                        disabled={this.props.subjects.isFetching}
                    >
                        {
                            this.props.subjects.list.map( subject => 
                                <MenuItem value={subject.key} key={subject.key} primaryText={subject.name} />
                            )
                        }  
                    </SelectField>
                </div>
            )
        return (
            <div className="section subject">
                {body}
            </div>
        );
    },

    handleSubjectChange(event, index, value){
        this.props.setActiveSubject(this.props.subjects.list[index])
        this.props.fetchChapters(value)
    },

    handleAddSubject(){
        let new_name = this.refs.new_subject.input.value.trim()
        
        this.props.addSubject({name: new_name})

        this.refs.new_subject.input.value = "";
    },  
})


//   <TextField ref="new_subject" hintText="Add a subject"/>
//     <FlatButton label="Add" primary={true} onClick={this.handleAddSubject} />

const mapStateToProps = ({subjects}) => ({
    subjects
})

const mapDispatchToProps = dispatch => ({
    fetchSubjects: () => dispatch(fetchSubjects()),
    addSubject: new_name => dispatch(addSubject(new_name)),
    setActiveSubject: subject => dispatch(setActiveSubject(subject)),
    fetchChapters: subject_key => dispatch(fetchChapters(subject_key))
})


export default connect(mapStateToProps,mapDispatchToProps)(SelectSubject)