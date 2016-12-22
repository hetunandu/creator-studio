import React from 'react';
import AppBar from 'material-ui/AppBar';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';


const mapStateToProps = ({auth}) => ({
	auth
});

const Navbar = React.createClass({

    render() {

        var rightIcon;
        switch(this.props.auth.isAuthenticated){
            case true:
                rightIcon = <p style={{color: 'white'}}>api v3</p>
                break;
            default:
                rightIcon = <p style={{color: 'white'}}>Not logged in</p>
                break;
        }

        return (
            <AppBar
								onTitleTouchTap={() => browserHistory.push('/')}
								titleStyle={{cursor: 'pointer'}}
								showMenuIconButton={false}
                title="Noted Creator Studio"
                iconElementRight={rightIcon}
            />
        );

    }

});

export default connect(mapStateToProps)(Navbar);
