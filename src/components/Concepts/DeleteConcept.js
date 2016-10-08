import React from 'react';
import {connect} from 'react-redux';
import {deleteConcept} from '../../actions';
import {browserHistory} from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const DeleteConcept = React.createClass({
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                className="white-text"
                backgroundColor="red"
                onTouchTap={this.handleDelete}
            />
        ];
        return(
            <Dialog
                actions={actions}
                modal={true}
                open={true}
                onRequestClose={this.handleClose}
            >
                Delete Concept? This cannot be reversed
            </Dialog>
        );
    },

    handleClose(){
        browserHistory.push(`/chapters/${this.props.chapter_key}/`)
    },

    handleDelete(){
        this.props.deleteConcept(this.props.concept_key)
        this.handleClose()
    }

});

const mapStateToProps = (state, {params: {concept_key, chapter_key}}) => ({
    chapter_key,
    concept_key
})

const mapDispatchToProps = dispatch => ({
    deleteConcept: concept_key => (dispatch(deleteConcept(concept_key)))
})


export default connect(mapStateToProps, mapDispatchToProps)(DeleteConcept)
