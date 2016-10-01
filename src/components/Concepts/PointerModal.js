import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const PointerModal = React.createClass({

    getInitialState(){
        return{
            pointers: this.props.pointers || []
        }
    },

    render(){
        return(
            <Dialog
                title="Adding a pointer"
                modal={true}
                actions={[
                    <FlatButton
                        label="Cancel"
                        secondary={true}
                        onTouchTap={this.props.closeModal}
                    />,
                    <FlatButton
                        label="Add"
                        primary={true}
                        onTouchTap={this.addPointer}
                    />
                ]}
                open={this.props.open}
            >
                <TextField
                    hintText="Intro"
                    multiLine={true}
                    fullWidth={true}
                    ref="intro"
                />
            </Dialog>
        )
    }
})

export default PointerModal
