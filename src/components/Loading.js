import React from 'react'
import Snackbar from 'material-ui/Snackbar';

const Loading = () => {
    return(
        <Snackbar
          open={true}
          message="Loading"
        />
    )
};


export default Loading