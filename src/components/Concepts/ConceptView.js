import React from 'react';
import ConceptCard from './ConceptCard';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

const ConceptView = React.createClass({
    
    getInitialState(){
        return {
            index: 0
        }
    },
    
    render(){
        return(
            <div className="conceptViewContainer grey">

                <ConceptCard concept={this.props.concept} mode={this.state.index} />

                <div
                    style={{
                        backgroundColor: 'white',
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        width: '50%'
                    }}
                >
                    <BottomNavigation selectedIndex={this.state.index}>
                        <BottomNavigationItem
                            label="Explanation"
                            icon={ <FontIcon className="material-icons">lightbulb_outline</FontIcon>}
                            onTouchTap={() => this.handleExpChange(0)}
                        />
                        <BottomNavigationItem
                            label="References and Tips"
                            icon={<FontIcon className="material-icons">info_outline</FontIcon>}
                            onTouchTap={() => this.handleExpChange(1)}
                        />
                        <BottomNavigationItem
                            label="Questions"
                            icon={<FontIcon className="material-icons">help_outline</FontIcon>}
                            onTouchTap={() => this.handleExpChange(2)}
                        />
                    </BottomNavigation>
                </div>

            </div>
        )
    },

    handleExpChange(index){
        this.setState({index})
    }
});


export default ConceptView
