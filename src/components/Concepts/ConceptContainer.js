import React from 'react';
import {connect} from 'react-redux';
import ConceptList from './ConceptList';
import ConceptView from './ConceptView';
import Snackbar from 'material-ui/Snackbar';
import { editSelectedConcept, updateSelectedConcept, saveSelectedConcept } from '../../actions';


// Container of the index and the concept information
const ConceptsContainer = React.createClass({
    render(){
        return(
            <div className="row">
                <div className="col m3">
                    <ConceptList
                        chapter_key={this.props.chapter_key}
                        concepts={this.props.concepts}
                        selectedConcept={this.props.selectedConcept}
                    />
                </div>
                <div className="col m9">
                    <ConceptView 
                        concept={this.props.selectedConcept}
                        chapter_key={this.props.chapter_key}
                        editMode={this.props.editSelectedConcept}
                        updateConcept={this.props.updateSelectedConcept}
                        saveConcept={this.props.saveSelectedConcept}
                    />
                </div>
                 <Snackbar
                    open={this.props.selectedConcept.isSaving}
                    message="Saving..."
                />
                {this.props.children}
            </div>
        )
    }
});

const mapStateToProps = ({selectedConcept, concepts}, {params: {chapter_key}}) => ({
    selectedConcept,
    concepts,
    chapter_key
});

const mapDispatchToProps = dispatch => ({
    editSelectedConcept: () => {dispatch(editSelectedConcept())},
    updateSelectedConcept: (concept) => {dispatch(updateSelectedConcept(concept))},
    saveSelectedConcept: (concept) => {dispatch(saveSelectedConcept(concept))} 
});

export default connect(mapStateToProps, mapDispatchToProps)(ConceptsContainer)