import React from 'react';
import {connect} from 'react-redux';


const Chapters = React.createClass({
    render(){
        return (
            <div className="section chapters">
                <h3>Notes in {this.props.subject.name}</h3>
            </div>
        );
    }
});

const mapStateToProps = ({subjects: {active}, chapters}) => ({
    subject: active,
    chapters
})

export default connect(mapStateToProps)(Chapters)