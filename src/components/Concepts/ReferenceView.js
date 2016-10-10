/**
 * Created by hetu on 07/10/16.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionInfo from 'material-ui/svg-icons/action/info';

const ReferenceView = React.createClass({
    render(){
        return(
            <div>
                <h5 className="thin-text">References</h5>
                <List>
                    {
                        this.props.references.map((ref, i) =>
                            <ListItem
                                style={{color: 'white'}}
                                primaryText={ref.title}
                                key={i}
                                leftIcon={<ActionInfo color={'white'}/>}
                                secondaryText={<p className="white-text">{ref.source}</p>}
                            />
                        )
                    }
                </List>
                <h5 className="thin-text">Tips</h5>
                <List>
                    {
                        this.props.tips.map((tip, i) =>
                            <ListItem
                                primaryText={tip}
                                key={i}
                                style={{color: 'white'}}
                                leftIcon={<ActionGrade color={'white'} />}
                            />
                        )
                    }
                </List>
            </div>
        )
    }
});

export default ReferenceView