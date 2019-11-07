
import TweetStore from './TweetStore'
import { createContext } from "react";
class rootStore {
  constructor() {
    this.TweetStore = new TweetStore();
  }
}

const StoreContext = createContext(new rootStore());

export default StoreContext;
