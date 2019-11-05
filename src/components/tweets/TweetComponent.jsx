import React, { useEffect, useState } from "react";
import useStore from "../../common/hoc/useStore";
import Api from "../../api";
import InputBox from './InputBox';
import { Grid } from 'semantic-ui-react'
import TweetDetails from './TweetDetails';

const TweetComponent = props => {
    const { TweetStore } = props;
    const [userSymbols, setUserSymbols] = useState([])
    //console.log("TweetComponent ", props);

    // useEffect(() => {
    //     //Api.get("/todos").then(resp => console.log('from api ', resp));
    //     Api.get("streams/symbols.json?symbols=aapl").then(resp => console.log('from api ', resp));
    //   }, []);
    
    const allSymbols = (symbols) => {
        console.log('allSymbols ', symbols) 
        let x = [...userSymbols, ...symbols]
        setUserSymbols([...new Set(x)]) 
    }

    return(
        <>
            TweetComponent
            
            <Grid columns={4}>                
                <InputBox allSymbols={allSymbols} {...props}/>
                {
                    userSymbols.length > 0
                        && (
                            userSymbols.map( (symbol) => <Grid.Column><TweetDetails symbol= {symbol }{...props}/></Grid.Column>)
                        )
                }                
            </Grid>
        </>

    )
}

export default useStore(TweetComponent);