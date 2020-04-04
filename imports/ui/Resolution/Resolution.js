import React, { useRef, useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash'
import GoalForm from '../Goal/GoalForm'
import Goal from '../Goal/Goal'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ModalWrapper from '../Modal'

export const CardGrid = styled.div`
    display: grid;
    padding: 2rem 2rem;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    min-height: 0;  /* NEW */
    min-width: 0;   /* NEW; needed for Firefox */

    @media only screen 
        and (max-width : 1240px) {
        padding: 1rem 2rem;
        grid-template-columns: repeat(4, 1fr);
    }

    @media only screen 
        and (max-width : 1024px) {
        padding: 1rem 2rem;
        grid-template-columns: repeat(3, 1fr);
    }
`

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

const CardFunctionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
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

function Resolution(props){
    const { refetch, resolution, removeResolution, updateResolution } = props
    const [isEditing, setIsEditing] = useState(true)
    const [editedName, setEditedName] = useState()
    const [openModal, setOpenModal] = useState(false)
    // Create ref for form input
    const inputRef = useRef(null)

    function handleOnChange(e) {
        e.preventDefault()
        setEditedName(e.target.value)
    }

    const handleEdit = (_id) => {
        setIsEditing(true)
        updateResolution({
            variables: {
                _id,
                name: editedName
            }
        })
        .catch( error => {
            console.log(error.message)
        })
    }

    function handleRemove(_id) {
        removeResolution({
            variables: {
                _id
            }
        })
        .then(refetch())
        .catch( error => {
            console.log(error.message)
        })
    }

    function handleStartEnditting(name) {
        setEditedName(name)
        setIsEditing(false)
    }

    return (
        <>
            <Card key={resolution._id}>
                <CardTitleWrapper>
                    <Input 
                        type="text" 
                        defaultValue={resolution.name} 
                        disabled={isEditing}
                        onChange={e => handleOnChange(e)}
                        isEditing={isEditing}
                        ref={inputRef}
                    />
                    <CardFunctionsWrapper>
                        {isEditing ? 
                            <StyledButton onClick={() => handleStartEnditting(resolution.name)}><EditIcon fontSize="small" /></StyledButton> : 
                            <StyledButton onClick={() => handleEdit(resolution._id)}><DoneIcon fontSize="small" /></StyledButton>
                        }
                        <StyledButton onClick={() => setOpenModal(true)}><DeleteIcon fontSize="small" /></StyledButton>
                    </CardFunctionsWrapper>
                </CardTitleWrapper>
                <ul>
                    {resolution.goals.map(goal => <li key={goal._id}><Goal goal={goal} /></li>)}
                    <li>
                        <GoalForm resolutionId={resolution._id} />
                    </li>
                </ul>
            </Card>
            {openModal && <ModalWrapper element={resolution} on={openModal} handleRemove={handleRemove} setOpenModal={setOpenModal} />}
        </>
    )
}

const removeResolution = gql `
    mutation removeResolution($_id: String!) {
        removeResolution(_id: $_id){
            _id
        }
    }
`

const updateResolution = gql `
    mutation updateResolution($_id: String!, $name: String) {
        updateResolution(_id: $_id, name: $name){
            _id
            name
        }
    }
`

export default compose(
    graphql(removeResolution, { 
        name: "removeResolution",
    }),
    graphql(updateResolution, { 
        name: "updateResolution",
    })
)(Resolution)

