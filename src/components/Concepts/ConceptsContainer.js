import React from 'react';
import {connect} from 'react-redux';
import ConceptList from './ConceptList';
import ConceptPreview from './ConceptPreview';

const ConceptsContainer = React.createClass({
    render(){
        return(
            <div className="row">
                <div className="col m6">
                    <ConceptList
                        chapter_key={this.props.chapter_key}
                        concepts={this.props.concepts}
                    />
                </div>
                <div className="col m6">
                    <ConceptPreview concept={this.props.concepts.selected}/>
                </div>
                {this.props.children}
            </div>
        )
    }
});

const mapStateToProps = ({newConcept, concepts}, {params: {chapter_key}}) => ({
    newConcept,
    concepts,
    chapter_key
});

export default connect(mapStateToProps)(ConceptsContainer)