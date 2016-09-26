import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const NewConcept = React.createClass({
    render(){
        return(
            <div className="row">
                <h4 className="center"> Create new Concept </h4>
                <div className="col m6">
                    <Paper zDepth={2} className="explanation-card">
                        <TextField
                            className="explanation-form-input concept-name"
                            hintText="Concept name"
                            inputStyle={{
                                fontWeight: 500,
                                fontSize: 20,
                                textAlign: 'center'
                            }}
                        />
                    </Paper>
                </div>
                <div className="col m6">
                    <Paper zDepth={2} className="explanation-card reverse">
                        POLO
                    </Paper>
                </div>
            </div>
        )
    }
})

export default NewConcept