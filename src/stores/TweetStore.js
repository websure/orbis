import { decorate, observable, action } from "mobx";

class TweetStore{
    constructor(){
        this.symbols={};
        this.tweets={
            more: false,
            since: '',
            max: '',
            count:0,
        }
    }

    updateTweets(symbol,cursor,newCount){
        // this.tweets = { 
        //     ...cursor,
        //     count : count+newCount,
        // }
        this.updatePagination(cursor,newCount)
        this.symbols.symbol=this.tweets
        this.resetTweets()
    }

    updatePagination(cursor,newCount){
        this.tweets = { 
            ...cursor,
            count : this.count+newCount,
        }
    }

    resetTweets(){
        this.tweets={
            more: false,
            since: '',
            max: '',
            count:0,
        }
    }
}

decorate(TweetStore,{
    updateTweets: action,
    symbols: observable,
})

export default TweetStore;