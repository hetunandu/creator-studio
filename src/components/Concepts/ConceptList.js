import React from 'react';
import {connect} from 'react-redux';
import {fetchConcepts, selectConcept} from '../../actions';

import Paper from 'material-ui/Paper';
import Loading from '../Loading'


const ConceptList = React.createClass({

    componentWillMount(){
        this.props.fetchConcepts(this.props.chapter_key)
    },
    
    render(){

        return (
            <div>
                {
                    this.props.concepts.isFetching ?
                        (
                            <Loading />
                        )
                        :
                        (
                            <div>
                                <h4 className="center">
                                    Concepts in {this.props.concepts.chapter.name}
                                </h4>
                                {this.props.concepts.isFetching && <Loading />}
                                <p className="red-text">
                                    {this.props.concepts.errorMessage}
                                </p>
                                <div className="row">
                                    {
                                        this.props.concepts.list.length > 0 ?
                                            this.props.concepts.list.map( concept =>
                                                <div
                                                    className="col m6"
                                                    key={concept.key}
                                                >
                                                    <Paper
                                                        zDepth={1}
                                                        className={
                                                        this.props.concepts.selected.key === concept.key ?
                                                        "conceptList-card selected" : "conceptList-card"
                                                    }
                                                        onClick={() => this.handleConceptSelection(concept.key)}
                                                    >
                                                        {concept.name}
                                                    </Paper>
                                                </div>
                                            )
                                            : <p>No Concepts</p>
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        );
    },

    handleConceptSelection(concept_key){
        this.props.selectConcept(concept_key)
    }
    
});

const mapDispatchToProps = dispatch => ({
    fetchConcepts: chapter_key => dispatch(fetchConcepts(chapter_key)),
    selectConcept: concept_key => dispatch(selectConcept(concept_key))
});

export default connect(null, mapDispatchToProps)(ConceptList)
