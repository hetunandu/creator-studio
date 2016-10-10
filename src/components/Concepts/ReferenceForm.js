import React from 'react';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';


const ReferenceForm = React.createClass({
    render(){
        return(
            <div >
                <h5 className="thin-text">References</h5>
                <ol>
                    {
                        this.props.references.map( (ref, i) =>
                            <li key={i}>
                                <div className="remove-icon-container">
                                    <RemoveIcon
                                        className="remove-icon"
                                        onClick={() => this.removeReference(i)}
                                    />
                                </div>
                                <TextField
                                    hintText="Title"
                                    value={ref.title}
                                    hintStyle={{color: '#a5a2a2'}}
                                    inputStyle={{color: 'white'}}
                                    id={`title_${i}`}
                                    onChange={this.handleReferenceChange}
                                />
                                <br />
                                <TextField
                                    hintText="Source (book or link)"
                                    value={ref.source}
                                    hintStyle={{color: '#a5a2a2'}}
                                    inputStyle={{color: 'white'}}
                                    id={`source_${i}`}
                                    onChange={this.handleReferenceChange}
                                />
                            </li>
                        )
                    }
                </ol>


                 <IconButton tooltip="Add Reference" onTouchTap={this.addReference}>
                    <ContentAdd color="white"/>
                </IconButton>

                <h5 className="thin-text">Tips</h5>
                 <ol>
                    {
                        this.props.tips.map( (tip, i) =>
                            <li key={i}>
                                <div className="remove-icon-container">
                                    <RemoveIcon
                                        className="remove-icon"
                                        onClick={() => this.removeTip(i)}
                                    />
                                </div>
                                <TextField
                                    hintText="Tip"
                                    value={tip}
                                    hintStyle={{color: '#a5a2a2'}}
                                    inputStyle={{color: 'white'}}
                                    id={`tip_${i}`}
                                    onChange={this.handleTipChange}
                                />
                            </li>
                        )
                    }
                </ol>


                <IconButton tooltip="Add Tip" onTouchTap={this.addTip}>
                    <ContentAdd color="white" />
                </IconButton>
            </div>
        )
    },

    addReference(){
        const newRefs = this.props.references.concat([{title: '', source: ''}]);
        this.props.updateReferences(newRefs)
    },

    handleReferenceChange(event){
        const index = parseInt(event.target.id.split('_')[1], 10);
        const field = event.target.id.split('_')[0];

        const newRefs = this.props.references.map((ref, i) => {
           if(i !== index) return ref;
            let updatedRef = ref;
            updatedRef[field] = event.target.value;
            return updatedRef

        });
        this.props.updateReferences(newRefs)
    },

    removeReference(index){
        const newRefs = this.props.references.filter((ref, i) => {
            return i !== index
        });
        this.props.updateReferences(newRefs)
    },

    addTip(){

        const newTips = this.props.tips.concat(['']);
        this.props.updateTips(newTips)
    },

    handleTipChange(event){
        const index = parseInt(event.target.id.split('_')[1], 10);

        const newTips = this.props.tips.map((tip, i) => {
            return (index !== i) ? tip : event.target.value
        });
        this.props.updateTips(newTips)
    },


    removeTip(index){
        const newTips = this.props.tips.filter((tip, i) => {
            return i !== index
        });
        this.props.updateTips(newTips)
    }

});

export default ReferenceForm