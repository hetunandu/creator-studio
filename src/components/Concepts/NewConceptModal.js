import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {addConcept} from '../../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const NewConceptModal = React.createClass({
    getInitialState(){
        return {
            canSubmit: false,
            conceptName: ""
        }
    },

    componentDidMount(){
      this.refs.name.input.focus()
    },
    
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Add"
                primary={true}
                disabled={! this.state.canSubmit}
                onTouchTap={this.handlePrimaryClick}
            />
        ];
       return(
           <Dialog
                title={"Create new concept"}
                actions={actions}
                modal={true}
                open={true}
                contentStyle={{maxWidth: 400}}
                onRequestClose={this.handleClose}
           >
                <TextField
                    ref="name"
                    value={this.state.conceptName}
                    hintText="Type the name of the concept"
                    onChange={this.handleOnChange}
                />
            </Dialog>
       )
    },
    
    handleClose(){
        browserHistory.push(`/chapters/${this.props.chapter_key}/`)
    },

    handleOnChange(){
        let new_name = this.refs.name.input.value;

        this.setState({
            conceptName: new_name
        });

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
        let name = this.refs.name.input.value.trim();
        this.props.addConcept({name: name, chapter_key: this.props.chapter_key});
        this.handleClose();
    }
    
});

const mapStateToProps = (state, {params: {chapter_key}}) => ({
   chapter_key 
});

const mapDispatchToProps = dispatch => ({
    addConcept: data => (dispatch(addConcept(data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewConceptModal)