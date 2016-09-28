import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {addChapter} from '../../actions';

const NewChapter = React.createClass({

    getInitialState(){
        return {
            canSubmit: false
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
                label="Submit"
                primary={true}
                disabled={! this.state.canSubmit}
                onTouchTap={this.handleChapterAdding}
            />,
        ];

        return (
        <div>
            <Dialog
                title="Create new chapter"
                actions={actions}
                modal={false}
                open={true}
                contentStyle={{maxWidth: 400}}
                onRequestClose={this.handleClose}
            >
                <TextField ref="name" hintText="Type the name of the chapter" onChange={this.handleOnChange}/>
            </Dialog>
        </div>
        );
    },

    handleClose(){
        browserHistory.push(`/subjects/${this.props.subject_key}/`)
    },

    handleOnChange(){
        let new_name = this.refs.name.input.value.trim()

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

    handleChapterAdding(){
        let new_name = this.refs.name.input.value.trim()
        
        this.props.addChapter({name: new_name, subject_key: this.props.subject_key})
        this.refs.name.input.value = "";
        this.handleClose()

    }

})

const mapStateToProps = (state, {params: {subject_key}}) => ({
    subject_key
})

const mapDispatchToProps = dispatch => ({
    addChapter: data => dispatch(addChapter(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewChapter);