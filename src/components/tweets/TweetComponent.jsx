import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import InputBox from "./InputBox";
import { Grid } from "semantic-ui-react";
import TweetsList from './TweetsList';

const Watchlist = Styled.h4`
  padding-left: 2rem !important;
`;
const TweetComponent = props => {
  const [userSymbols, setUserSymbols] = useState([]);
  const [symbolsList, setSymbolsList] = useState([]);

  useEffect(()=>{
    setSymbolsList(userSymbols)
  },[userSymbols]);

  const allSymbols = symbols => {
    let x = [...symbolsList, ...symbols];
    setUserSymbols([...new Set(x)]);
  };

  const removeSymbol = symbol => {
    /* Remove selected tweet */
    let tempSymbols = userSymbols.filter(s => s !== symbol)
    setUserSymbols([...tempSymbols]);
  };

  return (
    <>
      <h3>Stocktwits - Follow tweets of your stocks</h3>
      <Grid >
        <InputBox allSymbols={allSymbols} {...props} />
        {
          symbolsList.length > 0
            ? <TweetsList symbolsList={symbolsList} removeSymbol={removeSymbol} {...props} />
            : <Watchlist>No watchlist yet. Search for Symbols to follow the tweets</Watchlist>
        }
      </Grid>
    </>
  );
};

export default TweetComponent;
