import React from "react";
import ReactDOM from "react-dom";
import App from './app'
import "./styles.css";
import {
  BrowserRouter as Router
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

function Base() {
  return (
    <div className="App"> 
        <App />
    </div>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Base />, rootElement);
