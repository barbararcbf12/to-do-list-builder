import React, { useRef, useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ModalWrapper from '../Modal'

const Input = styled.textarea`
    height: auto;
    font-size: 14px;
    color: #93876b;
    background: transparent;
    width: 68%;
    textDecoration: ${props => props.completed ? "line-through" : "none" };
    border: ${props => !props.isEditing ? "1px solid #93876b" : "1px solid #fff" };
    margin-top: -3px;
`

const StyledButton = styled.button`
    padding: 0.65em;
    font-size: 5px;
    color: #fff;
    background: transparent;
    border: none;
    border-radius: 3px;
    outline: none;
`

const WrapperGoal = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const toggleGoal = gql `
    mutation toggleGoal($id: String!) {
        toggleGoal(_id: $id){
            _id
        }
    }
`

const removeGoal = gql `
    mutation removeGoal($_id: String!) {
        removeGoal(_id: $_id){
            _id
        }
    }
`

const updateGoal = gql `
    mutation updateGoal($_id: String!, $name: String!) {
        updateGoal(_id: $_id, name: $name){
            _id
        }
    }
`

function Goal(props) {
    const { goal, removeGoal, toggleGoal, updateGoal } = props
    const [isEditing, setIsEditing] = useState(true)
    const [editedName, setEditedName] = useState()
    const [openModal, setOpenModal] = useState(false)

    const handleToggleGoal = () => {
        toggleGoal({
            variables: {
                id: props.goal._id
            }
        })
    }

    const handleOnChange = e => {
        e.preventDefault()
        setEditedName(e.target.value)
    }

    const handleEdit = _id => {
        setIsEditing(true)
        updateGoal({
            variables: {
                _id,
                name: editedName
            }
        })
        .catch( error => {
            console.log(error.message)
        })
    }

    function handleRemove(_id){
        removeGoal({
            variables: {
                _id
            }
        })
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
            <WrapperGoal>
                <input style={{fontSize: "14px"}} type="checkbox" onChange={handleToggleGoal} checked={goal.completed} />
                    <Input 
                        // id={goal._id}
                        type="text" 
                        rows="2"
                        cols="20"
                        defaultValue={goal.name} 
                        disabled={isEditing}
                        onChange={e => handleOnChange(e)}
                        completed={goal.completed}
                        isEditing={isEditing}
                    />
                {isEditing ? 
                    <StyledButton onClick={() => handleStartEnditting(goal.name)}><EditIcon fontSize="small" style={{ color: '#93876b' }} /></StyledButton> : 
                    <StyledButton onClick={() => handleEdit(goal._id)}><DoneIcon fontSize="small" style={{ color: '#93876b' }} /></StyledButton>
                }
                <StyledButton onClick={() => setOpenModal(true)}><DeleteIcon fontSize="small" style={{ color: '#93876b' }} /></StyledButton>
            </WrapperGoal>
            {openModal && <ModalWrapper element={goal} on={openModal} handleRemove={handleRemove} setOpenModal={setOpenModal} />}
        </>
    )
}

export default compose(
    graphql(toggleGoal, {
        name: "toggleGoal",
        options: {
            refetchQueries: ["Resolutions"]
        }
    }),
    graphql(removeGoal, { 
        name: "removeGoal",
        options: {
            refetchQueries: ["Resolutions"]
        }
    }),
    graphql(updateGoal, { 
        name: "updateGoal",
        options: {
            refetchQueries: ["Resolutions"]
        }
    })
)(Goal)
