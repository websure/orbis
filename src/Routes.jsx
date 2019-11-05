import React from 'react';
import DemoComponent from './components/DemoComponent'
import TweetComponent from './components/tweets/TweetComponent'
import {
    Switch,
    Route,
} from 'react-router-dom';

const Routes = (props) => {
    console.log('Routes ', props)
    return (
        <Switch>
            <Route exact path='/demo' render={(props) => <DemoComponent aka={123} {...props}/>} />   
            <Route exact path='/tweets' render={(props) => <TweetComponent aka={123} {...props}/>} />  
            <Route exact path='/authorize' render={(props) => <DemoComponent aka={123} {...props}/>} />                 
            <Route exact path='/'>
                Landing Page.                
                {/* <a
                    href='/demo'
                >
                    Show Demo component
                </a> */}

                <a
                    href='/tweets'
                >
                    Tweets
                </a>

                {/* <a
                    href='https://api.stocktwits.com/api/2/oauth/authorize?client_id=33da128b8af1c536&response_type=token&redirect_uri=https://codesandbox.io/s/123&scope=read,watch_lists,publish_messages,publish_watch_lists,follow_users,follow_stocks'
                >
                    Authorize
                </a> */}
            </Route>
        </Switch>    
    )
};

export default Routes;