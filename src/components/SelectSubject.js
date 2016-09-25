import React from 'react';
import {connect} from 'react-redux';


import { fetchSubjects, addSubject, setActiveSubject } from '../actions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectSubject = React.createClass({


    componentDidMount(){
        this.props.fetchSubjects();
    },

    render(){

        const activeSubject = this.props.subjects.active

        return (
            <div className="section subject">
                <h3>Select a subject</h3>
                {this.props.subjects.isFetching && <p>Loading Subjects...</p>}
                <p>{this.props.subjects.errorMessage}</p>

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
        );
    },

    handleSubjectChange(event, index, value){
        this.props.setActiveSubject(this.props.subjects.list[index])
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
    setActiveSubject: subject => dispatch(setActiveSubject(subject))
})


export default connect(mapStateToProps,mapDispatchToProps)(SelectSubject)