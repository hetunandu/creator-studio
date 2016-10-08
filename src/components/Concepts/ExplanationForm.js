import React from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import TextIcon from 'material-ui/svg-icons/editor/short-text';
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';



const ExplanationForm  = React.createClass({

    addNode(type){
        const newExp = this.props.explanation.concat([{
            type,
            data: ''
        }]);

        this.props.updateExplanation(newExp)
    },

    removeNode(index){
        const newExp = this.props.explanation.filter((node, i) => {
           return i !== index
        });
        this.props.updateExplanation(newExp)
    },

    handleExplanationNodeChange(event){
        const data = event.target.value;
        const type = event.target.id.split("_")[0];
        const index = parseInt(event.target.id.split("_")[1], 10);

        const newExp = this.props.explanation.map((node, i) => {
            if(i !== index) {
                return node;
            }else{
                return ({ type, data})
            }
        });

        this.props.updateExplanation(newExp)
    },

    renderNodes(explanation){

        return explanation.map( (node, i) =>{
            switch(node.type){
                case 'para':
                    return (
                        <div  key={i} className="node">
                            <NodeToolbar
                                nodeIcon={<TextIcon />}
                                index={i}

                                removeNode={this.removeNode}
                            />
                            <TextField
                                hintText="Add content"
                                multiLine={true}
                                textareaStyle={{
                                    maxWidth: '90%'
                                }}
                                value={node.data}
                                id={`${node.type}_${i}`}
                                onChange={this.handleExplanationNodeChange}
                            />

                            <br />
                        </div>
                    );
                case 'image':
                    return (
                        <div key={i} className="node">
                            <NodeToolbar
                                nodeIcon={<ImageIcon />}
                                index={i}

                                removeNode={this.removeNode}
                            />
                            <img
                                src={node.data}
                                className="explanation-img responsive-img"
                                role="presentation"/>
                            <TextField
                                hintText="Image link"
                                value={node.data}
                                id={`${node.type}_${i}`}
                                onChange={this.handleExplanationNodeChange}
                            />
                            <br />
                        </div>
                    );
                case 'quote':
                    return (
                        <div key={i} className="node">
                            <NodeToolbar
                                nodeIcon={<QuoteIcon />}
                                index={i}

                                removeNode={this.removeNode}
                            />
                            <TextField
                                hintText="Type here..."
                                value={node.data}
                                id={`${node.type}_${i}`}
                                onChange={this.handleExplanationNodeChange}
                            />
                            <br />
                        </div>
                    );
                default:
                    return <p>Unknown type</p>
            }
        })
    },

    render(){
        return (
            <div className="row">
                <div className="nodes">
                    {
                        this.renderNodes(this.props.explanation)
                    }
                    <div className="btns">
                        <IconButton tooltip="Para" onClick={() => this.addNode('para')}>
                            <TextIcon />
                        </IconButton>
                        <IconButton tooltip="Quote" onClick={() => this.addNode('quote')}>
                            <QuoteIcon />
                        </IconButton>
                        <IconButton tooltip="Image" onClick={() =>this.addNode('image')}>
                            <ImageIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }

});

const NodeToolbar = React.createClass({
    render(){
        return (
            <div style={{backgroundColor: '#f5f5f5'}}>
                {this.props.nodeIcon}
                <RemoveIcon
                    className="red-text right"
                    style={{cursor: 'pointer'}}

                    onClick={() => this.props.removeNode(this.props.index)}
                />
            </div>
        )
    }
});




export default ExplanationForm
