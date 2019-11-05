import React, { useEffect, useState } from "react";
import Api from "../../api";

const TweetDetails = ({symbol}) => {
    console.log('symbol ', symbol)

    useEffect(() => {
        //Api.get("/todos").then(resp => console.log('from api ', resp));
        Api.get(`streams/symbols.json?symbols=${symbol}`).then(resp => console.log(`from ${symbol}  `, resp));
      }, []);

    return(
        <>
            {symbol}
        </>
    )
}

export default TweetDetails;