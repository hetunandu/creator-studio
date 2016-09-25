import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import SelectSubject from './SelectSubject';
import Chapters from './Chapters';

import Divider from 'material-ui/Divider';

const Dashboard = React.createClass({

    componentDidMount(){
        if(this.props.auth.isAuthenticated === false){
            browserHistory.push('/login');
        }
    },

    render(){

        return (
            <div>
                <SelectSubject />
                <Divider />
                { this.props.subjects.active.key &&
                    <Chapters />
                }
                
            </div>

        );
    }
});


const mapStateToProps = ({auth, subjects}) => ({
    auth,
    subjects
})

export default connect(mapStateToProps)(Dashboard)