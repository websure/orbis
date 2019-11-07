import { decorate, observable, action } from "mobx";

class TweetStore{
    /* Demo Store setup for Tweets */
    constructor(){
        this.symbols={};        
    }
}

decorate(TweetStore, {
    symbols: observable,
})

export default TweetStore;