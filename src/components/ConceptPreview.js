import React from 'react'
import Paper from 'material-ui/Paper'

const ConceptPreview = React.createClass({
    render(){

        const classes = () => {
            switch(this.props.concept.stepIndex){
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
        
        const concept = this.props.concept

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
                }
                
            </Paper>
        )
    }
})

export default ConceptPreview