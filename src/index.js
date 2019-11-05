import React from "react";
import ReactDOM from "react-dom";
import App from './app'
import "./styles.css";
import DemoComponent from './components/DemoComponent'
import {
  BrowserRouter as Router
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

function Base() {
  return (
    <Router>
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>      
        <App />
    </div>
      </Router>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Base />, rootElement);
