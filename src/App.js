import React from 'react';
import {withRouter} from 'react-router-dom';
import Nav from './Components/Nav/Nav'
import routes from './routes.js';
import './reset.css'
import './App.css';


class App extends React.Component {
 
  render(){
    console.log(this.props)
    const currentPath = this.props.location.pathname
  return (
    <div className="App">
      {currentPath === '/' ? null : <Nav/>}
      {routes}
    </div>
  );
  }
}

export default withRouter(App);
