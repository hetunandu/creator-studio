import React from 'react';
import {connect} from 'react-redux';
import {deleteChapter} from '../../actions';
import {browserHistory} from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const DeleteChapter = React.createClass({
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleDelete}
      />,
    ];
    return(
      <Dialog
          actions={actions}
          modal={true}
          open={true}
          onRequestClose={this.handleClose}
      >
          Delete Chapter? All the concepts will become orphans but wont be deleted yet
      </Dialog>
    );
  },

  handleClose(){
    browserHistory.push(`/subjects/${this.props.subject_key}/`)
  },

  handleDelete(){
    this.props.deleteChapter(this.props.chapter_key)
    browserHistory.push(`/subjects/${this.props.subject_key}`)
  }

})

const mapStateToProps = (state, {params: {subject_key, chapter_key}}) => ({
  chapter_key,
  subject_key
})

const mapDispatchToProps = dispatch => ({
  deleteChapter: chapter_key => (dispatch(deleteChapter(chapter_key)))
})


export default connect(mapStateToProps, mapDispatchToProps)(DeleteChapter)
