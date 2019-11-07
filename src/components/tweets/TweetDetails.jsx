import React, { useEffect, useState } from "react";
import Api from "../../api";
import {
  Feed,
  Icon,
  Segment,
  Header,
  Card,
  Message,
  Divider,
  Loader,
  Dimmer
} from "semantic-ui-react";
import Styled from "styled-components";

const StyledSegment = Styled(Segment)`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 0px;
`;
const StyledTweetCount = Styled.p`
  height: 30px;
  color: #fff;
  outline: 1px solid #ccc;
  width: 18%;
  background: #4183c4;
  margin-top: 5px;
  padding: 5px;

  @media (max-width : 425px){
    width: 50%;
  }
  @media (max-width : 1024px) and (min-width : 425px) {
    width: 35%;
  }
  @media (max-width : 1290px) and (min-width : 1025px) {
    width: 30%;
  }
`;

const TweetDetails = ({ symbol, removeSymbol }) => {
  const [apiparams, setApiParams] = useState({});
  const [tweets, setTweets] = useState([]);
  const [error,setError] = useState(false);
  const [errorText, setErrorText] = useState([])
  const [symbolObj, setSymbolObj] = useState({});
  const [timer, setTimer] = useState(null)

  useEffect(() => {    
    fetchTweets()  
    return(()=>{
      /* on unmount, clear time interval */
      clearInterval(timer)
    })
  }, []);

  useEffect(() => {    
    if(apiparams.since){
      clearInterval(timer)      
      setTimer(setInterval(() =>{
        fetchTweets(apiparams)
      }, 10000)) 
    }  
  }, [apiparams]);

  useEffect( ()=>{
    if (Object.keys(symbolObj).length > 0) {
      let nextParams = {
        since: symbolObj.cursor.since - 1
      };
      setApiParams(nextParams);      
      if(!apiparams.since || !(apiparams.since+1 === symbolObj.cursor.since && symbolObj.messages.length === 1) ){
        /* 
          update tweets
          1. on initial page load
          2. on lazy load , concat latest messages from api call where query params is=> since: <lastest since - 1>
        */
        let removeDuplicateTweet = symbolObj.messages.filter(v => v.id !== apiparams.since + 1 )
        setTweets([...removeDuplicateTweet,...tweets]);
      }
    }   
  },[symbolObj])

  const fetchTweets = (params = apiparams) => {
    Api.get(`/streams/symbol/${symbol}.json`,{...params})    
      .then(resp => {
        setSymbolObj(resp)
      },err => {
        console.log('err ', err)
        setError(true)
        setErrorText(err.errors)
      });
  }

  const showTweets = () => {
    return tweets.map(val => {
      return (
        <Feed key={val.id}>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>
                <a>{val.user.username}</a> posted on
                <Feed.Date>
                  {new Date(val.created_at).toLocaleString()}
                </Feed.Date>
              </Feed.Summary>
              <Feed.Extra text style={{ wordBreak: "break-word" }}>
                {val.body}
              </Feed.Extra>
            </Feed.Content>
          </Feed.Event>
          <Divider />
        </Feed>
      );
    });
  };

  return (
    <>
      <Card style={{ padding: "5px", width: "100%", minHeight: '200px' }}> 
        {
          (tweets.length > 0 && !error) 
            ? (
              <>  
                       
                <Header as="h3" textAlign="left" style={{marginBottom: '0px'}}>
                  <Header.Content>{`${symbolObj.symbol.title}  $${symbolObj.symbol.symbol}`}</Header.Content>          
                  <a
                    style={{ float: "right", padding: '5px', fontSize:'20px' }}
                    onClick={() => {  clearInterval(timer); setTimer(null); removeSymbol(symbol); }}
                    title={`Delete ${symbol}`}
                  >
                    X
                  </a>
                  <StyledTweetCount>
                    <Icon  name="twitter" />
                    {`${tweets.length} tweets`}
                  </StyledTweetCount>                   
                </Header>        
                <StyledSegment>
                  {tweets.length > 0 && showTweets()}
                </StyledSegment>
              </>
            )
            : (
                !error
                  && (
                    <Dimmer active inverted>
                      <Loader inverted>Loading</Loader>
                    </Dimmer>
                  )
              
            )
        }
        {
          error
            && (
              <>
                <Header as="h3" textAlign="left" style={{marginBottom: '0px'}}>
                  <Header.Content>{symbol}</Header.Content>          
                  <a
                    style={{ float: "right", padding: '5px', fontSize:'20px' }}
                    onClick={() => { clearInterval(timer); setTimer(null); removeSymbol(symbol)}}
                    title={`Delete ${symbol}`}
                  >
                    X
                  </a>                                    
                </Header>
                <Message negative>
                  <Message.Header>Error</Message.Header>
                  {errorText.map( (val,i) =>  <h3 key={i}>{val.message}</h3>)}
                </Message>
                
              </>
            )
        }        
        </Card>  
    </>
  );
};

export default TweetDetails;
