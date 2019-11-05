import DemoStore from "./DemoStore";
import TweetStore from './TweetStore'
import { createContext } from "react";

class rootStore {
  constructor() {
    this.demoStore = new DemoStore();
    this.TweetStore = new TweetStore();
  }
}

const StoreContext = createContext(new rootStore());

export default StoreContext;
