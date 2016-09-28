import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionInfo from 'material-ui/svg-icons/action/info';

const ConceptPreview = React.createClass({
    render(){
        const concept = this.props.concept
        let classes
        let body

        const explanationBody = concept.explanation.map((node, i) => { 
                switch(node.type){
                    case 'para':
                        return <p key={i}>{node.data}</p>
                    case 'image':
                        return <img 
                                key={i}
                                src={node.data} 
                                className="explanation-img responsive-img" 
                                role="presentation"/>
                    case 'quote':
                        return <blockquote
                                    key={i}
                                    style={{borderLeft: '5px solid #F53031'}}
                                >
                                    {node.data}
                                </blockquote>
                    default:
                        return "Unknown type"
                }
            })

        switch(this.props.concept.stepIndex){
            case 0:
                classes =  "concept-card explanation"
                body = explanationBody
                break;
            case 1:
                classes = "concept-card references"
                body = (
                    <div>
                        <h5>References</h5>
                        <List>
                        {
                            concept.references.map((ref, i) =>
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
                        <h5>Tips</h5>
                         <List>
                        {
                            concept.tips.map((tip, i) =>
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
                break;
            case 2:
                classes = "concept-card explanation"
                body = explanationBody
                break;
            default:
                classes =  "concept-card explanation"
                body = explanationBody
                break;
        }

        return( 
            <Paper 
                zDepth={2} 
                className={classes}
            >
                {
                    concept.name === null || concept.name === '' ?(
                        <span className="concept-name grey-text">Concept name</span>

                    ):
                    (
                        <span className="concept-name">{concept.name}</span>    

                    )
                }
                {body}
                
            </Paper>
        )
    }
})

export default ConceptPreview