import React, { useState } from "react";
import {
  Input,
  Icon,
  Grid,
  Button,
} from "semantic-ui-react";
import Styled from "styled-components";

const StyledInput = Styled(Input)`  
  @media (max-width : 425px){
    display: inline-grid !important;
    &&&& button{
      margin-top: 2px;
    }
  }
`;
const InputRegex = /^[a-zA-Z,]+$/;

const InputBox = ({ allSymbols }) => {
  const [showError, SetShowError] = useState(false);
  const [symbols, setSymbols] = useState("");
  const searchSymbols = (e, data) => {
    if (!data.value) {
      SetShowError(false);
      setSymbols("");
      return;
    }
    if (InputRegex.test(data.value)) {
      SetShowError(false);
      let symbols = data.value.split(",");
      setSymbols(symbols);
    } else {
      SetShowError(true);
    }
  };

  const submitSymbols = (e, d) => {
    allSymbols(symbols);
    setSymbols("");
  };

  return (
    <>
      <Grid.Row centered>
        <StyledInput type="text" size="large" placeholder="Search..." action error={showError}>
          <Input
            placeholder="Ex-AAPL,BABA,TSLA"
            onChange={searchSymbols}
            error={showError}
            value={symbols}
            size="large"
            
          />
          <Button
            onClick={submitSymbols}
            disabled={showError || !symbols}
            primary
          >
            Search
          </Button>
        </StyledInput>
      </Grid.Row>
      <Grid.Row centered
        style={{paddingTop:'0px'}}
      >
        {showError && (
          <p 
            style={{color:'#db2828'}}
          >
            <Icon name="dont" />
            Only comma separated input is accepted
          </p>
        )}
      </Grid.Row>
    </>
  );
};

export default InputBox;
