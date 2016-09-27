import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {loginUser} from '../actions.js';

import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    auth: state.auth,
})
const mapDispatchToProps = dispatch => ({
	loginUser: creds => dispatch(loginUser(creds))
})

const Login = React.createClass({
   
    attemptLogin(){
        const email = this.refs.email.input.value
        const password = this.refs.password.input.value
        const creds = {email: email.trim(), password: password.trim()} 
        
        this.props.loginUser(creds)
    },

    render(){
        return (
            <Paper zDepth={2} style={{padding: 10, textAlign: 'center' }} >
                <h3> Login to continue </h3>
                <p style={{color: 'red'}}>{this.props.auth.errorMessage}</p>
                <TextField
                    hintText="Email"
                    ref="email"
                />
                <br />
                <TextField
                    hintText="Password"
                    type="password"
                    ref="password"
                />
                <br />
                <RaisedButton label="Login" primary={true} onClick={this.attemptLogin} keyboardFocused={true} />
            </Paper>
        );
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login)