import React from 'react';
import IconButton from 'material-ui/IconButton';
import TitleIcon from 'material-ui/svg-icons/editor/title';
import TextIcon from 'material-ui/svg-icons/editor/short-text';
import ImageIcon from 'material-ui/svg-icons/editor/insert-photo';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote';
import PointerIcon from 'material-ui/svg-icons/editor/format-list-numbered';
import Title from './ExplanationNodes/Title';
import Text from './ExplanationNodes/Text';
import Quote from './ExplanationNodes/Quote';
import Image from './ExplanationNodes/Image';
import Pointers from './ExplanationNodes/Pointers';


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

    updateNode(newData, type, index){
        const newExp = this.props.explanation.map( (node, i) => {
            if(i !== index){
                return node;
            }else{
                return ({type, data: newData})
            }
        })
        this.props.updateExplanation(newExp)
    },

    renderNodes(explanation){

        return explanation.map( (node, i) =>{
            switch(node.type){
                case 'text':
                    return (
                        <Text 
                            key={i}
                            isEditing={true}
                            index={i}
                            data={node.data}
                            removeNode={this.removeNode}
                            updateNode={this.updateNode}
                        />
                    );
                case 'image':
                    return (
                        <Image 
                            key={i} 
                            isEditing={true}
                            index={i}
                            data={node.data}
                            removeNode={this.removeNode}
                            updateNode={this.updateNode}
                        />
                    );
                case 'quote':
                    return (
                        <Quote 
                            key={i} 
                            isEditing={true}
                            index={i} 
                            data={node.data}
                            removeNode={this.removeNode}
                            updateNode={this.updateNode}
                        />
                    );
                case 'title':
                    return(
                        <Title 
                            key={i} 
                            isEditing={true}
                            index={i} 
                            data={node.data}
                            removeNode={this.removeNode}
                            updateNode={this.updateNode}
                        />
                    )
                case 'pointers':
                    return (
                        <Pointers
                            key={i} 
                            isEditing={true}
                            index={i} 
                            data={node.data}
                            removeNode={this.removeNode}
                            updateNode={this.updateNode}
                        />
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
                    { this.renderNodes(this.props.explanation) }
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


export default ExplanationForm