import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {notedTheme} from './notedTheme';
import Navbar from './components/Navbar';
import Login from './components/Login';

import {connect} from 'react-redux';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const App =  React.createClass({

    render() {

        return (
            <MuiThemeProvider muiTheme={notedTheme}>
                <div className="App">
                    <Navbar />
                    <div className="main">
                        {
                            this.props.auth.isAuthenticated ?
                                (
                                    this.props.children
                                )
                                :
                                (
                                    <Login />
                                )
                        }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
});

const mapStateToProps = ({auth}) => ({
    auth
})

export default connect(mapStateToProps)(App);
