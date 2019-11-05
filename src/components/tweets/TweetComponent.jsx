import React, { useEffect } from "react";
import useStore from "../../common/hoc/useStore";
import Api from "../../api";

const TweetComponent = props => {
    const { TweetStore } = props;
    console.log("TweetComponent ", props);

    useEffect(() => {
        //Api.get("/todos").then(resp => console.log('from api ', resp));
        Api.get("streams/symbols.json?symbols=aapl").then(resp => console.log('from api ', resp));
      }, []);

    return(
        <>
            TweetComponent
        </>

    )
}

export default useStore(TweetComponent);