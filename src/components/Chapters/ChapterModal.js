import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';

const ChapterModal = React.createClass({
  getInitialState(){
      return {
          canSubmit: false,
          chapterName: ""
      }
  },

  componentDidMount(){
    if(this.props.editing){
      let chapter = this.props.chapters.list.find((chapter) => {
        return chapter.key === this.props.chapter_key
      })
      this.setState({
        chapterName: chapter.name
      })
    }
  },

  render(){
    const actions = [
        <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleClose}
        />,
        <FlatButton
            label={this.props.editing ? "Edit" : "Save"}
            primary={true}
            disabled={! this.state.canSubmit}
            onTouchTap={this.handlePrimaryClick}
        />,
    ];
    return (
      <Dialog
          title={this.props.editing ? "Edit Chapter" : "Create new chapter"}
          actions={actions}
          modal={false}
          open={true}
          contentStyle={{maxWidth: 400}}
          onRequestClose={this.handleClose}
      >
          <TextField
            ref="name"
            value={this.state.chapterName}
            hintText="Type the name of the chapter"
            onChange={this.handleOnChange}
          />
      </Dialog>
    );
  },
  handleClose(){
      browserHistory.push(`/subjects/${this.props.subject_key}/`)
  },

  handleOnChange(){
      let new_name = this.refs.name.input.value

      this.setState({
        chapterName: new_name
      })

      if (new_name.length > 0){
          this.setState({
              canSubmit: true
          })
      }else{
           this.setState({
              canSubmit: false
          })
      }


  },
  handlePrimaryClick(){
      let new_name = this.refs.name.input.value.trim()
      if(this.props.editing){
        this.props.onPrimaryClick({name: new_name, key: this.props.chapter_key})
      }else{
        this.props.onPrimaryClick({name: new_name, subject_key: this.props.subject_key})
      }
      this.refs.name.input.value = "";
      this.handleClose()

  }
})

export default ChapterModal
