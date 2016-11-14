import React from 'react';
import {connect} from 'react-redux';
import ConceptList from './ConceptList';
import ConceptView from './ConceptView';
import { updateSelectedConcept, saveSelectedConcept } from '../../actions';


// Container of the index and the concept information
const ConceptsContainer = React.createClass({
    render(){
        return(
            <div className="row">
                <div className="col m3">
                    <ConceptList
                        chapter_key={this.props.chapter_key}
                        concepts={this.props.concepts}
                    />
                </div>
                <div className="col m9">
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