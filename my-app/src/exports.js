
function Component ( ) {
    return ( <div> hello </div> )
}

function greet () {
    return 'hello';
}

var name = 'brad'

export {
    greet, name 
}


export default Component;

// import Component , { greet } from '../../exports'


// we can export components as objects. but we'll need to import them as 
// an object to.
// export { Component }
// import { Component }
// 

/*
    so if we have functions and components in a file that we want to
    export then 
      - export the functions in an object
            ex: export { func1, func2 }
            ex: import { func1, func2 } from './file.js'
      - export the component as a default ( which is a single export )

      or you can import both as import Component, { func1, func2 }
*/