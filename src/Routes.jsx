import React from 'react';
import DemoComponent from './components/DemoComponent'
import TweetComponent from './components/tweets/TweetComponent'
import {
    Switch,
    Route,
} from 'react-router-dom';

const Routes = (props) => {
    //console.log('Routes ', props)
    return (
        <Switch>
            {/* <Route exact path='/demo' render={(props) => <DemoComponent aka={123} {...props}/>} />   
            <Route exact path='/tweets' render={(props) => <TweetComponent aka={123} {...props}/>} />  
            <Route exact path='/authorize' render={(props) => <DemoComponent aka={123} {...props}/>} />                  */}
            <Route exact path='/' render={(props) => <TweetComponent aka={123} {...props}/>}>
                
            </Route>
        </Switch>    
    )
};

export default Routes;