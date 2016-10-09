import React from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import TitleIcon from 'material-ui/svg-icons/editor/title';
import TextIcon from 'material-ui/svg-icons/editor/short-text';
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote';
import RemoveIcon from 'material-ui/svg-icons/navigation/close';
import PointerIcon from 'material-ui/svg-icons/editor/format-list-numbered';
import AddPointIcon from 'material-ui/svg-icons/av/playlist-add';


const ExplanationForm  = React.createClass({

    addNode(type){
        const newExp = this.props.explanation.concat([{
            type,
            data: type === 'pointers' ? [{title: '', nodes: []}] : ''
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

    handlePointerNodeChange(event){
        const data = event.target.value;
        const node_index = parseInt(event.target.id.split("_")[1], 10);
        const point_index = parseInt(event.target.id.split("_")[3], 10);

        const newExp = this.props.explanation.map((node, i) => {
           if(i !== node_index){
               return node;
           }else{
               return Object.assign({}, node, {
                   data: node.data.map((point, j) => {
                       if (j !== point_index) {
                           return point;
                       } else {
                           return Object.assign({}, point, {
                               title: data
                           })
                       }
                   })
               })
           }
        });

        this.props.updateExplanation(newExp);
    },

    handleAddPoint(node_index){
        const newExp = this.props.explanation.map((node, i) => {
           if(i !== node_index){
               return node;
           }else{
               return Object.assign({}, node, {
                   data: node.data.concat([{title: '', nodes: []}])
               })
           }
        });

        this.props.updateExplanation(newExp)
    },

    renderNodes(explanation){

        return explanation.map( (node, i) =>{
            switch(node.type){
                case 'text':
                    return (
                        <div  key={i} className="node">
                            <NodeToolbar
                                nodeIcon={<TextIcon />}
                                index={i}

                                removeNode={this.removeNode}
                            />
                            <TextField
                                hintText="Add text concept"
                                multiLine={true}
                                value={node.data}
                                id={`${node.type}_${i}`}
                                onChange={this.handleExplanationNodeChange}
                            />
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
                        </div>
                    );
                case 'title':
                    return(
                        <div key={i} className="node">
                            <NodeToolbar
                                nodeIcon={<TitleIcon />}
                                index={i}

                                removeNode={this.removeNode}
                            />
                            <TextField
                                hintText="Type here..."
                                value={node.data}
                                id={`${node.type}_${i}`}
                                onChange={this.handleExplanationNodeChange}
                            />
                        </div>
                    )
                case 'pointers':
                    return (
                        <div key={i} className="node">
                            <NodeToolbar
                                nodeIcon={<PointerIcon />}
                                index={i}
                                pointer={true}
                                handleAddPoint={this.handleAddPoint}
                                removeNode={this.removeNode}
                            />
                            <ol>
                                {
                                    node.data.map((point, j) => {
                                        return(
                                            <li key={j}>
                                                <TextField
                                                    hintText="Pointer title..."
                                                    value={point.title}
                                                    id={`pointer_${i}_point_${j}`}
                                                    onChange={this.handlePointerNodeChange}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ol>

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
                        <IconButton tooltip="Title" onClick={() => this.addNode('title')}>
                            <TitleIcon />
                        </IconButton>
                        <IconButton tooltip="Text" onClick={() => this.addNode('text')}>
                            <TextIcon />
                        </IconButton>
                        <IconButton tooltip="Quote" onClick={() => this.addNode('quote')}>
                            <QuoteIcon />
                        </IconButton>
                        <IconButton tooltip="Image" onClick={() =>this.addNode('image')}>
                            <ImageIcon />
                        </IconButton>
                        <IconButton tooltip="Pointers" onClick={() =>this.addNode('pointers')}>
                            <PointerIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }

});

const NodeToolbar = React.createClass({
    render(){
        const iconStyles = {
            cursor: 'pointer',
            marginLeft: 10
        };
        return (
            <div style={{backgroundColor: '#afafaf', paddingTop: 5, paddingLeft: 5}}>
                {this.props.nodeIcon}

                <RemoveIcon
                    className="red-text right"
                    style={iconStyles}

                    onClick={() => this.props.removeNode(this.props.index)}
                />

                {
                    this.props.pointer &&
                    <AddPointIcon
                        className="blue-text right"
                        style={iconStyles}

                        onClick={() => this.props.handleAddPoint(this.props.index)}
                    />

                }

            </div>
        )
    }
});




export default ExplanationForm
