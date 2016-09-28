import React from 'react';
import {connect} from 'react-redux';
import {addReference, removeReference, addTip, removeTip} from '../../actions'
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const ReferenceForm = React.createClass({
    render(){
        return(
            <div className="row">
                <div className="col m6">
                    <h5 className="center">References</h5>
                    <ol>
                        {
                            this.props.references.map( (ref, i) => 
                                <li key={i}>{ref.title}({ref.source})</li>
                            )
                        }
                    </ol>

                    <TextField 
                        hintText="Title"
                        ref="title"
                    />
                    <br/>
                    <TextField 
                        hintText="Source"
                        ref="source"
                    />
                     <FloatingActionButton mini={true} onTouchTap={this.addReference}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>

                <div className="col m6">
                    <h5 className="center">Tips</h5>
                     <ol>
                        {
                            this.props.tips.map( (tip, i) => 
                                <li key={i}>{tip}</li>
                            )
                        }
                    </ol>

                    <TextField 
                        hintText="Tip"
                        ref="tip"
                    />          
                    <FloatingActionButton mini={true} onTouchTap={this.addTip}>
                        <ContentAdd />
                    </FloatingActionButton>    
                </div>
            </div>
        )
    },

    addReference(){
        let title = this.refs.title.input.value
        let source = this.refs.source.input.value

        this.props.addReference({
            title: title.trim(),
            source: source.trim()
        })

        this.refs.title.input.value = "";
        this.refs.source.input.value = "";
    },

    addTip(){
        let tip = this.refs.tip.input.value

        this.props.addTip(tip.trim())

        this.refs.tip.input.value = "";
    }

})

const mapStateToProps = ({newConcept: {references, tips}}) => ({
    references,
    tips
}) 

const mapDispatchToProps = dispatch => ({
    addReference: data => {dispatch(addReference(data))},
    removeReference: index => {dispatch(removeReference(index))},
    addTip: data => {dispatch(addTip(data))},
    removeTip: index => {dispatch(removeTip(index))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceForm)