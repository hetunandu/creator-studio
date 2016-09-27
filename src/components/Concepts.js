import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchConcepts} from '../actions';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const Concepts = React.createClass({

    componentWillMount(){
        this.props.fetchConcepts(this.props.chapter_key)
    },

    render(){
        return (
            <div>
                <Link to={`/chapters/${this.props.chapter_key}/new`}>
                    <FloatingActionButton mini={true} className="right">
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
                <h4>Concepts in {this.props.concepts.chapter.name}</h4>
                { 
                    this.props.concepts.list.map( concept => 
                        <h4 key={concept.key}>{concept.name}</h4>    
                    )

                     
                }
                {this.props.children}             
            </div>
        );
    },

    handleConceptAdd(){

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