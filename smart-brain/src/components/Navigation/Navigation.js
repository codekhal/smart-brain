import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
      if(isSignedIn) {
          return(
        <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick = {() => onRouteChange('signout')} className = 'f3 link dim pa3 ba2 br-pill pointer shadow-5'> Sign Out </p>
        </nav>
          );
      } else {
        return(
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick = {() => onRouteChange('signin')} className = 'f3 link dim pa3 ba2 br-pill pointer shadow-5'> Sign In </p>
                <p onClick = {() => onRouteChange('register')} className = 'f3 link dim pa3 ba2 br-pill pointer shadow-5'> Register </p>
            </nav>
       );
      }
}

export default Navigation;