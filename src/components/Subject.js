import React from 'react';
import {connect} from 'react-redux';

const Subject = React.createClass({
    render(){
        console.log(this.props)
        return (
            <h1>{this.props.subject.name}</h1>
        );
    }
})

const mapStateToProps = ({notes, subjects}, {params: {subjectId}}) => ({
    notes,
    subject: subjects.list.filter( s => s.key === subjectId )[0]
})

export default connect(mapStateToProps)(Subject)