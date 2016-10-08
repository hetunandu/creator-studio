import React from 'react';
import {connect} from 'react-redux';
import ConceptList from './ConceptList';
import ConceptView from './ConceptView';
import { updateSelectedConcept, saveSelectedConcept } from '../../actions';

const ConceptsContainer = React.createClass({
    render(){
        return(
            <div className="row">
                <div className="col m6 s12">
                    <ConceptList
                        chapter_key={this.props.chapter_key}
                        concepts={this.props.concepts}
                    />
                </div>
                <div className="col m6 s12">
                    <ConceptView 
                        concept={this.props.concepts.selected}
                        chapter_key={this.props.chapter_key}
                        
                        updateConcept={this.props.updateSelectedConcept}
                        saveConcept={this.props.saveSelectedConcept}
                    />
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

const mapDispatchToProps = dispatch => ({
    updateSelectedConcept: (concept) => {dispatch(updateSelectedConcept(concept))},
    saveSelectedConcept: (concept) => {dispatch(saveSelectedConcept(concept))} 
});

export default connect(mapStateToProps, mapDispatchToProps)(ConceptsContainer)