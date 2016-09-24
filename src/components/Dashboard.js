import React from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import { fetchSubjects, addSubject } from '../actions';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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

    render(){

        return (
            <div>
                <h1>Dashboard</h1>
                <h3>Subjects</h3>
                {this.props.subjects.isFetching && <p>Loading Subjects</p>}
                <ul>
                {
                    this.props.subjects.list.map( subject => 
                        <li key={subject.key}>
                            <Link
                                to={`dashboard/subjects/${subject.key}`} > 
                                {subject.name}
                            </Link>
                        </li>
                    )
                }
                </ul>
                <TextField ref="new_subject" hintText="Add a subject"/>
                <FlatButton label="Add" primary={true} onClick={this.handleAddSubject} />

            </div>

        );
    }
});

const mapStateToProps = ({auth, subjects}) => ({
    auth,
    subjects
})

const mapDispatchToProps = dispatch => ({
    fetchSubjects: () => dispatch(fetchSubjects()),
    addSubject: new_name => dispatch(addSubject(new_name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)