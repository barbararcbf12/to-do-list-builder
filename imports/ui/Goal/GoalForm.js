import React, { useRef, useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Queue'

const Wrapper = styled.div`
    margin: 1.5em 0;
    position: relative;
    padding: 0.01em 5px;
    width: 90%;
    background: ${props => props.erroMsg !== "" ? "#fff" : "#93876b"};
    border-radius: 3px;
    position: relative;
    display: flex;
    align-items: center;
    border: ${props => props.erroMsg !== "" ? "1px solid red" : "1px solid #93876b"};
`

const StyledButton = styled.button`
    padding: 0.65em;
    font-size: 5px;
    color: #fff;
    background: #93876b;
    border: none;
    border-radius: 3px;
    outline: none;
`

const Input = styled.textarea`
    font-size: 14px;
    color: #fff;
    width: 90%;
    border: none;
    border-radius: 3px;
    background: transparent;
    outline: none;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${props => props.erroMsg !== "" ? "red" : "#fff"};
        opacity: 0.7; /* Firefox */
    }
`

const createGoal = gql `
    mutation createGoal($name: String!, $resolutionId: String!) {
        createGoal(name: $name, resolutionId: $resolutionId){
            _id
        }
    }
`

function GoalForm(props){
    const [name, setName] = useState("")
    const [erroMsg, setErrorMsg] = useState("")
    // Create ref for form input
    const inputRef = useRef(null)
    
    const handleSubmit = e => {
        e.preventDefault()
        if(name !== undefined && name !== ""){
            props.createGoal({
                variables: {
                    name,
                    resolutionId: props.resolutionId
                }
            }).then(() => setName(""))
            .catch( error => {
                console.log(error)
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
                    value={name}
                    onChange={handleOnChange}
                    placeholder={erroMsg !== "" ? erroMsg : "Add a new sub-item"}
                    rows="2"
                    cols="20"
                    erroMsg={erroMsg}
                    ref={inputRef}
                />
                <StyledButton>
                    <AddIcon fontSize="small" />
                </StyledButton>
            </Wrapper>
        </form>
    )
}

export default graphql(createGoal, { 
    name: "createGoal",
    options: {
        refetchQueries: ["Resolutions"]
    } 
})(GoalForm)
