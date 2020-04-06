import React, { useRef, useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Queue'

const Card = styled.div`
    border: none;
    background: #fff;
    padding: 5px;
    border-radius: 3px;
    width: 100%;
    box-shadow: 0 0 5px black;
`

const CardTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px;
`

const Input = styled.textarea`
    font-size: 20px;
    color: #93876b;
    border: none;
    background: transparent;
    font-weight: bold;
    width: 100%;
    textDecoration: ${props => props.completed ? "line-through" : "none" };
    border: ${props => !props.isEditing ? "1px solid #93876b" : "1px solid #fff" };
    ::placeholder {
        color: ${props => props.erroMsg !== "" ? "red" : "#93876b"}
    }
`

const CardFunctionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const StyledButton = styled.button`
    padding: 0.65em;
    font-size: 5px;
    color: #fff;
    border: none;
    border-radius: 3px;
    background-color: #93876b;
    margin: 2px;
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
        <Card>
            <form onSubmit={handleSubmit}>
                <CardTitleWrapper>
                    <Input
                        autoFocus
                        type="text"
                        ref={inputRef}
                        placeholder={erroMsg !== "" ? erroMsg : "Add here a new item!"}
                        value={name}
                        onChange={handleOnChange}
                        erroMsg={erroMsg}
                    />
                    <CardFunctionsWrapper>
                        <StyledButton>
                            <AddIcon/>
                        </StyledButton>
                    </CardFunctionsWrapper>
                </CardTitleWrapper>
            </form>
        </Card>
    )
}

export default graphql(createResolution, { 
    name: "createResolution",
    options: {
        refetchQueries: ["Resolutions"]
    } 
})(ResolutionForm)
