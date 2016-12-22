import React from 'react';

class Container extends React.Component{
    render(){
        return (
            <div className="row">
                <div className="col m3">
                    {this.props.children}
                </div>
                <div className="col m9 grey">
                    View
                </div>
            </div>
        )
    }
}

export default Container