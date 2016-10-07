import React from 'react';

const ExplanationView = React.createClass({
    render(){
        const body = this.props.explanation.map((node, i) => {
            switch(node.type){
                case 'para':
                    return <p key={i}>{node.data}</p>;
                case 'image':
                    return <img
                        key={i}
                        src={node.data}
                        className="explanation-img responsive-img"
                        role="presentation"/>;
                case 'quote':
                    return <blockquote
                        key={i}
                        style={{borderLeft: '5px solid #F53031'}}
                    >
                        {node.data}
                    </blockquote>;
                default:
                    return "Unknown type"
            }
        });
        return(
            <div>{body}</div>
        );
    }
});

export default ExplanationView