import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {notedTheme} from './notedTheme';
import Navbar from './components/Navbar'; 

import './App.css';

const App =  React.createClass({
  
  render() {

    return (
      <MuiThemeProvider muiTheme={notedTheme}>
        <div className="App">
          <Navbar />
          <div className="main">
            {this.props.children}           
          </div> 
        </div>
      </MuiThemeProvider>
    );
  }
});


export default App;
