import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';


const mapStateToProps = ({auth}) => ({
	auth
});

const Navbar = React.createClass({

    goToLogin(evt) {
        browserHistory.push('/login');
    },

    render() {
    
        var rightIcon;
        switch(this.props.auth.isAuthenticated){
            case true:
                rightIcon = <p style={{color: 'white'}}>Hello, creator</p>
                break;
            case false:
                rightIcon = <FlatButton onClick={this.goToLogin} label="Login" />
                break;
            default:
                rightIcon = <FlatButton onClick={this.goToLogin} label="Login" />
                break;
        }

        return (
            <AppBar
                title="Noted Creator Studio"
                iconElementRight={rightIcon}
            />
        );

    }
    
});

export default connect(mapStateToProps)(Navbar);