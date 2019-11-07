import React, { useEffect, useState } from "react";
import ErrorBoundary from '../../common/ErrorBoundary';
import { Grid } from "semantic-ui-react";
import TweetDetails from "./TweetDetails";
 
const TweetsList = ({ symbolsList, removeSymbol }) => {
    const [userSymbol, setUSerSymbol] = useState([])

    useEffect(()=>{
        setUSerSymbol(symbolsList)
    },[symbolsList]);

    const showDetails = () => (
        userSymbol.map( (symbol,i) => (
          <Grid.Column 
            key={symbol} 
            mobile={16} 
            tablet= {userSymbol.length <= 1 ? 16 : 8} 
            computer={userSymbol.length <= 1 ? 16 : 8}
            style={{display:'flex'}}
          >
            <ErrorBoundary>
              <TweetDetails                
                symbol={symbol}
                removeSymbol={removeSymbol}
              />
            </ErrorBoundary>
          </Grid.Column>
        ))
    )

    return(
        <>
            {
                userSymbol.length > 0
                    && (
                        showDetails()
                    )
            }
        </>
    )
}

export default TweetsList;