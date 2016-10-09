import React from 'react';

const ExplanationView = React.createClass({
    render(){
        const body = this.props.explanation.map((node, i) => {
            switch(node.type){
                case 'text':
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
                case 'title':
                    return <h5 key={i}>{node.data}</h5>;
                case 'pointers':
                    return (
                        <ol key={i}>
                            {
                                node.data.map((point, j) => {
                                    return (
                                        <li key={j}>
                                            <h6>{point.title}</h6>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    );
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