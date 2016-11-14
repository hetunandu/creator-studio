import React from 'react';
import Text from './ExplanationNodes/Text';
import Image from './ExplanationNodes/Image';
import Quote from './ExplanationNodes/Quote';
import Title from './ExplanationNodes/Title';
import Pointers from './ExplanationNodes/Pointers';


const ExplanationView = React.createClass({
    render(){
        return(
            <div>
                {
                    this.props.explanation.map((node, i) => {
                        switch(node.type){
                            case 'text':
                                return <Text key={i} data={node.data} />;
                            case 'image':
                                return <Image key={i} data={node.data} />;
                            case 'quote':
                                return <Quote key={i} data={node.data} />;
                            case 'title':
                                return <Title key={i} data={node.data} />;
                            case 'pointers':
                                return <Pointers key={i} data={node.data} />
                            default:
                                return "Unknown type"
                        }
                    })
                }
            </div>
        );
    }
});

ExplanationView.propTypes = {
  explanation: React.PropTypes.array.isRequired
}

export default ExplanationView