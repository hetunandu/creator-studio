import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

const Dashboard = React.createClass({

    componentDidMount(){
        console.log(this.props)
        if(this.props.auth.isAuthenticated === false){
            browserHistory.push('/login');
        }
    },

    render(){
        return (
            <h1>Dashboard</h1>
        );
    }
});

const mapStateToProps = ({auth}) => ({
    auth
})

export default connect(mapStateToProps)(Dashboard)