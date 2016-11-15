import React from 'react';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward';
import {connect} from 'react-redux';
import {updateSelectedConcept} from '../../../actions.js';

const NodeToolbar = React.createClass({
    render(){
        return (
            <div className="toolbar">
                {this.props.nodeIcon}
                <div className="right">
                    {
                        this.props.index > 0 ? (
                            <UpArrow
                                className="orange-text toolbar-button"
                                onClick={() => this.shiftNodeAbove()}
                            />
                        ) : ('')
                    }
                    <RemoveIcon
                        className="red-text right toolbar-button"
                        onClick={() => this.props.removeNode(this.props.index)}
                    />
                </div>
                { this.props.children }                
            </div>
        )
    },

    shiftNodeAbove(){
        // Remove the node from its oldIndex
        let newExp = this.props.concept.explanation
                        .slice(0, this.props.index)
                        .concat(this.props.concept.explanation.slice(this.props.index + 1));

        // Add it back to the new index
        newExp.splice(this.props.index - 1, 0, this.props.concept.explanation[this.props.index])

        // Send Action
        this.props.updateSelectedConcept(Object.assign({}, this.props.concept, {
            explanation: newExp
        }))


    }
});

NodeToolbar.propTypes = {
  nodeIcon: React.PropTypes.element.isRequired,
  index: React.PropTypes.number.isRequired,
  removeNode: React.PropTypes.func
}

const mapStateToProps = ({selectedConcept: {data}}) => ({
    concept: data
})


const mapDispatchToProps = (dispatch) => ({
    updateSelectedConcept: updatedConcept => {dispatch(updateSelectedConcept(updatedConcept))}
})
export default connect(mapStateToProps, mapDispatchToProps)(NodeToolbar);
