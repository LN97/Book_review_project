import React, { useEffect } from 'react';

const ErrorComponent = ({ state }) => {

    useEffect( ( ) => {
       setTimeout( ( ) => {
           console.log('we would set the error back to false to hide')
       }, 5000 );
    }, [ ] );

    return (
      <>
        {state.hasError ? (
          <div style={{ color: 'red', border: '1px solid darkred', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            Error: {state.msg}
          </div>
        ) : (
          null
        )}
      </>
    );
  };
  
  export default ErrorComponent;
  