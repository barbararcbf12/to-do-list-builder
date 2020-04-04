import React, { useRef, useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Queue'

const Wrapper = styled.div`
    margin: 1.5em;
    position: relative;
    padding: 0.73em;
    width: 50%;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #93876b;
    box-shadow: 0 0 5px black;
    position: relative;
    border: ${props => props.erroMsg !== "" ? "1px solid red" : null}
`

const Input = styled.input`
    font-size: 16px;
    color: #93876b;
    width: 90%;
    border: none;
    outline: none;
    ::placeholder {
        color: ${props => props.erroMsg !== "" ? "red" : "#93876b"}
    }
`

const StyledButton = styled.button`
    padding: 0.65em;
    font-size: 10px;
    color: #fff;
    background: #93876b;
    border: none;
    border-radius: 3px;
    position: absolute;
    right: 2px;
    top: 2px;
    outline: none;
`

const createResolution = gql `
    mutation createResolution($name: String!) {
        createResolution(name: $name){
            _id
        }
    }
`

function ResolutionForm(props){
    const [name, setName] = useState("")
    const [erroMsg, setErrorMsg] = useState("")
    // Create ref for form input
    const inputRef = useRef(null)
    
    const handleSubmit = e => {
        e.preventDefault()
        if(name !== undefined && name !== ""){
            props.createResolution({
                variables: {
                    name
                }
            })
            .then(() => setName(""))
            .catch( error => {
                setErrorMsg(error.message)
            })
        }
        else{
            inputRef.current.focus()
            setErrorMsg("You need to type something here! :)")
        }
    }

    const handleOnChange = e => {
        e.preventDefault()
        setErrorMsg("")
        setName(e.target.value)
    }

    return(
        <form onSubmit={handleSubmit}>
            <Wrapper erroMsg={erroMsg}>
                <Input 
                    type="text"
                    ref={inputRef}
                    placeholder={erroMsg !== "" ? erroMsg : "Add here a new item!"}
                    value={name}
                    onChange={handleOnChange}
                    erroMsg={erroMsg}
                />
                <StyledButton>
                    <AddIcon/>
                </StyledButton>
            </Wrapper>
        </form>
    )
}

export default graphql(createResolution, { 
    name: "createResolution",
    options: {
        refetchQueries: ["Resolutions"]
    } 
})(ResolutionForm)
