import React from 'react';
import Paper from 'material-ui/Paper';

const SubjectCard = React.createClass({
    render(){
        
        let classes
        if(this.props.isSelected){
            classes = "subject-card selected"
        }else{
            classes = "subject-card"
        }

        return (
             <Paper 
                zDepth={1} 
                className={classes}
            >
                    <h5>{this.props.subject.name}</h5>
            </Paper>
        );
    }
})


export default SubjectCard;