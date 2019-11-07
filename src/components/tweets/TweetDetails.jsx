import React, { useEffect, useState } from "react";
import Api from "../../api";
import Data from "./data.json";
import {
  Feed,
  Icon,
  Grid,
  Segment,
  Statistic,
  Header,
  Card,
  Message,
  Label,
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
  width: 20%;
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
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [error,setError] = useState(false);
  const [errorText, setErrorText] = useState([])
  const [symbolObj, setSymbolObj] = useState({});
  
  console.log("symbol ", symbol , apiparams);

  useEffect(() => {    
    fetchTweets()  
  }, []);

  useEffect(() => {    
    if(Object.keys(apiparams).length > 0){
      setRefreshInterval(setInterval(() =>{
        fetchTweets(apiparams)
      }, 15000)); 
    }  
  }, [apiparams]);

  useEffect( ()=>{
    if (Object.keys(symbolObj).length > 0) {
      let nextParams = {
        more: symbolObj.cursor.more,
        since: symbolObj.cursor.since - 1
      };
      setApiParams(nextParams); 
      if(!apiparams.since || !(apiparams.since+1 == symbolObj.cursor.since && symbolObj.messages.length === 1) ){
        setTweets([...tweets, ...symbolObj.messages]);
      }
    }   
  },[symbolObj])

  const fetchTweets = (params = apiparams) => {
    Api.get(`streams/symbol/${symbol}.json`,{since:102655242,...params,limit:10})    
      .then(resp => {
        setSymbolObj(resp)
      },err => {
        console.log('err ', err)
        setError(true)
        setErrorText(err.errors)
      });
  }

  // const updateTweets = (resp) => { 
  //   console.log('updateTweets ', params )
  //   // let nextParams = {
  //   //   more: resp.cursor.more,
  //   //   since: resp.cursor.since - 1
  //   // };
  //   // setParams(nextParams);  
  //   if(!params.since || !(params.since+1 == resp.cursor.since && resp.messages.length === 1) ){
  //     console.log('updateTweets inside' )
  //     //setTweets(resp.messages);
  //   }    
  // };

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
                    onClick={() => { clearInterval(refreshInterval);removeSymbol(symbol)}}
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
                    onClick={() => { clearInterval(refreshInterval);removeSymbol(symbol)}}
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
