import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import { fetchSubjects, addSubject, setActiveSubject } from '../actions';

// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Dashboard = React.createClass({

    componentDidMount(){
        if(this.props.auth.isAuthenticated === false){
            browserHistory.push('/login');
        }

        this.props.fetchSubjects();

    },

    handleAddSubject(){
        let new_name = this.refs.new_subject.input.value.trim()
        
        this.props.addSubject({name: new_name})

        this.refs.new_subject.input.value = "";
    },  

    handleSubjectChange(event, index, value){
        this.props.setActiveSubject(this.props.subjects.list[index])
    },

    render(){

        return (
            <div>
                <h3>Select a subject</h3>
                {this.props.subjects.isFetching && <p>Loading Subjects...</p>}
                <p>{this.props.subjects.errorMessage}</p>

                <SelectField 
                    value={this.props.subjects.active.key} 
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
    }
});

//   <TextField ref="new_subject" hintText="Add a subject"/>
//     <FlatButton label="Add" primary={true} onClick={this.handleAddSubject} />

const mapStateToProps = ({auth, subjects}) => ({
    auth,
    subjects
})

const mapDispatchToProps = dispatch => ({
    fetchSubjects: () => dispatch(fetchSubjects()),
    addSubject: new_name => dispatch(addSubject(new_name)),
    setActiveSubject: subject => dispatch(setActiveSubject(subject))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)