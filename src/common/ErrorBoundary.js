import React, { Component } from "react";
import { 
  Message,
  Card,
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
            <Card style={{ padding: "5px", width: "100%", minHeight: '200px' }}>
              <Message negative>
                  <Message.Header>Error Boundary</Message.Header>
                  <h4>Something went wrong. Please reload your application.</h4>
              </Message>
            </Card>
        )
      }
  
      return this.props.children; 
    }
  }