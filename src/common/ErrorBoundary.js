import React, { Component } from "react";
import { 
  Message,
} from "semantic-ui-react";
export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }  
      
    render() {
      if (this.state.hasError) {
        return (
            <Message negative>
                <Message.Header>Error</Message.Header>
                <h4>Error in loading this tweet.</h4>
            </Message>
        )
      }
  
      return this.props.children; 
    }
  }