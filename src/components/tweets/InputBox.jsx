import React, { useEffect, useState } from "react";
import { Input, Message, Icon, Grid, Button, Checkbox, Form } from 'semantic-ui-react'

const InputRegex = /^[a-zA-Z,]+$/;

const InputBox = ({ allSymbols }) => {

    const [showError,SetShowError] = useState(false);
    const [symbols,setSymbols] = useState('')
    const searchSymbols = (e,data) => {
        //console.log(e,data)
        if(InputRegex.test(data.value)){
            SetShowError(false)
            let symbols = data.value.split(',')
            //allSymbols(symbols)
            setSymbols(symbols)
        } else {
            SetShowError(true)
        }
    }

    const KeyPressHandler = (e,d) => {
        allSymbols(symbols)
        setSymbols('')
    }

    return(
        <>
            <Grid.Row centered>
                <Input type='text' placeholder='Search...' action error={showError} >
                    <Input 
                        placeholder='ex-aapl,baba' 
                        onChange = {searchSymbols}
                        //label='Enter symbols to search' 
                        error={showError}    
                        value={symbols}        
                    />                  
                    <Button 
                        onClick={KeyPressHandler}
                        disabled={showError || !symbols}
                        primary
                    >
                        Search
                    </Button>
                </Input>
            </Grid.Row>
            <Grid.Row centered>
                {
                    showError 
                        && (
                            <Message warning attached='bottom'>
                                <Icon name='warning' />
                                Only comma separated input is accepted
                            </Message>
                        )
                }
            </Grid.Row>
            
            
        </>
    )
}

export default InputBox;