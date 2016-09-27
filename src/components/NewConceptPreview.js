import React from 'react';
import {connect} from 'react-redux'

import Paper from 'material-ui/Paper'

const NewConceptPreview = React.createClass({

    render(){

        const classes = () => {
            switch(this.props.newConcept.stepIndex){
                case 0:
                    return "concept-card explanation"
                case 1:
                    return "concept-card references"
                case 2:
                    return "concept-card questions"
                default:
                    return "concept-card"
            }   
        }
        
        const concept = this.props.newConcept

        return(
             
            <Paper 
                zDepth={2} 
                className={classes()}
            >
                {
                    concept.name === null || concept.name === '' ?(
                        <span className="concept-name grey-text">Concept name</span>

                    ):
                    (
                        <span className="concept-name">{concept.name}</span>    

                    )
                }
                {
                    concept.explanation.map((node, i) => { 
                        switch(node.type){
                            case 'para':
                                return <p key={i}>{node.data}</p>
                            case 'image':
                                return <img 
                                        key={i}
                                        src={node.data} 
                                        className="explanation-img responsive-img" 
                                        role="presentation"/>
                            default:
                                return "Unknown type"
                        }
                    })
                }
                
            </Paper>
        )
    }
})



const mapStateToProps = ({newConcept}) => ({
    newConcept
})

export default connect(mapStateToProps)(NewConceptPreview)