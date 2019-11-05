import React, { useEffect } from "react";
import useStore from "../common/hoc/useStore";
import Api from "../api";

const DemoComponent = props => {
  const { demoStore } = props;
  console.log("DemoComponent ", props);

  useEffect(() => {
    demoStore.addCount();
  }, [demoStore]);

  useEffect(() => {
    //Api.get("/todos").then(resp => console.log('from api ', resp));
    Api.get("streams/symbols.json?symbols=aapl").then(resp => console.log('from api ', resp));
  }, []);

  return (
    <div>
      count from store - {demoStore.count}
      <p>date from store - {demoStore.date.toString()}</p>
      <p>computed month from store - {demoStore.getMonths}</p>
    </div>
  );
};

export default useStore(DemoComponent);

// "proxy": "https://jsonplaceholder.typicode.com/",
//   "private": "true",
