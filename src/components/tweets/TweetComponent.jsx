import React, { useEffect, useState } from "react";
import useStore from "../../common/hoc/useStore";
import Api from "../../api";
import InputBox from "./InputBox";
import { Grid } from "semantic-ui-react";
import TweetDetails from "./TweetDetails";
import { Divider } from "semantic-ui-react";
const TweetComponent = props => {
  const { TweetStore } = props;
  const [userSymbols, setUserSymbols] = useState([]);
  const allSymbols = symbols => {
    console.log("allSymbols ", symbols);
    let x = [...userSymbols, ...symbols];
    setUserSymbols([...new Set(x)]);
  };

  const removeSymbol = symbol => {
    console.log("remove ", symbol);
    let index = userSymbols.indexOf(symbol);
    let tempSymbols = userSymbols;
    tempSymbols.splice(index, 1);
    console.log("tempSymbols ", tempSymbols);
    setUserSymbols([...tempSymbols]);
  };

  const showDetails = () => {
    return userSymbols.map(symbol => (
      <Grid.Column 
        key={symbol} 
        mobile={16} 
        tablet= {userSymbols.length <= 1 ? 16 : 8} 
        computer={userSymbols.length <= 1 ? 16 : 8}
      >
        <TweetDetails                
          symbol={symbol}
          removeSymbol={removeSymbol}
        />
      </Grid.Column>
    ))
  }

  return (
    <>
      <h3>Stocktwits - Follow tweets of your stocks</h3>
      <Grid >
        <InputBox allSymbols={allSymbols} {...props} />
        {userSymbols.length > 0 
          ? showDetails()
          : <h4>No watchlist yet. Search for Symbols to follow the tweets</h4>
        }
      </Grid>
    </>
  );
};

export default useStore(TweetComponent);
