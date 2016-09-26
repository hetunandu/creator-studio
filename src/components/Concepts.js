import React from 'react';
import {connect} from 'react-redux';
import {fetchConcepts} from '../actions';

const Concepts = React.createClass({

    componentWillMount(){
        this.props.fetchConcepts(this.props.chapter_key)
    },

    render(){
        return (
            <div>
                <h4>Current creating in '{this.props.concepts.chapter.name}'</h4>
            </div>
        );
    }
})


const mapStateToProps = ({concepts}, {params: {chapter_key} }) => ({
    concepts,
    chapter_key
})

const mapDispatchToProps = dispatch => ({
    fetchConcepts: chapter_key => dispatch(fetchConcepts(chapter_key))
})

export default connect(mapStateToProps, mapDispatchToProps)(Concepts)