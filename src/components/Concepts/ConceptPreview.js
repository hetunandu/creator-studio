import React from 'react'
import ConceptCard from './ConceptCard'

const ConceptView = React.createClass({
  render(){
    return(
        <div className="conceptViewContainer grey">
            <h4 className="center white-text">Concept Preview</h4>
            <ConceptCard concept={this.props.concept} />
        </div>
    )
  }
});


export default ConceptView
