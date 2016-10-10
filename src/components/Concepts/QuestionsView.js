import React from 'react';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

const QuestionsView = React.createClass({
    render(){
        return(
            <div>
                <h5 className="thin-text">Questions</h5>
                <List>
                    {
                        this.props.questions.map((question, i) =>
                            <ListItem
                                primaryText={question}
                                key={i}
                                style={{color: 'white'}}
                                leftIcon={
                                    <FontIcon className="material-icons white-text">help_outline</FontIcon>
                                }
                            />
                        )
                    }
                </List>
            </div>
        )
    }
});

export default QuestionsView